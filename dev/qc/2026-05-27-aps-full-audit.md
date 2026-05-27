# APS 全面檢報告 — 0.2.1 pre-release

日期：2026-05-27
範圍：`@adamchanadam/aps` 0.2.1 pre-release，包含推送 / 發佈前全面檢與發布後讀回
單一真源：`dev/qc/triggers.md`

## 健康結論

**結論：通過，附一項已標明的前期測試邊界。發布後讀回確認 0.2.1 已成為 npm latest，GitHub release 為 pre-release。**

本次全面檢覆蓋內層快檢、外發前檢、跨工作目錄只讀審核、同機協定回歸、啟動 pending 行為 trace、自審回顧，以及 APS 三條主線。0.2.1 先在本機通過全面檢，之後已 push、tag、建立 GitHub pre-release，並 npm publish。

0.2.1 新增 `revise`、`withdraw`、只讀 `doctor`。本次已用本機 disposable Hub 驗證其協定行為，包括舊版本撤回失敗、最新版本撤回成功、撤回後收件方 inbox 無待處理項、第二個 packet 可 consume / close、doctor 通過、未知子命令失敗。Jay 真機沒有在本次重新演練 0.2.1 新命令；公開文件已保留前期測試邊界，不宣稱自然語言日常操作或補救流程已生產完成。

## 三條主線

| 主線 | 狀態 | 證據 |
|---|---|---|
| 公開承諾一致性 | 通過 | README、`docs/index.html`、教學中心、walkthrough、QC 卡片、CLI help、skill spec 均已對齊 npm latest 0.2.1，同時保留前期測試邊界。 |
| 發佈前可信度 | 通過 | `npm pack --dry-run --json` 顯示 0.2.1 14 個預期檔案；npm registry 發布後讀回為 0.2.1；tag `v0.2.1` 與 GitHub pre-release 已讀回。 |
| 協定實際運行正確性 | 通過，附前期測試邊界 | 本機 disposable Hub 跑通 `init`、`publish`、`inbox`、`revise`、`withdraw`、`consume`、`close`、`doctor`；demo workspaces doctor 通過；Drive Hub `PROTOCOL.md` 可讀。0.2.1 新命令未做 Jay 真機重演，故不可宣稱新補救命令已完成真跨機生產驗證。 |

## 主要使用流程

| 流程 | 狀態 | 證據 |
|---|---|---|
| 零認知讀者入口流程 | 通過 | `README.md`、`docs/index.html`、`docs/guides/index.html`、walkthrough 均保留「0.2.1 npm latest / 前期測試」分界。 |
| 手動設置流程 | 通過 | 本機 release-check CLI 證據重新跑 `init --dry-run` 與 `init --hub-root ...`，在 throw-away workspace 內建立 skill、Hub skeleton、Bridge Pack、starter pack。 |
| 日常協作流程 | 通過 | 本機回歸跑通 publish → inbox → consume → close；撤回後 inbox 無 pending。 |
| 出錯補救流程 | 通過，附前期測試邊界 | `revise` / `withdraw` / `doctor` 有本機證據；舊版本撤回與未知子命令均正確失敗。Drive conflict、wrong-lane、Jay 真機 0.2.1 新命令未重新製造或演練，公開面未宣稱完成。 |

## 十四項檢查結果

