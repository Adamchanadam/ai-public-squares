# AI Public Squares

> **⚠️ 前期測試階段(pre-release)**
>
> 本工具仍處於早期建構期 — npm 套件 `@adamchanadam/aps` 之 `init` 命令仍為佔位符,完整對話流程尚未落地;真實跨機 round-trip 尚未驗證。
>
> **適合**:觀察、提建議、留 feedback、tracking 建構進度。
> **不適合**:生產 use、依賴於 critical workflow。

兩個人,各自在自己的電腦上,以 AI 共同製作一份品牌指引、撰寫一份報告、設計一個項目。

最常遇到的問題:

- 「最新版的檔案在哪裡?」
- 「我這部 AI 記不起我們之前的討論,還要重新交代一次」
- Google Drive 出現衝突副本,不知該保留哪一份
- 每次往返都要透過 WhatsApp 通知一次,然後在新對話從頭交代上下文

本工具的目標:**一條命令完成安裝,之後在對話中以日常粵語或英文與 AI 溝通即可**。背後的檔案管理、版本控制、待辦處理、衝突避免,由工具自行承擔。

```
npx @adamchanadam/aps init
```

> **目前狀態**:這條命令的後台仍在建構中。試行版執行時會顯示「尚未完成」的訊息,引導使用者前往設置教學手動安裝。完整可用之前,本頁與設置教學會逐步補完。

---

## 安裝前置事項

本工具有兩項先決條件,須先完成。

### 第一項 — 安裝 Agent Handoff Kit(治理基礎)

本 repo 與 Agent Handoff Kit 互相配合。Agent Handoff Kit 提供基本的交接、紀錄、健康檢查機制;APS 在此基礎上加入跨機協作的功能。

**未先安裝 Agent Handoff Kit,APS 的檔案結構將無法獨立運作。**

前往 https://github.com/Adamchanadam/agent-handoff-kit,依其指引安裝。一條命令即可:

```
npx @adamchanadam/agent-handoff-kit init
```

### 第二項 — 基本前提

- 電腦需安裝 Google Drive 桌面版(前往 https://www.google.com/drive/download/ 下載),登入之後將共享資料夾設為「離線存取」
- 電腦需安裝 Claude Code(前往 https://claude.com/code 下載)
- 與你的協作夥伴之間能透過 WhatsApp 通訊

以上任何一項尚未完成?各個官方網頁均有逐步指引。先安裝完成,再回來執行下列命令。

---

## 開始使用

完成上述安裝之後:

1. 在你計劃進行此項目的資料夾內執行:`npx @adamchanadam/aps init`
2. 工具會詢問數個問題:使用哪個 Google Drive 資料夾作為共享、項目名稱、協作夥伴的識別名等
3. 執行完畢之後,在 Claude Code 對話中以日常粵語或英文與 AI 溝通:
   - 「我有嘢俾 Jay」 → 工具自動將內容打包,並生成一句 WhatsApp 通知句供你發送
   - 「Jay 嗰邊有冇新嘢?」 → 工具自動從共享資料夾擷取對方的檔案,列出待辦
   - 「Google Drive 同步唔到」 → 工具偵測問題並提出修復方法

全程無需先閱讀任何技術文檔。

---

## 為何需要此工具

兩個人(可能是朋友、同事,或是隔著一個太平洋的協作夥伴)共同完成的工作 — 品牌指引、廣告文案、設計系統、報告 — 常見的痛點:

- **搬運檔案的工夫** — 每次更新都要透過 WhatsApp 通知,Google Drive 的資料夾一邊更新一邊覆蓋
- **解釋上下文的工夫** — 協作夥伴開啟新 AI 對話時,須重新交代「上次討論到哪裡」
- **同步衝突** — 雙方同時儲存,Google Drive 產生「(conflict)」副本,無法判斷哪一份是最新版
- **每次往返均須重做** — 對方回覆之後又要重複一遍,搬運檔案、解釋背景、再次經歷整個流程

本工具的構想:**Google Drive 上一個共享資料夾,加上一套寫入規矩 = 雙方電腦的 AI 自動知道對方的進度**;新內容自動呈現給使用者;衝突由結構性避免。沒有伺服器,沒有額外的雲端帳號,沒有自動推送通知(刻意如此設計 — 由使用者決定何時被打斷,而非由 AI 主動發送提示)。

---

## 想深入了解

下列分兩層。**HTML 兩份為 polished 人類面文檔**(瀏覽器直接讀);**其餘三份 .md 為 AI / 維護者層技術文檔**,人類讀者一般無需閱讀(於 GitHub web 自動 render,本地 clone 用 browser 開為 plain text;主要供 AI 程式直接讀,或維護者改 protocol / 升 Bridge Pack 時 reference)。

人類面(HTML,GitHub Pages hosted — click 即開 rendered 頁):

- [入口頁](https://adamchanadam.github.io/ai-public-squares/docs/index.html) — 由零認知讀者起步的項目簡介
- [設置教學](https://adamchanadam.github.io/ai-public-squares/docs/guides/aps-onboarding-walkthrough.html) — 完整落地步驟(由前置到日常使用)
- [分層 QC](https://adamchanadam.github.io/ai-public-squares/docs/qc/governance-map.html) — 三 tier 觸發詞彙 reference card

AI / 維護者層(.md,予 AI 程式 / repo 維護者讀):

- [跨機接駁實作計劃](docs/plans/2026-05-21-aps-phase4-plan.md) — 實現跨機協作的技術步驟
- [協定設計理據](docs/plans/2026-05-20-agent-public-square-design.md) — 5 個設計取捨的理由
- [內部檢討文件](dev/qc/2026-05-22-zero-knowledge-funnel-audit.md) — 「本 repo 須令零認知讀者也能使用」 的檢討與修補路線

---

## License 與反饋

[Apache License 2.0](LICENSE)。目前為私人 repo,但 license 已預先設定,將來轉為公開時即時生效。

遇到錯誤、想試用、或有功能建議?前往 [GitHub issues](https://github.com/Adamchanadam/ai-public-squares/issues) 留言。
