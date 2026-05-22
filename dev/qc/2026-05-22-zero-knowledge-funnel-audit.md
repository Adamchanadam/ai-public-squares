# 零認知用戶 funnel 審計 — Stage 0-7 + Layer A/B/C/D 重整 roadmap

**日期**:2026-05-22
**作者**:Adam Chan(項目維護者)+ Claude Code(co-author)
**觸發**:Adam 喺呢個 session 提出 「對 APS 零認知背景嘅用戶都用得到,本 repo 才算成功」(2026-05-22 對話)
**狀態**:Stage 1 audit + roadmap;落地行動由本 audit doc commit 之後逐 phase 推進

---

## 1. 點解寫呢份 audit

之前嘅 session(S1-S8)嘅 mental model 係 「Phase 4 落地計劃 + 完整 walkthrough」 — 即係假設用戶會自己讀計劃 / 跟 walkthrough 手做。技術完備(MVP 通過驗收、Phase 4 plan 三層簡化、QC vocabulary 落地、demo workspace 對齊 kit v0.1.7、generic-template pivot 完成),但 entry 對 「對 APS 零認知背景」 嘅用戶嚟講仍然太深。

Adam 強調:**AI 工具係畀非技術人員用先有價值。** 本 repo 嘅成功標準應該係:**路人由 「冇聽過 APS」 到 「日常用緊」,全程 zero friction,唔需要先讀技術文件**。

呢份 audit 重新審視整個 funnel,識別現有 surface 同零認知用戶 vision 之間嘅 gap,出 phased build roadmap。

---

## 2. 核心立場

| 立場 | 內容 |
|---|---|
| 用戶背景 | 零 APS 認知 / 唔知 protocol 內部 / 可能連 Claude Code 都未熟 / 但有真實痛點(兩部機合作成日撞 file) |
| 期望嘅 first-touch | 喺自己 runtime 講一句 plain words(「我想同 Jay 喺兩部機合作」 / 「set up APS」),AI 自動接手,interactive 帶用戶過所有 setup |
| 期望嘅日常 | 喺對話講 plain words(「我有嘢俾 Jay」 / 「Jay 嗰邊有冇新嘢」),AI 接住對應動作 |
| Walkthrough + Phase 4 plan + Bridge Pack + PROTOCOL.md 嘅角色 | 後備 reference + 維護者 spec;**用戶 100% 唔需要直接讀** |
| Demo workspace 嘅角色 | Skill 內部攞 Bridge Pack source 用嘅 fixture;用戶 invisible |
| 成功 criterion | 路人 5 分鐘內由 「點開 repo」 到 「first packet published + counterpart 收到」 |

---

## 3. Funnel Stage 0-7 詳細 map

每個 stage 列:用戶 mental state / 用戶實際做 / friction / 而家 covered / gap / 解決方法。

### Stage 0 — 路人未知 APS 存在

| 欄位 | 內容 |
|---|---|
| Mental state | 「兩個人喺兩部機合作整 brand book / 寫文,個 file 黎黎去去成日撞、context 講完又要再講」 |
| 實際做 | 上 GitHub trending / 朋友介紹 / blog / Twitter / Reddit |
| Friction | 唔知 APS 存在 |
| 而家 covered | 0% — repo 完全冇 distribution channel |
| Gap | Distribution 喺 repo 範圍外,但 repo 應該提供 shareable entry point 等 distribution 易啲做 |
| 解決 | Out-of-repo channel(blog 寫文 / GitHub trending if open-source / 朋友轉發);呢個唔屬本 audit 範圍,但 Layer A 出品要 shareable |
| 屬邊 layer | Layer A 嘅 deliverable 要 shareable,呢個係 enabler |

### Stage 1 — 點開 GitHub repo

