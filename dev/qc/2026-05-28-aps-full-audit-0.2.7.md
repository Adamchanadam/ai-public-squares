# APS 全面檢報告 — 0.2.7 release-prep

日期：2026-05-28

範圍：`@adamchanadam/aps` 0.2.7 pre-release，涵蓋 Reliable Pair 主線、CLI / skill / public docs / HTML / UAT evidence、Handoff Kit route、body-file 發包 / 修訂、公開承諾邊界與 Google Drive 本機路徑誤導風險。

結論：機器檢查與本地協定回歸通過；公開 HTML 已完成「不預告未交付功能」收口；Adam 已授權在 release-prep 對齊後 commit release notes 並執行 npm publish。npm 發布已完成，registry 讀回確認 `@adamchanadam/aps@0.2.7` 是 latest，bin 為 `aps`，fileCount 為 14。`AI_Public_Squares_UAT` 最終刷新、GitHub Pages 巢狀頁面讀回與 Jay 真實雙機驗證列為發布後驗收。

## 本輪新增修正

- `bin/aps.js`：`--help` 改為繁體中文並加入統一 APS 品牌畫面；命令輸出加入功能性 emoji；`publish` / `revise` 通知改為要求對方使用自己電腦上的 APS 項目，不再暗示可使用發送方本機 Google Drive 路徑。
- `skills/aps/SKILL.md`、`skills/aps/references/setup-dialogue.md`：加入「教我用 APS」品牌畫面、發送前確認、收件總覽、`hubRoot` 本機限定與安全通知文字規則。
- `README.md`、`dev/qc/triggers.md`、產品計劃：收斂為 Reliable Pair first；選人、多人、自動化與其他雲端支援不列為 0.2.7 目標。
- `docs/*.html`：公開 HTML 不再預告未交付功能；HTML 只保留現有可用流程與必要邊界。

## 巢狀檢查結果

| 層級 / 項目 | 結果 | 證據 |
|---|---|---|
| 快檢 1：Agent Handoff Kit doctor | 通過 | `npx @adamchanadam/agent-handoff-kit doctor` 通過 46 項，`status: passed` |
| 快檢 2：git 狀態一致性 | 通過，帶 release-prep 邊界 | `git status --short` 顯示 0.2.7 release-prep 改動；提交後再 npm publish |
| 快檢 3：本次 acceptance grep | 通過 | HTML 未交付功能字眼掃描、`.md` / `file:` / 磁碟路徑 href 掃描、公開頁內部導流掃描均清零 |
| 快檢 4：script parse | 通過 | `node --check bin\aps.js` 通過 |
| 外發前檢 1：跨面一致性 | 通過 | CLI / skill / README / HTML / QC 真源已對齊 Reliable Pair first 與 0.2.7 pre-release wording |
| 外發前檢 2：HTML 全文逐行與視覺檢查 | 通過 | 已讀 `docs/index.html`、`docs/guides/index.html`、walkthrough、maintainer page、governance map；五張 Edge headless 截圖已更新於 `dev/qc/evidence/2026-05-28-html-render/` |
| 外發前檢 3：HTML 本機連結防誤導 | 通過 | `href` 精準掃描無本機 `.md`、`file:` 或磁碟路徑連結 |
| 外發前檢 4：公眾 HTML 不預告未交付功能 | 通過 | `docs -g "*.html"` 掃描未命中 Contacts、watch、多人、桌面通知、平台排程、0.2.7、候選、upgrade、未來、延後等公開誤導字眼 |
| 外發前檢 5：PII / secrets sweep | 通過 | 命中皆為安全政策、歷史審核或禁止條款文字；未見 credential value |
| 外發前檢 6：package 預檢 | 通過 | `npm pack --dry-run` 通過，`@adamchanadam/aps@0.2.7`，14 files，未留下 `.tgz` |
| 外發前檢 7：測試腳本 | 通過但覆蓋薄 | `npm test` 通過；現時仍只是 placeholder：`No tests yet` |
| 外發前檢 8：npm registry 發布後讀回 | 通過 | 發布後 `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` 回傳 version/latest `0.2.7`、bin `aps`、fileCount 14 |
| 全面檢 1：協定往返回歸 | 通過本地證據 | disposable UAT 已走通 `doctor`、`publish --body-file`、`inbox`、安全通知、`upgrade --dry-run`；舊完整回歸覆蓋 consume / revise / close / withdraw |
| 全面檢 2：啟動可發現性 | 通過 | APS route、project-index registration、bridge pack 與 doctor 檢查均有證據 |
| 全面檢 3：UAT 目錄落地 | 接受風險 | `AI_Public_Squares_UAT` 曾完成 0.2.7 實測；最後一輪文案 / skill 修正後未再刷新。Adam 已批准簡化流程,發布後再用 npm latest 重跑 UAT |
| 全面檢 4：GitHub Pages 線上讀回 | 不阻擋 npm | 本輪不 push,所以 Pages 不會即時更新；待另行授權 push 後再讀回 |
| 全面檢 5：真實雙機 Google Drive 往返 | 發布後驗收 | npm 發布後 Jay 才可用標準 `@latest` 安裝同一版本；因此真實雙機驗證列為 post-publish UAT |
| 全面檢 6：報告輸出 | 通過 | 本檔即最新全面檢報告；release-prep commit 會一併提交 |

