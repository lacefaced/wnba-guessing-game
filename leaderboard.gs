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
 *     GET  ?game=finals -> tally of everyone's picks
 *     POST {game:'finals',name,m1,m2,m3,m4,s1,s2,champion,rootFor} -> saves the
 *          whole bracket (every round's pick, not just the Finals/champion) to
 *          the Predictions tab - one row per name, overwritten on resubmit
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

// The real 2026 bracket (seeded; no reseeding after Round 1). Keep in sync with
// the BRACKET constant in call-the-finals.html.
var BRACKET = {
  m1: ['Minnesota Lynx', 'New York Liberty'],
  m2: ['Golden State Valkyries', 'Dallas Wings'],
  m3: ['Las Vegas Aces', 'Indiana Fever'],
  m4: ['Atlanta Dream', 'Washington Mystics']
};

// Set FINALS_LOCK_ENABLED to true (and pick a cutoff) to close brackets before a future
// postseason. Left off for the 2026 playoffs since Round 1 was already underway when this
// shipped - it's a casual/community bracket this round rather than a locked contest.
var FINALS_LOCK_ENABLED = false;
var FINALS_LOCK = new Date('2026-09-27T14:00:00-04:00').getTime(); // Game 1 tip-off, for reference


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
    if (FINALS_LOCK_ENABLED && Date.now() >= FINALS_LOCK) return jsonOutput({ ok: false, error: 'calls are closed' });

    var m1 = cleanTeam(body.m1), m2 = cleanTeam(body.m2), m3 = cleanTeam(body.m3), m4 = cleanTeam(body.m4);
    var s1 = cleanTeam(body.s1), s2 = cleanTeam(body.s2);
    var champion = cleanTeam(body.champion);
    var rootFor = cleanTeam(body.rootFor);

    if (BRACKET.m1.indexOf(m1) === -1) return jsonOutput({ ok: false, error: 'bad round 1 pick' });
    if (BRACKET.m2.indexOf(m2) === -1) return jsonOutput({ ok: false, error: 'bad round 1 pick' });
    if (BRACKET.m3.indexOf(m3) === -1) return jsonOutput({ ok: false, error: 'bad round 1 pick' });
    if (BRACKET.m4.indexOf(m4) === -1) return jsonOutput({ ok: false, error: 'bad round 1 pick' });
    if (s1 !== m1 && s1 !== m4) return jsonOutput({ ok: false, error: 'bad semifinal pick' });
    if (s2 !== m2 && s2 !== m3) return jsonOutput({ ok: false, error: 'bad semifinal pick' });
    if (champion !== s1 && champion !== s2) return jsonOutput({ ok: false, error: 'champion must be one of your finalists' });
    if (!rootFor) return jsonOutput({ ok: false, error: 'pick a team to root for' });

    var predLock = LockService.getScriptLock();
    predLock.waitLock(5000);
    try {
      upsertPrediction(name, [m1, m2, m3, m4, s1, s2, champion, rootFor]);
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
    sheet.appendRow(['name', 'm1', 'm2', 'm3', 'm4', 's1', 's2', 'champion', 'rootFor', 'timestamp']);
  }
  return sheet;
}

// picks = [m1, m2, m3, m4, s1, s2, champion, rootFor] - every round of the bracket.
function upsertPrediction(name, picks) {
  var sheet = getPredSheet();
  var last = sheet.getLastRow();
  var rowIndex = -1;
  if (last >= 2) {
    var names = sheet.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < names.length; i++) {
      if (String(names[i][0]).toLowerCase() === name.toLowerCase()) { rowIndex = i + 2; break; }
    }
  }
  var row = [name].concat(picks, [Date.now()]);
  if (rowIndex === -1) {
    sheet.appendRow(row);
  } else {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  }
}

function readPredictions() {
  var sheet = getPredSheet();
  var last = sheet.getLastRow();
  var empty = { m1: [], m2: [], m3: [], m4: [] };
  if (last < 2) return { total: 0, champion: [], finalist: [], want: [], round1: empty, entries: [] };

  // columns: name, m1, m2, m3, m4, s1, s2, champion, rootFor
  var values = sheet.getRange(2, 1, last - 1, 9).getValues();
  var champ = {};
  var fin = {};
  var want = {};
  var r1 = { m1: {}, m2: {}, m3: {}, m4: {} };
  var entries = [];
  var total = 0;
  values.forEach(function (r) {
    var name = String(r[0]);
    var m1v = cleanTeam(r[1]), m2v = cleanTeam(r[2]), m3v = cleanTeam(r[3]), m4v = cleanTeam(r[4]);
    var s1 = cleanTeam(r[5]);
    var s2 = cleanTeam(r[6]);
    var c = cleanTeam(r[7]);
    if (!name || !s1 || !s2 || !c) return;
    total++;
    champ[c] = (champ[c] || 0) + 1;
    fin[s1] = (fin[s1] || 0) + 1;
    fin[s2] = (fin[s2] || 0) + 1;
    if (m1v) r1.m1[m1v] = (r1.m1[m1v] || 0) + 1;
    if (m2v) r1.m2[m2v] = (r1.m2[m2v] || 0) + 1;
    if (m3v) r1.m3[m3v] = (r1.m3[m3v] || 0) + 1;
    if (m4v) r1.m4[m4v] = (r1.m4[m4v] || 0) + 1;
    var w = cleanTeam(r[8]);
    if (w) want[w] = (want[w] || 0) + 1;
    entries.push({ name: name, m1: m1v, m2: m2v, m3: m3v, m4: m4v, s1: s1, s2: s2, champion: c, rootFor: w });
  });
  entries.sort(function (a, b) { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1; });
  return {
    total: total,
    champion: tallyToList(champ),
    finalist: tallyToList(fin),
    want: tallyToList(want),
    round1: { m1: tallyToList(r1.m1), m2: tallyToList(r1.m2), m3: tallyToList(r1.m3), m4: tallyToList(r1.m4) },
    entries: entries
  };
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
