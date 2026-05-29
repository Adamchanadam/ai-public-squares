# AI Public Squares 0.2.9 候選 — S43 🔴 全面檢報告

- 日期：2026-05-28（S43）
- 範圍：本機 0.2.9 Project Peers + Sent Status 候選,加 Codex skill load-fix
- 觸發：Adam 明示「跑 🔴 全面檢」,作為授權 commit / push / tag / release / npm publish 之前嘅放行閘
- 前置報告：`dev/qc/2026-05-28-aps-full-audit-0.2.9-project-peers.md`(S38,Project Peers 隔離首輪);本報告為其後的整合版,並覆蓋 Codex 載入修補

> **發佈後更新(同日 S43,本審核之後):** 本報告完成後,Adam 明確授權,將 0.2.9 作為 pre-release / UAT enablement build 發佈到 npm `latest`(`@adamchanadam/aps@0.2.9`,讀回確認 version/latest 0.2.9、bin aps、fileCount 14;打包 tarball 內 skill description 701 已驗)。即係下文「阻擋 release」第 1、2 項(修補只在源檔、release-prep)已隨發佈解決;其餘受阻項(真人互動 UX UAT、兩部實體機 Drive 往返、Class-C)仍然成立。未 commit / push / git tag / GitHub release;README / 公開 HTML framing 仍待 Adam 決定。

## 一句健康結論

0.2.9 候選嘅 Project Peers runtime、Codex skill 載入、公開承諾一致性、版本邊界、無機密、無壞連結全部驗證通過;**但仍未係 release pass** —— 有兩項受阻(真人互動 UX UAT、兩部實體機真實 Drive 往返)、修補只在源檔(未有已建構 artifact)、跨工作目錄 Class-C 未跑、0.2.9 release-prep(版本確認 / release notes)未做。需清受阻項 + Adam 明確授權先可外發。

## 三條主線

### 1. 公開承諾一致性 — ✅ 通過
- 公開新手 HTML(`docs/index.html`、`docs/guides/`)無把 0.2.9 / Project Peers 寫成已支援。
- 維護者頁(`docs/maintainers/index.html`)明確分流:npm latest 0.2.8 = 已發布可靠二人主路徑;本機 0.2.9 = Project Peers + Sent Status 候選,未發布不可寫成公眾已支援。
- README + `docs/index.html` 一律寫「npm latest 0.2.8」;Project Peers 字眼只出現喺 `docs/plans/*.md` 計劃文件(正當)。
- 無「私人 repo」誤述(0 命中);HTML 無連去本地 `.md`(0 命中)。

### 2. 發佈前可信度 — ⚠️ 通過(有受阻項,未到放行)
- 版本邊界一致:package.json=0.2.9 本機候選;README/docs 寫 npm latest 0.2.8;npm registry 實測 latest=0.2.8。
- PII/secrets sweep:無真實機密(命中全屬「不可放 credentials」政策句)。
- 測試 slug(`aps_uat_*` / `mpedu`)無滲入出貨面(README / 公開 HTML / CLI / skill / resources 0 命中)。
- **受阻**:本次 Codex 修補只在 repo 源檔 `skills/aps/SKILL.md`;當時打包嘅 `adamchanadam-aps-0.2.9.tgz` 早於修補,已隨 scratch 目錄刪除;npm latest 0.2.8 仍載舊 1052 字 skill。要外發必須重新 `npm pack` / publish 先帶到修補。
- **受阻**:真人互動 UX UAT(Adam 本人開新 Claude/Codex session 行七句)未做;headless `codex exec` 與 Claude 自驅唔完全等於真人互動。
- **受阻**:兩部實體機之間真實 Google Drive 往返未做(本次全程同機共用本機 Hub)。
- **未做**:0.2.9 release-prep(版本確認、CHANGELOG / release notes、發佈後讀回計劃)。

### 3. 協定實際運行正確性 — ✅ 通過
- Claude 自驅 Project Peers 全來回(真實 Hub test slug `aps_uat_claude_20260528`):
  - `peer add`(新對象 + 預設對方)→ provisional ✅
  - provisional `publish --to` 被擋 ✅
  - 對方自行 `init` → confirmed,且**對方卡唔被降級**(`writeFileIfMissing` 保護,實測印證)✅
  - confirmed peer `publish --to` 成功 + copy-ready 通知 ✅
  - sender-only `status --packet-id`:pending → consumed,連結果與時間 ✅
  - 收件隔離:fanny 只見自己 packet,從不見 jay 嘅(`來源 jay (0)`)✅
  - 錯收件人 `consume` 被拒 ✅;收件方查 `status` 被導去 `inbox` ✅