| 欄位 | 內容 |
|---|---|
| Mental state | 「呢個 repo 究竟係咩」 |
| 實際做 | 30 秒內 scan README + repo description + 第一個 image / TLDR |
| Friction | 30 秒內冇 hook = 走人 |
| 而家 covered | 啱啱加咗 README placeholder(粗糙 hook + 「重整入面」 framing);docs/index.html 仍然係 S8 pivot 後嘅 user-A/user-B 框架,對零認知用戶仍太深 |
| Gap | README hook 弱;docs/index.html 對零認知仍太多術語(「protocol」「single-writer lane」「Hub」)|
| 解決 | **Layer A** — README polish 做正式 zero-knowledge entry;docs/index.html 重寫 |

### Stage 2 — 想試

| 欄位 | 內容 |
|---|---|
| Mental state | 「OK 我有興趣,點開始?」 |
| 實際做 | 揾 「Quick Start」 / 「Get Started」 / 「Installation」 section |
| Friction | 而家冇 immediate action;walkthrough §2 列三個 prerequisite(Drive 桌面版 / Claude Code / kit init)個個都係 wall |
| 而家 covered | 0% — 用戶要自己讀 walkthrough 然後手做 |
| Gap | **一行 install command + skill 自動接手** 嘅 mechanism |
| 解決 | **Layer B** — 一行 command(`npx ...` / git clone + script / 等)觸發 install + skill greet |

### Stage 3 — 第一次 trigger skill

| 欄位 | 內容 |
|---|---|
| Mental state | 「Install 完咗,我點開始?」 |
| 實際做 | 喺 Claude Code 講某句 → skill trigger |
| Friction | 唔知講邊句;skill description 太 narrow / 用 jargon 觸發唔到 |
| 而家 covered | 0% — skill 完全唔存在 |
| Gap | Skill itself + skill description craft |
| 解決 | **Layer C** — SKILL.md frontmatter `description` 寫得闊 + 用 plain words 嘅 trigger phrases(「set up APS」 / 「跨機合作」 / 「我同 X 兩部機合作」 / 「partner workflow」 / 「cross-machine collab」 等);實際 install 完之後 skill 自動 greet 一次,避免用戶要自己揾觸發詞 |

### Stage 4 — Skill 帶 setup

| 欄位 | 內容 |
|---|---|
| Mental state | 「呢個 AI 問我嘢,我答就得?」 |
| 實際做 | 答 5-7 條 plain-word 問題 → skill 跑 file ops → confirm |
| Friction | Conversation script 唔好(太多技術術語 / 假設用戶知概念 / 順序混亂) |
| 而家 covered | 0% |
| Gap | Conversational dialogue script + automated file ops orchestration |
| 解決 | **Layer C(主體)+ 獨立 conversational craft sub-deliverable**:<br>1. Greeting + 意圖 confirm<br>2. Prerequisite interactive(Drive mount / share / offline)<br>3. T0 三個拍板 — plain words 問<br>4. T1-T6 file ops 自動跑 + 進度報告<br>5. Cross-side packaging(生成 starter pack + 對方 instruction)<br>6. First-use dry-run test |

### Stage 5 — 日常用

| 欄位 | 內容 |
|---|---|
| Mental state | 「我有嘢俾 Jay」 / 「Jay 啱啱 send 嘢俾我」 |
| 實際做 | 喺對話講 natural words → skill route 到對應 subflow |
| Friction | 用戶要記 fixed phrase(`check Hub` / `Hub 有新嘢`) |
| 而家 covered | walkthrough §8 + §9 + Bridge Pack T0b spec 定義咗 trigger phrase,但用戶仲要主動講固定句 |
| Gap | Natural language routing + intent inference |
| 解決 | **Layer C** — 三個 daily subflow,每個有闊 trigger:<br>• Publish: 「我有嘢俾 X」 / 「post to X」 / 「我交份嘢」 / 「publish」<br>• Inbox-check: 「X 嗰邊有冇新嘢」 / 「check inbox」 / 「Hub 有新嘢」 / 「未消化」<br>• Troubleshoot: 「X 話收唔到」 / 「同步唔到」 / 「conflict」 / 「出錯」 |

### Stage 6 — 出錯 / edge case

