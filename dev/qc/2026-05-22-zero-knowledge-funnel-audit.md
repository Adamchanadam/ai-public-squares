# 零認知讀者落地檢討 — Stage 0-7 漏斗、Layer A/B/C/D 分類、與 6 期建構路線

**日期**:2026-05-22
**作者**:Adam Chan(本項目維護者)+ Claude Code(協同作者)
**觸發**:Adam 於本次 session 提出 「對 APS 零認知背景嘅用戶都用得到,本 repo 才算成功」(2026-05-22 對話)
**狀態**:第一階段檢討 + 路線;落地行動由本檢討文件 commit 之後逐期推進

---

## 1. 為何撰寫此檢討

之前各次 session(S1-S8)的 mental model 是「Phase 4 落地計劃 + 完整設置教學」 — 即假設使用者會自行閱讀計劃、依教學手動操作。技術上完備(MVP 通過驗收、Phase 4 計劃完成三層精簡、QC 觸發詞彙建立、demo workspace 對齊 kit v0.1.7、generic-template pivot 完成),但對「對 APS 零認知背景」的讀者而言入門仍然過深。

Adam 強調:**AI 工具須讓非技術人員都能使用,方有價值。** 本 repo 的成功標準應為:**路人從「未聽過 APS」到「日常使用中」,全程無摩擦,無需先閱讀技術文檔**。

本檢討重新審視整個漏斗,識別現有界面與零認知讀者願景之間的落差,並輸出分期建構路線。

---

## 2. 核心立場

| 立場 | 內容 |
|---|---|
| 讀者背景 | 零 APS 認知 / 不諳協定內部結構 / 可能連 Claude Code 都不熟悉 / 但有真實痛點(兩部電腦合作時檔案常常碰撞) |
| 預期的初次接觸體驗 | 在自己的工作目錄中以平實中文(例「我想同 Jay 跨機合作」 / 「set up APS」),AI 自動接手,以對話帶讀者完成全部設置 |
| 預期的日常體驗 | 在對話中以平實中文(例「我有嘢俾 Jay」 / 「Jay 嗰邊有冇新嘢」),AI 接住對應動作 |
| 設置教學、Phase 4 計劃、Bridge Pack、PROTOCOL.md 的角色 | 後備技術參考 + 維護者規格;**讀者 100% 無需直接閱讀** |
| Demo workspace 的角色 | Claude 內部擷取 Bridge Pack 副本之用的 fixture;讀者不可見 |
| 成功標準 | 路人於 5 分鐘內由「打開 repo」到「第一個交接包發出 + 對方收到」 |

---

## 3. 漏斗各階段(Stage 0-7)詳細審視

下列七個階段對應讀者由完全陌生到日常使用 / 維護的時序。每個階段列:讀者心智狀態、實際動作、摩擦點、目前覆蓋程度、落差、解決方法。

### Stage 0 — 路人尚未知 APS 存在

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「兩個人在兩部電腦上合作製作品牌指引 / 撰寫文章,檔案來去往返、上下文重複交代很煩」 |
| 實際動作 | 在 GitHub trending / 朋友介紹 / 部落格文章 / Twitter / Reddit 上瀏覽 |
| 摩擦點 | 不知 APS 存在 |
| 目前覆蓋 | 0% — repo 完全沒有 distribution channel |
| 落差 | 推廣管道在 repo 範圍外,但 repo 應提供可分享之入口,便於推廣 |
| 解決方法 | 外部管道(部落格文章 / GitHub trending(如開源)/ 朋友轉發);此項不屬本檢討範圍,但 Layer A 之輸出須具備可分享性 |
| 屬何層 | Layer A 之輸出需可分享,為此階段之 enabler |

### Stage 1 — 打開 GitHub repo

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「此 repo 究竟是什麼」 |
| 實際動作 | 30 秒內掃視 README + repo description + 第一張圖 / TLDR |
| 摩擦點 | 30 秒內若無 hook 即離開 |
| 目前覆蓋 | 已新增 README 與 docs/index.html 之零認知讀者版本(2026-05-22 S9 完成主頁與入口頁重寫) |
| 落差 | (S9 之後)已大致覆蓋;持續驗證 |
| 解決方法 | **Layer A** — README 與 docs/index.html 之痛點 hook 與一條命令引導(已完成) |

