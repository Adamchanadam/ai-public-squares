# QC 觸發詞彙（分層 QC 單一真源）

> 本檔是 QC 觸發詞彙的單一真源。`docs/qc/governance-map.html` 是公開參考卡；如內容不一致,以本檔為準。
> 不可手動編輯 `AGENTS.md`（kit-managed core），所以本詞彙的啟動載入路徑經 `dev/RULE_PACKS.md` 的 routing 行：任務含觸發詞即載入本檔。

## 設計意圖

過往「全套 QC / 完整 QC / 跑驗收 / 整體 audit」此類含混詞,容易令人類與 AI 對驗收範圍理解不一致,每次都要重新列明範圍。三級觸發詞彙解決三件事：

1. **範圍明確** — 每個級別的覆蓋、時間、驗收、失敗處理均須明確列出
2. **嵌套自動** — 較高級別自動包含較低級別,不可在較高級別下省略較低級別
3. **反問規矩** — 含混詞觸發停手反問,AI 不可憑感覺解讀範圍

此套詞彙**不重複定義**既有 QC 機制（kit doctor / rule packs / plan acceptance / APS startup registration / Bridge Pack runtime / tool self-check / 五區段紀律），只將它們收口成三個觸發入口。

## 三 tier 速覽

| Tier | 觸發 keyword | 時機 | 時間預算 |
|---|---|---|---|
| 🟢 快檢 | `跑快檢` / `quick-check` / `qa-gate` | session 收工前 / commit 之前 | < 2 分鐘 |
| 🟡 外發前檢 | `跑外發前檢` / `release-check` / `handover-verify` | 推送遠端 / 分享計劃 / 跨工作目錄傳檔之前 | 5-10 分鐘 |
| 🔴 全面檢 | `跑全面檢` / `full-check` / `full-audit` | 跨機往返測試 / PROTOCOL.md 改版 / 治理工具重大升級之前 | 30+ 分鐘 |

---

## 🟢 快檢

**別名**：`跑快檢` / `quick-check` / `qa-gate`

**時機**：
- 每個 session 收工前
- 五區段執行完之後的基線驗證
- commit / amend 之前

**覆蓋**（4 項）：
1. `npx @adamchanadam/agent-handoff-kit doctor` 報 `status: passed`
2. `git status` 與 `dev/SESSION_HANDOFF.md` Workspace Identity 的 commit / uncommitted 敘述一致
3. 當次 session 內所有 plan / 五區段的 grep acceptance test 全部命中
4. 如有 `tools/*.ps1` 改動：`[scriptblock]::Create((Get-Content tools/*.ps1 -Raw))` parse-check + `-DryRun` against demo workspace（驗 idempotency-skip path）

**驗收**：四項全部通過。任何一條失敗,不可宣稱 session 完成。

**時間**：< 2 分鐘

**失敗處理**：修正源頭、重跑；不可只以「仍有手尾」帶過。

---

## 🟡 外發前檢

**別名**：`跑外發前檢` / `release-check` / `handover-verify`

**時機**：
- 將 commit push remote 之前
- 將教學頁、維護者頁、QC 卡片或 release note 分享予外部持份者之前
- 將 Bridge Pack、starter pack、或任何 APS 設置 / 交接指引經 WhatsApp / Drive / Email 傳予協作夥伴之前
- 任何「物件離開本工作目錄」之前

