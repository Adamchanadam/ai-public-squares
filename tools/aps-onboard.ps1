<#
.SYNOPSIS
  APS runtime onboarding helper. Idempotent installer for the 4 mechanical
  governance edits needed to wire APS Bridge Pack into a real runtime
  (T2-T5 of docs/plans/2026-05-21-aps-phase4-plan.md). T6 (SESSION_HANDOFF
  Durable Anchors) is left manual because it involves judgement.

.DESCRIPTION
  Automates these 4 edits, in order:
    T2: Copy Bridge Pack from a demo workspace; substitute Identity values.
    T3: Insert APS routing row before '## Routing Rule' in dev/RULE_PACKS.md.
    T4: Append APS Hub row to dev/PROJECT_INDEX.md '## External Sources' table.
    T5: Insert 2 APS sync rows before '## Registry Rule' in dev/DOC_SYNC_REGISTRY.md.

  Idempotent: re-running is safe. Already-present rows / files are detected
  and skipped (reported, not re-added).

  Newline preservation: detects existing CRLF / LF in each target file and
  uses the same convention for inserted rows.

  Execution policy: if your PowerShell session is restricted, invoke as:
    powershell -NoProfile -ExecutionPolicy Bypass -File tools/aps-onboard.ps1 ...

.PARAMETER RuntimeRoot
  Absolute path to the target workspace where APS Bridge Pack will be installed.
  Must be a sub-folder of a disk (a disk root like 'C:\' is rejected).

.PARAMETER ProjectSlug
  Project slug. Lower snake_case, 1-30 chars, must start with a letter.

.PARAMETER AgentId
  Local agent id ('adam' on Adam's machine, 'jay' on Jay's machine).

.PARAMETER OtherAgentId
  Counterpart agent id. Must differ from AgentId.

.PARAMETER HubRoot
  Absolute path to the Hub Root on this machine's Drive mount. Letters may
  differ between machines (Adam G:\, Jay possibly H:\); this is per-agent.

.PARAMETER DemoPackPath
  Absolute path to the source Bridge Pack file to copy. Typically:
    C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares\dev\rules\aps-bridge.md
  (for Adam) or the demo Jay equivalent (for Jay). Demo pack must already
  carry Layer 1 polish (conflict auto-scan + canonical `check Hub` trigger)
  per Phase 4 plan T0b.

.PARAMETER DryRun
  Preview changes without writing. Reports each step as DRY-RUN.

.EXAMPLE
  powershell -NoProfile -ExecutionPolicy Bypass -File tools\aps-onboard.ps1 `
    -RuntimeRoot "C:\Users\adam\_claude_desktop\Work_MP\明報教育Plus\MP - 明報教育服務\MPEdu_Plus_Branding" `
    -ProjectSlug "branding_2026" `
    -AgentId "adam" `
    -OtherAgentId "jay" `
    -HubRoot "G:\我的雲端硬碟\Adam 工作目錄\AI_Projects\AI_Public_Squares" `
    -DemoPackPath "C:\Users\adam\_claude_desktop\Demo_Agent_Adam_Public_Squares\dev\rules\aps-bridge.md" `
    -DryRun

.NOTES
  T6 (dev/SESSION_HANDOFF.md Durable Anchors) is intentionally NOT automated.
  After this script completes, manually update SESSION_HANDOFF.md per
  walkthrough section 4 step 6 of docs/guides/aps-onboarding-walkthrough.html.

  After T6, run 'npx @adamchanadam/agent-handoff-kit doctor' to verify
  governance health.
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$RuntimeRoot,
    [Parameter(Mandatory=$true)][string]$ProjectSlug,
    [Parameter(Mandatory=$true)][string]$AgentId,
    [Parameter(Mandatory=$true)][string]$OtherAgentId,
    [Parameter(Mandatory=$true)][string]$HubRoot,
    [Parameter(Mandatory=$true)][string]$DemoPackPath,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# ============================================================================
# Validation
# ============================================================================

function Test-SnakeSlug {
    param([string]$Value, [string]$Name)
    if ($Value -cnotmatch '^[a-z][a-z0-9_]{0,29}$') {
        throw ("{0} '{1}' invalid. Must be lower snake_case, 1-30 chars, start with letter." -f $Name, $Value)
    }
}

Test-SnakeSlug -Value $ProjectSlug -Name 'ProjectSlug'
Test-SnakeSlug -Value $AgentId -Name 'AgentId'
Test-SnakeSlug -Value $OtherAgentId -Name 'OtherAgentId'

if ($AgentId -eq $OtherAgentId) {
    throw "AgentId and OtherAgentId must differ (both are '$AgentId')."
}

# Reject disk root or very-short paths (e.g. 'C:\')
if ($RuntimeRoot.Length -le 4 -or $RuntimeRoot -match '^[A-Za-z]:\\?$') {
    throw "RuntimeRoot '$RuntimeRoot' looks like a disk root. Pass a real workspace sub-folder."
}

if (-not (Test-Path $RuntimeRoot -PathType Container)) {
    throw "Runtime workspace not found: $RuntimeRoot"
}

if (-not (Test-Path $DemoPackPath -PathType Leaf)) {
    throw "Demo Bridge Pack source not found: $DemoPackPath"
}

$BridgePack = Join-Path $RuntimeRoot 'dev\rules\aps-bridge.md'
$RulePacks  = Join-Path $RuntimeRoot 'dev\RULE_PACKS.md'
$ProjectIdx = Join-Path $RuntimeRoot 'dev\PROJECT_INDEX.md'
$SyncReg    = Join-Path $RuntimeRoot 'dev\DOC_SYNC_REGISTRY.md'

foreach ($f in @($RulePacks, $ProjectIdx, $SyncReg)) {
    if (-not (Test-Path $f -PathType Leaf)) {
        throw "Required governance file not found: $f. Run 'agent-handoff-kit init' in the runtime workspace first."
    }
}

# ============================================================================
# Helpers
# ============================================================================

function Write-Step([string]$Msg) {
    if ($DryRun) {
        Write-Host "[DRY-RUN] $Msg" -ForegroundColor Yellow
    } else {
        Write-Host "[OK]      $Msg" -ForegroundColor Green
    }
}

function Write-Skip([string]$Msg) {
    Write-Host "[SKIP]    $Msg" -ForegroundColor Cyan
}

function Get-FileNewline {
    param([string]$Path)
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    for ($i = 0; $i -lt $bytes.Length - 1; $i++) {
        if ($bytes[$i] -eq 13 -and $bytes[$i+1] -eq 10) { return "`r`n" }
        if ($bytes[$i] -eq 10) { return "`n" }
    }
    return [Environment]::NewLine
}

