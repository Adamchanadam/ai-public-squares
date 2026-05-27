# APS 0.2.4 候選版全面檢報告

日期: 2026-05-27  
範圍: `@adamchanadam/aps` local `0.2.4` candidate  
結論: 通過本地發佈前全面檢。可進入 commit / push / tag / GitHub pre-release / npm publish，但仍必須保持 pre-release，且 push 後要重做 GitHub Pages readback。

## 1. 健康結論

`0.2.4` 候選版主要修正新用戶設置 UX:互動式 `npx aps init` 的繁體中文提示、欄位用途說明、Google Drive 本機 `AI_Public_Squares` 路徑說明、ASCII / emoji 視覺提示、中文寫入狀態、中文 starter pack、安裝後 AI 首次使用流程，以及涉及 Google Drive / Connector / MCP / Claude Code / Codex / npm / GitHub 設置問題時先查官方來源的規則。

本次全面檢繼承並重跑外發前檢與快檢。檢查中發現三個 UX / 文件漂移點並已修正:

1. README、`docs/index.html`、CLI 示例中曾出現 Adam 個人 Google Drive 路徑作為公開例子,已改為通用例子 `G:\我的雲端硬碟\AI_Public_Squares`。
2. `skills/aps/references/setup-dialogue.md` 曾把 starter pack 位置寫成 `<hub_root>/<project_slug>/_hub/...`,已對齊 CLI 實際位置 `<hub_root>/_hub/starter-pack-<other_agent_id>.md`。
3. `bin/aps.js` 的錯誤提示曾把 `G:\...\AI_Public_Squares` 當正面例子,已改為完整形狀的 Google Drive 路徑例子。
4. 發佈前 hardcode 掃描後,通用面不再把 Adam / Jay 寫成 default 或主流程主體。保留的 `adam` / `jay` 只在明確 example、demo fixture、author metadata 或 walkthrough 已聲明的敘事 sample 內出現。

## 2. 三條主線

| 主線 | 結果 | 證據 |
|---|---|---|
| 公開承諾一致性 | 通過 | README、`docs/index.html`、教學中心、walkthrough、`docs/qc/governance-map.html`、CLI help、skill spec 均維持 `0.2.3` 為 npm latest,`0.2.4` 僅為本地候選版。自然語言日常操作與補救流程仍標明為前期測試。 |
| 發佈前可信度 | 通過,需 post-push readback | `npm view @adamchanadam/aps ...` 確認 registry latest = `0.2.3`;GitHub release `v0.2.3` 是 pre-release 且非 draft;GitHub Pages 線上頁已核實仍是上次推送的 `0.2.3` 內容。線上頁尚未含本地修正,須在 push 後再讀回。 |
| 協定實際運行正確性 | 通過 | 同機回歸 `dev/qc/evidence/2026-05-27-full-check-024-final3-20260527-142328/` 完成 init → doctor → publish → inbox → consume → revise → inbox v2 → consume v2 → close → publish withdraw path → withdraw → Adam / Jay inbox 無待辦。 |

## 3. 四條主要使用流程

| 流程 | 結果 | 覆蓋 |
|---|---|---|
| 零認知讀者入口流程 | 通過 | README → `docs/index.html` → `docs/guides/index.html` → walkthrough 均能分清目前可試、目標體驗、pre-release 邊界。 |
| 手動設置流程 | 通過 | 互動式 init 回歸顯示角色、項目代號、agent id、Hub root path、寫入前計劃、yes 確認、skill install、Hub skeleton、Bridge Pack、starter pack、`.aps/config.json` 均能落地。 |
| 日常協作流程 | 通過 | 回歸覆蓋 publish、receiver inbox、copy-ready consume、consume、revise、close、withdraw、最終 no pending。 |
| 出錯補救流程 | 通過 | Skill spec 使用 `doctor`、`inbox`、`revise`、`withdraw`、停手確認與官方來源查證;CLI 必填參數缺失時拒絕並顯示明確錯誤。 |

## 4. 十四項檢查結果

