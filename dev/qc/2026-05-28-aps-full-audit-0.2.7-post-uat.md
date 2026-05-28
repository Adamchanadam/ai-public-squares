# APS 全面檢報告 — 0.2.7 post-UAT hardening

日期: 2026-05-28

## 健康結論

本地 APS 0.2.7 post-UAT 候選核心回歸大致通過,但本輪全面檢不能判定為外發通過。

阻擋原因有兩項:

1. GitHub Pages 線上頁面仍未同步本地 0.2.7 / 摘要式通知 / 不自動觸發 AI 的最新文案。線上讀回 `docs/index.html` 為 HTTP 200,但未命中 `0.2.7`、`摘要式通知`、`不會自動觸發對方 AI`。
2. npm latest 已是 `@adamchanadam/aps@0.2.7`,而本地又有 post-publish runtime 修補。若要再外發,不可重用 0.2.7 版本號;下一次 npm 發佈必須升至後續版本。

本輪期間發現並修補一個身份預設漏洞:互動式 `init` 在角色 B 時,本機 agent 建議值現在改為 `agent_b`,對方 agent 建議值改為 `agent_a`,避免兩部電腦一路按 Enter 時都把自己設成 `agent_a`。

## 阻擋項

| 項目 | 狀態 | 證據 | 處理 |
|---|---|---|---|
| GitHub Pages 未同步本地最新文案 | 阻擋 | `Invoke-WebRequest https://adamchanadam.github.io/ai-public-squares/docs/index.html` 回傳 200,但 `Has027=false`, `HasSummaryNotice=false`, `HasNoAutoTrigger=false` | 需要 Adam 另行授權 commit / push / Pages readback |
| npm 版本號不可重發 | 阻擋 | `npm view @adamchanadam/aps ...` 顯示 latest/version 均為 `0.2.7`;本地 `bin/aps.js` 已再修補 | 下一次 publish 前要升版,不可用 0.2.7 覆蓋 |
| 全面檢報告未 commit | 受阻 | 本輪未獲 commit 授權 | 等 Adam 明確要求才 commit |

## `claude -p` 治理定位

`claude -p` 的用法放在 `dev/PROJECT_INDEX.md` 的 `Local QC Commands` 是合理位置。原因是該表專門保存本 repo 可重用的本地命令、使用時機與驗證日期,讓下一個無狀態 AI 能正確復用。

限制:它只可作「需要 Claude Code headless 外部審閱」時的可選檢查,不可寫成每次全面檢、每次提交或每次發布都必跑的硬性閘口。若日後命令失效,先縮短 prompt;仍受阻才查官方文件或網上解法。

## 已通過檢查

| 類別 | 狀態 | 證據 |
|---|---|---|
| Agent Handoff Kit doctor | 通過 | 46 項通過;仍提醒 SESSION_LOG 已達 N-rule closeout 邊界 |
| CLI 語法 | 通過 | `node --check bin\aps.js` |
| CLI help | 通過 | `node bin\aps.js --help`;輸出為 APS 品牌與繁體中文 |
| npm 測試 | 通過但弱 | `npm test`;目前仍是 placeholder-only |
| package preview | 通過 | `npm pack --dry-run --json`;14 files |
| diff whitespace | 通過 | `git diff --check`;只有 LF/CRLF warning |
| npm registry readback | 通過 | latest/version/bin/fileCount 均讀回 |
| HTML 本地連結治理 | 通過 | HTML 內未找到 `href=... .md` 本地 Markdown 連結 |
| HTML 本地預覽 | 通過 | Chrome DevTools 打開 `docs/index.html`, guides hub, walkthrough, maintainer page, QC map;未見 console error/warn |
| role B 預設值 | 通過 | 互動式 `init` 角色 B 顯示 `agent_b / agent_a` 建議值,最後輸入 `no` 無寫入 |

## 協定往返回歸

證據目錄: `dev/qc/evidence/full-check-post-uat-20260528-142556/`

| 流程 | 狀態 |
|---|---|
| 隔離 HOME 新安裝 A/B 兩個工作目錄 | 通過 |
| 寫入 Handoff Kit APS route / project-index registration / Bridge Pack / `.aps/config.json` | 通過 |
| A doctor / B doctor | 通過 |
| A `publish --body-file` | 通過 |
| B `inbox` | 通過 |
| B `consume` v1 | 通過 |
| A `revise --body-file` v2 | 通過 |
| B `consume` v2 | 通過 |
| B reply publish / A inbox / A consume reply | 通過 |
| A close | 通過 |
| A publish withdraw path / withdraw / B final inbox no pending | 通過 |
| existing-project `upgrade` with isolated HOME | 通過;skill backup / refresh, Hub files preserved |

## 橫切保障

| 檢查 | 狀態 | 註記 |
|---|---|---|
| Reliable Pair first | 通過 | Contacts selector / watch / Telegram bot auto-send 只在 roadmap 作延後方向 |
| 摘要式人類通知 | 通過 | CLI publish 輸出包含重點摘要、注意事項、下一步 |
| 收件後本機對接檢查 | 通過本地規格面 | skill / docs / QC 真源已對齊;真 Claude runtime UAT 仍需另跑 |
| 發送方本機 Google Drive 路徑防誤導 | 通過 | 通知文字明確要求收件方讀自己本機設定 |
| APS vs Agent Handoff Kit 語義分流 | 通過本地掃描 | APS skill 不應顯示 Agent Handoff Kit 啟動卡 |
| 長正文 `--body-file` | 通過 | 回歸以 `--body-file` 發佈與修訂 |

## 重跑計劃

1. 若 Adam 要外發:先升版到下一個 npm 版本,再跑外發前檢。
2. Adam 明確授權後才 commit / push / tag / GitHub release / npm publish。
3. push 後必須重讀 GitHub Pages,確認線上頁命中 `0.2.7` 或後續版本、`摘要式通知`、`不會自動觸發對方 AI`。
4. 再用 UAT 目錄測三個 skill 入口:`教我用 APS`、`教我用 AI Public Squares`、`教我用 Agent Public Squares`。

