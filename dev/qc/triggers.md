# QC 觸發詞彙（分層 QC SSOT）

> 呢個檔係 QC trigger vocabulary 嘅 canonical 真源。`docs/qc/governance-map.html` 係 reference card；如內容 drift，本 SSOT 文件 wins。
> 不可手 edit `AGENTS.md`（kit-managed core），所以本 vocabulary 嘅 startup-load 路徑經 `dev/RULE_PACKS.md` 嘅 routing 行：任務含 trigger keyword 即 load 本檔。

## 設計意圖

過往「全套 QC / 完整 QC / 跑驗收 / 整體 audit」呢類含混詞令人類同 AI 對驗收 scope 嘅理解漂移，每次都要重新 enumerate。三 tier vocabulary 解決三件事：

1. **Explicit scope** — 每個 tier 嘅覆蓋、時間、驗收、失敗處理 全部 spec 死
2. **嵌套自動** — outer tier 自動 cover inner，唔可以喺 outer trigger 之下 skip inner
3. **反問規矩** — 含混詞觸發停手反問，AI 唔可以憑感覺解讀 scope

呢套 vocabulary **唔重複定義**既有 6 層 QC mechanism（kit doctor / rule packs / plan acceptance / Bridge Pack runtime / tool self-check / 五區段紀律），只係將佢哋 wrap 成三個 trigger entry point。

## 三 tier 速覽

| Tier | 觸發 keyword | 時機 | 時間預算 |
|---|---|---|---|
| 🟢 快檢 | `跑快檢` / `quick-check` / `qa-gate` | session 收工前 / commit 之前 | < 2 分鐘 |
| 🟡 外發前檢 | `跑外發前檢` / `release-check` / `handover-verify` | push remote / 分享 plan / 跨 workspace 傳檔之前 | 5-10 分鐘 |
| 🔴 全面檢 | `跑全面檢` / `full-check` / `full-audit` | 跨機 round-trip / PROTOCOL.md 改版 / kit major upgrade 之前 | 30+ 分鐘 |

---

## 🟢 快檢

**別名**：`跑快檢` / `quick-check` / `qa-gate`

**時機**：
- 每個 session 收工前
- 五區段執行完之後嘅 baseline 驗證
- commit / amend 之前

**覆蓋**（4 項）：
1. `npx @adamchanadam/agent-handoff-kit doctor` 報 `status: passed`（當前 baseline 係 35/35 全 ok）
2. `git status` 同 `dev/SESSION_HANDOFF.md` Workspace Identity 嘅 commit / uncommitted 敘述一致
3. 當次 session 內所有 plan / 五區段嘅 grep acceptance test 全部命中
4. 如有 `tools/*.ps1` 改動：`[scriptblock]::Create((Get-Content tools/*.ps1 -Raw))` parse-check + `-DryRun` against demo workspace（驗 idempotency-skip path）

**驗收**：四項全部過。任何一條 fail，唔可宣稱 session 完成。

**時間**：< 2 分鐘

**失敗處理**：修源、重跑；唔可摺埋成「仲有手尾」。

---

## 🟡 外發前檢

**別名**：`跑外發前檢` / `release-check` / `handover-verify`

**時機**：
- 將 commit push remote 之前
- 將 Phase 4 plan / 教學頁分享俾外部 stakeholder 之前
- 將 Bridge Pack patch 經 WhatsApp / Drive 傳俾 Jay 之前
- 任何「物件離開呢個 workspace」之前

**覆蓋**：快檢 4 項全部 + 5 項：
1. **跨工作目錄 placeholder audit** — `grep -i mpedu` 確認 demo slug 唔出現喺非示例 user-facing prompt / template；如有命中要 confirm 屬 A-class（明標示例）or B-class（要 placeholder 化）
2. **三處 cross-read** — Phase 4 plan ↔ 教學頁 ↔ Bridge Pack spec 對同一 procedure 嘅敘述一致（single source of spec，其他位 only reference）
3. **HTML preview 視覺確認** — 教學頁 / governance-map / index 經 Launch preview panel render clean
4. **PII / secrets sweep** — `grep -iE "api[_-]?key|password|token|secret|credential"` 各 user-facing doc + tool，預期 0 命中
5. **Voice / terminology discipline** — 內部 codes（`Block 4*` / `Bridge Pack` / `round-trip` / `PROTOCOL.md`）唔做 sentence subject；中英並用嘅 user-facing string 一致

**驗收**：快檢 + 上 5 項全部過。任何一項 fail，handover 唔可進行。

**時間**：5-10 分鐘

**失敗處理**：先修源再重跑全套；fail 嗰刻 stop handover。

---

## 🔴 全面檢

**別名**：`跑全面檢` / `full-check` / `full-audit`

**時機**：
- 跨機真實 round-trip（Phase 4 Block 4C）之前
- APS PROTOCOL.md v1.0 → v1.1 之前
- 引入第三個 agent（N-party）之前
- 治理 kit major upgrade（例 v0.1.x → v0.2.x）之前
- 連續多輪 session 後想 reset audit baseline
- 用戶明示「跑全面檢」

