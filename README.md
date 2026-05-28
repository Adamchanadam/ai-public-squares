# AI Public Squares

> **⚠️ 前期測試階段(pre-release)**
>
> 本工具仍處於早期建構期。npm latest 0.2.7 pre-release 以 Reliable Pair 為主線,主安裝路徑仍是互動式 `npx aps init`,並加入既有項目 `npx aps upgrade`、長正文 `--body-file` 發佈 / 修訂、APS 品牌與版本分流、繁體中文 help、發送前確認、收件總覽與更安全的對方通知文字。CLI 已通過最小發佈、收件、消化、回覆、收結往返測試,並沿用一次維護者真實 Google Drive 跨機往返驗證作為協定證據。自然語言日常操作與補救流程仍未完整產品化。
>
> 0.2.x 主路徑仍是二人協作。最新產品決策是 Reliable Pair first：先把二人交接、補交、共識確認、回覆與收結做到可靠。未列入本頁現有能力的事,不可視為已支援。核心方向是不要求額外雲端開發者專案、外部服務憑證或密鑰設定。
>
> **適合**:觀察、提出建議、留下回饋、追蹤建構進度。
> **不適合**:正式生產用途,或依賴於不可中斷的重要流程。

兩個人,各自在自己的電腦上,以 AI 共同製作一份品牌指引、撰寫一份報告、設計一個項目。

最常遇到的問題:

- 「最新版的檔案在哪裡?」
- 「我這部 AI 記不起我們之前的討論,還要重新交代一次」
- Google Drive 出現衝突副本,不知該保留哪一份
- 每次往返都要透過 WhatsApp 通知一次,然後在新對話從頭交代上下文

本工具的目標:**一條命令完成安裝,之後在對話中以自然語句與 AI 溝通即可**。背後的檔案管理、版本控制、待辦處理、衝突避免,由工具自行承擔。

```
npm install --save-dev @adamchanadam/aps@latest
npx aps init
```

`npx aps init` 會逐步問你幾個問題,列出寫入計劃,最後要求你輸入 `yes` 才真正寫入。你不用先把四個參數砌成一條長命令。工具會問到的資料如下:

| 值 | 你要填甚麼 | 例子 |
|---|---|---|
| `hub-root` | Google Drive 桌面版同步到本機的共享資料夾實際路徑。請在檔案總管打開該資料夾,複製地址列路徑;不要輸入 `G:\...\AI_Public_Squares` 或任何含 `...` 的省略寫法。 | `G:\我的雲端硬碟\AI_Public_Squares` |
| `project` | 這次協作項目的短代號。只用英文小寫、數字、底線;不要用中文或空格。第一次測試可用新的測試名。 | `aps_uat` |
| `agent-id` | 你這邊 AI 的名稱。可先用通用值,也可改成自己的短名。 | `agent_a` |
| `other-agent-id` | 對方那邊 AI 的名稱。對方設置時會和你的 `agent-id` 對調。 | `agent_b` |

若只是單機試跑,可先用一個本機測試資料夾做 `hub-root`;若要和協作夥伴真正跨機試用,必須使用雙方都可同步到的 Google Drive 共享資料夾。

進階用法:若由 AI 或腳本代為執行,仍可使用非互動命令:

```
npx aps init --hub-root "[你的 AI_Public_Squares 共享資料夾實際路徑]" --project [項目代號] --agent-id [你的 agent id] --other-agent-id [對方 agent id] --role A
```

方括號與 `...` 只是 placeholder,不可照抄。CLI 會在執行前攔截這類假路徑,避免出現低層 Windows `EINVAL` 錯誤。

既有 APS 項目升級時不要重新建立新 Hub。請在同一個項目資料夾執行:

```
npm install --save-dev @adamchanadam/aps@latest
npx aps upgrade
```

`npx aps upgrade` 會讀取既有 `.aps/config.json`,備份並刷新 Claude Code / Codex 的 APS skill,更新本地橋接與 Handoff Kit 註冊,然後做 Hub 預檢。它不會覆寫既有交接包、outbox、ack 或 Hub 協定檔。