| 欄位 | 內容 |
|---|---|
| Mental state | 「Drive 同步唔到」 / 「我整錯咗想撤回」 / 「partner 話佢收唔到」 |
| 實際做 | 對話講出問題 → skill 偵測 + propose recovery |
| Friction | 用戶要記 walkthrough §10.1-§10.5 嘅 recovery flow,或者主動讀文檔 |
| 而家 covered | walkthrough §10 列 5 failure mode + Bridge Pack T0b 嘅 conflict auto-scan(部分覆蓋 — 但 demo workspace T0b 仲未落,所以而家係 spec-on-paper only) |
| Gap | Skill 主動 surface error + propose recovery option;protocol 入面 5 個 failure mode 全部要喺 skill 入面 covered |
| 解決 | **Layer C** — recovery subflow:<br>• Startup auto-scan(對齊 Bridge Pack T0b spec)<br>• Detect(同步延遲 / lock file / wrong-lane write / 5 個 failure mode)<br>• Surface 自然語言 explain<br>• Propose recovery option<br>• User approve → execute |

### Stage 7 — 升級 / 維護

| 欄位 | 內容 |
|---|---|
| Mental state | 「APS 升咗 v1.1,我點 follow?」 — 但用戶可能根本唔知有升級 |
| 實際做 | 用戶可能完全 unaware,直到撞到 「skill 同 protocol 對唔上」 嘅 bug 先發覺 |
| Friction | 用戶要自己跟 PROTOCOL.md CHANGELOG / 手動更新 Bridge Pack |
| 而家 covered | 0% |
| Gap | Auto-update mechanism |
| 解決 | **Layer B 嘅 install command 升級版 + Layer C skill 自我 check**:<br>• `npx @adamchanadam/aps update` 或同類<br>• Skill startup 時 auto-check Bridge Pack 版本<br>• 新版自動拉 |

---

## 4. Layer A/B/C/D 分類 + 現有 deliverable 重定位

四層由 「用戶可見度由高至低」 / 「user-facing 表面由前至後」 排:

### Layer A — Repo Entry(令路人想試)

| Deliverable | 而家狀態 | 處置 |
|---|---|---|
| `README.md` | Placeholder(2026-05-22 加,粗糙 zero-knowledge hook + 「重整入面」 framing) | **重寫做正式 entry** — 痛點 hook + 「30 秒解釋 APS」 + 一行 install command + 暫指 deeper-dive |
| `docs/index.html` | S8 pivot 後 user-A/user-B 框架;對 APS 有基礎認知嘅讀者 OK,對零認知用戶仍太深 | **重寫做 hosted zero-knowledge entry page** — 用同 README 同類嘅痛點 hook + 自包嘅「點開始」 + 唔需要先讀其他文件 |
| (新)Landing page hero / TLDR / hook | 不存在 | **新建** — README 同 docs/index.html 嘅共用敘事核心 |
| (新)`install` command 嘅 placeholder reference | 不存在 | **新建** — 喺 README + landing page 顯眼位放;Layer B build 之前可以擺 「coming soon」 |
| 一句 social-shareable description | 不存在 | **新建** — 適合 Twitter / blog title / GitHub repo description 嘅一句 hook |

### Layer B — Install + Bootstrap(令想試嘅人 ready)

| Deliverable | 而家狀態 | 處置 |
|---|---|---|
| 一行 install command | 不存在 | **新建** — 用戶 copy-paste 跑就齊嘢:detect Claude Code → install skill → 自動 greet |
| Distribution channel | 未拍板 | **拍板** — npm package(`npx @adamchanadam/aps init`)/ GitHub release / `npx git+...` direct / Claude Code plugin marketplace。每個 trade-off 唔同 |
| Install skill 到 user runtime `.claude/skills/aps/` | 不存在 | **新建** — 由 install command 自動處理 |
| Prerequisite auto-check | walkthrough §2 列住,但 require 用戶自己手做 | **重新 frame 做 install command 一部分** — 自動 detect Drive 桌面版 / Claude Code / kit init,缺失嘅就 link 過去 install |
| `tools/aps-onboard.ps1`(已存在,S5 build) | T2-T5 file ops 自動化 | **保留** — Layer B install command 內部可調用呢個 script 做 governance file edits |
| Update mechanism(`npx @adamchanadam/aps update`) | 不存在 | **新建,延後** — Stage 7 用到 |

