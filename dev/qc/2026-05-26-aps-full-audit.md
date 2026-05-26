# APS 全面檢報告 — 0.2.0 pre-release 發佈與發布後驗證

日期：2026-05-26
範圍：`@adamchanadam/aps` 0.2.0 pre-release，發佈前保守檢查與發布後讀回
單一真源：`dev/qc/triggers.md`

## 健康結論

**結論：通過；0.2.0 pre-release 已 commit、push、tag、建立 GitHub pre-release，並已 npm publish。**

本次全面檢覆蓋 🟢 快檢、🟡 外發前檢、🔴 全面檢五項人工 / 跨工作目錄項，以及 APS 三條主線。0.2.0 pre-release 的本地包、CLI、打包內容、公開邊界、HTML 入口、同機協定回歸均已通過。

發佈程序條件已完成：release commit `47bf2d29c8bae7339730d9b655dadbf0b8da64da` 已推送；tag `v0.2.0` 已推送；GitHub release `v0.2.0` 以 pre-release 形式建立；npm registry 已確認 `@adamchanadam/aps` latest = `0.2.0`。

真實 Adam ↔ Jay 兩部機 Google Drive 傳播已於本報告建立後補跑並通過。Adam 在真實 Drive Hub 建立 `aps_real_drive_check` 測試項目與 packet `20260526T173931Z__drive_sync_check`；Jay 在自己電腦讀取後回覆 packet `20260526T175057Z__drive_sync_reply`；Adam 這邊讀回 Jay outbox、reply packet、Jay ack，並完成 Adam consume + 雙方 close。最後 Adam / Jay inbox 均回報 no pending。

## 三條主線

| 主線 | 狀態 | 證據 |
|---|---|---|
| 公開承諾一致性 | 通過 | README、`docs/index.html`、教學中心、walkthrough、QC 卡片、CLI help、skill spec 均區分 0.2.0 pre-release 可用能力與仍未產品化的自然語言日常操作 / 補救流程。 |
| 發佈前可信度 | 通過 | `npm pack --dry-run --json` 顯示 14 個預期檔案；發布後 npm registry、GitHub release、GitHub Pages、正式安裝路徑均已讀回。 |
| 協定實際運行正確性 | 通過 | 同機回歸完成 publish → inbox → consume → reply → consume → close，最後 Adam / Jay inbox 均無 pending。真跨機 Google Drive 驗證亦完成，Adam / Jay 雙方 outbox、ack、reply packet 與 close 均可在 Adam 這部機讀回。 |

## 主要使用流程

| 流程 | 狀態 | 證據 |
|---|---|---|
| 零認知讀者入口流程 | 通過 | `README.md` → `docs/index.html` → `docs/guides/index.html` → walkthrough 均可分辨「目前可試」與「目標體驗」。 |
| 手動設置流程 | 通過 | walkthrough 以 0.2.0 pre-release 路徑為讀者入口，並明確標示仍屬前期測試。 |
| 日常協作流程 | 通過 | CLI 同機回歸已跑通 publish / inbox / consume / close；真跨機 Google Drive publish / reply / consume / close 亦已補跑通過。自然語言技能包裝仍屬下一層 UX 工作。 |
| 出錯補救流程 | 通過，附範圍邊界 | skill spec 有補救路由與敏感資料停手機制；本次未刻意製造 Drive conflict 或 wrong-lane 故障，但公開面未宣稱補救流程已經真實跨機演練。 |

## 十四項檢查結果

| 項目 | 狀態 | 結果 |
|---|---|---|
| 🟢 1. Agent Handoff Kit doctor | 通過 | 主 workspace doctor 通過 46 項；只有 SESSION_LOG N-rule 下次 closeout 警告。 |
| 🟢 2. git status 與 handoff 一致 | 通過 | 0.2.0 release commit 已推送；發布後另需提交狀態同步文件。 |
| 🟢 3. 本次 acceptance grep | 通過 | QC 主線、四條流程、`.md` hyperlink、placeholder、voice、secrets 掃描均已跑。 |
| 🟢 4. `tools/*.ps1` | 不適用 | 本次未修改 `tools/*.ps1`。 |
| 🟡 1. 跨工作目錄佔位符審核 | 通過 | 打包面 `resources/`、`examples/`、README、public HTML、skill、package、CLI 無 `mpedu_plus_branding` / MPEdu。demo workspace 身分區保留舊 slug，列 A 類 fixture 身分值。 |
| 🟡 2. 三處交叉閱讀 | 通過 | Phase 4 plan、walkthrough、Bridge Pack fixture 對協定流程一致；0.2.0 pre-release 邊界已在公開面與 skill spec 標示。 |
| 🟡 3. HTML preview | 通過 | DevTools 已截圖 `docs/index.html`、walkthrough、`docs/qc/governance-map.html`，無 console message。 |
| 🟡 4. PII / secrets sweep | 通過 | 掃描只命中安全規則文字與 `REPLACE_` placeholder，未見 credential 值。 |
| 🟡 5. 語氣與用語紀律 | 通過 | 粵語口語詞只在 quoted trigger phrases 或 voice rule 例句內；正文邊界語句保持書面語。 |
| 🔴 1. Class-C 跨工作目錄審核 | 通過 | Drive Hub PROTOCOL 可讀；Demo Adam / Demo Jay workspace doctor 均通過 46 項；demo packs 只在 Identity 區保留 fixture slug / Hub path。真 Drive Hub 測試項目 `aps_real_drive_check` 完成雙機讀寫。未修改 demo workspace。 |
| 🔴 2. MVP 形式往返流程回歸 | 通過 | `dev/qc/evidence/2026-05-26-full-check-regression-2/` 完成同機 publish → consume → reply → close；最後雙方 inbox 無 pending。 |
| 🔴 3. Bridge Pack startup addendum trace | 通過 | 回歸中 `inbox` 在 consume 前列出 pending，在 close 後對 Adam / Jay 均回報 no pending，符合 startup addendum pending 計算邏輯。 |
| 🔴 4. 五區段 + 自審紀律回顧 | 通過 | 最近 session 的錯誤模式已轉為可檢查機制：S15 修正 `local release-check` 術語漂移；S16 修正打包範例殘留；本次回歸第一次誤跑在 repo root，已即時還原誤寫並以獨立工作目錄重跑。 |
| 🔴 5. 審核報告輸出 | 通過 | 本檔已納入 0.2.0 release commit；發布後狀態同步另行提交。 |