### Stage 2 — 想嘗試

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「好,我有興趣,如何開始?」 |
| 實際動作 | 尋找「Quick Start」 / 「Get Started」 / 「Installation」 章節 |
| 摩擦點 | 設置教學 §2 列三項先決條件(Drive / Claude Code / Agent Handoff Kit init),項項皆是牆 |
| 目前覆蓋 | README + docs/index.html 已將 Agent Handoff Kit 列為第一先決條件(2026-05-22 S9);但 `aps init` 命令本身仍是試行版佔位符 |
| 落差 | **真正一條命令安裝 + skill 自動接手** 的機制 |
| 解決方法 | **Layer B** — 一條命令(`npx ...`)觸發安裝 + skill 自動 greet |

### Stage 3 — 第一次觸發 skill

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「安裝完成,如何開始?」 |
| 實際動作 | 在 Claude Code 中講某句話 → skill 觸發 |
| 摩擦點 | 不知道應講什麼;skill description 過窄 / 用 jargon 而觸發不到 |
| 目前覆蓋 | 0% — skill 完全不存在 |
| 落差 | Skill 本身 + skill description 之撰寫 |
| 解決方法 | **Layer C** — SKILL.md frontmatter 之 description 寫得廣闊 + 以平實詞彙作觸發詞(「set up APS」 / 「跨機合作」 / 「我同 X 兩部機合作」 / 「partner workflow」 / 「cross-machine collab」 等);安裝完成後 skill 自動 greet 一次,避免讀者自行尋找觸發詞 |

### Stage 4 — Skill 帶讀者完成設置

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「這個 AI 在問我,我答就行?」 |
| 實際動作 | 回答 5-7 條平實詞彙的問題 → skill 執行檔案操作 → 確認 |
| 摩擦點 | 對話 script 不佳(過多技術術語 / 假設讀者已知概念 / 順序混亂) |
| 目前覆蓋 | 0% |
| 落差 | 對話 script + 自動檔案操作之 orchestration |
| 解決方法 | **Layer C 主體 + 獨立 conversational craft 子交付物**:<br>1. 打招呼 + 意圖確認<br>2. 先決條件 interactive 檢查(Drive mount / share / offline)<br>3. T0 三項拍板 — 以平實詞彙詢問<br>4. T1-T6 檔案操作自動執行 + 進度回報<br>5. 跨方 packaging(生成 starter pack + 對方指引)<br>6. 首次使用 dry-run 試驗 |

### Stage 5 — 日常使用

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「我有東西要給 Jay」 / 「Jay 剛剛送了東西給我」 |
| 實際動作 | 在對話中以平實詞彙說話 → skill 路由至對應 subflow |
| 摩擦點 | 讀者須記住固定觸發句(`check Hub` / `Hub 有新嘢`) |
| 目前覆蓋 | 設置教學 §8 + §9 + Bridge Pack T0b 規格已定義觸發句,但讀者仍須主動講固定句 |
| 落差 | 自然語言路由 + 意圖推斷 |
| 解決方法 | **Layer C** — 三個 daily subflow,每個具廣泛觸發詞:<br>• Publish:「我有嘢俾 X」 / 「post to X」 / 「我交份嘢」 / 「publish」<br>• Inbox check:「X 嗰邊有冇新嘢」 / 「check inbox」 / 「Hub 有新嘢」 / 「未消化」<br>• Troubleshoot:「X 話收唔到」 / 「同步唔到」 / 「conflict」 / 「出錯」 |

### Stage 6 — 出錯 / edge case

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「Drive 同步不到」 / 「我做錯了想撤回」 / 「partner 說他收不到」 |
| 實際動作 | 在對話中講出問題 → skill 偵測 + 提出 recovery |
| 摩擦點 | 讀者須記住設置教學 §10.1-§10.5 之 recovery flow,或主動閱讀文檔 |
| 目前覆蓋 | 設置教學 §10 列出 5 種 failure mode + Bridge Pack T0b 之衝突自動掃描(部分覆蓋 — 但 demo workspace T0b 尚未落地,目前僅是規格層面) |
| 落差 | Skill 須主動 surface error + 提出 recovery option;協定中 5 種 failure mode 全部須涵蓋於 skill 中 |
| 解決方法 | **Layer C** — recovery subflow:<br>• 啟動時自動掃描(對齊 Bridge Pack T0b 規格)<br>• 偵測(同步延遲 / lock file / wrong-lane write / 5 種 failure mode)<br>• 以自然語言解釋<br>• 提出 recovery option<br>• 讀者批准 → 執行 |

