# APS 全面檢報告 — 0.2.7 本地候選版

日期：2026-05-28

範圍：`@adamchanadam/aps` 0.2.7 本地候選版，涵蓋技能首次使用、收件摘要、交接語義分流、技能刷新與 QC 機制補強。

結論：技術檢查通過；正式外發清關仍受阻，原因是本報告與候選版改動尚未提交。公開 npm latest 仍是 0.2.6 pre-release。

## 健康結論

0.2.7 本地候選版通過巢狀快檢、外發前檢，以及隔離同機 Hub 的主要全面檢回歸。這次確認以下修正方向已落地：

- 既有已安裝技能可透過 `npx aps init --refresh-skill` 安全刷新，工具會先備份舊技能；
- 用戶只說「交接包」時，技能會先澄清，不會預設寫入 APS packet；
- 新 APS packet 預設使用 `L2-aps-packet`，舊 `L2-handoff` 僅保留於歷史文件或舊 packet 相容；
- Google Drive 是已驗證主路徑，但不假設固定磁碟機代號；
- 收件顯示已要求先列總覽、摘要與預檢，再列細節；
- 日常 APS 交接包仍須經完整性預檢與用戶確認後才可寫入 Hub。

這不是正式可生產使用聲明。自然語言日常操作與補救流程仍屬前期測試；每個真實項目仍須各自驗證 Google Drive 同步。

## 巢狀檢查結果

| 層級 / 項目 | 結果 | 證據 |
|---|---|---|
| 快檢 1：Agent Handoff Kit doctor | 通過 | 主工作區 doctor 通過 46 項檢查 |
| 快檢 2：git 狀態一致性 | 通過，帶已知 dirty-worktree 邊界 | status 包含既有 closeout governance edits 與本次 0.2.7 候選版改動；未 commit、未 push、未 publish |
| 快檢 3：驗收掃描 | 通過 | 已掃描 route、skill、cloud、refresh、preflight 關鍵詞與舊詞漂移 |
| 快檢 4：`tools/*.ps1` 檢查 | 不適用 | 本候選版沒有修改 `tools/*.ps1` |
| 外發前檢 1：佔位符與硬編碼值 | 通過 | active package / public surfaces 無 B-class `mpedu` 或 Adam / Jay default；歷史設計稿與 demo workspace 屬 A-class 歷史 / fixture |
| 外發前檢 2：跨面一致性 | 通過，帶候選版邊界 | README / public HTML 仍描述 npm latest 0.2.6；CLI / package 是本地 0.2.7 candidate。發布前可接受，正式發布前須同步改成 0.2.7 release-prep wording |
| 外發前檢 3：HTML preview | 通過 | Chrome DevTools 開啟 `docs/index.html`、`docs/guides/index.html`、walkthrough、maintainer page、governance map；全部無 console messages |
| 外發前檢 4：PII / secrets sweep | 通過 | 命中皆為政策文字，未見 credential value |
| 外發前檢 5：語氣與術語 | 通過 | active skill 與 public surfaces 保持繁體書面語；內部或協定名詞只在必要檔名、命令或技術邊界出現 |
| 外發前檢 6：技能刷新 | 通過 | `node bin\aps.js init --refresh-skill --dry-run` 顯示 Claude Code 與 Codex 的備份後刷新路徑 |
| 外發前檢 7：交接命名分流 | 通過 | `SKILL.md` 已有澄清路由；新 packet default 是 `L2-aps-packet`；舊 `L2-handoff` 只在歷史文件或舊 packet 相容語境出現 |
| 外發前檢 8：雲端支援邊界 | 通過 | `SKILL.md`、setup reference、public docs 與 QC card 均說明 Google Drive 是已驗證主路徑、不固定磁碟機代號；其他同步資料夾為未正式驗證實驗路徑 |
| 全面檢 1：跨工作目錄審核 | 通過，只讀收集 | Demo Adam 與 Demo Jay 的 Handoff Kit doctor 均通過 46 項；Bridge Pack 內硬編碼值屬 fixture identity，不是 package default |
| 全面檢 2：協定往返回歸 | 通過 | 隔離 evidence folder `dev/qc/evidence/2026-05-28-full-check-027-final-20260528-090908/` 走通 init、doctor、publish、inbox、consume、reply、revise、close、withdraw、雙方 final no-pending inbox 與 final doctor |
| 全面檢 3：啟動可發現性 | 通過 | 隔離 `aps init` 寫入 Handoff Kit route、project-index registration、Bridge Pack 與 `.aps/config.json`；兩邊 `doctor` 通過 |
| 全面檢 4：自審紀律回顧 | 通過，並記錄一次漏點 | 較早一次回歸誤用不存在的 `--cwd` 參數；已判為無效證據，清理誤寫，改用真實工作目錄切換重跑 |
| 全面檢 5：審核報告輸出 | 已完成但未提交 | 本檔即報告；按 QC 真源，正式聲稱 🔴 全面檢通過前仍須 commit |
| 全面檢 6：規格與 runtime 落差 | 通過本地候選版檢查 | 首次使用、收件總覽、語義澄清、技能刷新與雲端邊界，已存在於 bundled skill / reference / CLI output；既有已安裝 runtime 仍須刷新技能並重啟 AI 工具 |

