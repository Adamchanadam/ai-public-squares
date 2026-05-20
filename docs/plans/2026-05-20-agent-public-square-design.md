# Agent Public Square 設計文件

- 建立日期:2026-05-20
- 狀態:設計定稿(由 brainstorm session 收斂,未進入落地)
- 適用範圍:通用協定,非單一項目
- 第一個落地實例:`mpedu_plus_branding`(Adam ↔ Jay 兩部機之 Claude Code)

---

## 一、摘要

Agent Public Square(下稱 **APS**)係一套畀「不同電腦、不同系統、不同 SSOT 結構」嘅兩個或多個 AI agent 喺同一個 project 內分工協作嘅輕量中介層。佢以 Google Drive 同步資料夾做骨幹載體,以「單寫道帳本 + 不可變交接包」做衝突避免機制,以「焙入 agent-handoff-kit 啟動讀序 + 一句固定 WhatsApp 模板」做零摩擦觸發。

APS 唔擁有真相,只負責搬遞同記帳;唔污染任何一方 SSOT,唔需要連線 API/connector。

---

## 二、背景與痛點

現時情境:

- Adam(branding 文字)同 Jay(視覺設計)各自喺兩部機跑 Claude Code,各自有獨立嘅 `agent-handoff-kit` 同 SSOT 結構。
- 雙方喺同一個 project 內分工,但要頻繁交換 markdown 交接包、圖、規範。
- 現行流程:Adam 完成 → 手動將交接包搬入 Drive → 手動 WhatsApp 通知 Jay → Jay 手動指示自己嗰邊 agent 去 Drive 攞檔 → Jay 個 agent 重新解釋上下文。回方向亦然。
- 痛點:搬檔同解釋上下文係苦工;每個方向都要做一次;雙方 agent 之間冇標準 inbox/outbox;Drive 只係檔案倉庫,唔係協作中介層;進度、狀態、待處理項目唔同步。

設計目標:**保留人手「叫一聲」嘅把關,但搬檔同解釋上下文兩個苦工要由結構消除。**

---

## 三、範疇與非範疇

**範疇(本協定要解決):**

- 跨機、跨環境、跨 SSOT 結構嘅兩個(或將來 N 個)agent 之間交換 markdown、圖、附件。
- 工作狀態同待處理項目嘅單向通報。
- 引用一致(避免引到對方未定稿嘅中間版本)。
- Drive 同步衝突(由結構杜絕,唔靠自律)。
- 零侵入式接入現有 `agent-handoff-kit`。

**非範疇(本協定唔處理):**

- agent 互相控制對方執行環境。
- 即時雙向通訊(本協定係異步、批次、來回式)。
- 自動 merge SSOT(各自 SSOT 永遠由各自 owner 管)。
- 雲端 API 連線、authentication(本協定走本機掛載,唔需要 connector)。
- 真相版本管理(SSOT 真相歸各自 repo,APS 只搬副本快照)。

---

## 四、核心邊界模型(三層)

三層任何時候唔可以撈亂:

1. **各自 SSOT(私有,APS 永不直接寫)** —— 例如 Adam 嘅 `ssot/`、Jay 嘅 `design-brain.md`。APS 冇權改任何一方真相檔。
2. **共享交換區(Drive 同步,中立)** —— 一個 Drive 資料夾,雙方都見到做本地路徑。入面只放「交接包副本 + 附件 + 狀態帳」。佢係「傳遞中嘅內容」,唔係真相本身。
3. **本地橋接(各自,薄薄一層)** —— 每個 agent 嗰邊一個規則包(`bridge-pack`),將自己 SSOT 嘅產出打包送入交換區,以及接收返來嘅嘢登記入自己 task。橋接只做翻譯同搬運。

**關鍵原則:送出去嘅係副本快照(snapshot),唔係 live 連結。** 對方永遠引用「呢一版交接包」而唔係直接讀你 repo。所以雙方各自改各自,唔互相覆蓋,亦唔會引到未定稿中間狀態。

---

## 五、共享層物理結構(單寫道)

核心招數:**每個檔案只有一個寫者。** 由結構消除 Drive 衝突副本問題。

