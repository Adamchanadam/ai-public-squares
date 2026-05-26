# AI Public Squares 全面檢報告

**日期:** 2026-05-25
**範圍:** AI Public Squares 產品本身；Agent Handoff Kit 只作前置健康背景，不審其內部治理規則。
**觸發:** 使用者要求執行「🔴 全面檢」。
**結論:** 公開說法與本地產品檔案大致一致，未再發現新的公開承諾矛盾。2026-05-25 root-fix pass 已補齊 HTML 視覺預覽、本地臨時 Hub 往返回歸與 Bridge Pack 啟動行為記錄。2026-05-26 release pass 已完成 npm 發佈驗證：`@adamchanadam/aps` latest 為 0.1.1，安裝後 `npx aps bridge-pack` 可用。仍未完成的是需要外部權限或獨立工作區配合的項目：Agent Handoff Kit doctor、GitHub Pages 線上頁面核實、demo workspace 各自提交證據與本報告 commit。

---

## 1. 判斷摘要

本次檢查按三條主線執行：

| 主線 | 結論 | 說明 |
|---|---|---|
| 公開承諾一致性 | 通過 | README、三份主要 HTML、CLI、skill、Bridge Pack fixture 對「0.1.1 可用範圍、`init` 尚未完成、真實跨機仍待驗證」的分界已一致；公開面英文工作詞已清理 |
| 發佈前可信度 | 部分通過 | 本地 CLI、套件打包、HTML 視覺預覽、npm 發佈回讀、安裝後 bin 驗證、敏感資料掃描、`.md` 連結掃描通過；GitHub Pages 線上頁面仍未核實 |
| 協定實際運行正確性 | 部分通過 | 已在 repo 內臨時 Hub 跑 publish / consume / ack / reply / close；Bridge Pack pending 掃描顯示 Adam / Jay 均無待處理項。真實 Drive Hub 與 demo workspace 各自 session 尚未重跑 |

整體判斷：**本地 root fix 已補齊主要產品證據；仍不可把本次結果當作線上發佈、跨機正式落地或協定升版的完成證據。**

---

## 2. 覆蓋範圍

本次已讀取並交叉核對：

- `docs/index.html`
- `docs/guides/index.html`
- `docs/guides/aps-onboarding-walkthrough.html`
- `docs/qc/governance-map.html`
- `README.md`
- `package.json`
- `bin/aps.js`
- `skills/aps/SKILL.md`
- `docs/plans/2026-05-23-aps-skill-dialogue-script.md`
- `examples/demo-agent-a/dev/rules/aps-bridge.md`
- `examples/demo-agent-b/dev/rules/aps-bridge.md`
- `dev/qc/triggers.md`
- `dev/DOC_SYNC_REGISTRY.md`
- `dev/PROJECT_INDEX.md`

本次只讀核實的外部或跨資料夾狀態：