function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Set-IdentityField {
    param([string]$Content, [string]$Field, [string]$Value)
    # Demo pack Identity uses backtick-wrapped values, optionally with trailing inline comment.
    # Example:  - other_agent_id: `jay`  # the counterpart agent in this pair
    $pattern = '(?m)^(- ' + [regex]::Escape($Field) + ':\s*)`[^`]+`(.*)$'
    $count = ([regex]::Matches($Content, $pattern)).Count
    if ($count -eq 0) {
        throw ("Identity field '{0}' not found in Bridge Pack source. Expected line like: '- {0}: ``<value>``'." -f $Field)
    }
    $replacement = '$1`' + $Value + '`$2'
    return [regex]::Replace($Content, $pattern, $replacement)
}

# ============================================================================
# T2: Bridge Pack file with Identity substituted
# ============================================================================

if (Test-Path $BridgePack -PathType Leaf) {
    Write-Skip "T2: Bridge Pack already exists at $BridgePack."
    Write-Host "          Will NOT overwrite. Manually review the existing file to confirm Layer 1 polish (conflict auto-scan + 'check Hub' canonical trigger) per Phase 4 plan T0b is present." -ForegroundColor Cyan
} else {
    $content = [System.IO.File]::ReadAllText($DemoPackPath)
    $content = Set-IdentityField $content 'agent_id'       $AgentId
    $content = Set-IdentityField $content 'project_slug'   $ProjectSlug
    $content = Set-IdentityField $content 'hub_root'       $HubRoot
    $content = Set-IdentityField $content 'other_agent_id' $OtherAgentId

    $BridgePackDir = Split-Path $BridgePack
    if (-not (Test-Path $BridgePackDir -PathType Container)) {
        if ($DryRun) {
            Write-Step "T2: would create directory $BridgePackDir"
        } else {
            New-Item -ItemType Directory -Path $BridgePackDir -Force | Out-Null
        }
    }
    if ($DryRun) {
        Write-Step "T2: would create $BridgePack (agent_id=$AgentId, project_slug=$ProjectSlug, hub_root=$HubRoot, other_agent_id=$OtherAgentId)"
    } else {
        Write-Utf8NoBom -Path $BridgePack -Content $content
        Write-Step "T2: created $BridgePack with Identity substituted."
    }
}

