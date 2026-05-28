# APS 0.2.5 全面檢報告

日期：2026-05-28  
對象：本機 `@adamchanadam/aps` 0.2.5 候選版  
真源：`dev/qc/triggers.md`  
狀態：技術檢查通過；正式放行仍須把本報告與相關修正提交到 git。

## 健康結論

0.2.5 候選版已通過本次全面檢的實際檢查線，包括內層快檢、外發前檢基線、跨工作目錄只讀審核、兩工作目錄同機交接回歸、啟動可發現性檢查，以及最近缺口自審。

本次全面檢中途捕捉到一個真實缺口：`publish` 使用 `--from` / `--to`，但整體說明與其他命令讓使用者可合理理解為 `--agent-id` / `--other-agent-id` 也可作覆蓋參數。測試腳本用統一參數時，`publish` 仍讀取舊 config，導致交接包寫入錯誤通道。已以最小修正補上 `publish --agent-id` / `--other-agent-id` 覆蓋別名，並在最終回歸中驗證。

## 阻擋項

| 項目 | 狀態 | 說明 |
|---|---|---|
| 技術阻擋 | 通過 | 最終同機回歸、doctor、package preview、語法檢查均通過。 |
| git 放行阻擋 | 受阻 | `dev/qc/triggers.md` 要求全面檢報告已 commit 才可宣稱完整放行；本報告尚未 commit。 |
| 真跨機 Drive 證據 | 接受風險 | 0.2.0 已有 maintainer-run 真跨機 Adam ↔ Jay Drive 驗證；本次 0.2.5 未重跑真跨機，只跑隔離同機雙工作目錄回歸。每個真實項目仍須自行驗證 Drive 同步。 |

## 三條主線

| 主線 | 結果 | 證據 |
|---|---|---|
| 公開承諾一致性 | 通過 | 外發前檢已確認 README、公開 HTML、維護者頁、skill、setup dialogue、CLI help 與 QC 真源對齊；npm latest 仍標示為 0.2.4，local 0.2.5 未偽稱已發布。 |
| 發佈前可信度 | 通過 | `npm pack --dry-run --json` 顯示 0.2.5 tarball 仍為 14 files；`npm view @adamchanadam/aps ...` 確認 registry latest 仍為 0.2.4。 |
| 協定實際運行正確性 | 通過 | 最終證據 `dev/qc/evidence/2026-05-28-full-check-025-final3-20260528-055124/` 完成雙工作目錄 setup、doctor、publish、inbox、consume、revise、withdraw、close、no pending、final doctor。 |

## 十四項檢查結果

| 編號 | 檢查 | 結果 |
|---|---|---|
| 1 | Agent Handoff Kit doctor | 通過；主工作目錄 46 checks passed，只有既有 SESSION_LOG N-rule warning。 |
| 2 | git status 與 handoff 敘述一致 | 通過；工作樹仍是 0.2.5 候選版未提交狀態。 |
| 3 | 當次 acceptance grep / 視覺檢查 | 通過；外發前檢已覆蓋最新自然語言、preflight、通知邊界、Drive 邊界。 |
| 4 | `tools/*.ps1` 檢查 | 不適用；本次未改 `tools/*.ps1`。 |
| 5 | package / CLI 基線 | 通過；`node --check bin\aps.js`、`npm test`、`npm pack --dry-run --json` 通過。 |
| 6 | 跨工作目錄佔位符審核 | 通過；通用面無 B-class hardcode；demo 工作目錄只保留示例 / fixture 身份。 |
| 7 | 跨面交叉閱讀 | 通過；README、public docs、maintainer page、skill、dialogue、CLI、QC 真源敘述一致。 |
| 8 | HTML preview | 通過；外發前檢已渲染入口頁、教學中心、walkthrough、maintainer page、governance-map，無 console messages。 |
| 9 | PII / secrets sweep | 通過；命中為政策文字或警示文字，未發現可用 credential。 |
| 10 | 語氣與用語紀律 | 通過；公開面保留專有名詞與命令，敘述用繁體書面語；維護者頁與新手頁分層。 |
| 11 | Class-C 跨工作目錄審核 | 通過；Drive Hub `_hub/PROTOCOL.md` 為 generic placeholder；Demo Adam / Jay doctor 各 46 checks passed。 |
| 12 | 協定往返流程回歸 | 通過；final3 證據完成 setup → doctor → publish → inbox → consume → reply → revise → close / withdraw。 |
| 13 | 啟動可發現性 trace | 通過；`aps init` 在兩個隔離工作目錄寫入 Handoff Kit APS route、project-index registration、Bridge Pack、本地 config；`doctor` 驗證這四項。 |
| 14 | 自審與報告輸出 | 通過；本報告記錄本次漏點、根因與修正。正式放行仍待 commit。 |

