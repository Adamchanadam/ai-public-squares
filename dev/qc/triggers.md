# QC 觸發詞彙（分層 QC 單一真源）

> 本檔是 QC 觸發詞彙的單一真源。`docs/qc/governance-map.html` 是公開參考卡；如內容不一致,以本檔為準。
> 不可手動編輯 `AGENTS.md`（kit-managed core），所以本詞彙的啟動載入路徑經 `dev/RULE_PACKS.md` 的 routing 行：任務含觸發詞即載入本檔。

## 設計意圖

過往「全套 QC / 完整 QC / 跑驗收 / 整體 audit」此類含混詞,容易令人類與 AI 對驗收範圍理解不一致,每次都要重新列明範圍。三級觸發詞彙解決三件事：

1. **範圍明確** — 每個級別的覆蓋、時間、驗收、失敗處理均須明確列出
2. **嵌套自動** — 較高級別自動包含較低級別,不可在較高級別下省略較低級別
3. **反問規矩** — 含混詞觸發停手反問,AI 不可憑感覺解讀範圍

此套詞彙**不重複定義**既有 6 層 QC 機制（kit doctor / rule packs / plan acceptance / Bridge Pack runtime / tool self-check / 五區段紀律），只將它們收口成三個觸發入口。

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
- 將 Phase 4 plan / 教學頁分享予外部持份者之前
- 將 Bridge Pack patch 經 WhatsApp / Drive 傳予 Jay 之前
- 任何「物件離開本工作目錄」之前

**覆蓋**：快檢 4 項全部 + 5 項：
1. **跨工作目錄佔位符審核** — 確認任何示例值（demo workspace 的 slug、舊 project 名、specific 路徑）不出現在通用 user-facing prompt / template 的 default 位置。Grep 找出命中後逐項判斷為 A-class（明確標示為示例,可保留）或 B-class（滑入 default position,須改為 placeholder）。例：本 repo 的 MVP 試演曾使用 demo slug `mpedu_plus_branding`,跑 `grep -i mpedu` 應全部命中於 A-class 歷史 doc（MVP plan / verification / SESSION_LOG）或 example-labeled 段落,並在 active template surface（Phase 4 plan T0 default / tools .EXAMPLE / index.html Phase 4 narrative 等）零命中。
2. **三處交叉閱讀** — Phase 4 plan ↔ 教學頁 ↔ Bridge Pack spec 對同一 procedure 的敘述一致（single source of spec,其他位置只作 reference）
3. **HTML preview 視覺確認** — 教學頁 / governance-map / index 經 Launch preview panel render clean
4. **PII / secrets sweep** — `grep -iE "api[_-]?key|password|token|secret|credential"` 各 user-facing doc + tool，預期 0 命中
5. **語氣與用語紀律** — 內部 codes（`Block 4*` / `Bridge Pack` / `round-trip` / `PROTOCOL.md`）不可作為句子主體；中英並用的 user-facing string 須一致

**驗收**：快檢 + 上 5 項全部通過。任何一項失敗,handover 不可進行。

**時間**：5-10 分鐘

**失敗處理**：先修正源頭再重跑全套；失敗當刻停止 handover。

---

## 🔴 全面檢

**別名**：`跑全面檢` / `full-check` / `full-audit`

**時機**：
- 跨機真實往返測試（Phase 4 Block 4C）之前
- APS PROTOCOL.md v1.0 → v1.1 之前
- 引入第三個 agent（N-party）之前
- 治理 kit major upgrade（例 v0.1.x → v0.2.x）之前
- 連續多輪 session 後想 reset audit baseline
- 用戶明示「跑全面檢」

**覆蓋**：外發前檢 9 項全部 + 5 項人工 / 跨工作目錄項：

1. **Class-C 跨工作目錄審核** — Hub `_hub/PROTOCOL.md` + 兩個 demo packs（`Demo_Agent_{Adam,Jay}_Public_Squares/dev/rules/aps-bridge.md`）的 procedural sections placeholder check。每個 audit 在 owning workspace 的 own session 跑（per AGENTS.md §2 active-project-root rule）；本 session 只收集結果。
2. **MVP 形式往返流程回歸測試** — 跑一次同機模擬 publish → consume → close,確認協定行為無 regression（建議用 demo Adam ↔ demo Jay 跑）。
3. **Bridge Pack startup addendum 行為 trace** — DryRun + 對 result vs design doc 預期；協定改版尤其要做。
4. **五區段 + 自審紀律回顧** — 回看 last N 個 session 的自審紀錄；統計「caught vs missed」gap 比例；檢查是否存在系統性盲點。
5. **審核報告輸出** — 寫一份 markdown 於 `dev/qc/<YYYY-MM-DD>-full-audit.md`,含：健康結論 / 阻擋項 / cross-workspace 註記 / 重跑計劃。

