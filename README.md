# 2026teashop

班級春水堂飲料點餐網站。網站網址：[https://wiston13.github.io/2026teashop/](https://wiston13.github.io/2026teashop/)

## Google Sheet 與 Apps Script 設定

1. 在 Google Drive 建立試算表，命名為 **2026手搖飲點餐記錄**。
2. 開啟「擴充功能 → Apps Script」，以 `apps-script/Code.gs` 全部內容取代預設檔案並儲存。
3. 按「部署 → 新增部署作業 → 網頁應用程式」；執行身分選「我」，存取權選「所有人」，完成授權並複製網頁應用程式網址。
4. 將網址分別貼至 `app.js` 和 `orders.js` 的 `SCRIPT_URL`，再重新推送 GitHub Pages。程式已使用 Apps Script 相容的跨網域送出與 JSONP 讀取方式。

首次收到訂單時，Apps Script 會建立「訂單」工作表與標題列：送出時間、姓名、類別、飲品、冰熱、尺寸、甜度、冰量、備註、價格。

> Apps Script 網頁應用程式以 Google 試算表為容器；請確認試算表名稱為 `2026手搖飲點餐記錄`。