## 四條主要使用流程

| 流程 | 結果 | 說明 |
|---|---|---|
| 零認知讀者入口流程 | 通過 | README → docs entry → guides hub → walkthrough 已把新手入口、宏觀 SVG、能力邊界與 pre-release 狀態分清。 |
| 手動設置流程 | 通過 | Agent Handoff Kit init、`npx aps init`、Handoff Kit route / project-index registration、`doctor`、首次 packet 均有同機證據。 |
| 日常協作流程 | 通過但仍屬 pre-release | CLI fallback 已完整回歸；自然語言主路徑已寫入 docs / skill / QC，但仍需真實人機使用 rehearsal。 |
| 出錯補救流程 | 通過但需繼續硬化 | `doctor`、wrong config / missing route、withdraw、revise、Drive 同步邊界與補交需求規則已納入；更多真實錯誤樣式仍需後續累積。 |

## 本次捕捉到的缺口與修正

| 缺口 | 根因 | 修正 | 驗證 |
|---|---|---|---|
| `publish --agent-id` / `--other-agent-id` 不生效 | `publish` 只讀 `--from` / `--to` 或 config，但其他命令與說明形成統一覆蓋參數預期。 | `bin/aps.js` 的 `publish` 現在接受 `--agent-id` 作為 `--from` 別名，接受 `--other-agent-id` 作為 `--to` 別名。 | final3 證據中，在 A workspace 執行 `publish --agent-id agent_b --other-agent-id agent_a --topic alias_override`，成功寫入 `from_agent_b`，A inbox 可見並 consume，B close 後雙方 no pending。 |
| 測試腳本兩次使用錯誤假設 | 第一輪錯估 outbox 欄位含 topic；第二輪漏了 `revise --reason`。 | 回到 CLI help 與 outbox 真格式後重跑，不把失敗誤判為產品通過。 | final3 證據全程 exit 0。 |

## 跨工作目錄註記

- 真實 Drive Hub `_hub/PROTOCOL.md` 只讀檢查通過；命中為 `<project_slug>`、`<hub_root>` 等 generic placeholder。
- Demo Agent Adam / Jay Bridge Pack 只讀檢查通過；示例 project slug 和 agent id 屬 demo fixture / 歷史證據，不屬通用 package default。
- Demo Adam / Jay 均通過 Agent Handoff Kit v0.3.11 doctor 46 checks。
- 本 APS root 不修改 demo 工作目錄；這符合 active-project-root 邊界。

## 最終機器驗證

- `node --check bin\aps.js`：通過。
- `npm test`：通過；目前測試腳本仍為 no-op smoke。
- `npm pack --dry-run --json`：通過；`@adamchanadam/aps@0.2.5`，14 files。
- `git diff --check`：通過；只有 Windows LF→CRLF warning。
- `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root .`：通過；46 checks passed，SESSION_LOG N-rule warning 仍存在。

## 下一步

若要把 0.2.5 當作可發布候選版處理，下一步應先 commit 本報告與 `publish` 覆蓋別名修正，再按外部發佈流程 push、tag、GitHub pre-release、`npm publish --access public`，最後讀回 npm / GitHub release / GitHub Pages。