### APS 全面檢三條主線

對 AI Public Squares 而言,🔴 全面檢不可只理解為「跑更多命令」。每次全面檢必須把上面 14 項歸入三條主線,並在審核報告逐項標示為「通過」「失敗」「受阻」或「接受風險」：

1. **公開承諾一致性** — README / `docs/index.html` / `docs/guides/index.html` / walkthrough / `docs/qc/governance-map.html` / CLI help / skill spec 對「目前可用」「目標體驗」「手動替代路徑」「npm publish 狀態」之描述一致。不得把未發佈或未實作能力寫成已可用。
2. **發佈前可信度** — 任何會離開本工作目錄的內容(README、GitHub Pages、npm package、Bridge Pack、walkthrough、QC 卡片)須可被外部讀者理解並按當前狀態操作。若 npm registry、Pages live、GitHub repo 狀態未能核實,必須標為「受阻」或「未核實」,不可憑記憶通過。
3. **協定實際運行正確性** — Hub `_hub/PROTOCOL.md`、Bridge Pack fixture、demo / runtime workspace、outbox、ack、single-writer lane、packet version、startup pending 計算、close / withdraw 行為須以實際操作記錄或對應工作目錄證據驗證。

### 主要使用流程走通

每次全面檢須至少覆蓋下列流程；若某流程因尚未 publish / 未具備對方機 / 無 Drive Hub 而不能跑,報告中須列為「受阻」並寫明缺少甚麼證據：

1. **零認知讀者入口流程** — 由 `README.md` → `docs/index.html` → `docs/guides/index.html` → walkthrough,讀者能分清「目前可試」與「目標體驗」。
2. **手動設置流程** — 按 walkthrough 由前置事項 → 工作目錄 → Bridge Pack → governance row → 首次 packet,每一步不依賴不存在的 npm package 或私有本機路徑。
3. **日常協作流程** — publish → WhatsApp 通知 → receiver check Hub → ack / consume → reply / close,在 Bridge Pack 與 walkthrough 中可追蹤同一條邏輯。
4. **出錯補救流程** — Drive 同步延遲、conflict、wrong-lane、packet 格式錯誤、版本不對齊,每項有偵測、停手、用戶確認、修復或升級路徑。

**驗收**：外發前檢 + 上 5 項全部 cleared,且審核報告已 commit。任何「阻擋」項目未解決即不可放行。

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
- **🟡 外發前檢**：push remote 之前；Adam 傳 Bridge Pack 予 Jay 之前；新 Phase plan 分享予外人之前
- **🔴 全面檢**：跨機 round-trip 落地之前；協定升版之前；引入新 agent 之前；連跑 N 個 session 後重置 baseline

---

## 既有 mechanism mapping

此套詞彙**不重複定義**既有機制；下列 6 層各自的單一真源不變,本表只說明「哪個機制觸發於哪個級別」：

| 機制 | 單一真源位置 | 觸發級別 |
|---|---|---|
| Agent Handoff Kit doctor | `npx @adamchanadam/agent-handoff-kit doctor` 命令 | 🟢 |
| 8 條 rule packs | `dev/rules/*.md` | per-task signal（orthogonal to tier） |
| Plan-level acceptance | `docs/plans/*.md` 各 task Acceptance 段 | 🟢 / 🟡 視 scope |
| Bridge Pack runtime addendum | Demo / runtime workspace 的 `dev/rules/aps-bridge.md` | runtime auto,不屬 tier |
| Tool inline self-check | `tools/aps-onboard.ps1` 的 parse / DryRun / idempotency / Set-IdentityField 替換驗證 | 🟢 |
| 五區段 + 自審紀律 | `CLAUDE.md` §3 §11 §12 + per-session `dev/SESSION_LOG.md` | 🟢（per-session 跑）/ 🔴（retrospective） |

---

## 單一真源說明

本檔（`dev/qc/triggers.md`）是 QC 觸發詞彙的單一真源。`docs/qc/governance-map.html` 是公開參考卡,內容必須與本檔對齊。任何觸發詞、級別定義、覆蓋範圍的改動,先改本檔,再同步 HTML 卡片。

## File history

- 2026-05-21（S6, same day）：初版建立。基於 `file:///C:/Users/adam/_claude_desktop/_Prompt_Template/ai-session-governance_v2_WORK/docs/GOVERNANCE_MAP.html` 的 vocabulary pattern,再按 APS context 重新 mapping（無 npm publish / 無 CI / 無 remote git）。