### Stage 7 — 升級 / 維護

| 欄位 | 內容 |
|---|---|
| 心智狀態 | 「APS 升級到 v1.1,我如何 follow?」 — 但讀者可能根本不知有升級 |
| 實際動作 | 讀者可能完全 unaware,直到撞到「skill 與 protocol 不對應」的 bug 方發現 |
| 摩擦點 | 讀者須自行追蹤 PROTOCOL.md CHANGELOG / 手動更新 Bridge Pack |
| 目前覆蓋 | 0% |
| 落差 | 自動升級機制 |
| 解決方法 | **Layer B 之 install command 升級版 + Layer C skill 自我檢查**:<br>• `npx @adamchanadam/aps update` 或同類<br>• Skill 啟動時自動檢查 Bridge Pack 版本<br>• 新版本自動拉取 |

---

## 4. Layer A/B/C/D 分類與現有交付物重新定位

依「讀者可見度由高至低」 / 「對外 surface 由前至後」排序:

### Layer A — Repo Entry(令路人想嘗試)

| 交付物 | 目前狀態 | 處置 |
|---|---|---|
| `README.md` | 已重寫為當代繁體書面語之零認知讀者入口(2026-05-22 S9) | **已完成** — 痛點 hook + 安裝前置事項(第一項 Agent Handoff Kit)+ 一條命令 + 3 步開始使用 + 深入了解列表 |
| `docs/index.html` | 已重寫為當代繁體書面語之零認知讀者入口頁(2026-05-22 S9) | **已完成** — 與 README messaging 對齊;新增「安裝前置事項」 section 列 Agent Handoff Kit + Google Drive + Claude Code + WhatsApp |
| 一條 social-shareable 描述 | 不存在 | 待新增 — 適合 Twitter / 部落格文章標題 / GitHub repo description 之一句 hook |
| Install command 之佔位符參考 | README 與 docs/index.html 中已顯示 `npx @adamchanadam/aps init` | 已顯示;Layer B 之真實 orchestration 仍待建構 |

### Layer B — Install 與 Bootstrap(令想嘗試之人 ready)

| 交付物 | 目前狀態 | 處置 |
|---|---|---|
| 一條 install command | `bin/aps.js` 試行版 0.1.0 已新建,handlers 為 `init` / `--help` / unknown 三 path,全部 functional | 試行版 OK;真實 orchestration 仍待建構 |
| Distribution channel | 已拍板:npm package(Adam 確認 2026-05-22) | 已決定;npm publish action 留待 0.2.0 真實 orchestration 完成一齊出 |
| 將 skill 安裝至讀者 runtime 之 `.claude/skills/aps/` | 不存在 | **待新建** — 由 install command 自動處理 |
| 先決條件自動檢查 | 設置教學 §2 列舉但須讀者自行手動操作 | **重新 frame 為 install command 的一部分** — 自動偵測 Drive 桌面版 / Claude Code / Agent Handoff Kit,缺失者連結至官方安裝指引 |
| `tools/aps-onboard.ps1`(已存在,S5 build) | T2-T5 之檔案操作自動化 | **保留** — Layer B 之 install command 內部可調用此 script 執行 governance file 編輯 |
| 升級機制(`npx @adamchanadam/aps update`) | 不存在 | **待新建,可延後** — Stage 7 使用 |

### Layer C — Skill Orchestration(令 ready 之人日常使用)

| 交付物 | 目前狀態 | 處置 |
|---|---|---|
| `skills/aps/SKILL.md`(本 repo 之 skill source) | 不存在 | **待新建** — frontmatter `name: aps`、`description: ...廣闊平實觸發詞...` |
| Setup subflow | 不存在 | **待新建** — Stage 4 之對話 script + 檔案操作 orchestration |
| Publish subflow | 不存在 | **待新建** — Stage 5 中,讀者講「我有嘢俾 X」 等觸發句 |
| Inbox check subflow | 不存在 | **待新建** — Stage 5 中,讀者講「X 嗰邊有冇新嘢」 等觸發句 |
| Troubleshoot / recovery subflow | 不存在 | **待新建** — Stage 6 中,啟動時自動掃描 + 5 種 failure mode 對應 |
| 跨方 packaging | 不存在 | **待新建** — setup subflow 之其中一步:生成完整之「對方一條 install command + starter pack」 |
| 對話 script(獨立 craft 子交付物) | 不存在 | **待新建,獨立 carve out** — 見 §6 |