### Layer C — Skill Orchestration(令 ready 嘅人日常用)

| Deliverable | 而家狀態 | 處置 |
|---|---|---|
| `skills/aps/SKILL.md`(template repo 嘅 skill source) | 不存在 | **新建** — frontmatter `name: aps`、`description: ...broad plain-words trigger...` |
| Setup subflow | 不存在 | **新建** — Stage 4 嘅 dialogue script + file ops orchestration |
| Publish subflow | 不存在 | **新建** — Stage 5 中,用戶講 「我有嘢俾 X」 等 trigger |
| Inbox-check subflow | 不存在 | **新建** — Stage 5 中,用戶講 「X 嗰邊有冇新嘢」 等 trigger |
| Troubleshoot / recovery subflow | 不存在 | **新建** — Stage 6 中,startup auto-scan + 5 failure mode 對應 |
| Cross-side packaging | 不存在 | **新建** — setup subflow 嘅其中一 step:生成完整 「partner 一句 install command + starter pack」 |
| Dialogue script(獨立 craft sub-deliverable) | 不存在 | **新建,carve out** — 見 §6 |

### Layer D — Protocol Spec(維護者 layer)

| Deliverable | 而家狀態 | 處置 |
|---|---|---|
| [PROTOCOL.md](../../../G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\_hub\PROTOCOL.md)(Hub 上)| v1.0,凍結 | **保留** — Skill / walkthrough / 所有層對齊 |
| [Phase 4 plan](../../docs/plans/2026-05-21-aps-phase4-plan.md) | 完整,governance-clean | **保留 + 加 cross-reference** — 加一節 「Skill-driven UX layer (Layer C)」 cross-link |
| [Walkthrough](../../docs/guides/aps-onboarding-walkthrough.html) | 完整,9 finding 修復(2026-05-21 audit) | **重定位 + §1 disclaimer 加一句** — 由 「user 必讀 + 跟做」 → 「協定深入了解 + 維護者 reference」;Skill 已落地之後加一句 「想 AI 帶你做就講 set up APS;呢個教學係 deeper-dive reference」 |
| [Bridge Pack](../../../Demo_Agent_Adam_Public_Squares/dev/rules/aps-bridge.md)(demo workspace × 2) | v1.0 + T0b polish 待落 | **T0b 落地後 freeze** — Skill 自動由 demo pack copy(setup subflow 嘅一 step) |
| [Demo workspace × 2](../../../) | MVP fixture,kit v0.1.7 | **保留** — Skill internal source,用戶 invisible |
| [Phase 4 plan T0b](../../docs/plans/2026-05-21-aps-phase4-plan.md) | Spec on paper,demo workspace patch 仲未落 | **Skill setup subflow 嘅 first step 直接做 T0b**(skill 第一次跑時自動 patch demo workspace),取代而家手動指引 |
| [MVP implementation](../../docs/plans/2026-05-20-aps-mvp-implementation.md) + [MVP verification](../../docs/plans/2026-05-20-aps-mvp-verification.md) | Historical reference | **保留** — 維護者 audit trail |
| [Design doc](../../docs/plans/2026-05-20-agent-public-square-design.md) | Protocol rationale | **保留** — 維護者 / 對 「點解咁設計」 有興趣嘅 reader |
| [QC trigger SSOT](../../dev/qc/triggers.md) + [governance map](../../docs/qc/governance-map.html) | Layer D 治理工具 | **保留** — 維護者用 |

---

## 5. Hard boundary — 唔可以自動嘅嘢

呢啲係結構性 limit,**唔好向用戶 promise 全自動**;skill 設計時要 explicit handle。