**覆蓋**：快檢 4 項全部 + 8 項：
1. **跨工作目錄佔位符審核** — 確認任何示例值（demo workspace 的 slug、舊 project 名、specific 路徑、specific person name）不出現在通用 user-facing prompt / template 的 default 位置。Grep 找出命中後逐項判斷為 A-class（明確標示為示例 / 歷史 / fixture,可保留）或 B-class（滑入 default position,須改為 placeholder）。例：本 repo 的 MVP 試演曾使用 demo slug `mpedu_plus_branding`,跑 `grep -i mpedu` 應全部命中於 A-class 歷史 doc（MVP plan / verification / SESSION_LOG）或 example-labeled 段落,並在 README、public HTML、CLI prompt、starter pack、skill runtime、protocol templates 等 active template surface 零 B-class 命中。
2. **跨面交叉閱讀** — README ↔ `docs/index.html` ↔ `docs/guides/index.html` ↔ walkthrough ↔ maintainer HTML ↔ skill spec ↔ CLI output 對同一 procedure 的敘述一致；單一規則只留在 SSOT,其他位置只作引用或鏡像。
3. **HTML preview 視覺確認** — 入口頁 / 教學中心 / walkthrough / maintainer page / governance-map 經瀏覽器 render clean；若 walkthrough 含 SVG 流程圖或能力清單,須確認可見、可讀、無遮擋、無 console error。
4. **PII / secrets sweep** — `grep -iE "api[_-]?key|password|token|secret|credential"` 各 user-facing doc + tool，預期 0 命中
5. **語氣與用語紀律** — 內部 codes（`Block 4*` / `Bridge Pack` / `round-trip` / `PROTOCOL.md`）不可作為句子主體；中英並用的 user-facing string 須一致；公開通用面不得把 specific person name 當成 hardcoded default,只可作明確示例、fixture 名或歷史證據。
6. **新安裝與升級路徑檢查** — 若 npm package 內 `skills/aps/**`、CLI 或 setup wording 有變,外發前檢必須同時驗證兩條路徑:新安裝可用 `npm install --save-dev @adamchanadam/aps@latest` + `npx aps init`;既有項目可用 `npm install --save-dev @adamchanadam/aps@latest` + `npx aps upgrade` 備份並刷新 skill、更新橋接與註冊、保留既有 packet / outbox / ack / Hub 協定檔。測試未發布候選版時,還要核對 UAT 的 `npx aps --help` / `doctor` 是否實際顯示候選版本;若仍讀 npm latest,必須先安裝本地 package 或改用本地 CLI 路徑。只「skip existing skill」不可通過。
7. **交接命名與品牌版本分流檢查** — 掃描 `bin/aps.js`、`skills/aps/**`、README / public docs 是否把 APS packet 與 Agent Handoff Kit session handoff 混稱。用戶只說「交接包」時必須有澄清路由;APS 新 packet 預設 level / topic 不得使用會誤導為 session handoff 的名稱。APS skill 不得輸出 Agent Handoff Kit 啟動卡,不得把 `APS Hub doctor v<版本>` 當作 Agent Handoff Kit 版本。舊資料相容可保留,但新預設不可繼續漂移。
8. **雲端支援與產品路線邊界檢查** — 公開文檔、CLI prompt、skill wording 必須一致:已驗證主路徑是 Google Drive,但不固定磁碟機代號;Dropbox / OneDrive / 其他同步資料夾只可列為未正式驗證的實驗路徑,不得由 AI 主動推薦為正式支援。核心設置不得要求 Google Drive API、Dropbox API、OneDrive API、OAuth app、API key 或雲端開發者專案。近期主線是 Reliable Pair first;Contacts selector / 選對方體驗已延後,不屬 0.2.7 目標。真正多人平台、`_notify`、`aps watch`、桌面通知、平台排程與自動檢查屬延後路線,未完成實作與 QC 前不可寫成 0.2.x 已支援。

**驗收**：快檢 + 上 8 項全部通過。任何一項失敗,handover 不可進行。

**時間**：5-10 分鐘

**失敗處理**：先修正源頭再重跑全套；失敗當刻停止 handover。

---

## 🔴 全面檢

**別名**：`跑全面檢` / `full-check` / `full-audit`