```text
<hub_root>/                                    ← Drive 共享根,已設離線可用
  _hub/
    PROTOCOL.md                               ← 協定契約,唯讀參考
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

1. **單寫道:** `from_X/` 全部由 X 寫;`_ack/X.ack.json` 只由 X 寫。冇任何「兩個寫者共用」嘅檔。
2. **交接包不可變:** 每個 packet 係一個帶版本資料夾,發佈後永不改。要修正 = 出 `__v2` 新版,內文 `supersedes` 寫明取代 v1。雙方永遠引用「packet_id + version」,杜絕引錯版本。
3. **平讀啟動只睇兩個細檔:** agent 啟動只讀「對方 `outbox.log.md` 尾段」 + 「自己 `ack.json`」,兩個都係單寫者細檔。差集就係「指名畀我而我未消化」。冇待處理就一句帶過,唔再拉重嘢。

---

## 六、三種檔的格式

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
ssot_refs:                      # 對自家真相嘅指標,非搬真相
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

（人話內容,一字不改,可直接 copy 現有手寫交接包）
```

**狀態詞中文對照(寫人話正文可用):** `pending` = 待處理 / `in_progress` = 處理中 / `done` = 已完成 / `needs_clarification` = 需澄清 / `fyi_align` = 通知對齊。

### 6.2 事件帳 `outbox.log.md`

只追加,一行一事件,永不改舊行。

```text
2026-05-20T10:30:00Z | publish | 20260520T103000Z__logo_convergence v1 | to:jay | items:A4,A7,section_5
2026-05-20T14:05:11Z | revise  | 20260520T103000Z__logo_convergence v2 | supersedes:v1 | reason:署名層級更新
2026-05-20T16:42:30Z | close   | 20260518T..__color_semantics v1     | reason:Jay 已回包確認
```

事件動詞:`publish` / `revise` / `close` / `withdraw`(極少用,需理由)。

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

啟動計算式:**「對方 `outbox.log.md` 所有未 close 嘅 publish/revise」⊖「自己 `ack.consumed` 已含項」 = 待處理清單。**

---

## 七、啟動 / 收尾橋接(焙入 agent-handoff-kit)

不改 kit 核心,只喺各自嗰邊多一個 `bridge-pack`,連動 startup 同 closeout。

**啟動讀序新增最後一步(平讀,廉價):**

> 讀完本地交接檔(`SESSION_HANDOFF.md` 等)之後,讀 `<hub_root>/<project_slug>/from_<other>/outbox.log.md` 尾段(約 20 行)+ 自己 `_ack/<me>.ack.json`。算出待處理清單:有 → 列出 packet 摘要,等用戶決定即刻處理定稍後;無 → 一句「Hub 無新交接」帶過。

讀取量:最壞 2 個細檔,通常每個 < 5KB。

**收尾(closeout)新增一步:**

> 若今 session 產生咗要交畀對方嘅嘢 → 喺自己 `from_<me>/packets/` 出一個不可變 packet 資料夾 + 追加一行 `from_<me>/outbox.log.md` + 更新 `_ack/<me>.ack.json`(寫低消化咗對方邊個版本)。同步登記入本地 `DOC_SYNC_REGISTRY.md`「APS 共享同步」一行,保持各自 kit 自身帳一致。

---

## 八、人手觸發契約(零摩擦)

人手只負責「叫一聲」,搬檔同解釋由 APS 結構承擔。

**固定 WhatsApp 模板:**

```text
APS Hub 有新交接，開新 session 貼下面呢句畀你 agent：
「讀 <hub_root>/<project_slug>，跟 APS 協定處理 from_<sender> 未消化項目」
```

收方 agent 一開 session,啟動讀序自動行嗰步,自己去 Hub 攞包、攞附件、列待辦。**收方 user 唔使解釋任何上下文。**

呢句模板可以做成 Drive `_hub/PROTOCOL.md` 內嘅標準範本,農生 copy-paste,確保跨人跨 session 一致。

---

## 九、通用模型(三個參數)

APS 對任何 project、任何兩個(或多個)agent 都套到,只要填三個參數:

| 參數 | 形態 | 例 |
|---|---|---|
| `hub_root` | Drive 上一條共享路徑 | `G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` |
| `project_slug` | 一個項目一個英數短名(snake_case) | `mpedu_plus_branding` / `cobeing_website` |
| `agents` | 一對 agent id(將來可 N) | `adam` ↔ `jay` |

**Hub 同 PROTOCOL 唔知亦唔需要知個項目係 branding 定 website,佢只認 packet 同 lane。** 加新項目 = 喺 `hub_root/` 開一個新 `<project_slug>/` 資料夾;加新 agent = 多加一條 lane。

---

## 十、端到端流程演示(以 `mpedu_plus_branding` 做例,協定本身通用)

