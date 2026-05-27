# APS 全面檢報告 — 0.2.3 guided setup pre-release

日期: 2026-05-27
範圍: `@adamchanadam/aps` 0.2.3 pre-release,發布前本機全面檢與發布後 npm / git 讀回
單一真源: `dev/qc/triggers.md`

## 健康結論

**結論: 本機全面檢通過,但 GitHub Pages 線上讀回受阻;不得宣稱線上 Pages 已反映 0.2.3。**

0.2.3 pre-release 已把新用戶主路徑改為互動式 `npx aps init`:工具逐步詢問角色、項目代號、雙方 agent id 與真實 Hub 路徑,列出寫入計劃,只在使用者輸入 `yes` 後寫入。全面檢期間發現一個日常協作 UX 缺口: `inbox` 原本沒有列出可直接複製的 `consume` 命令。已即時修正為每個 pending packet 顯示完整 `npx aps consume --packet-id ... --version ... --result ...` 命令,並以同機回歸重新驗證。

發布後讀回確認 `npm latest` 已為 0.2.3,遠端 `main` 與 tag `v0.2.3` 均指向 `6e8fb30`。GitHub release 建立時回傳 URL,但後續 `gh release view` 因本機代理連線拒絕而未能讀回;GitHub Pages live readback 亦受阻,需稍後重試。

## 三條主線

| 主線 | 狀態 | 證據 |
|---|---|---|
| 公開承諾一致性 | 通過 | README、本機 `docs/index.html`、教學中心、完整落地教學、QC 卡片、CLI help、skill spec 均指向 npm latest 0.2.3 pre-release 互動式設置,並保留自然語言日常操作與補救流程仍屬前期測試的邊界。 |
| 發佈前可信度 | 通過,附線上讀回受阻 | `npm pack --dry-run --json` 顯示 0.2.3 包含 14 個預期檔案;`npm view` 確認 registry latest 仍為 0.2.2。本機 HTML 已用 Chrome DevTools 渲染。GitHub Pages 讀回在本環境連線被拒,故不得宣稱線上頁已更新。 |
| 協定實際運行正確性 | 通過 | 全新 disposable Hub 完成 `init`、`publish`、`inbox`、`consume`、`revise`、再次 `inbox`、`consume` v2、`close`、另一 packet `withdraw`、雙方 `inbox` 無待處理、`doctor status: passed`。 |

## 主要使用流程

| 流程 | 狀態 | 證據 |
|---|---|---|
| 零認知讀者入口流程 | 通過 | README → `docs/index.html` → `docs/guides/index.html` → walkthrough 均說明目前可試的是 npm latest 0.2.3 pre-release 互動式 CLI。 |
| 手動設置流程 | 通過 | walkthrough 與 CLI 均以 `npm install --save-dev @adamchanadam/aps` → `npx aps init` 為主路徑;本機回歸建立 skill、Hub skeleton、Bridge Pack、starter pack 與 `.aps/config.json`。 |
| 日常協作流程 | 通過 | 回歸覆蓋 publish → receiver inbox → consume → revise → consume v2 → close,最後 Adam / Jay 兩方 inbox 均無待處理。`inbox` 現在直接顯示可複製的 consume 命令。 |
| 出錯補救流程 | 通過,附前期測試邊界 | 回歸覆蓋 `withdraw` 後 receiver inbox 不再顯示該 packet;`doctor` 檢查 Hub skeleton 與 conflict-like filenames。Drive 真實延遲、實際 conflict 副本、wrong-lane 人手誤寫仍未在 0.2.3 重新製造,公開面仍標示前期測試。 |

## 十四項檢查結果

| 項目 | 狀態 | 結果 |
|---|---|---|
| 1. Agent Handoff Kit doctor | 通過 | 主 workspace doctor 通過 46 項;只有既有 SESSION_LOG N-rule warning。 |
| 2. git status 與 handoff 一致 | 通過 | 全面檢開始時 `HEAD` 為 `e23e1db`;全面檢期間只新增 `bin/aps.js` UX 修正與本報告 / 狀態記錄。 |
| 3. 本次 acceptance grep | 通過 | HTML `.md` hyperlink audit 0 hits;發布後 wording scan 已修正公開入口;治理詞彙掃描確認公開 HTML 反映三條主線與四條流程。 |
| 4. `tools/*.ps1` | 不適用 | 本次未修改 `tools/*.ps1`。 |
| 5. 跨工作目錄佔位符審核 | 通過 | `mpedu_plus_branding` / MPEdu 命中只在歷史計劃與明示示例;active package surface 無滑入通用 default。 |
| 6. 三處交叉閱讀 | 通過 | 公開入口、walkthrough、Bridge Pack / skill 對互動式 setup、Hub skeleton、packet、ack、close / withdraw 的敘述一致;0.2.3 標示為已發布 pre-release。 |
| 7. HTML preview | 通過 | Chrome DevTools 渲染 `docs/guides/index.html` 並確認 `最新更新 2026-05-27`;console 無警告或錯誤。早前外發前檢亦已渲染入口、walkthrough、governance-map。 |
| 8. PII / secrets sweep | 通過 | 命中皆為安全政策、禁止條款、placeholder 或 CSS design token 文字;未見實際 credential。 |
| 9. 語氣與用語紀律 | 通過 | 公開入口使用繁體中文書面語;必要英文保留為產品、檔案、CLI 或 trigger 詞。`Bridge Pack` / `PROTOCOL.md` 等作為檔名或產品術語出現,未取代使用者可理解的流程描述。 |
| 10. Class-C 跨工作目錄審核 | 通過,附接受風險 | `resources/protocol/PROTOCOL.md` 與 package demo Bridge Pack fixture 使用通用 placeholder / example。Demo Adam / Demo Jay workspace doctor 各 46 項通過;其本地 `aps-bridge.md` 仍有 `mpedu_plus_branding` 與 Adam Drive 路徑,但它們是 demo workspace 身分設定,且按 active-project-root rule 本 session 只收集結果、不跨根修改。 |
| 11. MVP 形式往返流程回歸 | 通過 | `dev/qc/evidence/2026-05-27-full-check-023-final2-20260527-123911/` 完成設置、發布、收件、消化、修訂、消化 v2、收結、撤回,最後雙方 inbox 無待處理。 |
| 12. Bridge Pack startup addendum trace | 通過 | `inbox` 先列 pending,消化後按版本重新計算;修訂後顯示 v2;撤回後不再顯示 withdrawn packet;close 後不再顯示 settled packet。 |
| 13. 五區段 + 自審紀律回顧 | 通過 | 本輪先發現兩個測試執行缺口:漏傳必要 flags、手動猜 packet id。改用真實 packet id 解析後重跑。另發現 CLI `inbox` 缺少完整接受命令,已即時修正並重跑。 |
| 14. 審核報告輸出 | 通過 | 本檔為 0.2.3 全面檢報告;須與狀態檔一併 commit 後,才可宣稱本輪全面檢完成。 |

