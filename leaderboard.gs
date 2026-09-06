/**
 * WNBA Guessing Game - shared leaderboard + predictions backend.
 *
 * Runs on Google's servers as a Web App attached to one Google Sheet.
 * One deployment serves everything; the `game` value keeps things separate.
 *
 *   Score games (legends, naming):
 *     GET  ?game=legends           -> that game's current Top 10 as JSON
 *     POST {game,name,score,total} -> validates and appends a row (Scores tab)
 *
 *   Predictions (finals - "Call the Finals"):
 *     GET  ?game=finals                       -> tally of everyone's picks
 *     POST {game:'finals',name,teamA,teamB,champion} -> saves/updates one
 *          person's pick in the Predictions tab (one row per name)
 *
 * Setup steps are in LEADERBOARD-SETUP.md.
 */

// Tabs (bottom-left of the spreadsheet). Both are created automatically.
var TAB_NAME = 'Scores';
var PRED_TAB = 'Predictions';

// Keep at most this many score rows; oldest are trimmed automatically.
var MAX_ROWS = 2000;

// Highest score/total any score game could report. Submissions outside this are rejected.
var MAX_POINTS = 500;

// Games allowed to write. Unknown values fall back to the first.
var GAMES = ['legends', 'naming', 'finals'];
var DEFAULT_GAME = 'legends';

// Teams a "Call the Finals" pick may name - the 2026 WNBA playoff field.
var TEAMS = [
  'Atlanta Dream', 'Dallas Wings', 'Golden State Valkyries', 'Indiana Fever',
  'Las Vegas Aces', 'Minnesota Lynx', 'New York Liberty', 'Washington Mystics'
];

// "Call the Finals" picks stop being accepted at this moment (midnight ET, Sept 27 2026).
var FINALS_LOCK = new Date('2026-09-27T00:00:00-04:00').getTime();


function doGet(e) {
  var game = cleanGame(e && e.parameter ? e.parameter.game : '');
  if (game === 'finals') {
    return jsonOutput({ ok: true, game: game, predictions: readPredictions() });
  }
  return jsonOutput({ ok: true, game: game, top: readTop(10, game) });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ ok: false, error: 'bad request' });
  }

  var game = cleanGame(body.game);
  var name = cleanName(body.name);
  if (!name) return jsonOutput({ ok: false, error: 'name required' });

  if (game === 'finals') {
    if (Date.now() >= FINALS_LOCK) return jsonOutput({ ok: false, error: 'calls are closed' });
    var teamA = cleanTeam(body.teamA);
    var teamB = cleanTeam(body.teamB);
    var champion = cleanTeam(body.champion);
    if (!teamA || !teamB || teamA === teamB) return jsonOutput({ ok: false, error: 'pick two different teams' });
    if (champion !== teamA && champion !== teamB) return jsonOutput({ ok: false, error: 'champion must be one of your two teams' });

    var predLock = LockService.getScriptLock();
    predLock.waitLock(5000);
    try {
      upsertPrediction(name, teamA, teamB, champion);
    } finally {
      predLock.releaseLock();
    }
    return jsonOutput({ ok: true, game: game, predictions: readPredictions() });
  }

  var score = Math.round(Number(body.score));
  var total = Math.round(Number(body.total));
  if (!(score >= 0 && score <= MAX_POINTS)) return jsonOutput({ ok: false, error: 'bad score' });
  if (!(total >= 1 && total <= MAX_POINTS)) return jsonOutput({ ok: false, error: 'bad total' });
  if (score > total) return jsonOutput({ ok: false, error: 'score above total' });

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet();
    sheet.appendRow([name, score, total, Date.now(), game]);
    trimOldRows(sheet);
  } finally {
    lock.releaseLock();
  }

  return jsonOutput({ ok: true, game: game, top: readTop(10, game) });
}


function cleanGame(value) {
  var g = String(value == null ? '' : value).toLowerCase().replace(/[^a-z]/g, '');
  return GAMES.indexOf(g) === -1 ? DEFAULT_GAME : g;
}

function cleanName(value) {
  var text = String(value == null ? '' : value);
  var out = '';
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code < 32 || code === 127) continue; // drop control characters
    var ch = text.charAt(i);
    if (ch === '<' || ch === '>') continue;  // drop angle brackets
    out += ch;
  }
  return out.replace(/\s+/g, ' ').trim().slice(0, 20);
}

function cleanTeam(value) {
  var v = String(value == null ? '' : value).trim().toLowerCase();
  for (var i = 0; i < TEAMS.length; i++) {
    if (TEAMS[i].toLowerCase() === v) return TEAMS[i];
  }
  return '';
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['name', 'score', 'total', 'timestamp', 'game']);
  }
  return sheet;
}

function readTop(count, game) {
  var sheet = getSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  var rows = values
    .filter(function (r) {
      if (r[0] === '' || r[1] === '') return false;
      // rows saved before games existed have a blank column E -> treat as the default game
      var rowGame = String(r[4] || DEFAULT_GAME).toLowerCase();
      return rowGame === game;
    })
    .map(function (r) {
      return { name: String(r[0]), score: Number(r[1]), total: Number(r[2]), t: Number(r[3]) || 0 };
    });

  rows.sort(function (a, b) { return (b.score - a.score) || (a.t - b.t); });
  return rows.slice(0, count).map(function (r) {
    return { name: r.name, score: r.score, total: r.total };
  });
}

function trimOldRows(sheet) {
  var dataRows = sheet.getLastRow() - 1;
  if (dataRows > MAX_ROWS) {
    sheet.deleteRows(2, dataRows - MAX_ROWS);
  }
}


// ---- "Call the Finals" predictions ----

function getPredSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PRED_TAB);
  if (!sheet) {
    sheet = ss.insertSheet(PRED_TAB);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['name', 'teamA', 'teamB', 'champion', 'timestamp']);
  }
  return sheet;
}

function upsertPrediction(name, teamA, teamB, champion) {
  var sheet = getPredSheet();
  var last = sheet.getLastRow();
  var rowIndex = -1;
  if (last >= 2) {
    var names = sheet.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < names.length; i++) {
      if (String(names[i][0]).toLowerCase() === name.toLowerCase()) { rowIndex = i + 2; break; }
    }
  }
  var row = [name, teamA, teamB, champion, Date.now()];
  if (rowIndex === -1) {
    sheet.appendRow(row);
  } else {
    sheet.getRange(rowIndex, 1, 1, 5).setValues([row]);
  }
}

function readPredictions() {
  var sheet = getPredSheet();
  var last = sheet.getLastRow();
  if (last < 2) return { total: 0, champion: [], finalist: [] };

  var values = sheet.getRange(2, 1, last - 1, 4).getValues();
  var champ = {};
  var fin = {};
  var total = 0;
  values.forEach(function (r) {
    var a = cleanTeam(r[1]);
    var b = cleanTeam(r[2]);
    var c = cleanTeam(r[3]);
    if (!a || !b || !c) return;
    total++;
    champ[c] = (champ[c] || 0) + 1;
    fin[a] = (fin[a] || 0) + 1;
    fin[b] = (fin[b] || 0) + 1;
  });
  return { total: total, champion: tallyToList(champ), finalist: tallyToList(fin) };
}

function tallyToList(obj) {
  return Object.keys(obj)
    .map(function (k) { return { team: k, count: obj[k] }; })
    .sort(function (x, y) { return (y.count - x.count) || (x.team < y.team ? -1 : 1); });
}


function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