1. Adam session 收尾:出 `packets/20260520T..__logo_convergence__v1/`(`packet.md` + 附件圖)放入 `mpedu_plus_branding/from_adam/`;追加一行 `from_adam/outbox.log.md`;更新 `_ack/adam.ack.json`。Drive 自動同步。
2. Adam WhatsApp Jay 一句固定模板。
3. Jay 開新 session:啟動讀序自動讀「`from_adam/outbox.log.md` 尾」⊖「`_ack/jay.ack.json`」= 列出「v1 logo_convergence 待 Jay 處理」。Jay 個 agent 主動列待辦,Jay 唔使解釋。
4. Jay 做完視覺,session 收尾:出 `packets/...__logo_convergence_reply__v1/` 入 `from_jay/`;追加 `from_jay/outbox.log.md`;更新 `jay.ack.json` 寫低「Adam v1 已消化、回包 v1」。
5. Adam 下次開 session,同步反方向自動跑。冇人手搬檔、冇人手解釋。

**冷啟動嗰個 session(冇 prior context)亦行得通,因為 packet 自帶 `ssot_refs`、`scope`、`items`,收方足以做事。**

---

## 十一、命名與術語

- **協定名:** Agent Public Square(簡稱 APS)。
- **共享根:** Hub Root(實際路徑 = 你 Drive 嗰個 `AI_Public_Squares\`)。
- **單寫道:** Lane。
- **不可變交接包:** Packet。
- **追加事件帳:** Ledger(即 `outbox.log.md`)。
- **消化登記:** Ack。
- **agent 嗰邊嘅規則包:** Bridge Pack(裝入 `dev/rules/` 並喺 `RULE_PACKS.md` 掛勾)。
- **協定契約檔:** PROTOCOL(放喺 `<hub_root>/_hub/PROTOCOL.md`,雙方唯讀)。

---

## 十二、前置條件與技術核查

### 12.1 Google Drive for Desktop 行為(已查官方)

- Windows 預設「串流模式」,虛擬碟通常係 G:。檔案預設「只在線上」,係佔位符,開檔時即時下載。
- 「鏡像模式」係本機保留完整副本,任何程式直接讀寫,最穩。
- 兩部機改同一個檔 → Drive **唔合併、唔鎖**,而係保留兩份、製造「衝突副本」。
- **APS 必做設定:** Hub Root 資料夾右鍵設「可離線存取」,等 agent 永遠有真實本地副本,消除佔位符/延遲/離線風險。配合 APS 嘅單寫道原則,Drive 衝突副本嘅情況唔會出現。

來源:
- [Stream & mirror files with Drive for desktop — Google Drive Help](https://support.google.com/drive/answer/13401938)
- [Use Google Drive files offline — Google Drive Help](https://support.google.com/drive/answer/2375012)
- [Manage Google Drive for desktop: Advanced guide — Google Drive Help](https://support.google.com/drive/answer/16631477)
- [How to use Google Drive for desktop — Google Drive Help](https://support.google.com/drive/answer/7329379)

### 12.2 Claude Code 對本機路徑嘅存取(已查)

- Claude Code 內建嘅讀/寫/編輯/終端工具直接對本機檔案系統運作,任何用戶授權路徑都得,包括掛載出嚟嘅 Drive 路徑。
- 所謂「Google Drive connector / MCP」係冇本機掛載時嘅雲端通道。**本機已 mount Drive 嘅情況下,APS 唔需要 connector 或 MCP。**

### 12.3 用家確認狀態(2026-05-20)

- Adam 本機:`G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares\` 已設「可離線存取」。✅
- Jay 本機:同一資料夾 mount 並設「可離線存取」。**(尚未確認)** ⚠️
- Drive 共享根寫權限:已批准 APS 讀寫(2026-05-20)。✅
- agent 名字標準化(`adam` / `jay`)同 project_slug 命名同 Jay 對齊。**(尚未確認)** ⚠️

---

## 十三、MVP 落地計劃

按以下順序,分階段落地。每階段完成有可驗證成果。

### 階段 1:Hub Root 結構建立(可由 Adam 一邊獨力完成)

- 建 `<hub_root>/_hub/PROTOCOL.md`(協定契約全文,即本文件之精簡 runtime 版)。
- 建 `<hub_root>/_hub/templates/`,放 `packet.md.template`、`outbox.log.md.template`、`ack.json.template`。
- 建 `<hub_root>/mpedu_plus_branding/` 嘅初始 lane 骨架(`from_adam/`、`from_jay/`、`_ack/`)。

### 階段 2:Bridge Pack 寫入兩個 demo agent

- 喺 `Demo_Agent_Adam_Public_Squares/dev/rules/` 新增 `aps-bridge.md`(規則包內容)。
- 喺 `dev/RULE_PACKS.md` 加一行掛勾。
- 同樣動作做喺 `Demo_Agent_Jay_Public_Squares`。
- 各自 `dev/PROJECT_INDEX.md` 嘅 External Sources 加「APS Hub」一行。
- 各自 `dev/DOC_SYNC_REGISTRY.md` 加「APS 共享同步」change type。

### 階段 3:Round-trip 測試

- Adam demo agent 出一個假 packet → 同步去 Drive → Jay demo agent 啟動 → 確認自動列待辦 → Jay demo agent 出回包 → Adam demo agent 啟動 → 確認自動列「Jay v1 已回」。
- 驗收條件:無人手搬檔、無人手解釋上下文、無 Drive 衝突副本。

### 階段 4:正式接入真實 runtime(將來)

- Adam 真實 `MPEdu_Plus_Branding` runtime 加 `aps-bridge.md`(僅 demo 跑通後)。
- Jay 真實 runtime 同等動作。
- 由真實項目運轉,demo 留作日後新 agent / 新項目 onboarding 嘅 sandbox。

---

## 十四、已知風險 / 未決事項

| 風險 / 待定 | 影響 | 緩解 |
|---|---|---|
| Drive 同步延遲(秒到分鐘) | Jay 接收 packet 慢 | 人手 WhatsApp 觸發本身已比 Drive sync 慢,實際感知無;留意大附件(>50MB)時可能要等 |
| 大附件(影片、巨型 PSD) | Drive 配額消耗、同步慢 | MVP 階段限 packet 附件 ≤ 50MB,大檔走另一條 Drive 子資料夾並喺 packet `attachments_external` 寫路徑 |
| Codex CLI 行為差異 | 將來 Jay 改用 Codex 時可能要重新驗證 | 落地 demo 用 Claude Code 跑通,Codex 接入屬下個 milestone,須再做一次行為驗證 |
| 敏感資料 | Hub 屬中立區,敏感料唔應該流入 | PROTOCOL.md 明文禁止:packet 內唔放 credentials、API key、未公開財務、未授權人名 |
| 三方以上 agent | 目前協定設計為 pairwise lane | N 對 agent = 多條 pairwise channel,結構本身支持,但 PROTOCOL.md MVP 階段先文檔化 1 對 1 |
| Notion 將來介入 | 想做唯讀儀表板(看 packet 同 ack)時 | 將來可寫一條 Notion sync 由 Adam 機單向 push(read-only 儀表板),唔影響 APS 核心 |
| Drive 離線可用嘅磁碟空間 | 影響本機儲存 | Hub 純文字 + 中小附件,常規增長慢;若大附件多,改用「需要先離線」嘅子資料夾分流 |

---

## 十五、附錄

### 15.1 `_hub/PROTOCOL.md` 應該包含

1. APS 概念一句講(中立交換區、單寫道、不可變 packet)。
2. 結構圖(本文 §5)。
3. packet.md YAML schema(本文 §6.1)。
4. outbox.log.md 事件動詞表(本文 §6.2)。
5. ack.json schema(本文 §6.3)。
6. 啟動 / 收尾橋接職責(本文 §7)。
7. 固定 WhatsApp 模板(本文 §8)。
8. 敏感資料禁區(本文 §14)。
9. 修改本協定嘅程序(任何協定改動必由雙方 agent owner 共同議決,寫入 `_hub/CHANGELOG.md`)。

### 15.2 Bridge Pack `aps-bridge.md` 應該包含

- 觸發詞:「跟 APS 協定處理 ... 未消化項目」/「Hub 有新嘢」。
- 啟動讀序步驟(具體指令:讀邊個檔、計算邊個差集、點呈現待辦)。
- 收尾出 packet 嘅步驟(包括 packet_id 命名規則、`packet.md` 必填欄、追加 ledger、更新 ack)。
- 邊界:唔可以寫對方 lane、唔可以改任何 packet 已發佈版本。
- 衝突處理:若見到自己 lane 有未知檔(理論上唔應發生)→ 即停 + 報告 + 唔自動修。

### 15.3 設計嘅五個假設(若任一不成立要重新檢視)

1. 雙方都用同一個 `agent-handoff-kit` 底層。
2. 雙方都用 Claude Code(或行為等效 CLI)。
3. Google Drive for Desktop 喺兩部機都 mount 同同步穩定。
4. 雙方都肯每次 session 開頭跑一次 APS 平讀(極輕但係新習慣)。
5. 雙方都肯遵守「packet 不可變,要改出新版」嘅紀律。

---

## 文件變更歷史

- 2026-05-20:初稿。基於 brainstorm session 收斂(五段設計 + Drive/Claude Code 官方核查)而成。