> **目前狀態**:npm latest 0.2.7 pre-release 提供 `bridge-pack`、互動式 `init` 技能安裝器、既有項目 `upgrade`、初始 Hub skeleton 生成器,預設支援 Claude Code 與 Codex。CLI 已有最小 `publish` / `inbox` / `consume` / `close` 指令,並支援 `revise` / `withdraw` / `doctor` / `config`、`publish --body-file` 與 `revise --body-file`;本機互動式設定回歸已通過,並沿用一次維護者真實 Google Drive 跨機往返驗證作為協定證據。設置一次後可用短命令作備用。日常主路徑仍應是在 AI 工具輸入自然語言,例如「教我用 APS」或「check Hub」。這仍未等同完整自然語言日常操作或補救流程已產品化。完整可用之前,請把本頁視為前期測試說明,不要用於不可中斷的重要流程。

---

## 安裝前置事項

本工具有兩項先決條件,須先完成。

### 第一項 — 安裝 Agent Handoff Kit(治理基礎)

本 repo 與 Agent Handoff Kit 互相配合。Agent Handoff Kit 提供基本的交接、紀錄、健康檢查機制;APS 在此基礎上加入跨機協作的功能。

**未先安裝 Agent Handoff Kit,APS 的檔案結構將無法獨立運作。**