| 環節 | 點解唔能自動 | Skill 點處理 |
|---|---|---|
| WhatsApp 觸發句 | AI 唔可以代用戶發 WhatsApp(冇授權 + 唔應有) | Skill 生成完整可貼短訊,clipboard 自動 copy / 引導用戶手動發 |
| 對方機 onboarding | 對方部機唔喺 session file system 範圍 | Skill 生成 「畀對方嘅完整 setup prompt + starter pack ZIP / Drive folder」,用戶 forward;對方喺自己 runtime 講 「set up APS」 trigger 同一個 skill 嘅 「join existing collab」 subflow |
| Drive 同步延遲 | OS + Google Drive timing 控唔到 | Skill 提示 「等同步」 + 自動 poll 檢查 |
| 用戶 packet 內容 | 唔係 boilerplate,係用戶實際工作產物 | Skill closeout 時 draft packet body,用戶 review + approve 至寫入 |
| Sensitive payload routing | 用戶要決定咩經 Hub / 咩經 secure channel | Skill detect 可疑內容(credentials / API key / unredacted PII)就停手 + 提示用戶用 out-of-band channel |
| PROTOCOL.md 升級 sign-off | 用戶要 review CHANGELOG + 拍板 | Skill auto-detect 新版本,提示用戶 review,**唔自動 apply** |

---

## 6. Conversational craft 嘅獨立 carve-out

### 點解獨立

Skill 嘅 dialogue 直接決定 「能唔能用」。SKILL.md frontmatter + body 嘅 orchestration logic 雖然係 skeleton,但實際對話嘅 「能唔能 land 入用戶 mental model」 取決於:

- **Tone**:friendly 但唔 over-eager / professional 但唔 jargon
- **Wording**:每句嘅 plain-language 度 + 用戶當下 mental state 嘅 fit
- **解釋深淺**:邊個位係 「淨係問問題」,邊個位要 inject 一句 「呢度係咩意思」 嘅 just-in-time 解釋
- **Inject timing**:概念(slug / agent_id / lane)邊個 stage 出現?用戶會唔會 overwhelm?
- **Transition**:每 step 之間嘅順序 + cognitive load balancing

呢層 craft 似 conversational designer 嘅工作多過 software engineer 嘅工作。如果 SKILL.md 一寫就 done,容易出 「technical correct but conversationally cold / overwhelming / jargon-heavy」 嘅 dialogue。

### 獨立 deliverable

新建:`docs/plans/2026-MM-DD-aps-skill-dialogue-script.md`(Phase X-3 後期)

內容(預期):

1. **Setup subflow dialogue**:5-7 條 plain-word 問題嘅完整 wording + 用戶答 yes/no/唔識點答 嘅 response branch + Cantonese / English mixed wording(對齊 Adam 慣用嘅 voice)
2. **Daily-use subflow dialogue**:publish / inbox-check / troubleshoot 嘅自然 prompt-response pattern
3. **Recovery subflow dialogue**:5 failure mode 嘅 「detect → explain → propose → confirm」 wording
4. **Tone guide**:do / don't / sample lines
5. **概念 inject 順序 map**:邊個 stage 第一次提 「slug」 / 「lane」 / 「Hub」 / 「ack」;每個概念嘅一句 plain-language 定義

---

## 7. Acceptance criteria reframe

| 舊(internal correctness) | 新(zero-knowledge outcome) |
|---|---|
| Walkthrough wording 清晰 | 路人 30 秒內由 GitHub repo 到 「我想試」 嘅 mental state |
| Phase 4 plan spec 完整 | 跑完一行 install command 後 Claude Code session 已自動 greet |
| Helper script idempotent | 用戶答 5-7 條 plain-word 問題後 setup done |
| Cross-doc consistency | First packet 5 分鐘內 publish + counterpart 收到 |
| 8/8 grep test PASS | 「Jay 整咗野俾我」 → 用戶冇打 fixed phrase 都能觸發 inbox check |
| kit doctor 35/35 PASS | Skill 跑完 setup,新 user runtime 跑 doctor 都係 35/35 PASS(skill internally enforce) |
| 4 個 demo workspace alignment | Skill 用 demo pack 做 source,demo workspace 永遠 canonical,用戶 invisible |
| MPEdu / governance evidence clean | Skill setup 生成嘅 user runtime governance file 唔留任何 fixture-specific name |