# ============================================================================
# T3: RULE_PACKS routing row
# ============================================================================

$rulePacksContent = [System.IO.File]::ReadAllText($RulePacks)
if ($rulePacksContent -match [regex]::Escape('aps-bridge.md')) {
    Write-Skip "T3: APS routing row already present in $RulePacks."
} else {
    if ($rulePacksContent -notmatch '(?m)^## Routing Rule') {
        throw "T3: '## Routing Rule' heading not found in $RulePacks. Manual fallback: append routing row at end of routing table, before any '## ' section."
    }
    $nl = Get-FileNewline -Path $RulePacks
    $routingRow = '| Cross-machine handoff, APS, packet, lane, ack, Hub, 共享 inbox | `dev/rules/aps-bridge.md` | check Hub inbox at startup, publish packet at closeout |'
    $newContent = [regex]::Replace($rulePacksContent, '(?m)(?=^## Routing Rule)', ($routingRow + $nl + $nl))
    if ($DryRun) {
        Write-Step "T3: would insert APS routing row before '## Routing Rule' in $RulePacks."
    } else {
        Write-Utf8NoBom -Path $RulePacks -Content $newContent
        Write-Step "T3: added APS routing row to $RulePacks."
    }
}

# ============================================================================
# T4: PROJECT_INDEX External Sources row
# ============================================================================

$projIdxContent = [System.IO.File]::ReadAllText($ProjectIdx)
if ($projIdxContent -match 'APS Hub') {
    Write-Skip "T4: APS Hub External Source row already present in $ProjectIdx."
} else {
    if ($projIdxContent -notmatch '(?m)^## External Sources') {
        throw "T4: '## External Sources' heading not found in $ProjectIdx. Manual fallback: add the heading + a markdown table with header row 'Source | Role | Required before | Access method | Write-back rule | Last verified', then re-run this script."
    }
    $nl = Get-FileNewline -Path $ProjectIdx
    $today = (Get-Date -Format 'yyyy-MM-dd')
    $extSourceRow = ('| APS Hub | shared exchange zone with {0} (other APS agent) | every session startup; closeout if producing | `{1}` (Google Drive, offline-available) | single-writer per lane; never write `from_{0}/` or `_ack/{0}.ack.json`; project slug `{2}` | {3} |' -f $OtherAgentId, $HubRoot, $ProjectSlug, $today)

    # Locate '## External Sources' section, find next '## ' heading or EOF, insert after last non-empty line before that boundary
    $allLines = [regex]::Split($projIdxContent, "`r?`n")
    $extIdx = -1
    for ($i = 0; $i -lt $allLines.Length; $i++) {
        if ($allLines[$i].Trim() -eq '## External Sources') { $extIdx = $i; break }
    }
    if ($extIdx -lt 0) {
        throw "T4 internal: heading scan failed after pattern pre-check passed. Report as bug."
    }
    $endIdx = $allLines.Length
    for ($i = $extIdx + 1; $i -lt $allLines.Length; $i++) {
        if ($allLines[$i] -match '^## ') { $endIdx = $i; break }
    }
    $hasTableRow = $false
    for ($i = $extIdx + 1; $i -lt $endIdx; $i++) {
        if ($allLines[$i] -match '^\|') { $hasTableRow = $true; break }
    }
    if (-not $hasTableRow) {
        throw "T4: '## External Sources' section found but no markdown table rows detected between it and the next heading. Manual fallback: add a table header + dashes row first, then re-run."
    }
    $insertIdx = $endIdx
    for ($i = $endIdx - 1; $i -gt $extIdx; $i--) {
        if ($allLines[$i].Trim() -ne '') { $insertIdx = $i + 1; break }
    }

    $newLinesList = [System.Collections.ArrayList]::new()
    for ($i = 0; $i -lt $insertIdx; $i++) { [void]$newLinesList.Add($allLines[$i]) }
    [void]$newLinesList.Add($extSourceRow)
    for ($i = $insertIdx; $i -lt $allLines.Length; $i++) { [void]$newLinesList.Add($allLines[$i]) }
    $newContent = ($newLinesList -join $nl)

    if ($DryRun) {
        Write-Step "T4: would append APS Hub row to External Sources table in $ProjectIdx."
    } else {
        Write-Utf8NoBom -Path $ProjectIdx -Content $newContent
        Write-Step "T4: added APS Hub row to External Sources in $ProjectIdx."
    }
}