## 協定回歸摘要

證據資料夾：

`dev/qc/evidence/2026-05-28-full-check-027-final-20260528-090908/`

實際 packet：

- A → B：`20260528T080909Z__aps_full_check` v1，之後以 `revise` 產生 v2
- B → A：`20260528T080910Z__aps_full_reply` v1
- 撤回路徑：`20260528T080910Z__aps_withdraw_check` v1

已驗證結果：

- 兩個生成出的 Handoff Kit workspace 均通過 APS `doctor`；
- B 的 inbox 顯示可直接複製的 `consume` 命令；
- A 讀到 B 的回覆；
- B 讀到 A 的 v2 修訂；
- A 與 B 最終 inbox 均無待處理項目；
- A 與 B 最終 `doctor` 均通過。

## 外部讀回

| 外部面 | 結果 |
|---|---|
| npm registry | `@adamchanadam/aps` latest 仍為 0.2.6，bin 為 `aps`，fileCount 為 14 |
| GitHub release | `v0.2.6` 是 pre-release，非 draft |
| GitHub Pages | `docs/index.html` 回傳 HTTP 200，含 `0.2.6` 與 pre-release wording |

這些讀回確認 0.2.7 仍只是本地候選版。公開文件應保持 0.2.6，直至進入明確 release-prep 才改成 0.2.7。

## 阻擋項與接受邊界

1. 正式全面檢清關受阻：本報告與 0.2.7 候選版改動尚未提交。未執行 commit、push、tag、GitHub release 或 npm publish。
2. 0.2.7 未做新的真實雙機 Google Drive 測試。同機協定回歸已通過；歷史維護者真實 Drive 驗證仍可作協定證據，但每個真實項目仍須自行驗證 Drive 同步。
3. 一次無效回歸誤用不存在的 `--cwd` 參數，曾在 repo root 產生暫時 APS runtime registration。該誤寫已移除；有效回歸已用真實 working directory 切換重跑。
4. `git status` 仍包含本任務前已有的 closeout-only governance edits。除非 Adam 要求提交 / 推送，否則保持本地未提交狀態。

## 重跑計劃

發布 0.2.7 前應執行：

1. 提交 0.2.7 候選版改動與本報告。
2. 重跑 `node --check bin\aps.js`、`npm test`、`npm pack --dry-run --json`、`git diff --check`、技能刷新 dry-run 與隔離往返回歸。
3. 只有在明確準備發布時，才把 README / public HTML / release notes 從 npm latest 0.2.6 改成 0.2.7 release-prep wording。
4. 發布後再讀回 npm、GitHub release 與 GitHub Pages，才可聲稱發布完成。
