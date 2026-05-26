# AI Public Squares 全面一致性 QC 報告

**日期:** 2026-05-25
**觸發:** 推進下一步 skill / setup / dialogue 工作之前，先審核 AI Public Squares 本身之公開敘事、實際功能、流程、架構與文檔一致性。
**QC tier:** 🔴 全面檢（APS 產品一致性版本；Agent Handoff Kit 只作前置條件與健康背景，不作本次主審對象）
**結論:** 初審時 **未可進入下一步 substantive build**。2026-05-25 root-fix pass 已修補公開狀態、npm 未發佈邊界、`init` 目標體驗混淆、skill spec 未實作承諾、doctor 數字硬編碼；重跑檢查後,5 個阻擋項已清除。npm registry 仍 E404,改列 publish timing boundary,不再是文檔一致性 blocker。

---

## 1. 健康結論

本次審核以 `docs/index.html` 的 AI Public Squares 公開入口敘事為主線，逐層核對:

- `docs/guides/index.html`
- `docs/guides/aps-onboarding-walkthrough.html`
- `README.md`
- `package.json`
- `bin/aps.js`
- `skills/aps/SKILL.md`
- `docs/plans/2026-05-23-aps-skill-dialogue-script.md`
- `examples/demo-agent-a/dev/rules/aps-bridge.md`
- `examples/demo-agent-b/dev/rules/aps-bridge.md`

整體判斷:

1. **APS 核心架構敘事大致一致。** 三份 HTML 對「Google Drive 共享資料夾 + 單寫通道 + 不可變 packet + ack + WhatsApp 人手通知」的方向沒有根本矛盾。
2. **公開狀態與實際可用性有明顯漂移。** README / docs 仍有「私人 repo」字句；walkthrough 寫 npm `bridge-pack` 可取 fixture，但 registry 實測為 `E404`。
3. **入口頁和 README 對 `init` 的「未來能力」與「當前可用能力」混在同一段。** 雖有 pre-release banner，但「開始使用」段仍像已可完成 setup / publish / inbox / recovery。
4. **skill 與 dialogue script 已存在，不是未起手。** 但其內容屬 orchestration spec / wording bank，未經 runtime testing，且含若干未實作命令或不存在資源。
5. **walkthrough 仍有過時 doctor 數字與 npm 依賴說法。** 這會令零認知讀者照做時撞牆。

**Gate verdict:** 目前不應直接進入下一步新功能建構。應先做一次公開面 + skill spec 對齊修補，令「已可用 / 未可用 / 手動替代路徑」分界清楚。

---

## 2. 阻擋項

| ID | 類型 | 證據 | 影響 | 修補建議 |
|---|---|---|---|---|
| APS-B1 | 公開狀態漂移 | `README.md` License 段仍寫「目前為私人 repo」；`docs/index.html` License 段同樣寫「目前為私人 repo」 | 與使用者提供之目前狀態「repo public since 2026-05-23」衝突；公開讀者會誤判專案狀態 | 將兩處改為「repo 已公開，Apache-2.0 授權」。若 GitHub Pages 仍為主要入口，同步標明 Pages URL |
| APS-B2 | npm 可用性與 walkthrough 衝突 | `npm view @adamchanadam/aps version dist-tags.latest dist.fileCount --json` 回 `E404`；walkthrough §2 / §6 / §7 多處寫 `npx @adamchanadam/aps bridge-pack` 由 npm registry 取 fixture | 零認知讀者照 walkthrough 執行會失敗；此為實際功能 blocker | 在 npm 0.2.0 publish 之前，walkthrough 必須明確標為「pre-release，registry command 暫不可用」，並提供本 repo clone / local path 或等待 publish 的替代路徑 |
| APS-B3 | `init` 承諾過度像已可用 | README「開始使用」第 1-3 點、`docs/index.html`「開始使用」第 1-3 點描述執行 `aps init` 後會詢問問題並支援日常 publish / inbox / recovery；但 `bin/aps.js init` 實測只輸出 coming soon | 即使 banner 已提醒，正文仍會令讀者以為主流程可跑 | 將「開始使用」分成「目前可做」與「目標體驗」。目前只可:閱讀入口、手動 walkthrough、本地 CLI `bridge-pack` source 已存在但 npm 未發佈 |
| APS-B4 | skill / dialogue spec 含未實作或不存在資源 | `skills/aps/SKILL.md` 指向 `skills/aps/protocol-v1.0.md`，但 npm pack dry-run 未包含此檔；dialogue script 寫會打包 zip、copy clipboard、`npx @adamchanadam/aps update`，現有 CLI 無 `update` | 之後若直接把 skill 當 runtime spec，AI 可能承諾不可執行能力 | 在 skill status 段加「以下為目標 spec，不代表當前 CLI 已支援」；移除或標記未實作資源 / update / clipboard / zip |
| APS-B5 | doctor 數字過時 | walkthrough 多處仍寫 doctor 通過 `34 / 34`；使用者提供最新 doctor ref 為 `46 項；全部通過`，且治理層已升級 | 雖非 APS 主審，但 walkthrough 將此作為設置驗收，數字過時會誤導使用者 | 改成「status: passed」為主要判準，避免硬寫 34/34；如保留數字，須按 v0.3.10 / 當前工具輸出更新 |

