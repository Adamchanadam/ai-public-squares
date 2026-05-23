---
name: aps
description: Sets up and runs cross-machine collaboration between two AI agents working on the same project, using a shared cloud-drive folder as the exchange. Use when the user wants to set up APS (also called AI Public Squares) on a new machine, resolve the pain of two people editing the same files from two different computers, start a partner workflow with someone on another machine, post or receive an inter-agent packet, check the shared folder for new items from the other side, or troubleshoot cross-machine sync issues. Triggers on phrases like "set up APS", "set up AI Public Squares", "教我用 APS", "教我用 AI Public Squares", "裝 APS", "裝 AI Public Squares", "啟動 AI Public Squares", "跨機合作", "想同 [對方] 兩部機合作", "兩部電腦改同一份嘢成日撞", "兩個人改緊同一份文件", "partner workflow", "cross-machine collab", "two AIs collaborating", "我有嘢俾 [對方]", "post to [對方]", "check Hub", "Hub 有新嘢", "[對方] 嗰邊有冇新嘢", "Drive 同步唔到", "[對方] 話收唔到", "sync stuck", "conflict".
---

# AI Public Squares — 跨機合作 skill

> **Status — orchestration spec 已 land(2026-05-23);runtime testing 待 npm publish 0.2.0:** Section 1-8 中文版第一版 ship;對話具體 wording 詳見 `docs/plans/2026-05-23-aps-skill-dialogue-script.md`;英文版 deferred 至 voice locked 後 expand。npm package `@adamchanadam/aps` 0.2.0 未 publish 之前,本 SKILL.md 不會自動 install 至用戶 `~/.claude/skills/aps/` — 觸發需透過 maintainer 手動 copy 至 personal 層,或於本 repo session 內測試。

## 1. 此 skill 的職責

帶用戶行完跨機合作的整個生命周期:初次設置(與對方各自接駁一個共用的雲端資料夾)、日常一來一往(交檔、收檔)、出錯時的補救。用戶多數對協定內部結構毫無概念,亦不應該需要知道。Skill 的責任是將整套協定包成「用戶答幾條問題、其餘自動」的形態。**設置子流程以 5 至 7 條問題的對話完成,過程中由 skill 自動偵測先決條件(雲端硬碟桌面版、Claude Code 在線狀態、Agent Handoff Kit init 狀態),自動執行所有檔案操作,自動處理跨方 starter pack 的 packaging — 用戶不需要打開任何技術文檔。**

## 2. 對用戶輸出的 voice 規矩(嚴格遵守)

- 一律當代繁體書面語。
- 不堆砌技術詞與內部編號(「Phase X」「Layer C」「Stage 4」這類),亦不夾雜中英「半通不通」的片段語。
- 敍事與解釋並行:每一句獨立讀都自足、用戶讀完即知意義,而非要靠前後句拼湊或要打開另一份文件參考。
- 句可短,氣須足。用戶非技術背景,但是成年人,有自己的節奏與判斷力。
- 粵語 colloquial 字詞(「嘅」「嗰」「咗」「唔」「呢個」等)僅可出現於 verbatim 引述用戶原話的觸發短語(例如「Hub 有新嘢」「check Hub」),其他位置一律書面語。

## 3. 起手 routing

Skill 觸發之初,先判斷用戶 intent 屬以下哪一類,再進入對應子流程。**字面短語只是樣本;字面命中或語意命中,任一即足以 route 至該子流程。**

- **初次設置**:用戶語句出現「set up APS」「set up AI Public Squares」「教我用 APS」「教我用 AI Public Squares」「裝 APS」「裝 AI Public Squares」「啟動 AI Public Squares」「跨機合作」「想同 X 兩部機合作」「partner workflow」「cross-machine collab」「two AIs collaborating」「兩部電腦改同一份嘢成日撞」「兩個人改緊同一份文件」等,或語意指向「初次設置一個跨機合作機制」的同類語句 → 進入「設置子流程」(第 4 節)。
- **發佈**:用戶語句出現「我有嘢俾 X」「post to X」「交份嘢」「publish」「我做完份嘢,要俾 [對方]」等,或語意指向「將自己已完成的工作交給對方」的同類語句 → 進入「發佈子流程」(第 5 節)。
- **收件**:用戶語句出現「check Hub」「Hub 有新嘢」「X 嗰邊有冇新嘢」「check inbox」「未消化」「[對方] 整咗咩」等,或語意指向「查看對方有甚麼新東西交過來」的同類語句 → 進入「收件子流程」(第 6 節)。
- **出錯 / 補救**:用戶語句出現「Drive 同步唔到」「X 話收唔到」「sync stuck」「conflict」「出錯」「Claude Code 唔識個 skill」「Agent Handoff Kit 未 init」「對方未 share」等,或語意指向「跨機合作流程中的某環節出錯需要補救」的同類語句 → 進入「補救子流程」(第 7 節)。

意圖不明時(語句模糊或無明顯觸發短語),先以一句中性問題確認:「你是想由零開始裝 APS,還是已經裝過、現在想處理日常的發佈、收件這類動作?」再分流。**不要憑半個短語直接跳入子流程。**

