// Paste into Apps Script opened from the SECOND (history) spreadsheet.
// Run setup once in the editor, then deploy as a Web app.
const HEADERS = ['Session ID', 'รหัสพนักงาน', 'ชื่อพนักงาน', 'เวลาเข้า', 'เวลาออก', 'สาเหตุการออก'];
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('เปิด Apps Script จากชีตประวัติก่อน');
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  if (!properties.getProperty('SHARED_SECRET')) properties.setProperty('SHARED_SECRET', Utilities.getUuid() + Utilities.getUuid());
  if (!properties.getProperty('SHEET_NAME')) properties.setProperty('SHEET_NAME', 'ประวัติการเข้าใช้งาน');
  const sheet = spreadsheet.getSheetByName(properties.getProperty('SHEET_NAME')) || spreadsheet.insertSheet(properties.getProperty('SHEET_NAME'));
  if (!sheet.getLastRow()) { sheet.appendRow(HEADERS); sheet.setFrozenRows(1); }
  sheet.getRange(1, 7).setValue('ติดต่อครั้งล่าสุด');
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'expireSessions')) ScriptApp.newTrigger('expireSessions').timeBased().everyMinutes(1).create();
  Logger.log('พร้อมแล้ว ดู SHARED_SECRET ใน Project Settings > Script Properties');
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const input = JSON.parse(e.postData.contents);
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('SHARED_SECRET');
    if (!secret || input.secret !== secret) throw new Error('Unauthorized');
    const s = input.session;
    if (!s || typeof s.id !== 'string' || !/^[a-f0-9-]{36}$/.test(s.id) || typeof s.code !== 'string' || typeof s.name !== 'string' || !s.loginAt || !Number.isFinite(Date.parse(s.loginAt)) || (s.logoutAt && !Number.isFinite(Date.parse(s.logoutAt)))) throw new Error('Invalid session');
    lock.waitLock(20000);
    const sheet = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID')).getSheetByName(properties.getProperty('SHEET_NAME'));
    if (!sheet) throw new Error('Run setup first');
    if (JSON.stringify(sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0]) !== JSON.stringify(HEADERS)) throw new Error('Unexpected headers; select an empty history tab');
    const matches = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(s.id).matchEntireCell(true).findNext() : null;
    const row = matches ? matches.getRow() : sheet.getLastRow() + 1;
    // Keep employee IDs as text and prevent spreadsheet formulas from names.
    const text = value => /^[=+\-@]/.test(String(value)) ? "'" + String(value) : String(value);
    sheet.getRange(row, 1, 1, 3).setNumberFormat('@');
    const current = sheet.getRange(row, 1, 1, 6).getValues()[0];
    const lastSeen = matches ? sheet.getRange(row, 7).getValue() : '';
    if (input.action === 'heartbeat') {
      if (!matches || current[4]) return output({ ok: false, expired: true });
      if (lastSeen && Date.now() - new Date(lastSeen).getTime() > 300000) {
        sheet.getRange(row, 5, 1, 2).setValues([[lastSeen, 'หมดเวลาการเชื่อมต่อ']]);
        return output({ ok: false, expired: true });
      }
    }
    const logoutAt = s.logoutAt ? new Date(s.logoutAt) : current[4] || '';
    sheet.getRange(row, 1, 1, 6).setValues([[s.id, text(s.code), text(s.name), new Date(s.loginAt), logoutAt, text(s.logoutReason || current[5] || '')]]);
    sheet.getRange(row, 4, 1, 2).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    if (!logoutAt) sheet.getRange(row, 7).setValue(new Date()).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    return output({ ok: true });
  } catch (error) { return output({ ok: false, error: error.message }); }
  finally { if (lock.hasLock()) lock.releaseLock(); }
}
function output(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function expireSessions() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;
  try {
    const p = PropertiesService.getScriptProperties();
    const sheet = SpreadsheetApp.openById(p.getProperty('SPREADSHEET_ID')).getSheetByName(p.getProperty('SHEET_NAME'));
    if (!sheet || sheet.getLastRow() < 2) return;
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues();
    rows.forEach((r, i) => { if (!r[4] && r[6] && Date.now() - new Date(r[6]).getTime() > 300000) sheet.getRange(i + 2, 5, 1, 2).setValues([[r[6], 'หมดเวลาการเชื่อมต่อ']]); });
  } finally { lock.releaseLock(); }
}