### Layer D — Protocol Spec(維護者層)

| 交付物 | 目前狀態 | 處置 |
|---|---|---|
| [PROTOCOL.md](../../../G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md)(Hub 上)| v1.0 凍結 | **保留** — Skill / 設置教學 / 各層對齊 |
| [Phase 4 計劃](../../docs/plans/2026-05-21-aps-phase4-plan.md) | 完整,governance-clean | **保留 + 新增 cross-reference** — 新增一節「Skill-driven UX layer(Layer C)」cross-link |
| [設置教學](../../docs/guides/aps-onboarding-walkthrough.html) | 完整,9 項 finding 已修補(2026-05-21 audit) | **重新定位 + §1 disclaimer 加一句** — 由「讀者必讀 + 跟做」 → 「協定深入了解 + 維護者參考」;skill 落地之後加一句 「想 AI 帶你做就講 set up APS;此教學是深入參考」 |
| [Bridge Pack](../../../Demo_Agent_Adam_Public_Squares/dev/rules/aps-bridge.md)(demo workspace × 2) | v1.0 + T0b polish 仍待落地 | **T0b 落地後凍結** — Skill 自動從 demo pack 複製(setup subflow 的其中一步) |
| Demo workspace × 2 | MVP fixture,kit v0.1.7 | **保留** — Skill 內部使用,讀者不可見 |
| Phase 4 計劃 T0b | 規格層面,demo workspace patch 尚未落地 | **Skill setup subflow 之首步即執行 T0b**(skill 首次執行時自動 patch demo workspace),取代目前的手動指引 |
| [MVP 實作](../../docs/plans/2026-05-20-aps-mvp-implementation.md) + [MVP 驗證](../../docs/plans/2026-05-20-aps-mvp-verification.md) | 歷史參考 | **保留** — 維護者審計用 |
| [設計理據](../../docs/plans/2026-05-20-agent-public-square-design.md) | 協定設計理由 | **保留** — 維護者 / 對「為何如此設計」有興趣之讀者 |
| [QC 觸發詞彙 SSOT](../../dev/qc/triggers.md) + [治理地圖](../../docs/qc/governance-map.html) | Layer D 之治理工具 | **保留** — 維護者使用 |

---

## 5. 結構性界限 — 無法自動之事項

下列為結構性 limit,**勿向讀者承諾全自動**;skill 設計時須明確處理。

| 環節 | 為何無法自動 | Skill 如何處理 |
|---|---|---|
| WhatsApp 觸發句 | AI 不能代讀者發 WhatsApp(無權限,亦不應有) | Skill 生成完整可貼短訊;clipboard 自動 copy / 引導讀者手動發送 |
| 對方電腦之 onboarding | 對方電腦不在當前 session 之檔案系統範圍 | Skill 生成「予對方之完整 setup prompt + starter pack ZIP / Drive 資料夾」,讀者 forward 過去;對方在自己 runtime 中講「set up APS」觸發同一 skill 之「join existing collab」 subflow |
| Drive 同步延遲 | OS + Google Drive 之 timing,AI 無法控制 | Skill 提示讀者「等待同步」 + 自動 poll 檢查 |
| 讀者之 packet 內容 | 非 boilerplate,為讀者實際工作產出 | Skill 於收尾時起草 packet 內容,讀者 review + 批准後寫入 |
| Sensitive payload 路由 | 讀者須決定何者經 Hub / 何者經安全管道 | Skill 偵測可疑內容(credentials / API key / unredacted PII)即停手 + 提示讀者改用 out-of-band channel |
| PROTOCOL.md 升級 sign-off | 讀者須 review CHANGELOG + 拍板 | Skill 自動偵測新版本,提示讀者 review,**不自動 apply** |

---

## 6. 對話 craft 之獨立 carve-out

### 為何獨立

Skill 之對話直接決定「是否能用」。SKILL.md frontmatter + body 之 orchestration logic 雖是骨架,但實際對話之「能否進入讀者心智模型」取決於:

- **語氣**:友善但不過度熱情 / 專業但不堆 jargon
- **用詞**:每句之平實程度 + 對讀者當下心智狀態之 fit
- **解釋深淺**:何處純粹發問,何處須加一句「此處是何意」之 just-in-time 解釋
- **概念 inject 時機**:概念(slug / agent_id / lane)在何階段首次出現?讀者是否會 overwhelm?
- **轉場**:每步之間之順序 + cognitive load balancing