---

## 8. Build roadmap — phase 順序 + dependency

順序由 「用戶最早撞到」 倒推:Stage 1 對應 Layer A,即係 Layer A 最先 build。

### Phase X-1: Layer A entry — README + landing page polish

| 屬性 | 內容 |
|---|---|
| Deliverable | README.md 完整 polish(由 placeholder 升級做 正式 entry)+ docs/index.html 重寫為 zero-knowledge entry + 一句 social-shareable description + landing page 嘅 「coming soon」 install command placeholder |
| Dependency | 無 |
| Estimate | 2-3 session |
| Risk | Install command 真實機制未拍板,但 Layer A 入口可以擺 placeholder 「coming soon」 |
| Acceptance | 零認知用戶 30 秒內理解 APS 解決咩痛點 + 知道下一步係 「跑一句 command」 |

### Phase X-2: Layer B install command — distribution channel

| 屬性 | 內容 |
|---|---|
| Deliverable | 實際 install command 機制(`npx @adamchanadam/aps init` 或 git clone + bootstrap script 或 Claude Code plugin)+ 自動 install skill + 自動 greet |
| Dependency | Phase X-1(用戶要先到 entry 先 trigger install) |
| Decision points | Distribution channel — npm package / GitHub release / `npx git+...` direct / Claude Code plugin marketplace。**呢個係本 audit 嘅 open question #1,要 Adam 拍板** |
| Estimate | 3-5 session(包括 publish 機制 + bootstrap script + first-greet 邏輯) |
| Acceptance | 跑完 command 後 Claude Code session 自動 greet,用戶見到 「你想開始 cross-machine collab 嗎」 嗰類 prompt |

### Phase X-3: Layer C setup subflow

| 屬性 | 內容 |
|---|---|
| Deliverable | `skills/aps/SKILL.md` + setup subflow 嘅 conversational dialogue + T0/T1-T6 file ops orchestration + cross-side packaging |
| Dependency | Phase X-2(skill 要喺 user runtime 度先 trigger 到) |
| Sub-deliverable | 並行寫 dialogue script(§6 嘅獨立 carve-out) |
| Estimate | 5-8 session(包括 craft + 各 step 嘅 dialogue 同 file ops orchestration) |
| Acceptance | 零認知用戶答 5-7 條 plain-word 問題,setup done;first packet 5 分鐘內 publish |

### Phase X-4: Layer C daily-use + recovery subflow

| 屬性 | 內容 |
|---|---|
| Deliverable | Publish / inbox-check / troubleshoot subflow + natural language routing + 5 failure mode 嘅 recovery dialogue |
| Dependency | Phase X-3 |
| Estimate | 3-5 session |
| Acceptance | 用戶講 「我有嘢俾 Jay」 / 「Jay 嗰邊有冇新嘢」 / 「Drive 同步唔到」 等 plain words 自然 trigger 對應 subflow |

### Phase X-5: Layer D re-position

| 屬性 | 內容 |
|---|---|
| Deliverable | Walkthrough §1 disclaimer 加 「想 AI 帶你做就講 set up APS;呢個教學係 deeper-dive reference」;Phase 4 plan 加 「Skill-driven UX layer」 cross-reference 一節 |
| Dependency | Phase X-3 / X-4(skill 要落地之後,layer D 嘅 re-position 先有意義) |
| Estimate | 1-2 session |
| Acceptance | Layer D 嘅角色 explicitly stated;用戶讀返 Layer D 知道呢層係 deep-dive,唔係 first-touch |

### Phase X-6: Auto-update mechanism

| 屬性 | 內容 |
|---|---|
| Deliverable | Skill startup auto-check Bridge Pack version + `npx @adamchanadam/aps update` 或同類 update command |
| Dependency | Phase X-2 嘅 distribution channel 已落實 |
| Estimate | 2-3 session |
| Acceptance | 用戶喺 next session 跑 skill,自動見到 「protocol 升咗 v1.1,要 update 嗎」 嘅 prompt |