**覆蓋**：外發前檢 9 項全部 + 5 項人工 / 跨 workspace 項：

1. **Class-C 跨 workspace audit** — Hub `_hub/PROTOCOL.md` + 兩個 demo packs（`Demo_Agent_{Adam,Jay}_Public_Squares/dev/rules/aps-bridge.md`）嘅 procedural sections placeholder check。每個 audit 喺 owning workspace 嘅 own session 跑（per AGENTS.md §2 active-project-root rule）；本 session 只收集結果。
2. **MVP-style round-trip regression** — 跑一次同機模擬 publish → consume → close 確認協定行為冇 regression（建議用 demo Adam ↔ demo Jay 跑）。
3. **Bridge Pack startup addendum 行為 trace** — DryRun + 對 result vs design doc 預期；協定改版尤其要做。
4. **五區段 + 自審 discipline retrospective** — 回看 last N 個 session 嘅自審紀錄；統計「caught vs missed」gap 比例；睇有冇 systematic blind spot。
5. **Audit report 輸出** — 寫一份 markdown 喺 `dev/qc/<YYYY-MM-DD>-full-audit.md`，含：健康結論 / 阻擋項 / cross-workspace 註記 / 重跑計劃。

**驗收**：外發前檢 + 上 5 項全部 cleared，且 audit report 已 commit。任何「阻擋」項目唔解決即唔可放行。

**時間**：30+ 分鐘（cross-workspace 部分要分開幾個 session；audit report 一次過寫）

**失敗處理**：每個阻擋項目逐條列；唔可摺埋成「仲有嘢做」一句話。

---

## 嵌套規矩

三 tier 嚴格嵌套：

- 跑外發前檢 **必自動跑** 快檢 4 項先
- 跑全面檢 **必自動跑** 外發前檢（即連 inner 快檢 都跑埋）

AI 唔可以喺被 outer trigger 觸發後省略 inner layer。

---

## 反問規矩

當用戶用以下含混詞，AI **必須停手反問**「你指快檢 / 外發前檢 / 全面檢?」，唔可以憑感覺解讀 scope：

| 含混詞 | 對應動作 |
|---|---|
| `全套 QC` | 反問 |
| `完整 QC` | 反問 |
| `做 QC` | 反問 |
| `跑驗收` | 反問 |
| `Audit` / `整體 audit` | 反問 |
| `QC`（單字） | 反問 |

未喺以上 list 嘅含混表達，按字面 + context 解；如仍有 ambiguity 寧反問。

---

## 典型用法

- **🟢 快檢**：commit 前 spot-check；session 五區段執行完之後嘅 baseline 驗證；改完 doc 試 anchor 唔斷
- **🟡 外發前檢**：push remote 之前；Adam 傳 Bridge Pack 俾 Jay 之前；新 Phase plan 分享俾外人之前
- **🔴 全面檢**：跨機 round-trip 落地之前；協定升版之前；引入新 agent 之前；連跑 N 個 session 後重置 baseline

---

## 既有 mechanism mapping

呢套 vocabulary **唔重複定義**既有 mechanism；下列 6 層各自 own SSOT 不變，本表只係話「邊個 mechanism 觸發喺邊個 tier」：

| Mechanism | SSOT 位 | 觸發 tier |
|---|---|---|
| Agent Handoff Kit doctor | `npx @adamchanadam/agent-handoff-kit doctor` 命令 | 🟢 |
| 8 條 rule packs | `dev/rules/*.md` | per-task signal（orthogonal to tier） |
| Plan-level acceptance | `docs/plans/*.md` 各 task Acceptance 段 | 🟢 / 🟡 視 scope |
| Bridge Pack runtime addendum | Demo / runtime workspace 嘅 `dev/rules/aps-bridge.md` | runtime auto，唔屬 tier |
| Tool inline self-check | `tools/aps-onboard.ps1` 嘅 parse / DryRun / idempotency / Set-IdentityField 替換驗證 | 🟢 |
| 五區段 + 自審紀律 | `CLAUDE.md` §3 §11 §12 + per-session `dev/SESSION_LOG.md` | 🟢（per-session 跑）/ 🔴（retrospective） |

---

## SSOT note

呢個檔（`dev/qc/triggers.md`）係 QC trigger vocabulary 嘅 canonical 真源。`docs/qc/governance-map.html` 係 reference card，內容必同呢度對齊。任何 trigger keyword、tier 定義、覆蓋範圍嘅改動，先改本檔，再 sync HTML card。

## File history

- 2026-05-21（S6, same day）：初版建立。基於 `file:///C:/Users/adam/_claude_desktop/_Prompt_Template/ai-session-governance_v2_WORK/docs/GOVERNANCE_MAP.html` 嘅 vocabulary pattern but project-specific 重新 map 到 APS context（無 npm publish / 無 CI / 無 remote git）。
