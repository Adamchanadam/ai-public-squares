# APS 全面檢審核報告 — 0.2.13 第五段 release-check（2026-05-30 S48）

## 健康結論

🔎 **0.2.13「人性化上手」候選版通過外發前檢與全面檢可跑部分；候選版已具備受閘發佈條件，只待逐項對外授權。**

- 版號已由 `0.2.12` 升至 `0.2.13`（`package.json`；`bin/aps.js` 動態讀版本，`--help` / doctor / init 卡片實測顯示 `v0.2.13 pre-release`）。
- 外發前檢（快檢 4 項 + 9 項）全部通過。
- 全面檢可跑部分（協定往返、啟動可發現性、spec-to-runtime、HTML 視覺、三條主線可跑項）全部通過。
- 唯一「受阻」屬本質後置：對外讀回（npm latest / `npx @latest` / Pages / remote）須待授權後發佈先做；sibling `Demo_Agent_*` Class-C 跨工作目錄審核須在各自 session 跑（已改用 repo 內 `examples/` fixture 驗證代替，對 npm package 發佈不構成阻擋）。

## 範圍與環境

- 候選 runtime 與 S47 第四段 UAT 嘅碼**逐字節相同**，本次唯一改動係 `package.json` 版本字串（`0.2.12`→`0.2.13`），無 runtime 行為影響。
- 隔離沙盒：OS-temp `mktemp -d` + 改 HOME / USERPROFILE 指向沙盒 + 兩個有 Handoff Kit stub 嘅工作目錄（adam_ws / jay_ws）共用同一臨時 Hub。真 Drive Hub 與真 `~/.claude` / `~/.codex` skill **全程未碰**。
- 所有 `aps init` 只用 `--dry-run` 或喺隔離沙盒跑，本 repo 治理檔與 skill 安裝目標未被改動。

## 🟡 外發前檢（快檢 4 + 9）

### 快檢
1. Agent Handoff Kit doctor：`status: passed`，45 項全過；prompt mirror（START_NEXT_SESSION_PROMPT.txt）一致；機密 sweep ok。
2. git status ↔ Workspace Identity：一致。`M package.json` 即第五段升版動作；origin/main `ff044e9`，HEAD `6d50fe3`，本地領先 10 commit（含 S47 收尾），符合交接「收尾 +1」說明。
3. 當次 session grep 驗收（release-notes 9(d) 接受項）全部命中。
4. `tools/*.ps1`：本次無改動，未適用。