此層 craft 接近 conversational designer 之工作,多於 software engineer 之工作。若 SKILL.md 一寫即完成,容易出現「技術正確但對話冷淡 / overwhelming / jargon-heavy」之對話。

### 獨立交付物

待新建:`docs/plans/2026-MM-DD-aps-skill-dialogue-script.md`(Phase X-3 後期)

內容(預期):

1. **Setup subflow 對話**:5-7 條平實問題之完整 wording + 讀者回答 yes / no / 不知如何回答 之 response branch + 粵語 / 英文 混用 wording(對齊 Adam 慣用之 voice)
2. **日常使用對話**:publish / inbox-check / troubleshoot 之自然 prompt-response pattern
3. **Recovery 對話**:5 種 failure mode 之「偵測 → 解釋 → 提案 → 確認」 wording
4. **語氣指南**:做與不做 / 範例 lines
5. **概念 inject 順序圖**:何階段首次提及「slug」 / 「lane」 / 「Hub」 / 「ack」;每概念之一句平實定義

---

## 7. Acceptance criteria 重新定義

| 舊版(內部正確性) | 新版(零認知讀者 outcome) |
|---|---|
| 設置教學 wording 清晰 | 路人於 30 秒內由 GitHub repo 到「我想嘗試」之心智狀態 |
| Phase 4 計劃規格完整 | 執行一條 install command 之後 Claude Code 已自動 greet |
| Helper script 之 idempotency | 讀者回答 5-7 條平實問題之後設置完成 |
| 跨文檔一致性 | 第一個 packet 於 5 分鐘內發出 + 對方收到 |
| 8/8 grep 測試通過 | 「Jay 整咗野俾我」 → 讀者未打固定句即可觸發 inbox check |
| Kit doctor 35/35 通過 | Skill 完成設置之後,讀者 runtime 之 doctor 亦 35/35 通過(skill 內部 enforce) |
| 4 個 demo workspace 對齊 | Skill 以 demo pack 為 source;demo workspace 永遠 canonical,讀者不可見 |
| MPEdu / governance evidence 乾淨 | Skill 設置生成之讀者 runtime governance file 不留任何 fixture 名稱 |

---

## 8. 建構路線 — 各期順序與相依

順序由「讀者最早撞到之階段」倒推:Stage 1 對應 Layer A,即 Layer A 最先 build。

### Phase X-1:Layer A entry — README + landing page polish

| 屬性 | 內容 |
|---|---|
| 交付物 | README.md 之完整 polish(由佔位符升級為正式入口)+ docs/index.html 之零認知讀者重寫 + 一句 social-shareable 描述 + landing page 之「coming soon」 install command 佔位符 |
| 依賴 | 無 |
| 估計 | 2-3 個 session |
| 風險 | Install command 之真實機制尚未拍板,但 Layer A 入口可暫放「coming soon」 佔位符 |
| Acceptance | 零認知讀者於 30 秒內理解 APS 解決何痛點 + 知道下一步為「執行一條命令」 |
| 狀態 | **已完成**(2026-05-22 S9):README + docs/index.html 已重寫為當代繁體書面語之零認知讀者入口;Agent Handoff Kit 先決條件已加入 |

### Phase X-2:Layer B install command — distribution channel

| 屬性 | 內容 |
|---|---|
| 交付物 | 實際之 install command 機制(`npx @adamchanadam/aps init`)+ 自動安裝 skill + 自動 greet |
| 依賴 | Phase X-1(讀者須先到達入口方能觸發 install) |
| 拍板要點 | Distribution channel — **已拍板 npm package**(Adam 2026-05-22 確認) |
| 估計 | 3-5 個 session(包括 publish 機制 + bootstrap script + first-greet 邏輯) |
| Acceptance | 執行命令之後 Claude Code session 自動 greet,讀者見到「你想開始 cross-machine collab 嗎」 之提示 |
| 狀態 | **進行中** — 試行版 0.1.0 之骨架已完成(`package.json` + `bin/aps.js`);真實 orchestration 仍待建構 |

### Phase X-3:Layer C setup subflow