## 4. 設置子流程

觸發來源:第 3 節「初次設置」路由命中。執行順序(每步之 user-facing wording 詳見 dialogue script `docs/plans/2026-05-23-aps-skill-dialogue-script.md` §1.1-1.7 對應節):

1. **打招呼 + 意圖確認**(§1.1):問三件事 — 雲端硬碟是否已裝、是否已與對方溝通過、用哪一個雲端硬碟。若第二件未做,提供 WhatsApp 短訊 sample 給用戶傳給對方,等用戶溝通完之後再繼續。
2. **先決條件 interactive 檢查**(§1.2):
   - Claude Code:skill 被觸發即代表已在線,毋須額外 check。
   - Agent Handoff Kit:用 Read tool 檢查 `AGENTS.md` 是否存在 + 開頭是否屬 kit-managed core。分支 [A] 已 init → 繼續;分支 [B] 未 init → 提供安裝命令,等用戶完成之後再繼續。
   - 雲端硬碟:skill 無法直接 detect Drive 桌面版狀態,透過用戶口頭確認 + 第 5 步寫入時的 io error 偵測雙重保險。
3. **T0 三項拍板**(§1.3):逐項問,接著記入內部狀態(對方 agent_id / 項目 slug / 第一個 packet 發起方)。
4. **默認 4 件確認**(§1.4):列預設值,等用戶回「OK」或指明想改哪一件 + 改成甚麼。
5. **執行檔案操作**(§1.5)— 進度逐步回報,每步用 ⏳ 標記:
   - 用 Write tool 在用戶雲端硬碟 root 建立 `<slug>/_hub/`、`<slug>/from_<own-agent-id>/`、`<slug>/from_<other-agent-id>/`、`<slug>/_ack/` 4 個資料夾(Write 自動建 parent dir)。
   - 複製 PROTOCOL.md v1.0 到 `<slug>/_hub/PROTOCOL.md`(source 為 skill bundled resource `skills/aps/protocol-v1.0.md`,該 supporting file 須於 Phase X-2 npm publish 之前 bundle)。
   - Write Bridge Pack 到用戶項目 `dev/rules/aps-bridge.md`(source:`examples/demo-agent-<a|b>/dev/rules/aps-bridge.md`,依用戶角色 A 或 B 揀)。
   - Edit `AGENTS.md` 加 APS routing 行(具體格式詳見 PROTOCOL.md)。
   - Edit `dev/SESSION_HANDOFF.md` 的 Durable Anchors 加 APS 接駁 entry(寫入 slug + Hub root path + 對方 agent_id + 第一個 packet 發起方)。
6. **跨方 packaging**(§1.6):
   - 生成 starter pack 內容(install 指引 + 已決定的 slug / agent_id / Hub root path + Bridge Pack 副本):Write 到 `<slug>/_hub/starter-pack-<對方 agent_id>.md`。
   - 生成 WhatsApp 短訊文本,輸出到 chat 顯示給用戶 copy(skill 不直接寫入 clipboard — OS clipboard API 非 Claude Code 標準 tool;改為明確 surface「以下短訊請 copy 傳給對方」+ blockquote 包圍)。
7. **首次 dry-run**(§1.7):
   - 生成 test packet header + body。
   - 用 Write tool 寫入 `<slug>/from_<own-agent-id>/packet-test-001-<UTC timestamp>.md`。
   - 通知用戶設置完成 + 等對方那邊完成安裝、回覆 ack。

設置完成之後,skill 不主動跟進 — 等用戶下次觸發其他子流程。

## 5. 發佈子流程

觸發來源:第 3 節「發佈」路由命中。執行順序(user-facing wording 詳見 dialogue script §2):

1. **接收內容 + subject**:問用戶 packet 內容(檔案 / 文字 / 兩者混合)+ short title(用作 packet header 之 `subject` 欄)。
2. **打包 packet**:
   - 生成 packet ID:`packet-<slug-of-subject>-<seq>-<UTC ISO timestamp>`(seq 由 skill 從 `<slug>/from_<own>/` 內現有 packet 計算)。
   - Write packet header:`from` / `to` / `subject` / `version: 1` / `created_utc`。
   - Write packet body:用戶提供的內容(若用戶提供檔案,Read source 後 inline 入 body 或以附件 marker 標明)。
   - Output path:`<slug>/from_<own-agent-id>/<packet-id>.md`。
3. **生成 WhatsApp 短訊**:輸出到 chat 顯示給用戶 copy。Wording 預設粵語(配合用戶實際傳訊習慣);若用戶首句語言為英文,出 English 版本(待 dialogue script §7 英文版 land)。
4. **告訴用戶等對方 ack**:提示用戶接著可說「check Hub」「Jay 嗰邊有冇 ack」等,skill 即會 route 到收件子流程。

Sensitive payload 守則:Write packet 之前,scan body 是否含 credentials / API key / unredacted PII。若有,停手 + 提示用戶改用 out-of-band channel(per §7.3 之 6 件邊界)。

## 6. 收件子流程