## 命令與證據

- `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root C:\Users\adam\_claude_desktop\AI_Public_Squares`
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json`
- `git ls-remote --heads origin main`
- `git ls-remote --tags origin v0.2.0`
- `node --check bin/aps.js`
- `npm test`
- `npm pack --dry-run --json`
- `node bin/aps.js --help`
- `node bin/aps.js init --dry-run --target both`
- `node bin/aps.js init --dry-run --target claude`
- `node bin/aps.js init --dry-run --target codex`
- `node bin/aps.js bogus` returned exit 1 as expected.
- `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares`
- `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares`
- GitHub Pages post-publish readback: HTTP 200; contains `0.2.0` and pre-release boundary wording.
- GitHub release readback: `v0.2.0`, `isPrerelease=true`, `isDraft=false`, URL `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.0`.
- npm registry readback: `@adamchanadam/aps` version `0.2.0`, `latest = 0.2.0`, bin `aps`, fileCount 14.
- Published package install probe: `npm install --prefix dev/qc/evidence/install-probe-aps-0.2.0 @adamchanadam/aps@0.2.0` passed;installed `node_modules\.bin\aps.cmd --help` and `aps.cmd bridge-pack --role B` passed.
- Known npm one-off boundary: `npx @adamchanadam/aps@0.2.0 --help` remains unreliable in this Windows/npm path, so public docs continue to use the verified install-then-`npx aps` path.
- HTML screenshots: `dev/qc/evidence/2026-05-26-release-check-html/`
- 同機回歸證據：`dev/qc/evidence/2026-05-26-full-check-regression-2/`
- 真跨機 Google Drive 證據：
  - Adam packet：`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\aps_real_drive_check\from_adam\packets\20260526T173931Z__drive_sync_check__v1\packet.md`
  - Jay reply：`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\aps_real_drive_check\from_jay\packets\20260526T175057Z__drive_sync_reply__v1\packet.md`
  - Jay ack：`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\aps_real_drive_check\_ack\jay.ack.json`
  - Adam ack：`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\aps_real_drive_check\_ack\adam.ack.json`
  - Final inbox: Adam / Jay both reported no pending items.

## 自審紀律回顧

近期錯誤與防範：

1. **術語漂移**：曾把本地 smoke check 寫成 `local release-check`。已改為「local package smoke check」，並確認 `dev/qc/triggers.md` 是唯一 QC tier 真源。
2. **公開卡片與真源同步**：`docs/qc/governance-map.html` 已補充「若與 triggers 不一致，以 triggers 為準並同步修正 HTML」。
3. **打包範例殘留**：正式外發前檢發現 `resources/protocol/templates/ack.json.example` 與 npm 打包 examples 仍有舊 slug。已改成 `example_project` / `example_agent`。
4. **測試工作目錄錯位**：本次全面檢第一次同機回歸在 repo root 執行 `init --hub-root`，產生了不應存在的 `dev/rules/aps-bridge.md`。該誤寫已刪除，並改用獨立 disposable workspace 重跑成功。後續凡跑 `init --hub-root`，必須先切入 throw-away workspace。

粗略統計最近五個相關檢查事件：caught-before-release 3 件（術語漂移、打包範例殘留、測試目錄錯位）；missed-before-user-question 1 件（把 throw-away flow 說得過強）。目前主要盲點由「口頭判斷」轉為「命令 + 報告 + 單一真源」約束。

## 發佈判斷

0.2.0 pre-release 已完成發佈鏈：

1. Release commit `47bf2d29c8bae7339730d9b655dadbf0b8da64da` 已推送到 `origin/main`。
2. Tag `v0.2.0` 已推送，並指向 release commit。
3. GitHub release `v0.2.0` 已建立為 pre-release。
4. npm `@adamchanadam/aps@0.2.0` 已 publish，registry latest 已確認為 `0.2.0`。
5. GitHub Pages 已讀回 `0.2.0` 與前期測試邊界文字。

Release note 可宣稱：0.2.0 已完成本地 `init`、Hub skeleton、技能安裝、最小 CLI 往返，以及一次 Adam ↔ Jay 真實 Google Drive 跨機往返驗證。仍不可宣稱自然語言技能日常操作與補救流程已完成全面真實演練；項目狀態必須繼續標示為 ⚠️ 前期測試階段。