### 9 項
1. **跨工作目錄佔位符**：user-facing 面 `mpedu` 0 命中、底線舊名 `AI_Public_Squares` 0 命中（已 scrub）；`docs/plans/*.md` 保留真 Hub `…\AI_Public_Squares\` 路徑作事實（刻意不 scrub）。
2. **跨面交叉閱讀**：三問框架 README / docs/index / SKILL 各 3 命中一致；舊模型 marker 0 命中；legacy alias 保留。
3. **HTML 視覺**：`<section>` 配對 index 10/10、guides hub 3/3、walkthrough 16/16、join-invite 7/7、maintainers 5/5；docs 內 0 本地 `.md` 超連結；瀏覽器 render（本機 http server）入口頁 0 console error、walkthrough 0 console error、加入頁僅 `favicon.ico` 404（裝飾性、非頁面缺陷），SVG 流程圖正常顯示。
4. **PII / secrets**：user-facing 面 0 真機密；2 個命中均為 skill 自身「發包前掃 credentials / API key / PII 即停手」安全指引文字，屬正路。
5. **語氣與用語**：內部 code 無作句子主語。`bin/aps.js:1842`「設定起手方向」僅為 `config` 指令顯示既存 role 欄，緊接 1843 行明寫「起手方向只影響設定時的預設,不影響日後誰可發送 / 接收」——符合新模型口徑（role 永不授權），非 init 提問、非教學層漂移，已清。
6. **新安裝 / 升級路徑**：兩條路徑文檔齊；skill `description` 729 ≤1024 且 plain scalar 0 個冒號加空格（YAML 合法）；含方括號 `[Project]` 真實路徑 `init --dry-run` exit 0（0.2.10 佔位符防呆回歸保持）；候選 CLI 實測顯示 `v0.2.13`。
7. **交接命名 / 品牌版本分流**：skill 9 處提及 Agent Handoff Kit 全為「不得輸出 Kit 啟動卡 / continuity ready / 把 APS 版本當 Kit 版本」嘅硬規則（明文禁止混淆，非真係輸出 banner）；APS packet 與 session handoff 有澄清路由。
8. **雲端支援邊界**：Dropbox / OneDrive 明寫「未正式驗證的實驗路徑,不得主動推薦為正式支援」；核心不需雲端 API / OAuth。
9(d). **行為真源對齊（CLI ↔ skill ↔ 公開頁）**：教學層（README / docs HTML / SKILL / setup-dialogue）舊模型 marker 0 命中；候選 CLI 實測 init 三問、只建自己一邊、計劃內 0 starter pack；唯一「設定起手方向」命中為 CLI 自身 config 顯示並附正確免責句（見第 5 項）。**結構檢查與行為對齊兩者皆過，且未互相代替。**

## 🔴 全面檢（6 人工/跨工作目錄 + 三主線 + 橫切 + 流程）

### 隔離沙盒 0.2.13 協定往返（本次新鮮證據，GREEN）
| 步驟 | 結果 |
|---|---|
| adam `init`（三問、只建自己一邊、`Agent_Public_Squares` 資料夾） | exit 0 ✅ |
| adam `doctor`（solo） | exit 0「本機核心齊全」✅ |
| `publish` 無收件對象 | exit 1 + 可操作指引（`未指定收件對象` / `--to` / `peer add`）✅ |
| `peer add --agent-id jay` | exit 0；starter pack `starter-pack-rc_proj-jay.md`（項目分項）；內含 `Agent_Public_Squares` + `aps-join-invite` 連結；0 舊名 ✅ |
| `publish --to jay`（jay provisional 無活動） | **硬擋 exit 1**「jay is provisional and has no activity yet…」✅ |
| jay `init`（加入、自我確認） | exit 0 ✅ |
| adam `publish --to jay --items "alpha;beta"` | exit 0；frontmatter `- id: "alpha task"` / `"beta task"` **原文** ✅ |
| jay `inbox` | 見封包 +「項目:alpha task,beta task」✅ |
| `revise` 無 `--items` | v2 保留 2 項 ✅ |
| `revise --clear-items` | v3 `items` 0 項 ✅ |
| jay `consume` | exit 0；`jay.ack.json` `consumed[]` 寫入 1 條 ✅ |

S47 第四段 UAT（同碼）另已覆蓋 `withdraw` 與舊兩人 config「publish 無 `--to` 警告並照送、不硬擋」。

### 6 項
1. **Class-C 跨工作目錄**：repo 內 `examples/demo-agent-{a,b}` fixture 佔位符乾淨（0 舊名、0 mpedu、中性 token `<your_shared_drive_folder_absolute_path>` 4 處一致）。sibling `Demo_Agent_{Adam,Jay}_Public_Squares` 須各自 session 審核 → **受阻**（按 active-root 規矩；對 npm package 發佈不構成阻擋）。
2. **協定往返回歸**：見上表，GREEN。
3. **啟動可發現性 / 橋接 trace**：`init --dry-run` 顯示會註冊 APS route 入 `dev/RULE_PACKS.md` + `dev/PROJECT_INDEX.md`。
4. **五區段 / 自審回顧**：近 S43–S47 透過 9(d) 機制連續捕捉結構過/模型漂移類問題；本次發佈無系統性盲點殘留。
5. **審核報告**：本檔。
6. **Spec-to-runtime**：CLI↔skill 行為對等（9(d)）；`description` 729 ≤1024；三條觸發入口（教我用 APS / AI Public Squares / Agent Public Squares）齊（6 / 5 / 5 命中）。

### 三條主線
1. **公開承諾一致性** — 通過（三問 / items / 邀請模型跨 README / docs / skill / CLI 一致；前期測試版框架保留）。
2. **發佈前可信度** — 候選可被外部理解；對外狀態（npm registry / Pages live / remote）**待發佈後讀回**（受閘）。
3. **協定實際運行正確性** — 通過（隔離往返 + UAT）。

## 阻擋 / 受阻 / 待辦

- **受阻（本質後置）**：對外讀回 npm latest、`npx --yes @adamchanadam/aps@latest --help`（預期 v0.2.13）、GitHub Pages live、remote branch / tag — 須喺授權發佈後即跑。
- **受阻（須各自 session）**：sibling `Demo_Agent_*` Class-C 審核（已用 repo 內 fixture 代驗）。
- **觀察（非發佈阻擋）**：Agent Handoff Kit 工具 npm latest 已 v0.3.17，項目記錄 v0.3.14；doctor 照過、只檢查不改檔。屬獨立 Kit 升級任務（AGENTS.md §2.1），不在 0.2.13 APS 發佈範圍，不應中途擅自做。

## 重跑 / 發佈計劃（受閘，每項各自授權）

1. 本機提交：`package.json` 升版 + 本報告 + S48 收尾（本地 commit）。
2. `npm publish --access public`。
3. `git push origin main`。
4. GitHub Pages 讀回。
5. GitHub release：tag `v0.2.13` + 內文取自 `dev/release-notes/v0.2.13.md`。
6. 發佈後讀回（主線 2）全部對齊先可宣稱完成。

— 報告完 —