# ============================================================================
# T5: DOC_SYNC_REGISTRY two sync rows
# ============================================================================

$syncRegContent = [System.IO.File]::ReadAllText($SyncReg)
if ($syncRegContent -match 'APS packet publish') {
    Write-Skip "T5: APS sync rows already present in $SyncReg."
} else {
    if ($syncRegContent -notmatch '(?m)^## Registry Rule') {
        throw "T5: '## Registry Rule' heading not found in $SyncReg. Manual fallback: append two sync rows at end of registry table, before any '## ' section."
    }
    $nl = Get-FileNewline -Path $SyncReg
    $rowPublish = '| APS packet publish | `<hub_root>/<project_slug>/from_<me>/packets/...`, `from_<me>/outbox.log.md`, local `SESSION_LOG.md` Sync line | packet folder exists, outbox.log has matching line, ack.json updated if consuming |'
    $rowConsume = '| APS packet consume | local `_ack/<me>.ack.json`, local `SESSION_LOG.md` Sync line | ack.consumed contains (packet_id, version); result string set |'
    $rowsBlock = $rowPublish + $nl + $rowConsume
    $newContent = [regex]::Replace($syncRegContent, '(?m)(?=^## Registry Rule)', ($rowsBlock + $nl + $nl))
    if ($DryRun) {
        Write-Step "T5: would insert APS publish + consume rows before '## Registry Rule' in $SyncReg."
    } else {
        Write-Utf8NoBom -Path $SyncReg -Content $newContent
        Write-Step "T5: added APS publish + consume rows to $SyncReg."
    }
}

# ============================================================================
# T6 reminder + final guidance (bilingual)
# ============================================================================

Write-Host ""
Write-Host "T6 reminder - SESSION_HANDOFF Durable Anchors (NOT automated):" -ForegroundColor Yellow
Write-Host "  EN: Manually update $RuntimeRoot\dev\SESSION_HANDOFF.md Durable Anchors with the APS-active note." -ForegroundColor Yellow
Write-Host "  ZH: 手動更新 dev\SESSION_HANDOFF.md Durable Anchors,加一條 APS Bridge 啟動嘅記錄(見教學頁 §4 步 6):" -ForegroundColor Yellow
Write-Host ("       APS Bridge Pack live; agent_id={0}; Hub at {1}; lane {2}/from_{0}/; counterpart {3}" -f $AgentId, $HubRoot, $ProjectSlug, $OtherAgentId) -ForegroundColor Yellow
Write-Host ""

if ($DryRun) {
    Write-Host "Dry-run complete. Re-run without -DryRun to apply changes." -ForegroundColor Cyan
} else {
    Write-Host "Onboarding helper complete. After T6 manual edit:" -ForegroundColor Green
    Write-Host "  Run 'npx @adamchanadam/agent-handoff-kit doctor' in the runtime workspace to confirm governance health before committing." -ForegroundColor Green
}
