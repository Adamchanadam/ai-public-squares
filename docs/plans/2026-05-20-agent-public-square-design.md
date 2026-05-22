# Agent Public Square 設計文件

- 建立日期:2026-05-20
- 狀態:設計定稿(由 brainstorm session 收斂,未進入落地)
- 適用範圍:通用協定,非單一項目
- 設計文件之 example narrative:以 `mpedu_plus_branding`(Adam ↔ Jay 兩部機之 Claude Code 為背景)做設計演示之 example;APS 協定本身為通用,不綁定任何特定項目或人物

---

## 一、摘要

Agent Public Square(下稱 **APS**)為一套予「不同電腦、不同系統、不同 SSOT 結構」之兩個或多個 AI agent 在同一個 project 內分工協作之輕量中介層。本協定以 Google Drive 同步資料夾做骨幹載體,以「單寫道帳本 + 不可變交接包」做衝突避免機制,以「焙入 agent-handoff-kit 啟動讀序 + 一句固定 WhatsApp 模板」做零摩擦觸發。

APS 不擁有真相,只負責搬遞與記帳;不污染任何一方 SSOT,不需要連線 API 或 connector。

---

## 二、背景與痛點

現時情境:

- 兩位用戶(例 Adam 寫 branding 文字、Jay 做視覺設計)各自於兩部機跑 Claude Code,各自有獨立之 `agent-handoff-kit` 與 SSOT 結構。
- 雙方在同一個 project 內分工,但要頻繁交換 markdown 交接包、圖、規範。
- 現行流程:Adam 完成 → 手動將交接包搬入 Drive → 手動 WhatsApp 通知 Jay → Jay 手動指示自己那邊 agent 去 Drive 取檔 → Jay 之 agent 重新解釋上下文。回方向亦然。
- 痛點:搬檔與解釋上下文為苦工;每個方向皆要做一次;雙方 agent 之間無標準 inbox / outbox;Drive 只是檔案倉庫,並非協作中介層;進度、狀態、待處理項目不同步。

設計目標:**保留人手「叫一聲」之把關,但搬檔與解釋上下文兩個苦工須由結構消除。**

---

## 三、範疇與非範疇

**範疇(本協定要解決):**

- 跨機、跨環境、跨 SSOT 結構之兩個(或將來 N 個)agent 之間交換 markdown、圖、附件。
- 工作狀態與待處理項目之單向通報。
- 引用一致(避免引到對方未定稿之中間版本)。
- Drive 同步衝突(由結構杜絕,不靠自律)。
- 零侵入式接入現有 `agent-handoff-kit`。

**非範疇(本協定不處理):**

- agent 互相控制對方執行環境。
- 即時雙向通訊(本協定為異步、批次、來回式)。
- 自動 merge SSOT(各自 SSOT 永遠由各自 owner 管理)。
- 雲端 API 連線、authentication(本協定走本機掛載,不需 connector)。
- 真相版本管理(SSOT 真相歸各自 repo,APS 只搬副本快照)。

---

## 四、核心邊界模型(三層)

三層任何時候不可混淆:

1. **各自 SSOT(私有,APS 永不直接寫)** — 例如 Adam 之 `ssot/`、Jay 之 `design-brain.md`。APS 無權改任何一方真相檔。
2. **共享交換區(Drive 同步,中立)** — 一個 Drive 資料夾,雙方都見到做本地路徑。其中只放「交接包副本 + 附件 + 狀態帳」。本層為「傳遞中之內容」,並非真相本身。
3. **本地橋接(各自,薄薄一層)** — 每個 agent 那邊一個規則包(`bridge-pack`),將自己 SSOT 之產出打包送入交換區,並接收返來之內容登記入自己 task。橋接只做翻譯與搬運。**本層由 agent 程式運行;用戶之操作對 agent,並非對共享資料夾**(actor 區分見 §11)。