**時機**：
- 跨機真實往返測試之前
- APS PROTOCOL.md v1.0 → v1.1 之前
- 引入第三個 agent（N-party）之前
- 治理 kit major upgrade（例 v0.1.x → v0.2.x）之前
- 連續多輪 session 後想 reset audit baseline
- 用戶明示「跑全面檢」

**覆蓋**：外發前檢 12 項全部 + 6 項人工 / 跨工作目錄項：

1. **Class-C 跨工作目錄審核** — Hub `_hub/PROTOCOL.md` + 兩個 demo packs（`Demo_Agent_{Adam,Jay}_Public_Squares/dev/rules/aps-bridge.md`）的 procedural sections placeholder check。每個 audit 在 owning workspace 的 own session 跑（per AGENTS.md §2 active-project-root rule）；本 session 只收集結果。
2. **協定往返流程回歸測試** — 跑一次同機或隔離 workspace 模擬 setup → doctor → publish → inbox → consume → reply / revise → close / withdraw,確認協定行為無 regression。
3. **啟動可發現性與橋接行為 trace** — 驗證 `aps init` 寫入 Handoff Kit APS route、project-index registration、Bridge Pack、本地 config 後,新 session 可按 `AGENTS.md` 啟動讀序發現 APS；協定或 setup 改版尤其要做。
4. **五區段 + 自審紀律回顧** — 回看 last N 個 session 的自審紀錄；統計「caught vs missed」gap 比例；檢查是否存在系統性盲點。
5. **審核報告輸出** — 寫一份 markdown 於 `dev/qc/<YYYY-MM-DD>-full-audit.md`,含：健康結論 / 阻擋項 / cross-workspace 註記 / 重跑計劃。
6. **Spec-to-runtime 執行落差審核** — 對照 UAT / 實際 AI 行為、`skills/aps/SKILL.md`、bundled reference、CLI help / output。凡規格說「AI 應先讀設定 / 不應重做設置 / 不應 consume / 應先總覽 / 不應顯示 Agent Handoff Kit 啟動卡 / 發包前須確認內容、topic 與寫入行為 / 長正文須使用 `--body-file` 或等效安全輸入」,必須有實際入口或測試證據可觸發;若只停留在文案而已安裝 runtime 仍可能讀舊 skill,列為失敗。

### APS 全面檢三條主線與橫切保障

對 AI Public Squares 而言,🔴 全面檢不可只理解為「跑更多命令」。每次全面檢必須把上面 18 項歸入三條主線,並在審核報告逐項標示為「通過」「失敗」「受阻」或「接受風險」。橫切保障不是第四條主線,而是三條主線都必須覆蓋的防漏線：

1. **公開承諾一致性** — README / `docs/index.html` / `docs/guides/index.html` / walkthrough / maintainer page / `docs/qc/governance-map.html` / CLI help / skill spec 對「目前可用」「正在硬化」「目標體驗」「手動替代路徑」「npm publish 狀態」之描述一致。不得把未發佈或未實作能力寫成已可用。
2. **發佈前可信度** — 任何會離開本工作目錄的內容(README、GitHub Pages、npm package、Bridge Pack、starter pack、walkthrough、QC 卡片、維護者頁)須可被外部讀者理解並按當前狀態操作。若 npm registry、Pages live、GitHub repo 狀態未能核實,必須標為「受阻」或「未核實」,不可憑記憶通過。
3. **協定實際運行正確性** — Hub `_hub/PROTOCOL.md`、Bridge Pack fixture、runtime workspace、outbox、ack、single-writer lane、packet version、startup pending 計算、revise / withdraw / close 行為、Handoff Kit APS route registration、project-index registration 須以實際操作記錄或對應工作目錄證據驗證。
橫切保障:

- **Handoff Kit 啟動可發現性** — APS 不可只寫 `dev/rules/aps-bridge.md` 與 `.aps/config.json`。全面檢須驗證 `aps init` 已在 `dev/RULE_PACKS.md` 註冊 APS route,並在 `dev/PROJECT_INDEX.md` 記錄 APS local bridge / config,令新 session 按 Agent Handoff Kit 啟動讀序後,可在用戶提到 APS / check Hub / Drive sync / conflict 時載入 APS。不得手改 `AGENTS.md` managed core。
- **新手 UX 主路徑** — 公眾教學、README、CLI next-step 與 skill spec 不可把 `npx aps publish` / `npx aps inbox` 等命令列當成非技術新手的日常主入口。主路徑必須是用戶向 AI 說自然語言,由 AI 讀設定、跑命令、整理上下文與解釋結果;命令列只可作可驗證備用、排錯或維護者路徑。
- **新手宏觀理解與能力邊界** — walkthrough 必須在操作步驟前讓新手先理解 APS 如何運作、已具備甚麼、仍在硬化甚麼、刻意不做甚麼。若使用 SVG 流程圖或能力清單,全面檢須核對圖中流程與文字、CLI、skill、QC 真源一致,不得用視覺圖誇大自動化能力。
- **一語交接自動化** — 日常發佈主體驗必須支援「幫我將當前任務整理成 APS 交接包給對方」這類一句指令。AI 應自動讀 `.aps/config.json`、跑 `doctor`、整理當前任務、補齊交接欄位、生成 topic、做完整性預檢,交給用戶 A 確認後才發佈 packet,再輸出 copy-ready WhatsApp / Email 通知。只有敏感資料、共同目標不清、或對方任務未知且會影響下一步時,才可停下反問。
- **發送前完整性預檢** — 任何 APS 交接包寫入 Google Drive 前,AI 必須檢查共同目標、本方任務、對方任務或「未確認」、交叉點、請對方做的事、不應誤解的事、證據位置、風險 / 未決事項、敏感資料。缺漏時先從上下文補足;補不到才問用戶。未經用戶 A 確認完整 / 正確前不可 publish。
- **收件後完整性預檢** — 用戶 B / Agent B 收到交接包後,AI 必須先檢查資料是否足夠回應。若共同目標、任務邊界、請 B 做的事、證據位置、版本或必要背景不足,AI 要主動提醒用戶 B,整理缺漏,發出補交需求包,生成 copy-ready 通知請用戶 A / Agent A 補交;原交接不得在補交前 close。預設不得 consume 不完整原交接;若用戶 B 明確要求標記已讀,ack result 必須寫「已讀,等待補充資料」並提醒原交接不會再以 pending 形式出現。A 補交時優先 revise 原 packet;不適合 revise 時才另發 supplemental packet。
- **通知邊界誠實性** — APS 目前不是自動推送通知服務。公開文檔與 skill spec 必須說清楚:發送方 AI 寫入交接後,接收方 AI 不會自動彈出提示;AI 必須生成可直接複製貼上的 WhatsApp / Email 通知,由人類貼到現有渠道請對方「check Hub」。APS 的增值是對方 AI 檢查 Hub 後可讀到結構化上下文、任務需求、版本與已讀狀態。
- **Drive 同步邊界** — 發包成功只代表本機 Hub 已寫入,不可暗示對方電腦已即時同步完成。通知與補救流程必須提示:若對方未見,先等待 / 檢查 Google Drive 同步並重試 `check Hub`,不要立即重複發包。
- **共同目標與任務邊界** — 公眾教學與 skill spec 不可假設兩邊 agent 正在做同一任務。交接包必須能表達共同目標、本方任務、對方任務或「未確認」、交叉協作點、請對方做的事、不應誤解的事、證據位置。若兩邊 brief 可能矛盾,AI 應標示為需要確認,不可強行合併成一致目標。
- **共識確認回路** — 若收件時發現任務要求、共同目標、檔案版本或本方理解不一致,AI 不可單向吸收 prompt 後直接開工。必須先停工,整理差異,發出共識確認包,生成可複製貼上的通知,等待對方回覆或修訂後才繼續;原交接不得在共識未成立前 close。
- **新安裝與版本升級落地** — 外發版本若改動 `skills/aps/**`、CLI 或 setup wording,全面檢須驗證新安裝與既有項目升級兩條路徑。新裝可取得新 skill;既有項目可透過 `npx aps upgrade` 讀現有設定、備份舊 skill、刷新新 skill、更新本地橋接與 Handoff Kit 註冊,並保留既有 Hub 交接資料。若 AI 工具需重啟才讀新 skill,輸出必須明確提示。
- **交接語義防混淆** — 全面檢須用至少三條 prompt 驗證路由:「收工」走 Agent Handoff Kit 會話交接;「幫我做 APS 交接包給 Jay」走 APS packet;只說「幫我做交接包」必須先澄清,不得直接寫任何檔案或 Hub packet。
- **品牌與版本防混淆** — APS 全面檢須驗證 AI 實際回覆不會把 APS CLI 版本顯示成 Agent Handoff Kit 版本,亦不會在 APS skill 回覆內輸出 Agent Handoff Kit 啟動卡。若要提版本,APS CLI 與 Agent Handoff Kit 必須分開核實與分開顯示。
- **長正文發包安全** — 正式交接、長正文、多行摘要、表格或含引號 / 特殊符號的正文,必須使用 `--body-file` 或等效安全輸入;不得把整段 packet body 直接塞進一條多行 shell 引號命令。
- **Reliable Pair 與延後路線防誇大** — 近期主線是 Reliable Pair first:先完成可靠二人交接、升級、發送前確認、收件總覽、補交 / 共識確認與 UAT。Contacts selector / 選對方體驗、真正多人平台、`_notify`、`aps watch`、桌面通知、OS 排程、AI 平台自動任務、Dropbox / OneDrive 正式支援均屬延後路線,未有實作與 QC 證據前不可對外寫成已支援。群組只是發送別名,不等於可寫 lane;核心設置不得改為要求雲端儲存 API、OAuth 或雲端開發者設定。

