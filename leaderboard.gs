/**
 * WNBA Guessing Game - shared leaderboard backend.
 *
 * This runs on Google's servers as a Web App attached to one Google Sheet.
 * One deployment serves every game; the `game` value keeps the boards separate.
 *   GET  ?game=legends   -> returns that game's current Top 10 as JSON
 *   POST {game,name,score,total}  -> validates and appends a new row
 *
 * Setup steps are in LEADERBOARD-SETUP.md.
 */

// The tab (bottom-left of the spreadsheet) that holds the scores.
var TAB_NAME = 'Scores';

// Keep at most this many rows in the sheet; oldest are trimmed automatically.
var MAX_ROWS = 2000;

// Highest score/total any game could report. Submissions outside this are rejected.
var MAX_POINTS = 500;

// Games that are allowed to write to the board. Unknown values fall back to the first.
var GAMES = ['legends', 'naming'];
var DEFAULT_GAME = 'legends';


function doGet(e) {
  var game = cleanGame(e && e.parameter ? e.parameter.game : '');
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
  var score = Math.round(Number(body.score));
  var total = Math.round(Number(body.total));

  if (!name) return jsonOutput({ ok: false, error: 'name required' });
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

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
