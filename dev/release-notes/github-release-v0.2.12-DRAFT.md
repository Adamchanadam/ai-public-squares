# Agent Public Squares v0.2.12 — Pre-release

第一個以新品牌 **Agent Public Squares** 發佈的 GitHub release。涵蓋 0.2.8 之後四個 npm-only 預發布版（0.2.9–0.2.12）的累積成果。仍屬前期測試版。

> 前稱 AI Public Squares。npm 套件名不變：`@adamchanadam/aps`（簡稱 APS 兩個名通用，安裝零斷裂）。GitHub repo 由 `ai-public-squares` 改名為 `agent-public-squares`。

## Status

- GitHub pre-release.
- npm latest pre-release: `@adamchanadam/aps@0.2.12`.
- 安裝路徑不變：`npm install --save-dev @adamchanadam/aps@latest`，再 `npx aps init`；既有項目用 `npx aps upgrade`。

## Renamed (0.2.12)

- 產品正名 **AI Public Squares → Agent Public Squares**（公開面、skill、CLI、PROTOCOL 標題、文檔）；`AI Public Squares` 保留為仍可識別的舊名 alias，舊用戶說法照樣 route。
- 收件觸發詞 `check Hub` → **`check Drive`**（`check Hub` 保留為隱藏 alias）；用戶面概念詞「Hub」→「共用 Drive 資料夾」。設定檔內部鍵 `hubRoot`、`_hub/`、協定結構詞不變。
- GitHub repo 改名 `agent-public-squares`：網頁與 git 操作自動轉址，但 Pages 舊網址不轉址（已 404）。

## Improved (0.2.12)

- 新手教學由「兩個人」更正為已出貨的多協作對象模型：一個項目可把不同部分交給不同對象，每次交接仍是一對一、經人確認；流程圖加入「揀今次交俾邊位對象」。
- 公開版本字眼改為中性（以 npm `@latest` 為準），不再寫死版本號，杜絕文檔落後。

## Carried from 0.2.9–0.2.11

- **0.2.9** Project Peers + Sent Status：`peers` / `peer add` / `peer starter` / `publish --to` / `inbox --from` / `inbox --all` / `status --packet-id`；一個項目多位協作對象，每個交接包仍只發一位。
- **0.2.10** `aps init` 接受含方括號的合法 Google Drive 路徑（佔位符防呆只擋 `<...>` / `...`）。
- **0.2.11** Peer 生命週期修正：發佈／收件自動確認自己嗰張 peer card；`publish --to` 三檔收件人閘（已確認 / 雖 provisional 但有真實活動 / 擋）；「角色 A/B」改寫為「設定起手方向」。
- **Codex 載入修正**：skill frontmatter `description` ≤1024 且合法 YAML。

## Verification

- 🔴 全面檢通過（報告：`dev/qc/2026-05-29-aps-full-audit-0.2.12-naming.md`）：嵌套快檢、13 項外發前檢、隔離 Hub 協定往返回歸（無 regression）、5 頁瀏覽器 render（0 console error）、spec-to-runtime 三入口 + 品牌分流。
- `npm view` 讀回：version/latest 0.2.12、14 檔；`npx @latest --help` 顯示新品牌 banner。
- Pages 讀回：新網址 HTTP 200、品牌「Agent Public Squares」、check Drive present。

## Not done / deferred

- 兩部實體機真機 Google Drive 往返 + 人類互動 UX UAT（需協作者重裝 `@latest` 後驗）。
- 0.2.13 人性化安裝（安裝只問三件事；doctor 拆本機／peer 健康；無對象時 publish 提示揀人；starter pack 改於邀請時生成）。
- 延後不變：真正多人平台、多收件人 packet、`_notify`、`watch`、平台排程、Project Context Index、Dropbox / OneDrive。

---

### 開 release 嘅執行備註（給維護者）

- 0.2.9–0.2.12 係 npm-only，未打 git tag。開 release 前需先打並推 tag：
  `git tag v0.2.12 c9e8057 && git push origin v0.2.12`（或讓 `gh release create` 自動建 tag）。
- 開 release：`gh release create v0.2.12 --repo Adamchanadam/agent-public-squares --prerelease --title "Agent Public Squares v0.2.12 — Pre-release" --notes-file dev/release-notes/github-release-v0.2.12-DRAFT.md`
- 屬不可逆外部操作，需 Adam 明示授權；打 tag 同開 release 都係。