**關鍵原則:送出去者為副本快照(snapshot),並非 live 連結。** 對方永遠引用「此一版交接包」而並非直接讀你之 repo。如此雙方各自改各自,不互相覆蓋,亦不會引到未定稿中間狀態。

---

## 五、共享層物理結構(單寫道)

核心招數:**每個檔案只有一個寫者。** 由結構消除 Drive 衝突副本問題。

```text
<hub_root>/                                    ← Drive 共享根,已設離線可用
  _hub/
    PROTOCOL.md                               ← 協定契約,唯讀參考
    CHANGELOG.md                              ← 協定變更記錄(雙方簽字)
  <project_slug>/                             ← 一個 project 一個資料夾
    from_<agent_a>/                           ← agent_a 寫,agent_b 只讀
      outbox.log.md                           ← 只追加事件帳(agent_a 寫)
      packets/
        <UTC>__<short_topic>__v<N>/           ← 每包一版,發佈後唯讀不改
          packet.md
          attachments/...
    from_<agent_b>/                           ← agent_b 寫,agent_a 只讀
      outbox.log.md
      packets/...
    _ack/
      <agent_a>.ack.json                      ← agent_a 寫
      <agent_b>.ack.json                      ← agent_b 寫
```

**三條鐵律:**

1. **單寫道:** `from_X/` 全部由 X 寫;`_ack/X.ack.json` 只由 X 寫。沒有任何「兩個寫者共用」之檔。
2. **交接包不可變:** 每個 packet 為一個帶版本資料夾,發佈後永不改。要修正 = 出 `__v2` 新版,內文 `supersedes` 寫明取代 v1。雙方永遠引用「packet_id + version」,杜絕引錯版本。
3. **平讀啟動只看兩個細檔:** agent 啟動只讀「對方 `outbox.log.md` 尾段」 + 「自己 `ack.json`」,兩者皆為單寫者細檔。差集即為「指名給我而我未消化」。沒有待處理即一句帶過,並不再拉重內容。

---

## 六、三種檔之格式

### 6.0 識別碼與聯合鍵(canonical identifiers)

協定全文用以下三個識別碼,定義一次,後面不重複:

- `<agent_id>` — 一個穩定之小寫 snake_case 字串,代表一個 agent(例:`adam`、`jay`)。同一個字串既為資料夾名(`from_<agent_id>/`、`_ack/<agent_id>.ack.json`),亦為 packet YAML 中 `from:` / `to:` / `owner:` 之值。
- `<project_slug>` — 穩定之小寫 snake_case 字串,代表一個 project。同一字串既為資料夾名,亦為 packet `project:` 欄。
- `<packet_id>` — `<UTC-yyyymmddThhmmssZ>__<short_snake_topic>` 形式之字串。**不含任何版本後綴。**

**`<version>` 為另一個獨立整數**,起始為 1,每次 `revise` +1。

**協定全文之 canonical 聯合鍵為 `(packet_id, version)` 一對。** 同一對 key 在四個地方有四種序列化形態:

| 出現位置 | 形態 |
|---|---|
| Packet 資料夾名 | `<packet_id>__v<N>/` |
| `packet.md` YAML | 兩個獨立欄:`packet_id: <packet_id>` 與 `version: <N>` |
| `outbox.log.md` 行 | `<packet_id> v<N>`(空格,並非 `__v`) |
| `ack.json` entry | 兩個獨立欄:`packet_id` 與 `version` |

`supersedes:` 欄用資料夾名形態:`<packet_id>__v<N>`(或 `null`)。任何 implementation 讀任何一種形態,皆須先 canonicalize 成 `(packet_id, version)` 然後作比較。

### 6.1 交接包 `packet.md`

頭部用 YAML 機讀標頭,內文照舊用人話書寫。