### 主要使用流程走通

每次全面檢須至少覆蓋下列流程；若某流程因尚未 publish / 未具備對方機 / 無 Drive Hub 而不能跑,報告中須列為「受阻」並寫明缺少甚麼證據：

1. **零認知讀者入口流程** — 由 `README.md` → `docs/index.html` → `docs/guides/index.html` → walkthrough,讀者能分清「目前可試」「正在硬化」「目標體驗」；walkthrough 的宏觀流程圖與能力清單須幫讀者先理解 APS 價值,而不是直接跳入命令。
2. **手動設置與版本升級流程** — 新安裝按 walkthrough 由前置事項 → 工作目錄 → Agent Handoff Kit → `npx aps init` → Handoff Kit APS route / project-index registration → `doctor` → 首次 packet;既有項目升級按 `npm install --save-dev @adamchanadam/aps@latest` → `npx aps upgrade` → `doctor` → 重啟 AI 工具。每一步不依賴不存在的 npm package、私有本機路徑或手改 `AGENTS.md`,升級不可覆寫既有 Hub 交接資料。
3. **日常協作流程** — one-sentence handoff request → AI reads config / runs doctor / packages common goal / own task / counterpart task / crossing point / requested action / evidence → completeness preflight → user A confirms → AI publishes packet → AI generates copy-ready WhatsApp / Email notification → human pastes notification → receiver says check Hub → receiver-side completeness preflight → if complete and aligned,ack / consume → reply / close; if incomplete,missing-info packet → user A / Agent A supplements; if not aligned,alignment-check packet → counterpart confirmation / revise / withdraw → continue only after consensus,在 CLI、Bridge Pack、skill spec、README、public docs 與 walkthrough 中可追蹤同一條邏輯。命令列流程只可作備用驗證路徑。
4. **出錯補救流程** — Drive 同步延遲、conflict、wrong-lane、packet 格式錯誤、版本不對齊、啟動找不到 APS route、設定指向舊 project、對方看不到 packet,每項有偵測、停手、用戶確認、修復或升級路徑。