- 啟動可發現性:`aps init` 已寫入 Handoff Kit APS route + project-index registration(設置時驗證)✅
- `doctor` v0.2.9 全綠 ✅

## 18 項 / 主要流程對照

| 項目 | 結果 |
|---|---|
| 快檢 4 項(doctor / git 一致 / grep acceptance / tools 改動) | ✅(doctor passed;無 tools/*.ps1 改動) |
| 跨工作目錄佔位符審核 | ✅ active 面 0 洩漏 |
| 跨面交叉閱讀(README↔docs↔skill↔CLI) | ✅ 版本 / 承諾口徑一致 |
| HTML preview 視覺確認 | ✅ 本次無改任何 `docs/*.html`;沿用 S42 render 證據 `dev/qc/evidence/2026-05-28-release-check-html/` |
| PII / secrets sweep | ✅ 無真實機密 |
| 語氣與用語紀律 | ⚠️ 小瑕疵:CLI 部分硬錯誤訊息(provisional 封鎖、錯收件人 consume)為英文,其餘輸出繁中,前後不一致 |
| 新安裝 / 升級路徑 | 新安裝 ✅(實測 tarball + `aps init`);升級 `aps upgrade` 本次未獨立跑 |
| 交接命名 / 品牌版本分流 | ✅ Codex 修補後,正式 skill 載入無誤;品牌卡只顯示 APS CLI 版本 |
| 雲端支援 / 路線邊界 | ✅ 延後路線(真多人 / notify / watch / 平台排程)無寫成已支援 |
| Class-C 跨工作目錄審核 | 🚧 受阻:須在各 demo workspace 自己 session 跑 |
| 協定往返回歸測試 | ✅(見主線 3) |
| 啟動可發現性 trace | ✅ |
| 五區段 / 自審回顧 | 見下節 |
| 審核報告輸出 | ✅ 本檔 |
| Spec-to-runtime 落差(三條品牌入口) | ✅ `教我用 APS` 經 codex exec 實測載入正式 skill;另兩條(AI / Agent Public Squares)由同品牌 routing 規則 + description 並列覆蓋,未逐條 codex-exec |
| Project Peers 逐一交接隔離 | ✅(見主線 3) |
| 真人互動 UX UAT | 🚧 受阻:須 Adam 本人 |
| 兩部實體機真實 Drive 往返 | 🚧 受阻:須第二部機 |

## 阻擋 release 嘅項目（須清或由 Adam 接受）

1. 修補只在源檔,未有已建構 artifact;npm latest 0.2.8 仍載舊 skill。外發必須重新打包 / publish。
2. 0.2.9 release-prep 未做:版本確認、CHANGELOG / release notes、發佈後讀回計劃。
3. 真人互動 UX UAT(Adam)。
4. 兩部實體機真實 Drive 往返(視乎是否納入本輪放行條件)。
5. Class-C 跨工作目錄審核(視乎是否納入)。

## 5 段自審回顧（caught vs missed）

- **Caught(本輪新捕捉)**:Codex 對 frontmatter description 有 1024 硬上限,Claude 端唔會報錯。過往 release-check 只在 Claude 端驗證,所以一直 miss 咗呢個 Codex-only blocker。本輪用 headless `codex exec` 先揪到,並已把「description ≤1024 且合法 YAML」明確寫入 `dev/qc/triggers.md` + `dev/DOC_SYNC_REGISTRY.md`,堵返呢個盲點。
- **系統性盲點修補**:跨 AI 工具(Claude vs Codex)對 skill frontmatter 嘅容忍度唔同;以後 skill 改動嘅外發前檢 / 全面檢都要對 Codex 上限做明確機器檢查,唔可只靠 Claude 載入成功。

## 重跑計劃 / 下一步

1. 若要外發 0.2.9:先補 release-prep(版本確認、CHANGELOG / release notes),重新 `npm pack` 確認 tarball 帶到修補後 skill。
2. Adam 本人跑一次真人互動 UX UAT(七句)。
3. (可選)安排兩部實體機真實 Drive 往返、各 demo workspace 跑 Class-C。
4. 全部 cleared 後,Adam 明確授權 → commit → push → tag → GitHub release → npm publish → 發佈後讀回(npm latest、`npx …@latest`、GitHub release body、Pages、remote tag)。

## 邊界

本全面檢全程只讀為主 + 已授權嘅本機測試;未 commit / push / tag / release / npm publish;未改 Hub。