| 屬性 | 內容 |
|---|---|
| 交付物 | `skills/aps/SKILL.md` + setup subflow 之對話 script + T0/T1-T6 之檔案操作 orchestration + 跨方 packaging |
| 依賴 | Phase X-2(skill 須在讀者 runtime 中方可觸發) |
| 子交付物 | 並行撰寫對話 script(§6 之獨立 carve out) |
| 估計 | 5-8 個 session(包括 craft + 各步之對話與檔案操作 orchestration) |
| Acceptance | 零認知讀者回答 5-7 條平實問題之後設置完成;第一個 packet 於 5 分鐘內發出 |

### Phase X-4:Layer C 日常使用 + recovery subflow

| 屬性 | 內容 |
|---|---|
| 交付物 | Publish / inbox check / troubleshoot subflow + 自然語言路由 + 5 種 failure mode 之 recovery 對話 |
| 依賴 | Phase X-3 |
| 估計 | 3-5 個 session |
| Acceptance | 讀者講「我有嘢俾 Jay」 / 「Jay 嗰邊有冇新嘢」 / 「Drive 同步唔到」 等平實詞彙即自然觸發對應 subflow |

### Phase X-5:Layer D 文檔重新定位

| 屬性 | 內容 |
|---|---|
| 交付物 | 設置教學 §1 disclaimer 加一句「想 AI 帶你做就講 set up APS;此教學是深入參考」;Phase 4 計劃新增「Skill-driven UX layer」 cross-reference 一節 |
| 依賴 | Phase X-3 / X-4(skill 落地之後 Layer D 之重新定位方有意義) |
| 估計 | 1-2 個 session |
| Acceptance | Layer D 之角色明確說明;讀者翻閱 Layer D 知此層是深入參考,非首次接觸 |

### Phase X-6:自動升級機制

| 屬性 | 內容 |
|---|---|
| 交付物 | Skill 啟動時自動檢查 Bridge Pack 版本 + `npx @adamchanadam/aps update` 或同類升級命令 |
| 依賴 | Phase X-2 之 distribution channel 已落地 |
| 估計 | 2-3 個 session |
| Acceptance | 讀者於下次 session 執行 skill,自動見到「protocol 升級至 v1.1,需要更新嗎」 之提示 |

### 各期順序總覽

```
Phase X-1(Layer A entry)— 已完成
        ↓
Phase X-2(Layer B install — 已拍板 npm)— 進行中
        ↓
Phase X-3(Layer C setup)── 並行 ── 對話 script craft
        ↓
Phase X-4(Layer C 日常 + recovery)
        ↓
Phase X-5(Layer D 重新定位)
        ↓
Phase X-6(自動升級)— 可選 / 可延後
```

---

## 9. Open question / 風險

下列為 build 之前須拍板之設計決定,或已知之 unknowns:

### Q1 — Distribution channel(已拍板)

**狀態:已拍板 npm package**(Adam 2026-05-22 確認)

緣由:Adam 已熟悉 npm publish 流程(`@adamchanadam/agent-handoff-kit` 已 publish 過);Claude Code 讀者通常具備 Node 環境;一條命令最簡潔。

Phase X-2 之 unblock。

### Q2 — Skill 安裝位置

`.claude/skills/aps/` 為 Claude Code 之 convention。