| 項目 | 結果 | 證據 / 備註 |
|---|---|---|
| 1. Agent Handoff Kit doctor | 通過 | 主 workspace doctor 通過 46 項;僅提醒 SESSION_LOG 下次 closeout 應推進 N-rule。 |
| 2. git status 與 handoff 一致 | 通過 | 工作樹仍為本地 `0.2.4` 候選變更,未 commit;handoff / index 已記錄此狀態。 |
| 3. acceptance grep | 通過 | 三條主線與四條流程在 `dev/qc/triggers.md`、公開 HTML 中命中;HTML `.md` hyperlink 掃描 0 命中。 |
| 4. tools parse / dry-run | 不適用 | 本次未修改 `tools/*.ps1`。 |
| 5. 跨工作目錄佔位符審核 | 通過 | 通用公開面已無 Adam 個人路徑作 default;保留的 `...` 命中為警告、佔位符教學、protocol schema 或 example-labeled 段落。Adam / Jay 命中已分類:明確 sample / demo fixture / author metadata 可保留;通用主流程已改為對方、協作夥伴、User A / User B 或維護者驗證。 |
| 6. 三處交叉閱讀 | 通過 | README / public docs / skill / setup dialogue / CLI 對 guided init、starter pack、post-install first-use、pre-release 邊界一致。 |
| 7. HTML preview | 通過 | Chrome DevTools snapshot 已保存四頁:入口、教學中心、完整落地教學、治理地圖;console 無訊息。截圖擷取曾逾時,不計入證據。 |
| 8. PII / secrets sweep | 通過 | 掃描命中皆為安全政策文字或示例,無實際 credential。 |
| 9. 語氣與用語紀律 | 通過 | 公開文檔維持繁體書面語;粵語只出現在觸發句 quote 或日常短訊示例。 |
| 10. Class-C 跨工作目錄審核 | 通過 | Demo Adam / Jay workspace doctor 均通過 46 項;demo Bridge Pack 內舊 slug 與 Adam Hub path 屬 owning workspace identity,不是通用模板 default。Drive Hub `_hub/PROTOCOL.md` 可讀,未見專案私有 slug。 |
| 11. 同機往返回歸 | 通過 | `dev/qc/evidence/2026-05-27-full-check-024-final3-20260527-142328/summary.json` 顯示 Adam / Jay 最終 inbox 均無待辦。 |
| 12. Bridge Pack startup addendum trace | 通過 | `inbox` pending 計算與 copy-ready consume 指令在回歸中出現;consume 後 ack 生效;close / withdraw 後不再成為待辦。 |
| 13. 五區段 + 自審紀律回顧 | 通過 | 本次回歸暴露測試腳本兩次漏必填參數:先漏 `revise --reason`,再漏 `close --reason`。產品 CLI 正確拒絕,但日後回歸腳本須直接沿用 `--help` / CLI output 的完整命令形態。 |
| 14. 審核報告 | 通過 | 本檔即報告。按用戶要求,報告先落地;commit / push / publish 須另等明確批准。 |

## 5. 主要命令證據

- `node ... agent-handoff-kit.mjs doctor --root C:\Users\adam\_claude_desktop\AI_Public_Squares` → passed 46 checks, one SESSION_LOG N-rule warning only。
- `node --check bin\aps.js` → passed。
- `npm test` → passed。
- `npm pack --dry-run --json` → `@adamchanadam/aps@0.2.4`, 14 files, includes `bin/aps.js`, `skills/aps/SKILL.md`, `skills/aps/references/setup-dialogue.md`, `resources/protocol/*`, examples, README, LICENSE。
- `git diff --check` → no whitespace errors;Windows LF → CRLF warnings only。
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json` → version/latest `0.2.3`, bin `aps`, fileCount 14。
- `gh release view v0.2.3 ...` → `isPrerelease=true`, `isDraft=false`。

## 6. 阻擋項與接受風險

阻擋項:無。

接受風險:

1. GitHub Pages 線上頁仍是上一個已推送版本,所以目前線上頁尚未包含 `0.2.4` 本地修正。這是 commit / push 前的正常狀態;push 後必須讀回確認。
2. 本次未要求 Jay 另一部真機重新跑 guided `npx aps init`;候選版只完成同機回歸與本地 UX / 文檔一致性全面檢。`0.2.4` 發佈後仍應安排 Adam ↔ Jay 從 npm latest 再跑一次真機試用。
3. 自然語言日常操作與補救流程仍屬前期測試,不可宣稱生產可用。

## 7. 重跑計劃

若進入發佈:

1. commit 本次候選版與本報告。
2. push `main`。
3. tag `v0.2.4`。
4. 建立 GitHub pre-release。
5. `npm publish --access public`。
6. 讀回 npm registry、GitHub release、GitHub Pages;確認 Pages 已出現本地修正後,才通知 Adam / Jay 使用最新版再試。