---

## 3. 功能矩陣

| APS 能力 | docs/index.html | guides/index.html | walkthrough | repo 實際功能 | 判斷 |
|---|---|---|---|---|---|
| 解決痛點 | 清楚:檔案版本、上下文、Drive 衝突、WhatsApp 往返 | 簡略導向完整教學 | 詳細展開 | 文檔支撐 | 一致 |
| 核心架構 | Google Drive + 寫入規矩 + 無伺服器 + 無自動推送 | 未詳述 | Hub / lane / packet / ack / outbox 詳述 | Bridge Pack fixture 支撐 | 大致一致 |
| `aps init` | 寫為開始使用命令，但同段標明後台仍建構 | 未主打 | 手動流程為主 | CLI 實測 coming soon | 過度承諾，須改寫 |
| `bridge-pack` | 入口頁未作主要說明 | 未作主要說明 | 多處要求從 npm registry 取 fixture | 本地 CLI 可輸出；npm registry `E404` | 阻擋 |
| skill setup | 入口頁寫未落地 | 未詳述 | 手動流程，不依賴 skill | `skills/aps/SKILL.md` 已存在，但未 runtime test | 需改 handoff 與公開狀態語句 |
| publish / inbox / recovery | 入口頁以日常語句展示 | 未詳述 | §8-§12 詳述手動 / Bridge Pack 行為 | Bridge Pack fixture 有 startup / closeout addendum；skill spec 有子流程但未測 | 目標與規格有，runtime 未證實 |
| 人手 WhatsApp 通知 | 清楚標明無自動推送 | 未詳述 | §8 / §10 / §11 詳述 | Bridge Pack 不發 WhatsApp | 一致 |
| 敏感資料邊界 | 入口頁未詳述 | 未詳述 | §8 / §12 有明確邊界 | Bridge Pack 有 sensitive data 段 | 一致，可考慮入口頁加一句 |
| 深入文檔分層 | HTML 面與 .md spec substrate 分層清楚 | 教學 hub 僅連 HTML | walkthrough 以 path 顯示 .md | HTML `.md` hyperlink grep 0 命中 | 一致 |

---

## 4. 實證檢查

### 4.1 本地 CLI

| Command | Result | Notes |
|---|---|---|
| `node bin/aps.js --help` | pass | 顯示 `init` placeholder、`bridge-pack`、`bridge-pack --role B` |
| `node bin/aps.js init` | pass | 明確輸出 `coming soon (full orchestration in Phase X-2)` |
| `node bin/aps.js bridge-pack --role B` | pass | 輸出 `# APS Bridge Pack`，Identity section 為 User B fixture |
| `npm pack --dry-run --json` | pass | tarball file list 含 `bin/`、`skills/aps/SKILL.md`、兩個 Bridge Pack fixture；version 為 `0.1.0` |

### 4.2 npm registry

| Command | Result | Notes |
|---|---|---|
| `npm view @adamchanadam/aps version dist-tags.latest dist.fileCount --json` | fail / external fact | registry 回 `E404 Not Found`；即 `@adamchanadam/aps` 尚未在 npm registry 可用 |

### 4.3 HTML `.md` hyperlink

| Check | Result |
|---|---|
| `rg -n "href=[^>]*\\.md\|href=['\\\"][^'\\\"]*\\.md" docs README.md` | pass；0 命中 |

### 4.4 版本 / 狀態 / 過時語句掃描