```yaml
---
packet_id: 20260520T103000Z__logo_convergence
version: 1
from: adam
to: jay
project: mpedu_plus_branding
level: L2-handoff               # L1 通知對齊 / L2 交接交付 / L3 急件
supersedes: null                # 無前版則 null;否則前版 packet_id__vN
created_at: 2026-05-20T10:30:00Z
ssot_refs:                      # 對自家真相之指標,並非搬真相
  - "ssot/MASTER_INDEX.md #9 品牌架構"
scope: "只提供文字材料與規範;不含視覺設計"
items:
  - id: A4
    status: pending             # pending / in_progress / done / needs_clarification / fyi_align
    owner: jay
    title: "Logo 兩款提交 Yijia 拍板"
  - id: A7
    status: pending
    owner: jay
    title: "LTE booth 首版 6/1 前"
  - id: section_5
    status: fyi_align
    owner: jay
    title: "視覺敍事概念,非新指令"
---

# 正文標題

(人話內容,一字不改,可直接 copy 現有手寫交接包)
```

**狀態詞中文對照(寫人話正文可用):** `pending` = 待處理 / `in_progress` = 處理中 / `done` = 已完成 / `needs_clarification` = 需澄清 / `fyi_align` = 通知對齊。

**`items[].status` 為 publish 一刻之 snapshot,並非 live 狀態。** 收方做完一個 item 之後不可反過去改原 packet 之 status;要更新狀態 = 出新版本(`revise`)。`supersedes:` 寫舊版本之資料夾名形式(`<packet_id>__v<N>`),保持 `(packet_id, version)` 聯合鍵清晰。

### 6.2 事件帳 `outbox.log.md`

只追加,一行一事件,永不改舊行。

```text
2026-05-20T10:30:00Z | publish | 20260520T103000Z__logo_convergence v1 | to:jay | items:A4,A7,section_5
2026-05-20T14:05:11Z | revise  | 20260520T103000Z__logo_convergence v2 | supersedes:v1 | reason:署名層級更新
2026-05-20T16:42:30Z | close   | 20260518T..__color_semantics v1     | reason:Jay 已回包確認
```

**事件動詞語意(四種,有清晰邊界):**

- `publish` — 第一次發佈 `(packet_id, v1)`。
- `revise` — 發佈新版本 `(packet_id, vN+1)`,新 packet 之 `supersedes:` 須明寫舊版本。
- `close` — 將「整個 logical `packet_id`」(所有版本)標記為已結。帶 `reason:`。`close` 之後,即使收方未 ack,收方亦不應再處理該 packet。
- `withdraw` — 撤回一個已發佈之版本(收方仍未 ack 之前)。帶 `reason:`。Packet 資料夾保留於磁碟(不可變),但收方之 pending 計算須過濾其出。發方有責任先看 `_ack/<receiver>.ack.json`;若收方已 ack 了 `(packet_id, version)`,`withdraw` 為無效,要改用 `close` + 一個有修正內容之 `revise`。

### 6.3 消化登記 `<agent>.ack.json`

```json
{
  "agent": "adam",
  "project": "mpedu_plus_branding",
  "consumed": [
    {
      "packet_id": "20260518T..__color_semantics",
      "version": 1,
      "at": "2026-05-20T09:00:00Z",
      "result": "已併入 ssot/MASTER_INDEX.md #9;回包見 from_adam packet 20260520T..__color_semantics_reply v1"
    }
  ],
  "open_questions": [
    { "ref": "section_7 對外可引用邊界", "need": "待 Adam 確認 G4" }
  ]
}
```

**啟動計算式(由 `(packet_id, version)` 聯合鍵驅動):**

1. 讀對方 `outbox.log.md` 所有事件。
2. 按 `packet_id` 分組。若同組任何一行為 `close` → 整組丟棄(任何版本皆不再列)。
3. 餘下每組,只看 `publish` / `revise` 事件。
4. 每組取最大 `version` 為 winner(舊 `publish` 被新 `revise` 蔽掉)。
5. 若 `(packet_id, winner_version)` 在同組亦出現過 `withdraw`,過濾走;否則對自己 `_ack/<me>.ack.json` `consumed` 比對,匹配同一對 `(packet_id, version)` → 已消化,差集為空 → 不列;比對不到 → 待處理。

