# APS 全面檢報告 — 0.2.12「正名與框架」候選

- 日期:2026-05-29(S44)
- 範圍:0.2.12 rebrand(Agent Public Squares）+ 用語切換（check Drive / 共用 Drive 資料夾）+ onboarding walkthrough 多 peer 重寫 + GitHub repo 改名本機同步
- 觸發:Adam 明示「完成修改後做 🔴 全面檢」
- 審核對象 commit:`6089486`(working tree clean）
- 結論:**通過**(機械 + 內容 + 協定往返 + render + spec-to-runtime 全綠);唯一未行係兩部實體機真機往返(受阻,需 Jay 重裝 @latest,屬發佈後 UAT)

## 一、嵌套快檢(4 項)

| 項 | 結果 |
|---|---|
| Handoff Kit doctor | `status: passed`(46 checks, 0 failed) |
| git 狀態一致 | working tree clean,commit `6089486` |
| 當次 grep acceptance | 見下方各項,全部命中 |
| tools/*.ps1 改動 | 無改動,不適用 |

## 二、外發前檢(13 項;機械批)

| # | 項 | 結果 |
|---|---|---|
| 1 | 跨工作目錄佔位符(demo slug mpedu) | active surface 0 命中 ✅ |
| 2 | 跨面交叉閱讀(品牌 / 用語) | 五頁 + skill + CLI 一致 ✅ |
| 3 | HTML render 視覺確認 | 見第四節 ✅ |
| 4 | PII / secrets sweep | 0 命中 ✅ |
| 5 | 語氣與用語(prose Hub 殘留) | 用戶面 prose 0;剩餘全為結構詞 / code comment / recognition ✅ |
| 6 | 新安裝 / 升級 + skill desc ≤1024 + YAML | desc 729,bad-colon false;`upgrade` 路徑見第三節 ✅ |
| 7 | 交接命名 / 品牌版本分流 | skill 防呆規則在(不得輸出 Handoff Kit 啟動卡 / continuity ready）✅ |
| 8 | 雲端 / 產品路線邊界 | Google Drive 主路徑、Dropbox/OneDrive 未承諾;延後路線未寫成已支援 ✅ |
| 9 | **User-facing 文檔內容與產品模型深審(本版新增）** | 入口頁 + walkthrough 多 peer 模型一致;流程圖顯示揀收件對象;用語跨頁一致 ✅ |
| — | 舊 slug ai-public-squares | 0 ✅ |
| — | 硬版本號 0.2.x(公開面) | 0(SKILL L256「0.2.0」為相容說明,非版本聲明) ✅ |
| — | npm pack | v0.2.12 / 14 檔齊全 ✅ |
| — | node --check | OK ✅ |

## 三、協定實際運行正確性(隔離 Hub 往返回歸)

於臨時隔離目錄(雙 project + Agent Handoff Kit 前置 + 共用 Hub)跑完整往返,全綠:

- A `init --role A` exit 0;B `init --role B` exit 0
- A `publish --to jay --body-file` → `✅ 已發佈 …__fullchk_rt v1`
- B `inbox --all` → 正確隔離顯示「APS 共用 Drive 資料夾: jay 有 1 個待處理項目 / 來源 adam」
- B `consume` → `✅ 已標記處理`,寫入 jay.ack.json
- A `status --packet-id`(發送方查自己 packet)→ `✅ 收件方已標記處理。結果: read in fullcheck roundtrip`
- A `close` → `✅ 已收結`;下一步提示用「check Drive」
- B `doctor` → `🩺 APS 共用 Drive 資料夾 doctor v0.2.12`、`☁️ 共用 Drive 資料夾 root`、本機 config / bridge 正常
- 結論:rebrand + 用語切換後,協定發佈 / 收件 / 隔離 / 消化 / 狀態 / 收結 / 診斷行為**無 regression**;新用語在 runtime 輸出一致。scratch 已清。

## 四、發佈前可信度(HTML render,本機 HTTP server + Playwright)

五頁 render,console error 全 0(已扣 favicon 404):

| 頁 | nav 品牌 | 舊品牌 prose | check Drive | check Hub | Hub 概念 |
|---|---|---|---|---|---|
| index | Agent Public Squares | 0 | ✓ | 0 | 0 |
| guides | Agent Public Squares | 0 | ✓ | 0 | 0 |
| walkthrough | Agent Public Squares | 3(legacy alias / 前稱) | ✓ | 0 | 0 |
| maintainers | Agent Public Squares | 0 | — | 0 | 0 |
| governance-map | Agent Public Squares | 0 | ✓ | 0 | 1(APS Hub doctor 結構詞) |

walkthrough 流程圖經 DOM 核實:有「揀今次交俾邊位對象（例：Jay / Fanny）」、「你揀嘅對象說 check Drive」、多 peer 設計心思;install 段無承諾 0.2.13 三問安裝,對方 id 仍照舊問。

## 五、spec-to-runtime(三入口 + 品牌分流)

- frontmatter description:教我用 APS / AI Public Squares / Agent Public Squares / check Drive 全部在
- body routing:Agent Public Squares 出現 5 處;收件觸發詞「check Drive」「check Hub」並列
- CLI route 註冊:`check Drive / check Hub` 兩處;`--help` exit 0
- 品牌分流:skill 兩處「continuity ready」均為「不得輸出」禁止規則本身,非實際輸出 ✅

## 六、GitHub / 發佈邊界

- repo 改名 `Adamchanadam/agent-public-squares`（PUBLIC,gh repo view 核實）;`git ls-remote origin` 連到 main
- 新 Pages URL 回 200;舊 Pages URL 404(GitHub 官方:Pages 不自動轉址)
- 9 條 in-file URL + git remote 已同步新 slug;舊 slug 殘留 0
- live Pages 仍顯示舊品牌,因 0.2.12 未 push —— 屬階段 6 自然結果,非缺陷

## 七、阻擋 / 受阻 / 接受風險

- **受阻(發佈後 UAT)**:兩部實體機真機 Google Drive 往返、人類互動式 UX UAT —— 需 Jay 重裝 `@latest` 後驗;不屬本機可完成項,沿用上版邊界。
- **接受風險**:無新增。
- **阻擋項**:無。

## 八、結論

0.2.12 候選通過 🔴 全面檢三條主線 + 橫切保障 + 五流程(真機往返一條標受阻)。可進入發佈閘(npm publish + push),屬不可逆外部操作,需 Adam 明示授權。