| Pattern | Finding |
|---|---|
| `private repo` / `私人 repo` | README + docs/index.html 仍有過時公開狀態 |
| `34 / 34` | walkthrough 多處仍以舊 doctor 數字作驗收 |
| `0.1.0` | package + docs 一致為本地試行版；但 npm registry 未發佈 |
| `0.2.0` | skill status 提到 publish 0.2.0 前不會自動 install；與 handoff 描述一致 |
| `npx @adamchanadam/aps update` | skill / dialogue script 提到，但 CLI 無此 subcommand |

### 4.5 Secret / sensitive sweep

掃描範圍: `README.md docs skills examples bin package.json`

結果:無實際 credential 值。命中皆為安全規則文字，例如 `credentials`、`API key`、`secret` 之禁用說明。

### 4.6 Voice marker sweep

讀者面 HTML / README 中的粵語 marker 主要出現在觸發句 quote，例如「Jay 嗰邊有冇新嘢」「Google Drive 同步唔到」。這符合既有 voice 規矩。

但 `docs/plans/2026-05-23-aps-skill-dialogue-script.md` 的「用途」段仍有「嘅」等粵語 prose，不只出現在 quote 內。此檔屬 AI / 維護者層，不是公開 HTML 主入口，但若要完全對齊 voice hard rule，應列入後續修補。

---

## 5. APS 流程邏輯審核

### 5.1 一致處

- `docs/index.html` 的 5 個核心設計，與 walkthrough 的 Hub / lane / packet / ack / WhatsApp flow 基本對齊。
- walkthrough §10 明確區分「日常一句 check Hub」與「首次跨機完整模板」，可解釋入口頁的一句觸發句設計。
- Bridge Pack fixture 的 startup addendum / closeout addendum 支撐 walkthrough 所述的啟動掃描與 closeout publish。
- examples A / B 的 Bridge Pack fixture 以 User A / User B 角色區分，符合 walkthrough §6 / §7 的雙方設置邏輯。
- HTML 不再直接連 `.md`，符合 S10 documentation governance principle。

### 5.2 不一致或易誤解處

- README 寫「本工具有兩項先決條件」，docs/index.html 寫「安裝前置事項」分第一項 Agent Handoff Kit + 第二項基本前提，而 walkthrough 寫「3 件須先做」。三者可以理解為同一內容的不同分組，但對零認知讀者不夠一致。
- walkthrough §2 說 Node.js / npm 已包含於 Agent Handoff Kit 安裝要求，但 README / docs/index.html 沒把 Node.js 當成顯性前置；若 npm command 是核心入口，應在公開入口說清楚 Node / npx 由何處取得。
- docs/index.html 與 README 對 `init` 的未完成狀態有提醒，但「開始使用」流程仍採完成後體驗寫法，建議改成「目標體驗」或「即將提供」。
- skill / dialogue script 的 runtime 能力描述比 CLI 實際功能走得更前，應明確標為「目標 spec」。

---

## 6. 建議修補順序

### 第一批 — 阻擋修補

1. 修 README + docs/index.html 的「私人 repo」過時語句。
2. 修 README + docs/index.html 的 `aps init` 開始使用段，避免像已可完整使用。
3. 修 walkthrough 中 npm `bridge-pack` 命令，明確標示 npm 未 publish 前不可直接執行，或提供 local fallback。
4. 修 walkthrough doctor 數字，改用 `status: passed` 為主判準。
5. 修 skill / dialogue script 中未實作能力標記: `update`、clipboard、zip、`skills/aps/protocol-v1.0.md`。

### 第二批 — 品質修補

1. 統一三份公開入口對「前置事項」的分組語言。
2. 在 docs/index.html 加一句敏感資料不經 Hub 的簡短提醒。
3. 將 dialogue script 維護者層 prose 的粵語 marker 改為當代繁體書面語，保留 WhatsApp sample 內的口語。
4. 在 `dev/DOC_SYNC_REGISTRY.md` 補一行「APS product consistency audit / public promise drift」作日後同類審核入口。

---

## 7. 下一步判斷

**不可直接進入下一步 skill build。**

原因不是 APS 架構錯，而是公開入口、walkthrough、CLI、skill spec 之間的「可用狀態」未對齊。若直接推進新工作，會把已存在的漂移帶入下一層。

建議下一步:

1. 先做「阻擋修補」補丁，範圍集中於 README、docs/index.html、walkthrough、skill、dialogue script。
2. 補丁後重跑本報告第 4 節的同一組檢查。
3. 若 npm 仍未 publish，所有公開面都必須清楚標為「registry command 暫不可用」。
4. 阻擋項清零後，才進入下一步 skill / setup / dialogue 迭代。

