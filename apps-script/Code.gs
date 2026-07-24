/** Bind this project to the Google Sheet named 2026手搖飲點餐記錄. */
const SHEET_NAME = "訂單";
const HEADERS = ["送出時間", "姓名", "類別", "飲品", "冰熱", "尺寸", "甜度", "冰量", "備註", "價格"];

function sheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  if (!data.name || !data.drink || !Number.isFinite(Number(data.price))) {
    return json_({ ok: false, error: "資料不完整" });
  }
  sheet_().appendRow([new Date(), data.name, data.category || "", data.drink, data.temperature || "", data.size || "", data.sugar || "", data.ice || "", data.note || "", Number(data.price)]);
  return json_({ ok: true });
}

function doGet(e) {
  const rows = sheet_().getDataRange().getValues();
  const orders = rows.slice(1).reverse().map(row => ({ time: Utilities.formatDate(new Date(row[0]), Session.getScriptTimeZone(), "yyyy/MM/dd HH:mm"), name: row[1], category: row[2], drink: row[3], temperature: row[4], size: row[5], sugar: row[6], ice: row[7], note: row[8], price: row[9] }));
  const output = { ok: true, orders: orders };
  const callback = e && e.parameter && e.parameter.callback;
  return callback ? ContentService.createTextOutput(callback + "(" + JSON.stringify(output) + ");").setMimeType(ContentService.MimeType.JAVASCRIPT) : json_(output);
}

function json_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
