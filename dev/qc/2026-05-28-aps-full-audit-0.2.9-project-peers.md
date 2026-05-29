# APS 全面檢報告 — 0.2.9 Project Peers + Sent Status

日期: 2026-05-28  
範圍: local `@adamchanadam/aps@0.2.9` candidate、`AI_Public_Squares_UAT`、`AI_Public_Squares_UAT_JAY`、`AI_Public_Squares_UAT_FANNY`、G: APS Hub、README / public HTML / skill / governance truth。

## 健康結論

**本地 0.2.9 candidate 通過本輪 Project Peers 核心 UAT。**  
已修正本輪全面檢發現的三個阻擋問題:

1. Fanny 曾可在 `inbox --all` 看到不屬於自己的 packet,且可嘗試 consume。
2. `Agent Public Squares` 入口曾被 Claude headless 走到 Agent Handoff Kit onboarding。
3. README / docs / skill 曾把 `Agent Public Squares` 寫成「自然語言別名」,未符合 Adam 最新品牌口徑。

修正後,CLI / UAT / `claude -p` 入口重測均通過。  
**但這不是外部 release pass。** 目前 npm latest 仍是 `0.2.8`;本輪 0.2.9 仍未 commit、push、tag、release 或 npm publish。

## 阻擋項與處理

| 項目 | 發現 | 處理 | 結果 |
|---|---|---|---|
| 收件隔離 | `pendingPackets()` 只按來源 lane 與 ack 計算,未按 packet header `to` 過濾;Fanny 可看到 Jay / Adam 互相交接的舊 packet。 | `pendingPackets()` 改為讀 header `to`;`consumePacket()` 新增 incoming packet 檢查,只允許當前 agent consume 寫給自己的 packet。 | 通過。Fanny `inbox --all` 不再顯示不屬於自己的 packet;錯誤 consume 會回報 packet receiver 是 `adam`。 |
| 狀態查詢方向 | Adam 用 `status --packet-id` 查 Jay 發來的 packet 時只報找不到,容易被理解成工具壞。 | `status` catch 增加提示:`status --packet-id` 只查本機 agent 自己發出的交接包;對方交來的新內容用 `inbox --all` 或 `inbox --from`。 | 通過。錯向查詢有清楚提示。 |
| `Agent Public Squares` 入口 | `skills/aps` 已有觸發詞,但 `aps init/upgrade` 寫入 `dev/RULE_PACKS.md` 的 route row 未包含 `Agent Public Squares` / `教我用 Agent Public Squares`。 | `registerHandoffKitIntegration()` route row 與 project-index managed block 增加 `Agent Public Squares`、`教我用 AI Public Squares`、`教我用 Agent Public Squares`。 | 通過。`claude -p "教我用 Agent Public Squares"` 改為 APS 品牌卡 + peers 狀態,未再輸出 Agent Handoff Kit banner。 |
| 品牌口徑 | 部分文字仍稱 `Agent Public Squares` 是自然語言別名。 | README、public HTML、walkthrough、skill、project index、doc sync registry 改為「AI Public Squares 與 Agent Public Squares 是同一品牌、同一產品的名稱變體;APS 是簡稱」。 | 通過。舊口徑掃描 0 命中。 |

## 快檢

| 檢查 | 結果 | 證據 |
|---|---|---|
| Handoff Kit doctor | 通過 | `npx --yes @adamchanadam/agent-handoff-kit@latest doctor` 回報 `status: passed`;只有 SESSION_LOG N-rule closeout 警告。 |
| 工作樹 / handoff 敘述一致 | 通過 | handoff / project index 記錄 local 0.2.9 uncommitted candidate。 |
| Acceptance grep | 通過 | route、brand、HTML `.md` href、trigger wording、candidate boundary 均已掃描。 |
| PowerShell tooling parse | 未適用 | 本輪未改 `tools/*.ps1`。 |

## 外發前檢

| 檢查 | 結果 | 證據 |
|---|---|---|
| 佔位符 / 路徑審核 | 通過 | 具體 `G:\...` / `adam` / `jay` / `fanny` 命中均屬示例、UAT、歷史計劃或本機設定說明;public docs 已提醒對方不能使用發送方本機路徑。 |
| 跨面一致性 | 通過 | README / docs / skill / route / registry 口徑一致:0.2.9 是本地候選;Project Peers 仍是單收件 packet;Agent Public Squares 同品牌。 |
| HTML `.md` hyperlink | 通過 | `rg` 掃描 `docs/**/*.html` 無本地 `.md` href。 |
| PII / secrets | 通過 | 命中皆為安全規則文字或 credential 禁止說明,未見實際 credential value。 |
| 新安裝 / 升級 | 通過 | UAT install / upgrade 已刷新 skill、bridge、route、project index;starter pack 已包含 Agent Handoff Kit preflight。 |
| 品牌版本分流 | 通過 | APS 品牌卡與 Agent Handoff Kit banner 分離;`claude -p` 入口重測未再輸出 Handoff Kit banner。 |
| 雲端邊界 | 通過 | 公開面仍只承諾 Google Drive 主路徑;不要求 Google Drive API / OAuth / developer project。 |