### Phase 順序總覽

```
Phase X-1 (Layer A entry)
        ↓
Phase X-2 (Layer B install — needs distribution decision)
        ↓
Phase X-3 (Layer C setup) ── 並行 ── dialogue script craft
        ↓
Phase X-4 (Layer C daily + recovery)
        ↓
Phase X-5 (Layer D re-position)
        ↓
Phase X-6 (Auto-update) — optional / can defer
```

---

## 9. Open question / risk

呢啲係 build 之前要拍板嘅 design decision,或者 known 嘅 unknowns:

### Q1 — Distribution channel(critical, Phase X-2 dependency)

| Option | Pros | Cons |
|---|---|---|
| npm package(`npx @adamchanadam/aps init`) | Adam 已有 npm publish 經驗(`@adamchanadam/agent-handoff-kit`);Claude Code 用戶通常有 Node;一行命令好簡潔 | 要維護 npm package + versioning;npm scope name 要拎 |
| GitHub release tarball + bootstrap script | 無 npm dependency;直接由 GitHub release 拉 | 用戶要識 curl / Invoke-WebRequest;cross-OS 命令唔同;一行 wrapper script 仍要做 |
| Claude Code plugin marketplace | 假設 Claude Code 有 plugin marketplace,自動 distribute | Claude Code 嘅 plugin 機制現狀未審;依賴 Anthropic 嘅 marketplace timeline |
| `npx git+https://github.com/...` direct | 唔需要 publish package;每次 install 從 GitHub 拉 latest | 慢(每次 clone);private repo 要 GitHub auth |

**建議**:**npm package** — Adam 已熟 npm publish flow;`@adamchanadam` scope 已存在;Claude Code 用戶通常 Node 環境。
**待 Adam 拍板。**

### Q2 — Skill install location

`.claude/skills/aps/` 係 Claude Code convention。