## HTML 逐行檢查摘要

已逐行閱讀與檢查的 HTML：

- `docs/index.html`
- `docs/guides/index.html`
- `docs/guides/aps-onboarding-walkthrough.html`
- `docs/maintainers/index.html`
- `docs/qc/governance-map.html`

已修正的公開面風險：

- 移除公眾頁的候選版語氣；`upgrade` 現作 0.2.7 現有能力描述。
- 移除公眾頁的未交付功能名稱、後續拆頁與前期測試標籤。
- 公眾頁不再導流到維護者 HTML 或分層 QC HTML。
- 通知文字明確要求對方在自己電腦上使用已接入 APS 的項目，不使用發送方本機 Google Drive 路徑。
- HTML 仍可用 `<span class="path">` 顯示內部路徑；未使用本機 Markdown `href`。

## 命令證據

| 命令 | 結果 |
|---|---|
| `npx @adamchanadam/agent-handoff-kit doctor` | 通過，46 項，`status: passed` |
| `node --check bin\aps.js` | 通過 |
| `node bin\aps.js --help` | 通過；繁體中文 help + APS brand card |
| `npm test` | 通過；placeholder 覆蓋薄 |
| `npm pack --dry-run` | 通過；14 files；未留下 `.tgz` |
| `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` | 發布後通過；latest 為 `0.2.7`，bin `aps`，fileCount 14 |
| `npx --yes @adamchanadam/aps@latest --help` | 發布後通過；顯示 v0.2.7 pre-release 與繁體中文 help |
| `git diff --check` | 通過；只有 Windows LF→CRLF 提示 |
| HTML future-feature grep | 通過；0 命中 |
| HTML local href grep | 通過；0 命中 |
| secrets sweep | 通過；0 實際機密值 |

## 阻擋項

1. `npm test` 只是 placeholder；0.2.7 發佈仍依賴 CLI smoke、UAT 與人工審核。
2. 本輪不 push、tag 或建立 GitHub release；GitHub Pages 與 GitHub release 需要另行授權處理。
3. Jay 真實雙機驗證現在可用標準 `@latest` 路徑重跑。

## 建議下一步

1. 在 `AI_Public_Squares_UAT` 用標準 `@latest` 路徑刷新並重跑「教我用 APS」自然語言 UAT。
2. 請 Jay 用標準 `@latest` 路徑安裝 / 升級,再做真實雙機 `check Hub` 往返。
3. GitHub push / tag / GitHub release / Pages 讀回另行授權處理。