前往 [Agent Handoff Kit GitHub 儲存庫](https://github.com/Adamchanadam/agent-handoff-kit),依其指引安裝。一條命令即可;命令列印寫入計劃後,檢查路徑無誤,再輸入 `yes` 確認寫入:

```
npx --yes @adamchanadam/agent-handoff-kit@latest init
```

### 第二項 — 基本前提

- 電腦需安裝 Google Drive 桌面版(前往 https://www.google.com/drive/download/ 下載),登入之後將共享資料夾設為「離線存取」
- 電腦需安裝 Claude Code(前往 https://claude.com/code 下載)或 Codex
- 與你的協作夥伴之間能透過 WhatsApp 通訊

以上任何一項尚未完成?各個官方網頁均有逐步指引。先安裝完成,再回來執行下列命令。

---

## 目前可以怎樣試

npm latest 0.2.7 pre-release 仍屬前期測試版本,但已可用 CLI 跑完整互動式設置、既有項目升級、最小往返、修訂、撤回、只讀診斷與短命令日用流程。你可以做三件事:

1. 閱讀本 repo,理解 APS 想解決的跨機協作問題。
2. 參考下方「想深入了解」中的設置教學,照 0.2.7 CLI 主路徑完成首次設置。
3. 先執行 `npm install --save-dev @adamchanadam/aps@latest`,再用 `npx aps init` 由工具逐步問你 Hub 路徑、項目代號、雙方 agent id 與角色。互動式設定會解釋每個值的用途;Hub 路徑指你電腦上 Google Drive 同步出來的 `AI_Public_Squares` 資料夾完整路徑。工具列出寫入計劃後,你輸入 `yes` 才建立 skill、Hub skeleton、Bridge Pack、starter pack 與本地設定。

目前可用路徑是:使用者在自己的項目資料夾內先安裝 npm 套件,再執行 `npx aps init`。工具會用問答方式收集必要資料、拒絕明顯 placeholder、列出計劃,並在你輸入 `yes` 後把 APS 技能安裝到 Claude Code / Codex,建立 Hub skeleton、Bridge Pack、starter pack 與本地 `.aps/config.json` 設定。它亦會在 `dev/RULE_PACKS.md` 與 `dev/PROJECT_INDEX.md` 加入可移除的 APS managed registration,讓新 AI session 按 Agent Handoff Kit 啟動讀序後,可在你提到 APS / `check Hub` / 同步問題時載入 APS 橋接規則。設置完成後,日常主路徑應是你向 AI 說自然語言,由 AI 讀取本地設定、替你跑健康檢查、收件、整理上下文、發測試交接包、把 starter pack 傳給對方,或開始日常收發;命令列只作可驗證備用路徑。自然語言日常體驗仍在打磨中:
   - 「幫我將當前任務整理成 APS 交接包給對方」 → AI 自動讀設定、檢查 Hub、整理上下文、補齊交接欄位、做完整性預檢,交給你確認後才發佈交接包,並生成可直接複製貼上的 WhatsApp / Email 通知供你發送
   - 「對方嗰邊有冇新嘢?」 → 工具自動從共享資料夾擷取對方的檔案,列出待辦
   - 「這個交接資料不足」 → AI 主動列出缺漏,生成補交需求包,並生成可直接複製貼上的通知請對方補交
   - 「這個交接和我理解不一致」 → 工具先停工,整理差異,再生成共識確認包與通知文字給對方
   - 「Google Drive 同步唔到」 → 工具偵測問題並提出修復方法

上述日常流程的底層 CLI 已有最小測試路徑,並已跑過一次維護者真實跨機 Google Drive 往返驗證;但尚未完整包成技能內的自然語言日常操作,目前仍不可視為可生產使用功能。APS 目前也不是自動通知服務:發送方 AI 寫入交接後,接收方 AI 不會自動彈出提示;人類仍需用現有渠道簡短通知對方「check Hub」。APS 的增值在於通知之後,對方 AI 可直接讀到結構化上下文、共同目標、各自任務邊界、交叉協作點、任務需求、版本與已讀狀態,不用人類重新搬運整段背景。

0.2.x 仍以「自己 + 對方」二人通道作主路徑。近期產品方向已收斂為 Reliable Pair first：先完成可靠二人交接、補交、共識確認、回覆、收結與 UAT。未列入本頁現有能力的事,不可視為已支援功能。

---

## 為何需要此工具

兩個人(可能是朋友、同事,或是隔著一個太平洋的協作夥伴)共同完成的工作 — 品牌指引、廣告文案、設計系統、報告 — 常見的痛點:

- **搬運檔案的工夫** — 每次更新都要透過 WhatsApp 通知,Google Drive 的資料夾一邊更新一邊覆蓋
- **解釋上下文的工夫** — 協作夥伴開啟新 AI 對話時,須重新交代「上次討論到哪裡」
- **同步衝突** — 雙方同時儲存,Google Drive 產生「(conflict)」副本,無法判斷哪一份是最新版
- **每次往返均須重做** — 對方回覆之後又要重複一遍,搬運檔案、解釋背景、再次經歷整個流程

本工具的構想:**Google Drive 上一個共享資料夾,加上一套寫入規矩 = 雙方電腦的 AI 在檢查 Hub 時可讀懂對方進度**;交接內容、共同目標、各自任務邊界、上下文、版本與已讀狀態集中留痕;衝突由結構性避免。它不假設兩邊 AI 正在做同一件事,只要求每次交接講清楚共同交叉點與需要對方完成的事。沒有伺服器,沒有額外的雲端帳號,沒有自動推送通知(刻意如此設計 — 由使用者決定何時被打斷,而非由 AI 主動發送提示)。

---

## 想深入了解

下列分三層。新用戶只需要讀前兩項;維護者規格與 `.md` 真源不是安裝起步材料。

公眾入口(HTML,GitHub Pages hosted):

- [入口頁](https://adamchanadam.github.io/ai-public-squares/docs/index.html) — 由零認知讀者起步的項目簡介
- [教學中心](https://adamchanadam.github.io/ai-public-squares/docs/guides/index.html) — 按情景選擇教學
- [第一次安裝與測試](https://adamchanadam.github.io/ai-public-squares/docs/guides/aps-onboarding-walkthrough.html) — 非技術用戶跟著完成首次設置與測試

維護者入口(HTML,GitHub Pages hosted):

- [維護者規格](https://adamchanadam.github.io/ai-public-squares/docs/maintainers/index.html) — 公開承諾邊界、QC 路由、同步真源與發佈前核對
- [分層 QC](https://adamchanadam.github.io/ai-public-squares/docs/qc/governance-map.html) — 維護者閱讀的 QC 觸發詞與檢查分層

AI / 維護者層(.md,予 AI 程式 / repo 維護者讀):

- [跨機接駁實作計劃](docs/plans/2026-05-21-aps-phase4-plan.md) — 實現跨機協作的技術步驟
- [公開產品路線](docs/plans/2026-05-28-aps-public-product-multi-agent-roadmap.md) — Reliable Pair first、單收件 packet、延後路線與無雲端 API 原則
- [協定設計理據](docs/plans/2026-05-20-agent-public-square-design.md) — 5 個設計取捨的理由
- [內部檢討文件](dev/qc/2026-05-22-zero-knowledge-funnel-audit.md) — 「本 repo 須令零認知讀者也能使用」 的檢討與修補路線

---

## License 與反饋

[Apache License 2.0](LICENSE)。本 repo 已公開,可按 Apache-2.0 條款閱讀、引用與參與改進。

遇到錯誤、想試用、或有功能建議?前往 [GitHub issues](https://github.com/Adamchanadam/ai-public-squares/issues) 留言。