**「消化(consume)」之明確定義:** 收方於自己 `_ack/<receiver>.ack.json` `consumed[]` 加了一個 entry,內含 `(packet_id, version)` + `at` + 一句 `result:` 描述做了什麼。沒有 `result:` 之 ack 不算消化。

---

## 七、啟動 / 收尾橋接(焙入 agent-handoff-kit)

不改 kit 核心,只於各自那邊多一個 `bridge-pack`,連動 startup 與 closeout。

**啟動讀序新增最後一步(平讀,廉價):**

> 讀完本地交接檔(`SESSION_HANDOFF.md` 等)之後,讀 `<hub_root>/<project_slug>/from_<other>/outbox.log.md` 尾段(約 20 行)+ 自己 `_ack/<me>.ack.json`。算出待處理清單:有 → 列出 packet 摘要,等用戶決定即刻處理或稍後;無 → 一句「Hub 無新交接」帶過。

讀取量:最壞 2 個細檔,通常每個少於 5 KB。

**Mid-session 手動重跑(由用戶觸發):** 收方 agent 於 session 中間,如果用戶講固定觸發詞(`check Hub` / `未消化` / `睇下 Hub 有冇新嘢`),agent 立即 re-run 同樣計算式。此為手動 trigger,並非自動 poll —— agent 程式不主動監察共享資料夾,設計上保留人手叫一聲之噪音控制(§8)。要做自動 push 通知,須本地 daemon,超出純檔案範圍。

**收尾(closeout)新增一步:**

> 若今 session 產生了要交給對方之內容 → 於自己 `from_<me>/packets/` 出一個不可變 packet 資料夾 + 追加一行 `from_<me>/outbox.log.md` + 更新 `_ack/<me>.ack.json`(寫下消化了對方哪個版本)。同步登記入本地 `DOC_SYNC_REGISTRY.md`「APS 共享同步」一行,保持各自 kit 自身帳一致。

---

## 八、人手觸發契約(零摩擦)

人手只負責「叫一聲」,搬檔與解釋由 APS 結構承擔。

**固定 WhatsApp 模板:**

```text
APS Hub 有新交接,開新 session 貼下面這句予你 agent:
「讀 <hub_root>/<project_slug>,跟 APS 協定處理 from_<sender> 未消化項目」
```

收方 agent 一開 session,啟動讀序自動行此步,自行去 Hub 取包、取附件、列待辦。**收方 user 無需解釋任何上下文。**

此句模板可做成 Drive `_hub/PROTOCOL.md` 之內之標準範本,方便 copy-paste,確保跨人跨 session 一致。

---

## 九、通用模型(三個參數)

APS 對任何 project、任何兩個(或多個)agent 皆適用,只要填三個參數:

| 參數 | 形態 | 例 |
|---|---|---|
| `hub_root` | Drive 上一條共享路徑 | `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` |
| `project_slug` | 一個項目一個英數短名(snake_case) | `mpedu_plus_branding` / `cobeing_website` |
| `agents` | 一對 agent id(將來可 N) | `adam` ↔ `jay` |

**Hub 與 PROTOCOL 不知亦不需要知該項目為 branding 或 website,其只認 packet 與 lane。** 加新項目 = 於 `hub_root/` 開一個新 `<project_slug>/` 資料夾;加新 agent = 多加一條 lane。

---

## 十、端到端流程演示(以 `mpedu_plus_branding` 做 example,協定本身通用)

1. Adam session 收尾:出 `packets/20260520T..__logo_convergence__v1/`(`packet.md` + 附件圖)放入 `mpedu_plus_branding/from_adam/`;追加一行 `from_adam/outbox.log.md`;更新 `_ack/adam.ack.json`。Drive 自動同步。
2. Adam WhatsApp Jay 一句固定模板。
3. Jay 開新 session:啟動讀序自動讀「`from_adam/outbox.log.md` 尾」⊖「`_ack/jay.ack.json`」= 列出「v1 logo_convergence 待 Jay 處理」。Jay 之 agent 主動列待辦,Jay 無需解釋。
4. Jay 完成視覺,session 收尾:出 `packets/...__logo_convergence_reply__v1/` 入 `from_jay/`;追加 `from_jay/outbox.log.md`;更新 `jay.ack.json` 寫下「Adam v1 已消化、回包 v1」。
5. Adam 下次開 session,同步反方向自動跑。沒有人手搬檔、沒有人手解釋。