觸發來源:第 3 節「收件」路由命中。執行順序(user-facing wording 詳見 dialogue script §3):

1. **掃描對方 lane + 自身 ack**:
   - Read `<slug>/from_<other-agent-id>/` 資料夾,列出所有 packet 檔。
   - Read `<slug>/_ack/<own-agent-id>.ack.json`(自己過去的 ack 紀錄)。
   - 比對:packet 列表 - 已 ack 列表 = 新 packet 候選。
   - 同時 Read `<slug>/_ack/<other-agent-id>.ack.json`,呈現對方對自己之前 publish 的 packet 之 ack 狀態。
2. **呈現結果**:
   - 新 packet list:每件列檔名 / from→to / subject / version / 寫於時間 / 距今多久。
   - 新 ack list:對方確認收到的 packet ID + ack 時間。
   - 每件 packet 顯示頭 200 字 preview。
3. **問用戶想做甚麼**(三選項):
   - **全部讀完**:顯示完整 packet body + 寫入 `<slug>/_ack/<own-agent-id>.ack.json` 一行 consumed 記錄(JSON: `{"consumed": "<packet-id>", "consumed_utc": "<ISO timestamp>"}`)。
   - **稍後讀**:不寫 ack,只保留 mental state「已知 + 未消化」(skill 之後若再被觸發收件,此 packet 仍會呈現)。
   - **跳過**:僅當用戶想對方先撤回 packet 時用此選項 — 寫入 ack 之 `skipped` 欄而非 `consumed`(對方 check Hub 時會見到「Adam 跳過此 packet」狀態)。
4. **執行 + 提示下一步**:依用戶揀的選項做對應 Write/Read。完成後告訴用戶接下來可能想做的動作(發新 draft → route 發佈子流程;暫停消化 → 等下次觸發)。

## 7. 補救子流程 + 6 件不可自動做的事

觸發來源:第 3 節「出錯 / 補救」路由命中。

### 7.1 起手 triage

問用戶 5 種 failure mode 屬哪一類(wording:dialogue script §4.1)。若用戶語句已暗示某類(例如「sync 唔到」 → Mode 1),skill 跳過 triage 直接進入該 mode。

### 7.2 5 種 failure mode 之對應行動

| Mode | 偵測 | 行動 | dialogue ref |
|---|---|---|---|
| 1. 同步問題 | Read 最新 packet 之 mtime + 比對當前時間;若 >5 min 但 Drive 顯示 pending,即用戶端 upload 未完 | 提示用戶在 Drive 桌面版「立即同步」,等 2-3 分鐘後用戶說「重 check」即重做 mtime check | §4.2 |
| 2. Conflict(lock file) | 用戶報告 `~$xxx.md` 存在 | 提示關閉打開該檔之 app + 等 1-2 分鐘 Drive auto release;若仍在,skill 在用戶確認後用 Bash 刪除 `~$xxx.md`(Drive 安全 cleanup) | §4.3 |
| 3. Wrong-lane | Read 該 packet header,比對 sender 欄 vs 所在 lane 資料夾名 | 用戶確認後,用 Bash mv 將 packet 從錯 lane 移到正確 lane;通知用戶傳 WhatsApp 告訴對方 | §4.4 |
| 4. Packet 格式錯誤 | Read 該 packet,parse header;若缺欄(`version` / `from` / `to` / `subject` 之一)即 invalid | 用戶確認後,Write 重生成 packet(用相同 body + 完整 header);用 Bash mv rename 舊有損壞 packet 為 `<packet-id>.invalid.md`(留 audit trail,不刪除) | §4.5 |
| 5. 版本不對齊 | 用戶報告兩邊 Bridge Pack 不同 version | 提示對方跑 `npx @adamchanadam/aps update`;skill 不代對方執行此命令;skill 可代生成 WhatsApp 短訊告訴對方怎做 | §4.6 |

### 7.3 6 件 skill 不可代用戶執行的事(全程堅守)

完整 list 詳見 dialogue script §4.7。要點:

1. WhatsApp 短訊由用戶手動發 — skill 只生成短訊文本。
2. 對方電腦的 onboarding 不在當前 session 範圍。
3. 雲端硬碟同步延遲由用戶等。
4. Packet 內容由用戶 review 後寫入。
5. Sensitive payload 路由由用戶決定 — 偵測 credentials / API key / unredacted PII 即停手 + 提示用戶改用 out-of-band channel。
6. PROTOCOL.md 升級 sign-off 由用戶 review CHANGELOG。

## 8. Cross-link

- `docs/plans/2026-05-23-aps-skill-dialogue-script.md` — dialogue companion / wording bank(對話具體 wording 詳見此檔)
- `dev/qc/2026-05-22-zero-knowledge-funnel-audit.md` — funnel audit + Layer 設計理據
- `docs/guides/aps-onboarding-walkthrough.html` — 詳細設置教學(維護者 / 深入參考層)
- `docs/plans/2026-05-20-agent-public-square-design.md` — 協定設計文件
- Hub 上的 `_hub/PROTOCOL.md` — 協定 v1.0 契約