- macOS: `~/.claude/skills/aps/` ?
- Windows: `%USERPROFILE%\.claude\skills\aps\` ?
- WSL: 跨環境 location ?

需要 verify Claude Code skill 路徑 spec(read official docs)。Install command 要 cross-OS handle。

### Q3 — 對方 onboarding 嘅 friction

User A 跑完 setup,User B 部機未 ready,User B 都要做同樣 install。即係 「partner」 都需要係 zero-knowledge 入口。Cross-side starter pack 要可以 self-contain:
- 一行 install command(同 User A 一樣)
- Skill source(或者由 install command 自動 fetch)
- 兩位 User 揀好嘅 slug / agent_ids / Hub paths

呢個係 「Stage 4 嘅 Cross-side packaging」 deliverable嘅範圍,但要喺 X-3 嘅 setup subflow design 時 explicit handle。

### Q4 — Multi-language dialogue

Walkthrough 用 Cantonese 為主;Adam 偏好 Cantonese + 英文 mix。Skill 應該:
- Default 邊個語言?
- 自動 detect 用戶講嘅語言?
- Cantonese / Mandarin / English 點 switch?

**建議**:Skill SKILL.md `description` 雙語(Cantonese + English),actual dialogue follow 用戶第一句話嘅語言。但 dialogue script 要寫 Cantonese 版同 English 版兩套,作為 Phase X-3 嘅 sub-deliverable。

### Q5 — Skill 更新嘅 cadence + 版本管理

每次 protocol 升級(v1.0 → v1.1)都要 push 新 skill version。版本管理機制:
- Skill manifest 有 version field?
- 版本 mismatch detection 邏輯?
- 用戶被迫升級 vs 自願升級?

**建議**:Phase X-6 處理,先用 manual update;有第一個真實 v1.1 protocol change 時再 design auto-update mechanism。

### R1 — Phase X-2 嘅 distribution channel 拍板延誤

如果 distribution channel 拍板被 stuck,所有後面 phase 都被 block(因為 X-3 嘅 skill 要喺 user runtime 度 trigger,而 user runtime 由 X-2 install 落)。

**Mitigation**:Phase X-1(Layer A entry)同 Phase X-2 嘅 decision discussion 可平行;Layer A 嘅 install command 可以擺 「coming soon」 placeholder,distribution 拍板期間 entry 仍然 ship 得。

### R2 — Dialogue craft 質素 vs Phase X-3 timeline

Conversational craft 係 「主觀」 layer,可能反覆 iterate。Phase X-3 嘅 estimate 5-8 session 可能 underestimate。

**Mitigation**:Phase X-3 嘅 setup subflow MVP 先求 「能用」(粗糙 dialogue + 自動 file ops 跑得通),然後 Phase X-4 後做 dialogue polish 嘅 second pass。

### R3 — Layer D 嘅 walkthrough re-position 反 expectation

而家 walkthrough 係本 repo 最 substantive 嘅 user-facing 嘢。Re-position 做 「deeper-dive reference」 等於 demote 佢嘅 entry 地位。

**Mitigation**:Phase X-5 唔 delete walkthrough,只係 §1 disclaimer 加多一句 explicit framing。Skill 落地之後,真實使用 data 會證明 walkthrough 嘅角色係 「需要時翻查」 而唔係 「必讀」。

---

## 10. Next concrete step

呢份 audit doc commit 之後,行動順序:

1. **Adam 拍板 Q1 distribution channel**(npm / GitHub release / Claude Code plugin / direct git)— 決定 Phase X-2 嘅 mechanism。
2. **Phase X-1 起手**:
   - 重寫 README(由 placeholder 升級做 zero-knowledge entry)
   - 重寫 docs/index.html(由 user-A/user-B 框架重整為 zero-knowledge entry)
   - 寫一句 social-shareable description
   - 放 「coming soon」 install command placeholder
3. **Phase X-2 嘅 prototype**(parallel to X-1):
   - 寫 install command bootstrap script(`tools/aps-init.ps1` or `tools/aps-init.sh`)
   - 設計 first-greet 邏輯
   - Decide distribution channel detail 同 Adam 一齊
4. **Phase X-3 起手前**:
   - 寫 SKILL.md frontmatter 草稿(broad description + multi-trigger)
   - 起 dialogue script first pass(setup subflow)— Adam review tone + voice + Cantonese / English mix
5. **每完成一 phase**:回呢份 audit doc 更新 status + 下一 phase 嘅 acceptance evidence

---

## 11. 同現有 governance 嘅關係

| Governance 工具 | 同呢份 audit 嘅關係 |
|---|---|
| Phase 4 plan | Layer D 嘅 protocol spec;skill 對齊呢個 plan 嘅 T0-T10 邏輯。Phase X-5 加一節 「Skill-driven UX layer」 cross-link |
| Walkthrough | Layer D 嘅 「deeper-dive reference」;Phase X-5 §1 disclaimer 加一句 re-position |
| Bridge Pack(demo workspace × 2) | Layer D 嘅 canonical source;skill setup subflow 嘅 first step 自動 patch T0b polish |
| QC trigger SSOT(`dev/qc/triggers.md`) | Layer D 治理工具;呢份 audit 經 SSOT 嘅 「外發前檢」 規矩過一次(寫完 commit 之前) |
| AGENTS.md + kit doctor | 維護者層;skill 落地後,每次 setup 都觸發 user runtime 嘅 doctor check |
| MEMORY.md / feedback notes | 用戶嘅 voice + tone 偏好,影響 dialogue script craft |

---

## 12. 本 audit doc 嘅 maintenance rule

- 每完成一 phase 後,updated 對應 phase 嘅 「Acceptance evidence」 欄(初版冇,要 phase done 之後加)
- 任何時候出現新 open question / risk,加入 §9
- Phase 順序唔郁(除非有重大 dependency 改變);如要郁,加 「歷史 phase order」 一節做 audit trail
- 完成全部 6 phase 之後,本 audit doc 變 「historical snapshot」,下一份 audit 由新文件接力

---

## 文件歷史

- 2026-05-22 — 初版 funnel audit;Stage 0-7 map + Layer A/B/C/D + Build roadmap + 5 open question / 3 risk + Next step。