---

## 8. 未核實 / blocked

- GitHub Pages live render:本次網頁讀取工具未能抓取 Pages 內容；本報告以本地 `docs/index.html` 等檔案為主。
- GitHub repo public 狀態:使用者已提供為 public since 2026-05-23；本次未以 GitHub API 重驗。
- 真實跨機 round-trip:仍未驗證，沿用 README / docs 的 pre-release 風險聲明。
- npm package publish:已以 `npm view` 驗證 registry 目前 `E404`，即未 publish 或不可見。

---

## 9. 檢查命令摘要

```powershell
npm view @adamchanadam/aps version dist-tags.latest dist.fileCount --json
node bin/aps.js --help
node bin/aps.js init
node bin/aps.js bridge-pack --role B
npm pack --dry-run --json
rg -n "href=[^>]*\.md|href=['\"][^'\"]*\.md" docs README.md
rg -n "4 件|四件|34 / 34|35/35|private repo|私人 repo|0\.1\.0|0\.2\.0|pre-release|前期測試|init|bridge-pack|npx @adamchanadam/aps" README.md docs package.json bin skills examples
rg -n -i "api[_-]?key|password|token|secret|credential|client_secret|github_pat_|ghp_|sk-|ntn_|ya29\.|AKIA|AIza" README.md docs skills examples bin package.json
rg -n "嘅|嗰|咗|唔|呢個|你哋" README.md docs/index.html docs/guides/index.html docs/guides/aps-onboarding-walkthrough.html docs/qc/governance-map.html skills/aps/SKILL.md docs/plans/2026-05-23-aps-skill-dialogue-script.md
git status --short
git diff --stat
```

---

## 10. Root-fix pass — 2026-05-25

### 已修補

| 原阻擋項 | 修補狀態 |
|---|---|
| APS-B1 公開狀態漂移 | README + docs/index.html 已改為 repo 已公開 + Apache-2.0 |
| APS-B2 npm 可用性與 walkthrough 衝突 | walkthrough 已明確標示 npm package 尚未 publish;外部 `npx @adamchanadam/aps bridge-pack` 暫不可用;維護者 / 測試者只可用 clone 後本地 `node bin/aps.js bridge-pack` |
| APS-B3 `init` 承諾過度像已可用 | README + docs/index.html 已改成「目前可以怎樣試」與「目標體驗」分離 |
| APS-B4 skill / dialogue spec 含未實作或不存在資源 | SKILL.md 已標成 target spec,不是 runtime guarantee;dialogue script 已移除 clipboard / zip / update 作為已可執行承諾 |
| APS-B5 doctor 數字過時 | walkthrough 已改以 `Status: passed` / `doctor status 為 passed` 為判準,不再硬寫 34/34 |

### 重跑驗收

| Check | Result |
|---|---|
| `node bin/aps.js --help` | pass |
| `node bin/aps.js init` | pass;仍明確顯示 coming soon |
| `node bin/aps.js bridge-pack --role B` | pass;輸出 `# APS Bridge Pack` |
| `node bin/aps.js bogus` | pass as negative path;exit code 1 + unknown subcommand |
| `npm pack --dry-run --json` | pass;tarball 8 entries,含 `bin/`, `skills/aps/SKILL.md`,兩個 Bridge Pack fixture |
| `npm view @adamchanadam/aps ...` | expected boundary;registry 仍回 `E404`,公開面已標明未 publish |
| `private repo\|私人 repo\|34 / 34\|34/34\|C:\\Users\\adam\|href=.*\.md` on README + public docs | pass;0 hit |
| `npx @adamchanadam/aps update\|copy 到 clipboard\|protocol-v1.0.md` on public/spec docs | pass;0 hit |
| secret / credential sweep | pass;命中皆為禁用說明或安全規則文字,無實際 credential value |
| `npx @adamchanadam/agent-handoff-kit doctor` | pass;46 項全部通過。Doctor 提示工具 / npm latest 為 v0.3.11,項目記錄為 v0.3.10;此為治理工具版本記錄差異,不屬 APS 產品一致性 blocker |

### Gate after root-fix

**可進入下一步 skill / setup / dialogue 後續設計。**
前提:若下一步要把 `bridge-pack` 或 `init` 寫成讀者可直接執行的公開命令,必須先完成 npm publish 或在公開面維持「未 publish」邊界。
