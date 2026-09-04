/**
 * WNBA Guessing Game - shared leaderboard backend.
 *
 * This runs on Google's servers as a Web App attached to one Google Sheet.
 * It does two things:
 *   GET  -> returns the current Top 10 as JSON
 *   POST -> validates a submitted score and appends it as a new row
 *
 * Setup steps are in LEADERBOARD-SETUP.md. You do not need to change anything
 * in this file unless you rename the tab (see TAB_NAME below).
 */

// The name of the tab (bottom-left of the spreadsheet) that holds the scores.
var TAB_NAME = 'Scores';

// Keep at most this many rows in the sheet; oldest are trimmed automatically.
var MAX_ROWS = 500;

// Highest score/total the game could ever report. Submissions outside this are rejected.
var MAX_POINTS = 60;


function doGet() {
  return jsonOutput({ ok: true, top: readTop(10) });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ ok: false, error: 'bad request' });
  }

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
    sheet.appendRow([name, score, total, Date.now()]);
    trimOldRows(sheet);
  } finally {
    lock.releaseLock();
  }

  return jsonOutput({ ok: true, top: readTop(10) });
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
    sheet.appendRow(['name', 'score', 'total', 'timestamp']);
  }
  return sheet;
}

function readTop(count) {
  var sheet = getSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  var rows = values
    .filter(function (r) { return r[0] !== '' && r[1] !== ''; })
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