## 全面檢六項

| 項目 | 結果 | 證據 |
|---|---|---|
| Class-C 跨工作目錄審核 | 接受風險 | 本輪重點是 0.2.9 UAT workspaces;歷史 demo workspaces 未改。需要協定升版時再於各 owning workspace 跑。 |
| 協定往返流程回歸 | 通過 | Adam / Jay / Fanny UAT 覆蓋 `publish --to`、`inbox --all/from`、`consume`、`status`、`revise`、provisional / unknown / invalid peer blocks。 |
| 啟動可發現性 | 通過 | `aps upgrade` 更新 UAT `dev/RULE_PACKS.md` 與 `dev/PROJECT_INDEX.md`;`claude -p` 三條入口均可進 APS flow。 |
| 五區段與自審回顧 | 通過 | 本輪暴露兩個原本 QC 漏洞:receiver filtering 與 route alias;均已轉為 runtime / route 機制。 |
| 審核報告 | 通過 | 本檔。 |
| Spec-to-runtime 落差 | 通過但需後續人工 UAT | `claude -p` 抽查 `教我用 APS`、`教我用 AI Public Squares`、`教我用 Agent Public Squares` 均走 APS;Adam 互動式 Claude UAT亦已驗過 invite / provisional block / status / check Hub。仍建議 Adam 在正式 release 前再開新 Claude session 人手跑一次。 |

## 三條主線

| 主線 | 結果 | 說明 |
|---|---|---|
| 公開承諾一致性 | 通過 | Public HTML 沒有宣稱 0.2.9 已發布;README 明確 `npm latest 0.2.8` 與 local 0.2.9 candidate 邊界。 |
| 發佈前可信度 | 通過但非 release pass | `npm view` 讀回 latest `0.2.8`;`npm pack --dry-run --json` 顯示 0.2.9 tarball fileCount 14。尚未授權 commit / publish。 |
| 協定實際運行正確性 | 通過 | 多 peer receiver filtering、consume guard、confirmed peer status、wrong-direction status hint 均有 UAT 證據。 |

## 四條主要使用流程

| 流程 | 結果 | 說明 |
|---|---|---|
| 零認知讀者入口 | 通過 | README / public HTML 保留 pre-release 邊界與新安裝前置;品牌口徑已改為同品牌名稱變體。 |
| 手動設置與版本升級 | 通過 | UAT `npx aps upgrade` 刷新 Claude / Codex skill、route、project index,並保留 Hub packet / ack。 |
| 日常協作 | 通過核心路徑 | Adam / Jay / Fanny UAT 已覆蓋發包、收件、consume、status、revise。AI 自然語言仍建議再做一輪人工 release-check。 |
| 出錯補救 | 通過本輪關鍵錯誤 | wrong-recipient consume、wrong-direction status、starter pack preflight 缺失均有清楚錯誤與修補。 |

## 命令證據摘要

- `node --check bin\aps.js`: pass
- `node bin\aps.js --help`: pass, v0.2.9 Traditional Chinese help
- `npm test`: pass, placeholder-only
- `npm pack --dry-run --json`: pass, `@adamchanadam/aps@0.2.9`, fileCount 14
- `git diff --check`: pass, LF→CRLF warnings only
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json`: latest `0.2.8`, fileCount 14
- `npx --yes @adamchanadam/agent-handoff-kit@latest doctor`: pass, SESSION_LOG N-rule warning only
- UAT: Fanny wrong-recipient consume fails with receiver `adam`; Adam wrong-direction `status` shows guidance; Fanny confirmed flow status shows consumed.
- `claude -p "教我用 Agent Public Squares"` after route fix: APS brand card, v0.2.9, peers `jay` / `fanny`, no Agent Handoff Kit banner.

## 重跑計劃

如 Adam 要把 0.2.9 外發,下一步不是再加功能,而是:

1. 由 Adam 在新 Claude session 人手跑一次 `教我用 APS` / `教我用 Agent Public Squares` / 邀請 peer / 發給 Fanny / status / check Hub。
2. 跑外發前檢。
3. 取得 Adam 明確授權後,才 commit / tag / GitHub release / npm publish。
4. Publish 後必讀回 npm latest、`npx --yes @adamchanadam/aps@latest --help`、GitHub release、GitHub Pages、remote branch / tag。