- macOS: `~/.claude/skills/aps/` ?
- Windows: `%USERPROFILE%\.claude\skills\aps\` ?
- WSL: 跨環境位置?

需要 verify Claude Code skill 之路徑規格(查閱 official docs)。Install command 須跨 OS 處理。

### Q3 — 對方之 onboarding 摩擦

讀者 A 完成 setup,讀者 B 之電腦尚未 ready,讀者 B 亦須執行同樣安裝。即「partner」 亦須是零認知入口。跨方之 starter pack 須自包含:

- 一條 install command(與讀者 A 相同)
- Skill source(或由 install command 自動 fetch)
- 雙方已選定之 slug / agent_ids / Hub paths

此為「Stage 4 之跨方 packaging」交付物之範圍,但須於 Phase X-3 之 setup subflow 設計時明確處理。

### Q4 — 多語言對話

設置教學以粵語為主;Adam 偏好粵語 + 英文混用。Skill 應:

- Default 採何語言?
- 自動偵測讀者之語言?
- 粵語 / 普通話 / 英文 如何切換?

**建議**:Skill 之 SKILL.md `description` 雙語(粵語 + 英文);實際對話跟隨讀者首句話之語言。但對話 script 須寫粵語版與英文版兩套,作為 Phase X-3 之子交付物。

### Q5 — Skill 之升級節奏與版本管理

每次協定升級(v1.0 → v1.1)均須 push 新 skill 版本。版本管理機制:

- Skill manifest 是否具備 version 欄位?
- 版本不匹配之偵測邏輯?
- 讀者被迫升級 vs 自願升級?

**建議**:Phase X-6 處理;先採手動升級;待第一次真實之 v1.1 protocol change 出現時再 design 自動升級機制。

### R1 — Phase X-2 之拍板已落地,後續期不被 block

Phase X-2 之 distribution channel 已拍板(npm),Phase X-3 之 skill 可在 Phase X-2 完成後接續落地。

### R2 — Dialogue craft 質素 vs Phase X-3 時程

對話 craft 為「主觀」層,可能反覆 iterate。Phase X-3 之 5-8 session 估計可能 underestimate。

**Mitigation**:Phase X-3 setup subflow MVP 先求「能用」(粗糙對話 + 自動檔案操作可執行),然後於 Phase X-4 之後做對話 polish 之 second pass。

### R3 — Layer D 之設置教學重新定位有違預期

目前設置教學為本 repo 最 substantive 之讀者面對之內容。重新定位為「深入參考」 等於 demote 其入口地位。

**Mitigation**:Phase X-5 不刪除設置教學,僅在 §1 disclaimer 加一句明確 framing。Skill 落地之後,真實使用資料會證明設置教學之角色為「需要時翻查」,非「必讀」。

---

## 10. 下一具體步驟

本檢討文件 commit 之後,行動順序:

1. **Phase X-1 已完成**(2026-05-22):README + docs/index.html 重寫為當代繁體書面語之零認知讀者入口;Agent Handoff Kit 先決條件已列;入口 messaging 對齊。
2. **Phase X-2 之原型** :
   - 撰寫 install command 之 bootstrap script(`bin/aps.js` 試行版 0.1.0 已完成)
   - 設計 first-greet 邏輯
   - 進行 distribution channel 之 detail design 與 Adam 確認(已決定 npm)
3. **Phase X-3 起手之前**:
   - 撰寫 SKILL.md frontmatter 草稿(廣闊 description + 多觸發詞)
   - 撰寫對話 script 之 first pass(setup subflow)— 由 Adam review 語氣 + voice + 粵語 / 英文混用
4. **每完成一期之後**:返回本檢討文件更新狀態 + 下一期之 acceptance evidence

---

## 11. 與現有治理之關係

| 治理工具 | 與本檢討之關係 |
|---|---|
| Phase 4 計劃 | Layer D 之 protocol spec;skill 對齊此計劃之 T0-T10 邏輯。Phase X-5 加一節「Skill-driven UX layer」 cross-link |
| 設置教學 | Layer D 之「深入參考」;Phase X-5 §1 disclaimer 加一句重新定位 |
| Bridge Pack(demo workspace × 2)| Layer D 之 canonical source;skill setup subflow 之首步自動 patch T0b polish |
| QC 觸發詞彙 SSOT(`dev/qc/triggers.md`)| Layer D 治理工具;本檢討經 SSOT 之「外發前檢」規矩過一次(撰寫完 commit 之前) |
| AGENTS.md + kit doctor | 維護者層;skill 落地後,每次 setup 均觸發讀者 runtime 之 doctor 檢查 |
| MEMORY.md / feedback notes | 讀者之語氣 + tone 偏好,影響對話 script craft |

---

## 12. 本檢討之維護規矩

- 每完成一期之後,更新對應期之「Acceptance evidence」欄(初版未填,須於期完成之後加)
- 任何時候出現新 open question / risk,加入 §9
- 各期順序不動(除非有重大依賴改變);如須動,加「歷史順序」一節作審計
- 完成全部 6 期之後,本檢討文件變為「歷史快照」,下一份檢討由新文件接力

---

## 文件歷史

- 2026-05-22(初版):漏斗各階段(Stage 0-7) + Layer A/B/C/D + 建構路線 + 5 開放問題 + 3 風險 + 下一步。
- 2026-05-22(S9 更新):Phase X-1 標記已完成(README + docs/index.html 重寫完成);Phase X-2 標記進行中(試行版 0.1.0 骨架完成);Q1 distribution channel 標記已拍板(npm);全文 prose 轉換為當代繁體書面語。