**冷啟動該 session(沒有 prior context)亦行得通,因 packet 自帶 `ssot_refs`、`scope`、`items`,收方足以做事。**

---

## 十一、命名與術語

- **協定名:** Agent Public Square(簡稱 APS)。
- **共享根:** Hub Root(實際路徑 = 你 Drive 那個 `AI_Public_Squares\`)。
- **單寫道:** Lane。
- **不可變交接包:** Packet。
- **追加事件帳:** Ledger(即 `outbox.log.md`)。
- **消化登記:** Ack。
- **agent 那邊之規則包:** Bridge Pack(裝入 `dev/rules/` 並於 `RULE_PACKS.md` 掛勾)。
- **協定契約檔:** PROTOCOL(放於 `<hub_root>/_hub/PROTOCOL.md`,雙方唯讀)。

### Actor 區分(本文全文通用)

本協定全文嚴格區分四個 actor。本協定文字中提及「Adam 出包」「Jay 撿包」之類之 phrasing,實質係指對應之 agent 程式做 file IO;用戶本人之動作會明寫「用戶 X 發 WhatsApp」「用戶 X 決定 / 揀」之類。

| Actor | 身份 | 負責何類動作 |
|---|---|---|
| 用戶 Adam | 真人 | 寫內容、決定做什麼、決定何時做、發 WhatsApp、決定是否撤回 / 出新版本 |
| Agent Adam | Adam 部機之 agent 程式(Claude Code / Codex CLI 之類) | 對共享資料夾做 file IO(寫包、append ledger、update ack);跑啟動讀序;呈現待辦給 Adam |
| 用戶 Jay | 真人 | 同上,Jay 那邊 |
| Agent Jay | Jay 部機之 agent 程式 | 同上,Jay 那邊 |

**兩條 channel,各做各事:**

- Hub 上之 file IO channel:`Agent Adam ↔ 共享資料夾 ↔ Agent Jay`。兩個 agent 程式各自單寫自己 lane 之檔,過 Drive 同步至對方部機。
- WhatsApp channel:`用戶 Adam ↔ 用戶 Jay`。一句固定模板做 trigger,等收之人開新對話 / 於對話中要求 agent 去 Hub 取。

兩條 channel 平行,各做各事。WhatsApp 並非由 agent 程式發 — 由用戶本人發。Hub 上之檔並非由用戶本人寫 — 由 agent 程式寫。

---

## 十二、前置條件與技術核查

### 12.1 Google Drive for Desktop 行為(已查官方)

- Windows 預設「串流模式」,虛擬碟通常為 G:。檔案預設「只在線上」,為佔位符,開檔時即時下載。
- 「鏡像模式」為本機保留完整副本,任何程式直接讀寫,最為穩定。
- 兩部機改同一個檔 → Drive **不合併、不鎖**,而是保留兩份、製造「衝突副本」。
- **APS 必做設定:** Hub Root 資料夾右鍵設「可離線存取」,讓 agent 永遠有真實本地副本,消除佔位符 / 延遲 / 離線風險。配合 APS 之單寫道原則,Drive 衝突副本之情況不會出現。

來源:

- [Stream & mirror files with Drive for desktop — Google Drive Help](https://support.google.com/drive/answer/13401938)
- [Use Google Drive files offline — Google Drive Help](https://support.google.com/drive/answer/2375012)
- [Manage Google Drive for desktop: Advanced guide — Google Drive Help](https://support.google.com/drive/answer/16631477)
- [How to use Google Drive for desktop — Google Drive Help](https://support.google.com/drive/answer/7329379)

### 12.2 Claude Code 對本機路徑之存取(已查)

- Claude Code 內建之讀 / 寫 / 編輯 / 終端工具直接對本機檔案系統運作,任何用戶授權路徑皆可,包括掛載出來之 Drive 路徑。
- 所謂「Google Drive connector / MCP」為沒有本機掛載時之雲端通道。**本機已 mount Drive 之情況下,APS 無需 connector 或 MCP。**

### 12.3 用家確認狀態(2026-05-20 歷史快照)

> **注意:此節為設計階段之歷史快照,反映 2026-05-20 設計收斂時雙方部機之 setup 狀態。後續實際落地時,雙方之 Hub 路徑與設定為各自個別之 instance value,以實際機器情況為準。本協定為通用 template,不綁定下列具體 path。**

- Adam 本機:`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` 已設「可離線存取」。✅
- Jay 本機:同一資料夾 mount 並設「可離線存取」。**(尚未確認)** ⚠️
- Drive 共享根寫權限:已批准 APS 讀寫(2026-05-20)。✅
- agent 名字標準化(`adam` / `jay`)與 project_slug 命名與 Jay 對齊。**(尚未確認)** ⚠️

---

## 十三、MVP 落地計劃

按以下順序,分階段落地。每階段完成有可驗證成果。

### 階段 1:Hub Root 結構建立(可由 Adam 一邊獨力完成)

- 建 `<hub_root>/_hub/PROTOCOL.md`(協定契約全文,即本文件之精簡 runtime 版)。
- 建 `<hub_root>/_hub/templates/`,放 `packet.md.template`、`outbox.log.md.template`、`ack.json.template`。
- 建 `<hub_root>/mpedu_plus_branding/` 之初始 lane 骨架(`from_adam/`、`from_jay/`、`_ack/`)。

### 階段 2:Bridge Pack 寫入兩個 demo agent

- 於 `Demo_Agent_Adam_Public_Squares/dev/rules/` 新增 `aps-bridge.md`(規則包內容)。
- 於 `dev/RULE_PACKS.md` 加一行掛勾。
- 同樣動作做於 `Demo_Agent_Jay_Public_Squares`。
- 各自 `dev/PROJECT_INDEX.md` 之 External Sources 加「APS Hub」一行。
- 各自 `dev/DOC_SYNC_REGISTRY.md` 加「APS 共享同步」change type。

### 階段 3:Round-trip 測試

- Adam demo agent 出一個假 packet → 同步去 Drive → Jay demo agent 啟動 → 確認自動列待辦 → Jay demo agent 出回包 → Adam demo agent 啟動 → 確認自動列「Jay v1 已回」。
- 驗收條件:無人手搬檔、無人手解釋上下文、無 Drive 衝突副本。

### 階段 4:正式接入真實 runtime(將來)

- Adam 真實 `MPEdu_Plus_Branding` runtime 加 `aps-bridge.md`(僅 demo 跑通後)。
- Jay 真實 runtime 同等動作。
- 由真實項目運轉,demo 留作日後新 agent / 新項目 onboarding 之 sandbox。

---

## 十四、已知風險 / 未決事項

| 風險 / 待定 | 影響 | 緩解 |
|---|---|---|
| Drive 同步延遲(秒至分鐘) | Jay 接收 packet 慢 | 人手 WhatsApp 觸發本身已比 Drive sync 慢,實際感知無;留意大附件(逾 50 MB)時可能要等 |
| 大附件(影片、巨型 PSD) | Drive 配額消耗、同步慢 | MVP 階段限 packet 附件 ≤ 50 MB,大檔走另一條 Drive 子資料夾並於 packet `attachments_external` 寫路徑 |
| Codex CLI 行為差異 | 將來 Jay 改用 Codex 時可能要重新驗證 | 落地 demo 用 Claude Code 跑通,Codex 接入屬下個 milestone,須再做一次行為驗證 |
| 敏感資料 | Hub 屬中立區,敏感料不應該流入 | PROTOCOL.md 明文禁止:packet 內不放 credentials、API key、未公開財務、未授權人名 |
| 三方以上 agent | 目前協定設計為 pairwise lane | N 對 agent = 多條 pairwise channel,結構本身支持,但 PROTOCOL.md MVP 階段先文檔化 1 對 1 |
| Notion 將來介入 | 想做唯讀儀表板(看 packet 與 ack)時 | 將來可寫一條 Notion sync 由 Adam 機單向 push(read-only 儀表板),不影響 APS 核心 |
| Drive 離線可用之磁碟空間 | 影響本機儲存 | Hub 純文字 + 中小附件,常規增長慢;若大附件多,改用「需要先離線」之子資料夾分流 |

---

## 十五、附錄

### 15.1 `_hub/PROTOCOL.md` 應該包含

1. APS 概念一句講(中立交換區、單寫道、不可變 packet)。
2. 識別碼與聯合鍵定義:`<agent_id>` / `<project_slug>` / `<packet_id>` / `<version>` 各定義一次;`(packet_id, version)` 為 canonical join key + 四種序列化形態對照表(本文 §6.0)。
3. 結構圖,包括 `_hub/CHANGELOG.md`(本文 §5)。
4. packet.md YAML schema + status snapshot 規則(本文 §6.1)。
5. outbox.log.md 事件動詞表,四個動詞各自明確邊界(本文 §6.2)。
6. ack.json schema 與「消化」定義(本文 §6.3)。
7. Receiver pending 計算式(排除 `close` 組、過濾 `withdraw` 版本)(本文 §6.3)。
8. 啟動 / 收尾橋接職責(本文 §7)。
9. 固定 WhatsApp 模板(本文 §8)。
10. 敏感資料禁區(本文 §14)。
11. 修改本協定之程序(任何協定改動須由雙方 agent owner 共同議決,寫入 `_hub/CHANGELOG.md`)。

### 15.2 Bridge Pack `aps-bridge.md` 應該包含

- 觸發詞:「跟 APS 協定處理 ... 未消化項目」/「Hub 有新嘢」。
- 啟動讀序步驟(具體指令:讀哪個檔、計算哪個差集、如何呈現待辦)。
- 收尾出 packet 之步驟(包括 packet_id 命名規則、`packet.md` 必填欄、追加 ledger、更新 ack)。
- 邊界:不可寫對方 lane、不可改任何 packet 已發佈版本。
- 衝突處理:若見自己 lane 有未知檔(理論上不應發生)→ 立停 + 報告 + 不自動修。

### 15.3 設計之五個假設(若任一不成立要重新檢視)

1. 雙方皆用同一個 `agent-handoff-kit` 底層。
2. 雙方皆用 Claude Code(或行為等效 CLI)。
3. Google Drive for Desktop 於兩部機皆 mount 與同步穩定。
4. 雙方皆肯每次 session 開頭跑一次 APS 平讀(極輕但屬新習慣)。
5. 雙方皆肯遵守「packet 不可變,要改出新版」之紀律。

---

## 文件變更歷史

- 2026-05-20:初稿。基於 brainstorm session 收斂(五段設計 + Drive / Claude Code 官方核查)而成。
- 2026-05-21:輕量補丁 — §11 加 Actor 區分定義與兩條 channel 分工;§4 加 cross-ref 至 §11;§7 加 mid-session trigger caveat(手動 trigger,並非自動 poll)。配合用戶面向 walkthrough 之 actor 區分重整,協定設計本身不變。
- 2026-05-22:Voice rewrite 至當代繁體書面語(per Adam 2026-05-22 hard rule);header 之「第一個落地實例」改為「設計文件之 example narrative」(reframe 為通用 template + example,非 instance);§12.3 加 disclaimer 標明該節為「2026-05-20 歷史快照」。協定設計與技術內容不變。