- `git ls-remote origin HEAD` 可讀，但遠端 HEAD 與本地 HEAD 不同。
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` 回讀成功：`latest` = 0.1.1，bin = `aps`。
- 兩個 demo workspace 路徑存在，但本次沒有進入其獨立工作區執行全面檢。
- GitHub Pages 與 GitHub 網頁 HTTP 檢查在本機 PowerShell 回報連線被拒；外部網頁讀取工具補查回報 cache miss / 無搜尋結果。此項列為線上狀態未核實，不作產品失敗判定。
- `C:\tmp` 在本次 Codex desktop 執行環境不可寫；後續臨時證據改放本 repo 內 `dev/qc/evidence/2026-05-25-full-audit/`。
- HTML 視覺預覽截圖、臨時 Hub 回歸資料與啟動掃描腳本已保存於 `dev/qc/evidence/2026-05-25-full-audit/`。

---

## 3. 四條使用流程

| 流程 | 結論 | 證據與限制 |
|---|---|---|
| 零認知讀者入口流程 | 通過 | README 與 `docs/index.html` 均有前期狀態、0.1.1 可用範圍、目前可試方式與目標體驗分離 |
| 手動設置流程 | 部分通過 | walkthrough 與教學中心對齊；CLI fixture、HTML 預覽與臨時 Hub 已驗證。完整真人由頭到尾操作仍未跑 |
| 日常協作流程 | 部分通過 | walkthrough、Bridge Pack fixture、skill 規格在概念上對齊；臨時 Hub 已有 packet / ack / reply / close 證據，真實 Drive Hub 未重跑 |
| 出錯補救流程 | 部分通過 | walkthrough 與 skill 規格有補救說明；仍未以實際錯誤場景驗證 |

---

## 4. 本地機器檢查

| 檢查 | 結果 |
|---|---|
| `node bin/aps.js --help` | 通過；列出 `init` 佔位功能、`bridge-pack`、`bridge-pack --role B` |
| `node bin/aps.js init` | 通過；明確顯示完整設置編排仍未完成，並區分 npm 發佈後命令與發佈前本地測試命令 |
| `node bin/aps.js bridge-pack` | 通過；輸出 User A fixture |
| `node bin/aps.js bridge-pack --role B` | 通過；輸出 User B fixture |
| `node bin/aps.js bogus` | 通過；負向路徑 exit 1 並顯示未知子命令 |
| `npm pack --dry-run --json` | 通過；tarball 8 個檔案，包含 CLI、skill、兩份 Bridge Pack fixture；本次 evidence folder 不會進入 npm package |
| `package.json` JSON parse | 通過 |
| `git diff --check` on audit surfaces | 通過；只出現換行格式提示 |
| HTML `.md` hyperlink grep | 通過；README 與 `docs/` 無公開 HTML `.md` hyperlink |
| 三條主線與四條流程 grep | 通過；`dev/qc/triggers.md` 與四個入口 HTML 均有命中 |
| 過時公開字句掃描 | 通過；`private repo`、`私人 repo`、`34 / 34`、`34/34` 無公開面命中 |
| 敏感資料掃描 | 通過；命中皆為安全規則或禁用說明，未見實際機密值 |
| Bridge Pack A/B 差異 | 通過；差異集中在角色、示例 hub path、counterpart 三項 identity 值 |
| HTML 視覺預覽 | 通過；Edge headless 已輸出 4 張入口頁截圖至 `dev/qc/evidence/2026-05-25-full-audit/` |
| 臨時 Hub 往返回歸 | 通過；Adam publish → Jay ack → Jay reply → Adam ack → Adam close 全流程完成 |
| Bridge Pack 啟動行為記錄 | 通過；`startup-trace-check.cjs` 按 pending 規則檢查後 Adam / Jay 均為空 |
| npm 發佈驗證 | 通過；0.1.1 已發佈為 latest，臨時安裝後 `aps.cmd --help` 與 `aps.cmd bridge-pack --role B` 可執行 |

---

## 5. 未完成的全面檢項目

| 項目 | 狀態 | 原因 |
|---|---|---|
| Agent Handoff Kit doctor | 受阻 | `npx @adamchanadam/agent-handoff-kit doctor` 在沙盒內因 registry cache 失敗；沙盒外執行被安全審核拒絕，因為會從 npm 抓取並執行套件程式碼 |
| Class-C 跨工作區審核 | 部分完成 | demo workspace 路徑存在，且 Bridge Pack 可讀；但其工作樹已有未提交治理變更，按治理邊界不在本 repo session 內代為修補或提交 |
| 報告提交 | 未完成 | 本報告已建立，但 commit / push 需要使用者另行明確授權 |

---

## 6. 發現與風險

| 等級 | 發現 | 影響 | 建議 |
|---|---|---|---|
| 阻擋 | Agent Handoff Kit doctor 未能在本環境執行 | 不能把治理健康背景列為本輪已通過 | 需要使用者明確批准沙盒外執行，或由使用者自行執行並貼回結果 |
| 風險 | GitHub Pages 線上頁面未核實 | 不能確認公開頁面實際與本地檔案一致 | 以瀏覽器或 GitHub Pages HTTP 成功讀取後補證據 |
| 風險 | 本地與遠端 HEAD 不一致 | 公開頁面可能落後於本地修補 | push 前先跑外發前檢；不得把本地修補假定為已公開 |
| 輕微 | demo workspace 仍有自身未提交治理變更 | 不影響本 repo 的 APS 公開面，但不能代替各自工作區全面檢 | 分別在兩個 demo workspace 跑其自身收尾與檢查 |

---

## 7. 最終建議

1. 可以繼續做 skill / setup / dialogue 的草稿工作，但所有公開面必須保留「0.1.1 只提供 `bridge-pack`、`init` 尚未完成、真實跨機仍待驗證」的邊界。
2. 在任何發佈、推送宣傳、協定升版或引入新 AI 程式之前，仍須補齊：
   - GitHub Pages 線上頁面核實；
   - demo workspace 各自審核；
   - doctor 或等效治理健康證據；
   - 本報告與相關修補的 commit。
3. 臨時 Hub 往返回歸與 Bridge Pack 啟動行為記錄已補齊，可作為後續 skill / setup / dialogue 草稿的本地證據基線。

---

## 8. 本次命令摘要

```powershell
node bin/aps.js --help
node bin/aps.js init
node bin/aps.js bridge-pack
node bin/aps.js bridge-pack --role B
node bin/aps.js bogus
npm pack --dry-run --json
npm view @adamchanadam/aps version dist-tags.latest --json
git ls-remote origin HEAD
git diff --check -- README.md docs/index.html docs/guides/index.html docs/guides/aps-onboarding-walkthrough.html docs/qc/governance-map.html dev/qc/triggers.md dev/DOC_SYNC_REGISTRY.md skills/aps/SKILL.md docs/plans/2026-05-23-aps-skill-dialogue-script.md examples/demo-agent-a/dev/rules/aps-bridge.md examples/demo-agent-b/dev/rules/aps-bridge.md bin/aps.js package.json
rg -n "href=[^>]*\.md|href=['\"][^'\"]*\.md" docs README.md
rg -n "公開承諾一致性|發佈前可信度|協定實際運行正確性|零認知讀者入口流程|手動設置流程|日常協作流程|出錯補救流程" dev/qc/triggers.md docs/index.html docs/guides/index.html docs/guides/aps-onboarding-walkthrough.html docs/qc/governance-map.html dev/DOC_SYNC_REGISTRY.md
rg -n "private repo|私人 repo|34 / 34|34/34" README.md docs
rg -n "api[_-]?key|password|token|secret|credential|sk-|sk-ant-|ntn_|ya29\.|github_pat_|ghp_|gho_|ghs_|AKIA|AIza" README.md docs dev bin skills examples package.json
Compare-Object (Get-Content -LiteralPath examples/demo-agent-a/dev/rules/aps-bridge.md) (Get-Content -LiteralPath examples/demo-agent-b/dev/rules/aps-bridge.md)
node dev\qc\evidence\2026-05-25-full-audit\startup-trace-check.cjs
```

瀏覽器預覽補查曾先嘗試使用本地 JavaScript 環境載入 `playwright`，結果為 `Module not found: playwright`。其後改用 Microsoft Edge headless；沙盒內因 Windows 權限限制失敗，沙盒外執行成功，產出四張入口頁截圖。GitHub Pages 線上讀取另以外部網頁工具補查，結果仍未能取得頁面內容。