**驗收**：外發前檢 + 上列主要流程全部 cleared,且審核報告已 commit。任何「阻擋」項目未解決即不可放行。

**時間**：30+ 分鐘（跨工作目錄部分要分開幾個 session；審核報告一次過寫）

**失敗處理**：每個阻擋項目逐條列出；不可只以「仍有待辦」一句帶過。

---

## 嵌套規矩

三 tier 嚴格嵌套：

- 跑外發前檢 **必自動跑** 快檢 4 項先
- 跑全面檢 **必自動跑** 外發前檢（即連 inner 快檢 都跑埋）

AI 不可在較高級別觸發後省略較低級別。

---

## 反問規矩

當用戶用以下含混詞，AI **必須停手反問**「你指快檢 / 外發前檢 / 全面檢?」，不可憑感覺解讀範圍：

| 含混詞 | 對應動作 |
|---|---|
| `全套 QC` | 反問 |
| `完整 QC` | 反問 |
| `做 QC` | 反問 |
| `跑驗收` | 反問 |
| `Audit` / `整體 audit` | 反問 |
| `QC`（單字） | 反問 |

未列於以上清單的含混表達，按字面 + context 解；如仍有 ambiguity 寧反問。

---

## 典型用法

- **🟢 快檢**：commit 前 spot-check；session 五區段執行完之後的基線驗證；改完 doc 試 anchor 不斷
- **🟡 外發前檢**：push remote 之前；傳 Bridge Pack / starter pack / 設置指引予協作夥伴之前；新教學頁或維護者頁分享予外人之前
- **🔴 全面檢**：跨機 round-trip 落地之前；協定升版之前；引入新 agent 之前；連跑 N 個 session 後重置 baseline

---

## 既有 mechanism mapping

此套詞彙**不重複定義**既有機制；下列機制各自的單一真源不變,本表只說明「哪個機制觸發於哪個級別」：

| 機制 | 單一真源位置 | 觸發級別 |
|---|---|---|
| Agent Handoff Kit doctor | `npx @adamchanadam/agent-handoff-kit doctor` 命令 | 🟢 |
| 8 條 rule packs | `dev/rules/*.md` | per-task signal（orthogonal to tier） |
| Plan-level acceptance | `docs/plans/*.md` 各 task Acceptance 段 | 🟢 / 🟡 視 scope |
| APS Handoff Kit route registration | `aps init` 寫入 runtime workspace 的 `dev/RULE_PACKS.md` managed block + `dev/PROJECT_INDEX.md` APS installed skill block | 🔴 |
| Bridge Pack runtime addendum | runtime workspace 的 `dev/rules/aps-bridge.md` | runtime auto,不屬 tier |
| Tool inline self-check | `tools/aps-onboard.ps1` 的 parse / DryRun / idempotency / Set-IdentityField 替換驗證 | 🟢 |
| 五區段 + 自審紀律 | `CLAUDE.md` §3 §11 §12 + per-session `dev/SESSION_LOG.md` | 🟢（per-session 跑）/ 🔴（retrospective） |

---

## 單一真源說明

本檔（`dev/qc/triggers.md`）是 QC 觸發詞彙的單一真源。`docs/qc/governance-map.html` 是公開參考卡,內容必須與本檔對齊。任何觸發詞、級別定義、覆蓋範圍的改動,先改本檔,再同步 HTML 卡片。

## File history

- 2026-05-21（S6, same day）：初版建立。基於 `file:///C:/Users/adam/_claude_desktop/_Prompt_Template/ai-session-governance_v2_WORK/docs/GOVERNANCE_MAP.html` 的 vocabulary pattern,再按 APS context 重新 mapping（無 npm publish / 無 CI / 無 remote git）。