| 項目 | 狀態 | 結果 |
|---|---|---|
| 1. Agent Handoff Kit doctor | 通過 | 主 workspace doctor 通過 46 項。 |
| 2. git status 與 handoff 一致 | 通過 | `git status --short` 在候選 commit 後為乾淨；發布後交接與索引已更新為 0.2.1 pre-release 已 push / tag / GitHub release / npm publish。 |
| 3. 本次 acceptance grep | 通過 | HTML `.md` hyperlink、`待提交`、`34/34`、公開狀態漂移、0.2.1 邊界、placeholder、secrets、語氣用語掃描均已跑。 |
| 4. `tools/*.ps1` | 不適用 | 本次未修改 `tools/*.ps1`。 |
| 5. 跨工作目錄佔位符審核 | 通過 | `mpedu_plus_branding` / MPEdu 命中只在歷史設計、MVP 報告、明確 example 或 demo fixture 身分區；active template surface 沒有滑入通用預設。 |
| 6. 三處交叉閱讀 | 通過 | Phase 4 plan、walkthrough、Bridge Pack fixture 對 setup、Hub、packet、ack、close 的敘述一致；0.2.1 新命令作為 pre-release 補救命令。 |
| 7. HTML preview | 通過 | DevTools 打開 `docs/index.html`、walkthrough、`docs/qc/governance-map.html`，console 無訊息；截圖存於 `dev/qc/evidence/2026-05-27-release-check-html/`。 |
| 8. PII / secrets sweep | 通過 | 命中皆為安全政策文字、placeholder 或禁止條款，未見實際 credential 值。 |
| 9. 語氣與用語紀律 | 通過 | 使用者入口沒有把內部代號作句子主體；HTML 內沒有 `.md` hyperlink。 |
| 10. Class-C 跨工作目錄審核 | 通過 | Drive Hub `_hub/PROTOCOL.md` 可讀；Demo Adam / Demo Jay workspace doctor 均通過 46 項；demo packs 命中舊 slug / `G:` 路徑只在 fixture 身分區與例子行。 |
| 11. MVP 形式往返流程回歸 | 通過 | `dev/qc/evidence/2026-05-27-release-check-cli-*` 完成 publish / inbox / revise / withdraw / publish / consume / close / doctor；最後 doctor `status: passed`。 |
| 12. Bridge Pack startup addendum trace | 通過 | 回歸中 `inbox` 在 consume 前列 pending；撤回最新版本後對 Jay 回報 no pending；close 後由 doctor 確認 Hub skeleton、ack、outbox 均存在。 |
| 13. 五區段 + 自審紀律回顧 | 通過 | 本輪先發現並修正兩個漂移：公開頁仍寫「待提交」、Phase 4 plan 仍有舊 `34/34` doctor 數字；修正後重跑掃描。 |
| 14. 審核報告輸出 | 通過 | 本檔為本次全面檢報告；按 `dev/qc/triggers.md` 要求，將與狀態檔一併 commit。 |

## 命令與證據

- `git status --short`：乾淨。
- `git log -1 --oneline`：發布前 full-audit commit 為 `d9dd1aa Record APS 0.2.1 full audit`；發布後另有狀態同步 commit。
- `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root C:\Users\adam\_claude_desktop\AI_Public_Squares`：46 項通過。
- `node --check bin/aps.js`：通過。
- `node bin/aps.js --help`：通過。
- `npm test`：通過。
- `npm pack --dry-run --json`：`@adamchanadam/aps@0.2.1`，14 files。
- `git diff --check`：通過。
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json`：registry latest 為 0.2.1，bin `aps`，fileCount 14。
- GitHub Pages readback：發布前 HTTP 200；含 0.2.0 與 pre-release / 前期測試字眼。發布後狀態同步 push 後需再讀回確認 0.2.1。
- `git ls-remote --heads origin main`：發布鏈已讀回 `main` 至 `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4`；狀態同步 push 後需再讀回最新 main。
- DevTools screenshots：`dev/qc/evidence/2026-05-27-release-check-html/`
- 本機協定回歸：`dev/qc/evidence/2026-05-27-release-check-cli-20260527-041537/`
- Demo workspace doctor：
  - `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares`：46 項通過。
  - `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares`：46 項通過。
- Drive Hub protocol readback：`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md` 可讀。

## 自審紀律回顧

本輪全面檢刻意檢查「已修正但文件仍殘留」的錯誤模式。結果在外發前檢階段發現兩項：

1. `docs/index.html` 對 0.2.1 仍寫「待提交」，但實際已 commit。外發前先改成發布前狀態文字；發布後再同步為 0.2.1 已發佈 pre-release。
2. `docs/plans/2026-05-21-aps-phase4-plan.md` 仍有舊 `doctor must pass 34/34` 數字。已改為 `status: passed`，避免把舊檢查數字當成長期規格。

這兩項證明本輪需要的防範機制仍是：以 `dev/qc/triggers.md` 為單一真源，對公開面與維護者計劃同時做 grep；不要只依賴主入口頁或最近記憶。

## 發佈判斷

0.2.1 pre-release 已完成發布鏈：

1. `main` 已推送至 `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4`。
2. Tag `v0.2.1` 已推送並指向 `d9dd1aa1acf2b2f5c863056382543922c5c0aeb4`。
3. GitHub release `v0.2.1` 已建立為 pre-release。
4. npm `@adamchanadam/aps@0.2.1` 已 publish，registry latest 已確認為 `0.2.1`。

仍保留以下邊界：

1. 項目仍是 pre-release。
2. 不可宣稱自然語言日常操作、Drive conflict 補救、wrong-lane 補救、Jay 真機 0.2.1 新命令已完成生產級演練。
3. 任何新真實項目仍要自行驗證 Hub path、Google Drive offline availability、雙方 packet propagation。