## 命令與證據

- `node C:\Users\adam\_claude_desktop\_Prompt_Template\ai-session-governance_v2\bin\agent-handoff-kit.mjs doctor --root C:\Users\adam\_claude_desktop\AI_Public_Squares`:46 項通過,只有 SESSION_LOG N-rule warning。
- `node --check bin\aps.js`:通過。
- `node bin\aps.js --help`:通過。
- `npm test`:通過。
- `npm pack --dry-run --json`:`@adamchanadam/aps@0.2.3`,14 files。
- `git diff --check`:通過;只有 LF→CRLF warnings。
- `npm view @adamchanadam/aps version dist-tags.latest bin dist.fileCount --json`:latest 為 0.2.3,bin `aps`,fileCount 14。
- `git ls-remote --heads origin main`:遠端 `main` 指向 `6e8fb30a4d4d349e20c0832b09d68da1a147b6eb`。
- `git ls-remote --tags origin v0.2.3`:tag `v0.2.3` 指向 `6e8fb30a4d4d349e20c0832b09d68da1a147b6eb`。
- GitHub release create:成功建立 `https://github.com/Adamchanadam/ai-public-squares/releases/tag/v0.2.3`;後續 `gh release view` 受本機代理連線拒絕,需稍後重試。
- HTML `.md` hyperlink audit:`rg -n "href=[^ >]+\.md" docs` 無命中。
- placeholder scan:`mpedu_plus_branding` 命中只在歷史 docs 或明示示例;package-facing active surfaces 無 B-class default。
- governance vocabulary scan:三條主線與四條流程同時出現在 `dev/qc/triggers.md` 與公開 HTML。
- Chrome DevTools evidence:`dev/qc/evidence/2026-05-27-release-check-023-20260527-112928/`。
- 同機協定回歸 evidence:`dev/qc/evidence/2026-05-27-full-check-023-final2-20260527-123911/`。
- Demo workspace doctor:
  - `C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares`:46 項通過。
  - `C:\Users\adam\_claude_desktop\Demo_Agent_Jay_Public_Squares`:46 項通過。
- GitHub Pages live readback:受阻。本環境 `Invoke-WebRequest` 回報「目標電腦拒絕連線」;web fetch 亦未能取得頁面。發布後需重試。

## 自審紀律回顧

本輪全面檢捕捉到三個實際缺口:

1. **測試命令漏必要參數**:第一次同機回歸漏 `--version`、`--result`、`--reason`。修正後重跑。
2. **人手猜 packet id 不可靠**:第二輪用 topic 代替完整 packet id,第三輪手動猜 timestamp 亦出錯。最後改為從 `publish` 輸出解析真實 packet id。
3. **CLI 日常指引不足**:`inbox` 原本沒有列完整 `consume` 命令。已修正為每個 pending item 直接列可複製命令。

這三項說明日後同類流程必須用「機器讀回真實 id」而非人手估計;CLI 亦應盡量在用戶需要前給出下一步可複製命令。

## 發布判斷

本機全面檢已通過,且 0.2.3 已 push / tag / GitHub pre-release / npm publish。發布後仍有兩個邊界:

1. GitHub release URL 建立成功,但 `gh release view` 讀回受本機代理拒絕;需稍後重試確認 `isPrerelease=true`。
2. GitHub Pages live readback 本輪受阻;不可預先宣稱線上頁已更新。

建議下一步:提交並推送 post-publish state-sync;稍後重試 GitHub release / Pages 讀回。Adam 與 Jay 可使用 npm latest 0.2.3 pre-release 進行 guided setup 試用,但仍不可用於不可中斷的重要流程。
