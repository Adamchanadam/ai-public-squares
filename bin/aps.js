#!/usr/bin/env node
/**
 * APS — AI Public Squares
 * Bootstrap CLI for setting up cross-machine AI agent collaboration.
 *
 * Status: bridge-pack fixture provision, skill install, Hub skeleton setup,
 * and local publish / inbox / consume / close smoke flow are available.
 *
 * Roadmap: dev/qc/2026-05-22-zero-knowledge-funnel-audit.md in repo.
 */

const path = require('path');
const fs = require('fs');
const readline = require('readline');

const subcommand = process.argv[2];
const args = process.argv.slice(3);
const packageJson = require('../package.json');
const packageVersion = packageJson.version || 'version unknown';

function hasFlag(name) {
  return args.includes(name);
}

function getFlagValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index < 0 || !process.argv[index + 1]) return fallback;
  return process.argv[index + 1];
}

function getRequiredFlagValue(name) {
  const value = getFlagValue(name, null);
  return value && !value.startsWith('--') ? value : null;
}

function configPath() {
  return path.join(process.cwd(), '.aps', 'config.json');
}

function loadConfig() {
  const filePath = configPath();
  if (!fs.existsSync(filePath)) return {};
  try {
    return readJson(filePath);
  } catch (err) {
    throw new Error(`APS config is not valid JSON: ${filePath}. ${err.message}`);
  }
}

function loadConfigOrExit() {
  try {
    return loadConfig();
  } catch (err) {
    console.error(`Config failed: ${err.message}`);
    console.error('Fix `.aps/config.json`, or rerun `npx aps config --hub-root ... --project ... --agent-id ... --other-agent-id ... --role A|B`.');
    process.exit(1);
  }
}

function saveConfig(values, dryRun) {
  return writeConfig(values, dryRun);
}

function writeConfig(values, dryRun) {
  const filePath = configPath();
  const content = {
    hubRoot: values.hubRoot,
    projectSlug: values.projectSlug,
    agentId: values.agentId,
    otherAgentId: values.otherAgentId,
    role: values.role,
  };
  if (!dryRun) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  }
  return { ok: true, path: filePath, message: dryRun ? `would write/update ${filePath}` : `wrote/updated ${filePath}` };
}

function flagOrConfig(flagName, configKey, config) {
  return getRequiredFlagValue(flagName) || config[configKey] || null;
}

function requireValues(values) {
  const missing = Object.entries(values)
    .filter(([, value]) => value === null || value === undefined || value === '')
    .map(([name]) => name);
  if (missing.length > 0) {
    console.error(`Missing required values: ${missing.join(', ')}`);
    console.error('Run `npx aps init` for guided setup first, or pass all required flags.');
    process.exit(1);
  }
}

function homeDir() {
  return process.env.HOME || process.env.USERPROFILE || null;
}

function copyDirectory(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function writeFileIfMissing(filePath, content, dryRun) {
  if (fs.existsSync(filePath)) {
    return { ok: false, skipped: true, path: filePath, message: `exists; not overwriting (${filePath})` };
  }
  if (!dryRun) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
  return { ok: true, skipped: false, path: filePath, message: dryRun ? `would write ${filePath}` : `wrote ${filePath}` };
}

function writeFileOrUpdate(filePath, content, dryRun) {
  if (!dryRun) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
  return { ok: true, skipped: false, path: filePath, message: dryRun ? `would write/update ${filePath}` : `wrote/updated ${filePath}` };
}

function upsertManagedBlock(filePath, blockName, blockContent, insertBeforePattern, dryRun) {
  const begin = `<!-- BEGIN APS managed ${blockName} -->`;
  const end = `<!-- END APS managed ${blockName} -->`;
  const block = `${begin}\n${blockContent.trim()}\n${end}`;
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const pattern = new RegExp(`${escapeRegExp(begin)}[\\s\\S]*?${escapeRegExp(end)}`);
  let next;
  let verb;
  if (pattern.test(current)) {
    next = current.replace(pattern, block);
    verb = 'refresh';
  } else if (insertBeforePattern && insertBeforePattern.test(current)) {
    next = current.replace(insertBeforePattern, `\n${block}\n\n$&`);
    verb = 'add';
  } else {
    next = `${current.replace(/\s*$/, '')}\n\n${block}\n`;
    verb = 'add';
  }
  if (!dryRun && next !== current) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, next, 'utf8');
  }
  return {
    ok: true,
    skipped: next === current,
    path: filePath,
    message: dryRun
      ? `would ${verb} APS ${blockName} registration in ${filePath}`
      : (next === current ? `APS ${blockName} registration already current (${filePath})` : `${verb}ed APS ${blockName} registration in ${filePath}`),
  };
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function ensureDirectory(dirPath, dryRun) {
  if (!dryRun) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return { ok: true, path: dirPath, message: dryRun ? `would create ${dirPath}` : `created ${dirPath}` };
}

function ensureHandoffKitReady() {
  const required = [
    'AGENTS.md',
    path.join('dev', 'RULE_PACKS.md'),
    path.join('dev', 'PROJECT_INDEX.md'),
  ];
  const missing = required.filter((relativePath) => !fs.existsSync(path.join(process.cwd(), relativePath)));
  if (missing.length > 0) {
    throw new Error(`Agent Handoff Kit is not initialized in this project. Missing: ${missing.join(', ')}. Run \`npx --yes @adamchanadam/agent-handoff-kit@latest init\` first, then rerun \`npx aps init\`.`);
  }
}

function timestampForPath() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\..*$/, 'Z');
}

function installSkill({ label, targetDir, dryRun, refresh }) {
  const sourceDir = path.join(__dirname, '..', 'skills', 'aps');
  if (!fs.existsSync(path.join(sourceDir, 'SKILL.md'))) {
    return {
      ok: false,
      label,
      targetDir,
      message: `source skill not found at ${sourceDir}`,
    };
  }
  if (fs.existsSync(targetDir)) {
    if (refresh) {
      const backupDir = `${targetDir}.backup-${timestampForPath()}`;
      if (!dryRun) {
        try {
          fs.renameSync(targetDir, backupDir);
          copyDirectory(sourceDir, targetDir);
        } catch (err) {
          return {
            ok: false,
            label,
            targetDir,
            message: `failed to refresh ${targetDir}: ${err.message}`,
          };
        }
      }
      return {
        ok: true,
        refreshed: true,
        label,
        targetDir,
        backupDir,
        message: dryRun ? `would backup ${targetDir} to ${backupDir} and refresh skill` : `backed up ${targetDir} to ${backupDir} and refreshed skill`,
      };
    }
    return {
      ok: false,
      skipped: true,
      label,
      targetDir,
      message: `target already exists; not overwriting (${targetDir})`,
    };
  }
  if (!dryRun) {
    try {
      copyDirectory(sourceDir, targetDir);
    } catch (err) {
      return {
        ok: false,
        label,
        targetDir,
        message: `failed to install to ${targetDir}: ${err.message}`,
      };
    }
  }
  return {
    ok: true,
    label,
    targetDir,
    message: dryRun ? `would install to ${targetDir}` : `installed to ${targetDir}`,
  };
}

function validateSnakeCase(label, value) {
  if (!/^[a-z][a-z0-9_]{0,29}$/.test(value)) {
    return `${label} must be lowercase snake_case, start with a letter, and be 1-30 characters. Got '${value}'.`;
  }
  return null;
}

function validateNoPlaceholder(label, value) {
  if (/[<>[\]]/.test(value) || value.includes('...')) {
    return `${label} still looks like a placeholder: '${value}'. Replace it with your real value before running the command.`;
  }
  return null;
}

function toSnakeCase(value, fallback) {
  const normalized = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 30);
  if (/^[a-z]/.test(normalized)) return normalized;
  return fallback;
}

const promptStates = new WeakMap();

function promptState(rl) {
  if (promptStates.has(rl)) return promptStates.get(rl);
  const state = { queue: [], resolver: null, closed: false };
  rl.on('line', (line) => {
    const answer = line.trim();
    if (state.resolver) {
      const resolve = state.resolver;
      state.resolver = null;
      resolve(answer);
    } else {
      state.queue.push(answer);
    }
  });
  rl.on('close', () => {
    state.closed = true;
    if (state.resolver) {
      const resolve = state.resolver;
      state.resolver = null;
      resolve(null);
    }
  });
  promptStates.set(rl, state);
  return state;
}

function askLine(rl, question) {
  const state = promptState(rl);
  if (rl.output) rl.output.write(question);
  if (state.queue.length > 0) return Promise.resolve(state.queue.shift());
  if (state.closed) return Promise.resolve(null);
  return new Promise((resolve) => {
    state.resolver = resolve;
  });
}

async function askWithDefault(rl, question, defaultValue, validate) {
  while (true) {
    const suffix = defaultValue ? ` [${defaultValue}]` : '';
    const answer = await askLine(rl, `${question}${suffix}: `);
    if (answer === null) throw new Error('輸入在設定完成前中止。請重新執行 `npx aps init`,並回答每一條問題。');
    const value = answer || defaultValue;
    const error = validate ? validate(value) : null;
    if (!error) return value;
    console.log(`  ${error}`);
  }
}

async function runInteractiveInit() {
  const root = homeDir();
  if (!root) {
    console.error('Could not detect your home directory. Set HOME or USERPROFILE, then rerun `npx aps init`.');
    return 1;
  }

  const bannerWidth = 37;
  const useAnsi = Boolean(process.stdout.isTTY && !process.env.NO_COLOR);
  const color = (code, text) => (useAnsi ? `\x1b[${code}m${text}\x1b[0m` : text);
  const centerLine = (text = '', ansiCode = null) => {
    const safeText = String(text).slice(0, bannerWidth);
    const left = Math.floor((bannerWidth - safeText.length) / 2);
    const padded = `${' '.repeat(left)}${safeText}`.padEnd(bannerWidth, ' ');
    return ansiCode ? color(ansiCode, padded) : padded;
  };
  console.log('-'.repeat(bannerWidth));
  console.log(centerLine('✦ AI Public Squares ✦', '36;1'));
  console.log(centerLine('=^._.^=  <-- APS Hub -->  =^._.^=', '36'));
  console.log(centerLine('packets  |  versions  |  ack'));
  console.log(centerLine(`v${packageVersion} pre-release`, '33'));
  console.log('-'.repeat(bannerWidth));
  console.log('');
  console.log('APS 初次設定');
  console.log('');
  console.log('👋 這一步會把本項目接到你與對方共用的 Google Drive Hub。');
  console.log('🧭 工具只會問必要資料,先列出寫入計劃,你輸入 yes 之後才會寫入檔案。');
  console.log('↩️  方括號內是建議值;合適時可直接按 Enter。');
  console.log('');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const role = await askWithDefault(rl, '1/5 你的角色。A = 你先建立 Hub 給對方加入;B = 你收到對方 starter pack 後加入', 'A', (value) => {
      const upper = String(value).toUpperCase();
      return upper === 'A' || upper === 'B' ? null : '請輸入 A 或 B。';
    });
    const roleValue = role.toUpperCase();
    const defaultProject = toSnakeCase(path.basename(process.cwd()), 'aps_uat');
    console.log('');
    console.log('📌 項目代號用來在 Hub 內分開不同合作項目,例如 branding_2026 或 aps_uat。');
    console.log('   它會成為 Google Drive 內的資料夾名稱,請用小寫英文字母、數字或底線。');
    const projectSlug = await askWithDefault(rl, '2/5 項目代號', defaultProject, (value) => (
      localizeValidation(validateNoPlaceholder('--project', value) || validateSnakeCase('--project', value))
    ));
    const defaultAgent = 'agent_a';
    console.log('');
    console.log('👤 你的 agent id 是你這一邊在 Hub 內的名字,例如 agent_a 或你的短名。');
    console.log('   APS 會用它建立 from_<你的 id> 通道及你的收件確認檔。');
    const agentId = await askWithDefault(rl, '3/5 你的 agent id', defaultAgent, (value) => (
      localizeValidation(validateNoPlaceholder('--agent-id', value) || validateSnakeCase('--agent-id', value))
    ));
    const defaultOther = agentId === 'agent_b' ? 'agent_a' : 'agent_b';
    console.log('');
    console.log('🤝 對方 agent id 是合作夥伴在 Hub 內的名字,例如 agent_b 或對方的短名。');
    console.log('   APS 會用它建立 from_<對方 id> 通道,讓你之後可以收對方交來的內容。');
    const otherAgentId = await askWithDefault(rl, '4/5 對方 agent id', defaultOther, (value) => (
      localizeValidation(validateNoPlaceholder('--other-agent-id', value) || validateSnakeCase('--other-agent-id', value))
    ));
    console.log('');
    console.log('☁️  Hub root path 是你電腦上 Google Drive 同步資料夾的完整路徑。');
    console.log('   請在檔案總管打開雙方共用的 AI_Public_Squares 資料夾,複製地址列完整路徑。');
    console.log('   例: G:\\我的雲端硬碟\\AI_Public_Squares');
    const hubRoot = await askWithDefault(
      rl,
      '5/5 Google Drive 本機 AI_Public_Squares 完整路徑',
      '',
      (value) => localizeValidation(validateNoPlaceholder('--hub-root', value)) || (path.isAbsolute(value) ? null : '請貼上完整路徑,例如 G:\\我的雲端硬碟\\AI_Public_Squares 或 C:\\Users\\你\\Google Drive\\AI_Public_Squares。')
    );

    const values = { hubRoot, projectSlug, agentId, otherAgentId, role: roleValue };
    const projectPath = projectDir(values.hubRoot, values.projectSlug);
    console.log('');
    console.log('📝 寫入前計劃');
    console.log(`  ☁️  Hub root: ${values.hubRoot}`);
    console.log(`  📁 項目代號: ${values.projectSlug}`);
    console.log(`  👤 本機 agent: ${values.agentId} (角色 ${values.role})`);
    console.log(`  🤝 對方 agent: ${values.otherAgentId}`);
    console.log(`  📂 會建立或使用的 Hub 項目資料夾: ${projectPath}`);
    console.log(`  ⚙️  本機設定檔: ${configPath()}`);
    console.log('');
    const confirm = await askLine(rl, '確認無誤請輸入 yes,工具才會安裝 skill、建立 Hub skeleton 並保存本機設定: ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log('已取消。沒有寫入 APS Hub 檔案。');
      return 1;
    }
    ensureHandoffKitReady();

    const installTargets = [
      { label: 'Claude Code', targetDir: path.join(root, '.claude', 'skills', 'aps') },
      { label: 'Codex', targetDir: path.join(root, '.codex', 'skills', 'aps') },
    ];
    console.log('');
    for (const result of installTargets.map((item) => installSkill({ ...item, dryRun: false, refresh: false }))) {
      console.log(formatSetupResult(result, `${result.label}: `));
      if (!result.ok && !result.skipped) return 1;
    }
    console.log('');
    console.log('☁️ 建立 Hub:');
    for (const result of setupHub(values, false)) {
      console.log(formatSetupResult(result));
    }
    console.log('');
    console.log('✅ APS 設定完成。');
    console.log('🚀 下一步:在這個項目資料夾打開 AI 工具,輸入「教我用 APS」。AI 應讀取現有設定、檢查 Hub、查看 inbox,再主動建議測試交接或正式交接。');
    console.log('🩺 備用檢查:終端機指令是 `npx aps doctor`。請留意指令名稱是 `aps`,不是 `asp`。');
    return 0;
  } finally {
    rl.close();
  }
}

function localizeValidation(message) {
  if (!message) return null;
  return String(message)
    .replace(/--project/g, '項目代號')
    .replace(/--agent-id/g, '你的 agent id')
    .replace(/--other-agent-id/g, '對方 agent id')
    .replace(/--hub-root/g, 'Hub root path')
    .replace(/must be lowercase snake_case, start with a letter, and be 1-30 characters\. Got/g, '必須以小寫英文字母開頭,只可使用小寫英文字母、數字與底線,長度為 1 至 30 字元。目前收到')
    .replace(/still looks like a placeholder:/g, '仍像示例或佔位值:')
    .replace(/Replace it with your real value before running the command\./g, '請改用真實值後再繼續。');
}

function formatSetupResult(result, labelPrefix = '') {
  const icon = result.ok ? '✅' : result.skipped ? '⏭️' : '❌';
  return `${icon} ${labelPrefix}${localizeSetupMessage(result.message)}`;
}

function localizeSetupMessage(message) {
  return String(message)
    .replace(/^would install to /, '將會安裝到 ')
    .replace(/^installed to /, '已安裝到 ')
    .replace(/^would backup (.*) to (.*) and refresh skill$/, '將會備份 $1 到 $2,並刷新 skill')
    .replace(/^backed up (.*) to (.*) and refreshed skill$/, '已備份 $1 到 $2,並刷新 skill')
    .replace(/^failed to refresh (.*): (.*)$/, '刷新失敗: $1 ($2)')
    .replace(/^target already exists; not overwriting \((.*)\)$/, '目標已存在,不覆寫 ($1)')
    .replace(/^failed to install to (.*): (.*)$/, '安裝失敗: $1 ($2)')
    .replace(/^source skill not found at /, '找不到 skill 來源: ')
    .replace(/^would create /, '將會建立 ')
    .replace(/^created /, '已建立 ')
    .replace(/^would write /, '將會寫入 ')
    .replace(/^wrote /, '已寫入 ')
    .replace(/^would write\/update /, '將會寫入或更新 ')
    .replace(/^wrote\/updated /, '已寫入或更新 ')
    .replace(/^would add APS rule-pack-route registration in /, '將會新增 APS 路由註冊到 ')
    .replace(/^would refresh APS rule-pack-route registration in /, '將會更新 APS 路由註冊於 ')
    .replace(/^added APS rule-pack-route registration in /, '已新增 APS 路由註冊到 ')
    .replace(/^refreshed APS rule-pack-route registration in /, '已更新 APS 路由註冊於 ')
    .replace(/^APS rule-pack-route registration already current \((.*)\)$/, 'APS 路由註冊已是最新 ($1)')
    .replace(/^would add APS project-index-skill registration in /, '將會新增 APS 項目索引註冊到 ')
    .replace(/^would refresh APS project-index-skill registration in /, '將會更新 APS 項目索引註冊於 ')
    .replace(/^added APS project-index-skill registration in /, '已新增 APS 項目索引註冊到 ')
    .replace(/^refreshed APS project-index-skill registration in /, '已更新 APS 項目索引註冊於 ')
    .replace(/^APS project-index-skill registration already current \((.*)\)$/, 'APS 項目索引註冊已是最新 ($1)')
    .replace(/^exists; not overwriting \((.*)\)$/, '已存在,不覆寫 ($1)');
}

function packetTimestamp(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function isoNow() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function validateTopic(topic) {
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(topic)) {
    return `--topic must be lower_snake, start with a letter, and be 1-40 characters. Got '${topic}'.`;
  }
  return null;
}

function validatePacketId(packetId) {
  if (!/^\d{8}T\d{6}Z__[a-z][a-z0-9_]{0,39}$/.test(packetId)) {
    return `--packet-id must look like <UTC-yyyymmddThhmmssZ>__<short_snake_topic>. Got '${packetId}'.`;
  }
  return null;
}

function requireFlags(names) {
  const missing = names.filter((name) => !getRequiredFlagValue(name));
  if (missing.length > 0) {
    console.error(`Missing required flags: ${missing.join(', ')}`);
    process.exit(1);
  }
}

function projectDir(hubRoot, projectSlug) {
  return path.join(hubRoot, projectSlug);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function appendLine(filePath, line) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, `${line}\n`, 'utf8');
}

function ensureExistingFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found: ${filePath}. Run \`aps init --hub-root ...\` first, or check the path and project slug.`);
  }
}

function yamlDoubleQuote(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function parseOutboxLine(line) {
  if (!line.trim() || line.trim().startsWith('<!--') || line.trim().startsWith('#')) return null;
  const parts = line.split('|').map((part) => part.trim());
  if (parts.length < 3) return null;
  const packetVersion = parts[2].match(/^(.+)\s+v(\d+)$/);
  if (!packetVersion) return null;
  const kv = {};
  for (const part of parts.slice(3)) {
    const index = part.indexOf(':');
    if (index > 0) kv[part.slice(0, index)] = part.slice(index + 1);
  }
  return {
    at: parts[0],
    verb: parts[1],
    packetId: packetVersion[1],
    version: Number(packetVersion[2]),
    kv,
  };
}

function readOutboxEvents(outboxPath) {
  if (!fs.existsSync(outboxPath)) return [];
  return fs.readFileSync(outboxPath, 'utf8')
    .split(/\r?\n/)
    .map(parseOutboxLine)
    .filter(Boolean);
}

function readPacketSummary(hubRoot, projectSlug, senderId, packetId, version) {
  const packetPath = path.join(projectDir(hubRoot, projectSlug), `from_${senderId}`, 'packets', `${packetId}__v${version}`, 'packet.md');
  if (!fs.existsSync(packetPath)) {
    return { packetPath, scope: '(packet.md not found)', items: [] };
  }
  const text = fs.readFileSync(packetPath, 'utf8');
  const scopeMatch = text.match(/^scope:\s*"?(.+?)"?\s*$/m);
  const itemMatches = [...text.matchAll(/^\s*-\s+id:\s*(.+?)\s*$/gm)].map((match) => match[1].trim());
  return {
    packetPath,
    scope: scopeMatch ? scopeMatch[1] : '(scope not found)',
    items: itemMatches,
  };
}

function parsePacketHeader(packetPath) {
  const text = fs.readFileSync(packetPath, 'utf8');
  const headerMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!headerMatch) {
    throw new Error(`packet header not found: ${packetPath}`);
  }
  const header = {};
  for (const line of headerMatch[1].split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (match) header[match[1]] = match[2].replace(/^"|"$/g, '').trim();
  }
  return header;
}

function latestOwnPacketVersion({ hubRoot, projectSlug, agentId, packetId }) {
  const outboxPath = path.join(projectDir(hubRoot, projectSlug), `from_${agentId}`, 'outbox.log.md');
  ensureExistingFile(outboxPath, `from_${agentId} outbox`);
  const events = readOutboxEvents(outboxPath).filter((event) => event.packetId === packetId);
  if (events.length === 0) {
    throw new Error(`packet ${packetId} was not found in from_${agentId}/outbox.log.md`);
  }
  if (events.some((event) => event.verb === 'close')) {
    throw new Error(`packet ${packetId} is already closed in from_${agentId}/outbox.log.md`);
  }
  const candidates = events.filter((event) => event.verb === 'publish' || event.verb === 'revise');
  if (candidates.length === 0) {
    throw new Error(`packet ${packetId} has no publish or revise event in from_${agentId}/outbox.log.md`);
  }
  candidates.sort((a, b) => b.version - a.version);
  return { outboxPath, events, latest: candidates[0] };
}

function pendingPackets({ hubRoot, projectSlug, agentId, otherAgentId }) {
  const outboxPath = path.join(projectDir(hubRoot, projectSlug), `from_${otherAgentId}`, 'outbox.log.md');
  const ackPath = path.join(projectDir(hubRoot, projectSlug), '_ack', `${agentId}.ack.json`);
  const ack = fs.existsSync(ackPath) ? readJson(ackPath) : { consumed: [] };
  const consumed = new Set((ack.consumed || []).map((entry) => `${entry.packet_id}::${entry.version}`));
  const groups = new Map();
  for (const event of readOutboxEvents(outboxPath)) {
    if (!groups.has(event.packetId)) groups.set(event.packetId, []);
    groups.get(event.packetId).push(event);
  }
  const pending = [];
  for (const [packetId, events] of groups.entries()) {
    if (events.some((event) => event.verb === 'close')) continue;
    const candidates = events.filter((event) => event.verb === 'publish' || event.verb === 'revise');
    if (candidates.length === 0) continue;
    candidates.sort((a, b) => b.version - a.version);
    const latest = candidates[0];
    const withdrawn = events.some((event) => event.verb === 'withdraw' && event.version === latest.version);
    if (withdrawn) continue;
    if (consumed.has(`${packetId}::${latest.version}`)) continue;
    pending.push({
      packetId,
      version: latest.version,
      event: latest,
      ...readPacketSummary(hubRoot, projectSlug, otherAgentId, packetId, latest.version),
    });
  }
  return pending;
}

function writePacket({ hubRoot, projectSlug, fromId, toId, topic, body, level }) {
  const now = isoNow();
  const packetId = `${packetTimestamp()}__${topic}`;
  const outboxPath = path.join(projectDir(hubRoot, projectSlug), `from_${fromId}`, 'outbox.log.md');
  ensureExistingFile(outboxPath, `from_${fromId} outbox`);
  const packetDir = path.join(projectDir(hubRoot, projectSlug), `from_${fromId}`, 'packets', `${packetId}__v1`);
  if (fs.existsSync(packetDir)) {
    throw new Error(`packet folder already exists: ${packetDir}`);
  }
  fs.mkdirSync(packetDir, { recursive: true });
  const scope = yamlDoubleQuote(body.split(/\r?\n/)[0].slice(0, 120) || topic);
  const packetMd = `---\npacket_id: ${packetId}\nversion: 1\nfrom: ${fromId}\nto: ${toId}\nproject: ${projectSlug}\nlevel: ${level}\nsupersedes: null\ncreated_at: ${now}\nssot_refs: []\nscope: \"${scope}\"\nitems: []\n---\n\n# ${topic}\n\n${body}\n`;
  fs.writeFileSync(path.join(packetDir, 'packet.md'), packetMd, 'utf8');
  appendLine(outboxPath, `${now} | publish | ${packetId} v1 | to:${toId} | items:none`);
  return { packetId, version: 1, packetDir };
}

function revisePacket({ hubRoot, projectSlug, agentId, packetId, body, reason }) {
  const { outboxPath, latest } = latestOwnPacketVersion({ hubRoot, projectSlug, agentId, packetId });
  const previousVersion = latest.version;
  const nextVersion = previousVersion + 1;
  const previousPath = path.join(projectDir(hubRoot, projectSlug), `from_${agentId}`, 'packets', `${packetId}__v${previousVersion}`, 'packet.md');
  ensureExistingFile(previousPath, `previous packet v${previousVersion}`);
  const previousHeader = parsePacketHeader(previousPath);
  const toId = previousHeader.to || latest.kv.to;
  if (!toId) {
    throw new Error(`could not infer receiver for ${packetId}; previous packet header is missing 'to'.`);
  }
  const now = isoNow();
  const packetDir = path.join(projectDir(hubRoot, projectSlug), `from_${agentId}`, 'packets', `${packetId}__v${nextVersion}`);
  if (fs.existsSync(packetDir)) {
    throw new Error(`packet folder already exists: ${packetDir}`);
  }
  fs.mkdirSync(packetDir, { recursive: true });
  const scope = yamlDoubleQuote(body.split(/\r?\n/)[0].slice(0, 120) || previousHeader.scope || packetId);
  const level = previousHeader.level || 'L2-aps-packet';
  const packetMd = `---\npacket_id: ${packetId}\nversion: ${nextVersion}\nfrom: ${agentId}\nto: ${toId}\nproject: ${projectSlug}\nlevel: ${level}\nsupersedes: ${packetId}__v${previousVersion}\ncreated_at: ${now}\nssot_refs: []\nscope: \"${scope}\"\nitems: []\n---\n\n# Revision ${nextVersion} for ${packetId}\n\n${body}\n`;
  fs.writeFileSync(path.join(packetDir, 'packet.md'), packetMd, 'utf8');
  appendLine(outboxPath, `${now} | revise | ${packetId} v${nextVersion} | to:${toId} | reason:${reason}`);
  return { packetId, version: nextVersion, previousVersion, packetDir, outboxPath };
}

function consumePacket({ hubRoot, projectSlug, agentId, packetId, version, result }) {
  const ackPath = path.join(projectDir(hubRoot, projectSlug), '_ack', `${agentId}.ack.json`);
  if (!fs.existsSync(ackPath)) {
    throw new Error(`ack file not found: ${ackPath}`);
  }
  const ack = readJson(ackPath);
  ack.consumed = ack.consumed || [];
  const already = ack.consumed.some((entry) => entry.packet_id === packetId && Number(entry.version) === Number(version));
  if (!already) {
    ack.consumed.push({
      packet_id: packetId,
      version: Number(version),
      at: isoNow(),
      result,
    });
    writeJson(ackPath, ack);
  }
  return { ackPath, already };
}

function withdrawPacket({ hubRoot, projectSlug, agentId, packetId, version, reason }) {
  const { outboxPath, events, latest } = latestOwnPacketVersion({ hubRoot, projectSlug, agentId, packetId });
  const targetVersion = version || latest.version;
  if (Number(targetVersion) !== Number(latest.version)) {
    throw new Error(`withdraw only supports the latest version (${latest.version}); publish a new revision if an older version needs correction.`);
  }
  if (events.some((event) => event.verb === 'withdraw' && Number(event.version) === Number(targetVersion))) {
    throw new Error(`${packetId} v${targetVersion} is already withdrawn.`);
  }
  const packetPath = path.join(projectDir(hubRoot, projectSlug), `from_${agentId}`, 'packets', `${packetId}__v${targetVersion}`, 'packet.md');
  ensureExistingFile(packetPath, `packet v${targetVersion}`);
  const header = parsePacketHeader(packetPath);
  const receiverId = header.to || latest.kv.to;
  if (!receiverId) {
    throw new Error(`could not infer receiver for ${packetId}; packet header is missing 'to'.`);
  }
  const ackPath = path.join(projectDir(hubRoot, projectSlug), '_ack', `${receiverId}.ack.json`);
  if (fs.existsSync(ackPath)) {
    const ack = readJson(ackPath);
    const consumed = (ack.consumed || []).some((entry) => entry.packet_id === packetId && Number(entry.version) === Number(targetVersion));
    if (consumed) {
      throw new Error(`${receiverId} has already consumed ${packetId} v${targetVersion}; publish a revision or close with a corrective reason instead.`);
    }
  }
  appendLine(outboxPath, `${isoNow()} | withdraw | ${packetId} v${targetVersion} | reason:${reason}`);
  return { outboxPath, version: targetVersion, receiverId, ackPath };
}

function closePacket({ hubRoot, projectSlug, agentId, packetId, reason }) {
  const { outboxPath, latest } = latestOwnPacketVersion({ hubRoot, projectSlug, agentId, packetId });
  const version = latest.version;
  appendLine(outboxPath, `${isoNow()} | close | ${packetId} v${version} | reason:${reason}`);
  return { outboxPath, version };
}

function scanConflictFiles(rootDir) {
  const found = [];
  if (!fs.existsSync(rootDir)) return found;
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const entryPath = path.join(rootDir, entry.name);
    if (/conflict|conflicted/i.test(entry.name)) found.push(entryPath);
    if (entry.isDirectory()) found.push(...scanConflictFiles(entryPath));
  }
  return found;
}

function doctorHub({ hubRoot, projectSlug, agentId, otherAgentId }) {
  const checks = [];
  function checkFile(filePath, label) {
    const ok = fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    checks.push({ ok, label, path: filePath });
  }
  function checkFileContains(filePath, label, expected) {
    const ok = fs.existsSync(filePath)
      && fs.statSync(filePath).isFile()
      && fs.readFileSync(filePath, 'utf8').includes(expected);
    checks.push({ ok, label, path: filePath });
  }
  function checkDir(dirPath, label) {
    const ok = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    checks.push({ ok, label, path: dirPath });
  }
  checkFile(configPath(), 'local APS config');
  checkFile(path.join(process.cwd(), 'dev', 'rules', 'aps-bridge.md'), 'local APS bridge');
  checkFileContains(path.join(process.cwd(), 'dev', 'RULE_PACKS.md'), 'Handoff Kit APS route', 'dev/rules/aps-bridge.md');
  checkFileContains(path.join(process.cwd(), 'dev', 'PROJECT_INDEX.md'), 'Handoff Kit APS project index', '.aps/config.json');
  checkDir(hubRoot, 'Hub root');
  checkFile(path.join(hubRoot, '_hub', 'PROTOCOL.md'), 'protocol');
  checkFile(path.join(hubRoot, '_hub', 'CHANGELOG.md'), 'changelog');
  checkFile(path.join(projectDir(hubRoot, projectSlug), `from_${agentId}`, 'outbox.log.md'), `${agentId} outbox`);
  checkFile(path.join(projectDir(hubRoot, projectSlug), `from_${otherAgentId}`, 'outbox.log.md'), `${otherAgentId} outbox`);
  checkDir(path.join(projectDir(hubRoot, projectSlug), `from_${agentId}`, 'packets'), `${agentId} packets`);
  checkDir(path.join(projectDir(hubRoot, projectSlug), `from_${otherAgentId}`, 'packets'), `${otherAgentId} packets`);
  checkFile(path.join(projectDir(hubRoot, projectSlug), '_ack', `${agentId}.ack.json`), `${agentId} ack`);
  checkFile(path.join(projectDir(hubRoot, projectSlug), '_ack', `${otherAgentId}.ack.json`), `${otherAgentId} ack`);
  const conflicts = scanConflictFiles(projectDir(hubRoot, projectSlug));
  return { checks, conflicts };
}

function bridgePackContent(role, values) {
  const fixtureDir = role === 'B' ? 'demo-agent-b' : 'demo-agent-a';
  const fixturePath = path.join(__dirname, '..', 'examples', fixtureDir, 'dev', 'rules', 'aps-bridge.md');
  let content = fs.readFileSync(fixturePath, 'utf8');
  content = content.replace(/`<your_agent_id>`/g, `\`${values.agentId}\``);
  content = content.replace(/`<your_project_slug>`/g, `\`${values.projectSlug}\``);
  content = content.replace(/`<your_Drive_AI_Public_Squares_absolute_path>`/g, `\`${values.hubRoot}\``);
  content = content.replace(/`<counterpart_agent_id>`/g, `\`${values.otherAgentId}\``);
  return content;
}

function ackJson(agentId, projectSlug) {
  return `${JSON.stringify({
    agent: agentId,
    project: projectSlug,
    consumed: [],
    open_questions: [],
  }, null, 2)}\n`;
}

function packetsReadme(agentId) {
  return `# from_${agentId} packets

This directory holds immutable packet folders authored by agent \`${agentId}\`.
Each packet folder is named \`<UTC-yyyymmddThhmmssZ>__<short_snake_topic>__v<N>/\`.
After publish, packets are never edited. Revisions add a new \`__v<N+1>/\` folder.

See \`<hub_root>/_hub/PROTOCOL.md\`.
`;
}

function starterPackContent(values, counterpartRole) {
  return `# APS Starter Pack for ${values.otherAgentId}

這份 starter pack 由 \`aps init\` 產生,用來讓對方在自己的電腦完成同一個 Hub 設定。

## 已決定的設定

- project_slug: \`${values.projectSlug}\`
- your agent_id: \`${values.otherAgentId}\`
- counterpart agent_id: \`${values.agentId}\`
- your role: \`${counterpartRole}\`
- Hub root on your machine:請改成你自己電腦上 Google Drive 同步資料夾的完整路徑

## 安裝

\`\`\`powershell
npm install --save-dev @adamchanadam/aps@latest
npx aps init
\`\`\`

互動式設定會逐步問用途。請使用以下值:

- 角色: \`${counterpartRole}\`
- 項目代號: \`${values.projectSlug}\`
- 你的 agent id: \`${values.otherAgentId}\`
- 對方 agent id: \`${values.agentId}\`
- Google Drive 本機 AI_Public_Squares 完整路徑:在檔案總管打開你自己電腦上的共用 AI_Public_Squares 資料夾,複製地址列完整路徑

不要複製 \`G:\\...\\AI_Public_Squares\` 這類示例路徑。這必須是你自己電腦上的真實 Google Drive 本機路徑。

完成後,如果 Claude Code 或 Codex 未即時看到 APS skill,請重新啟動該 AI 工具。

## 手動 Bridge Pack 備用

如果只需要 Bridge Pack:

\`\`\`powershell
npx aps bridge-pack --role ${counterpartRole} > dev/rules/aps-bridge.md
\`\`\`

## 日常觸發句

當對方通知你有新交接包,打開 AI 工具並輸入:

> check Hub
`;
}

function setupHub(values, dryRun) {
  ensureHandoffKitReady();
  const resourcesDir = path.join(__dirname, '..', 'resources', 'protocol');
  const templatesDir = path.join(resourcesDir, 'templates');
  const projectDir = path.join(values.hubRoot, values.projectSlug);
  const steps = [];

  for (const dirPath of [
    path.join(values.hubRoot, '_hub'),
    path.join(values.hubRoot, '_hub', 'templates'),
    path.join(projectDir, `from_${values.agentId}`, 'packets'),
    path.join(projectDir, `from_${values.otherAgentId}`, 'packets'),
    path.join(projectDir, '_ack'),
  ]) {
    steps.push(ensureDirectory(dirPath, dryRun));
  }

  const protocolSource = path.join(resourcesDir, 'PROTOCOL.md');
  const protocolTarget = path.join(values.hubRoot, '_hub', 'PROTOCOL.md');
  steps.push(writeFileIfMissing(protocolTarget, fs.readFileSync(protocolSource, 'utf8'), dryRun));

  const changelogTarget = path.join(values.hubRoot, '_hub', 'CHANGELOG.md');
  steps.push(writeFileIfMissing(changelogTarget, '# APS Protocol Changelog\n\n- v1.0: Initial protocol bundled with `@adamchanadam/aps`.\n', dryRun));

  for (const templateName of ['packet.md.template', 'outbox.log.md.template', 'ack.json.template', 'ack.json.example']) {
    const source = path.join(templatesDir, templateName);
    const target = path.join(values.hubRoot, '_hub', 'templates', templateName);
    steps.push(writeFileIfMissing(target, fs.readFileSync(source, 'utf8'), dryRun));
  }

  const outboxTemplate = fs.readFileSync(path.join(templatesDir, 'outbox.log.md.template'), 'utf8');
  steps.push(writeFileIfMissing(path.join(projectDir, `from_${values.agentId}`, 'outbox.log.md'), outboxTemplate, dryRun));
  steps.push(writeFileIfMissing(path.join(projectDir, `from_${values.otherAgentId}`, 'outbox.log.md'), outboxTemplate, dryRun));
  steps.push(writeFileIfMissing(path.join(projectDir, `from_${values.agentId}`, 'packets', 'README.md'), packetsReadme(values.agentId), dryRun));
  steps.push(writeFileIfMissing(path.join(projectDir, `from_${values.otherAgentId}`, 'packets', 'README.md'), packetsReadme(values.otherAgentId), dryRun));
  steps.push(writeFileIfMissing(path.join(projectDir, '_ack', `${values.agentId}.ack.json`), ackJson(values.agentId, values.projectSlug), dryRun));
  steps.push(writeFileIfMissing(path.join(projectDir, '_ack', `${values.otherAgentId}.ack.json`), ackJson(values.otherAgentId, values.projectSlug), dryRun));

  const bridgeTarget = path.join(process.cwd(), 'dev', 'rules', 'aps-bridge.md');
  steps.push(writeFileOrUpdate(bridgeTarget, bridgePackContent(values.role, values), dryRun));

  steps.push(saveConfig(values, dryRun));

  const counterpartRole = values.role === 'A' ? 'B' : 'A';
  const starterTarget = path.join(values.hubRoot, '_hub', `starter-pack-${values.otherAgentId}.md`);
  steps.push(writeFileOrUpdate(starterTarget, starterPackContent(values, counterpartRole), dryRun));
  steps.push(...registerHandoffKitIntegration(values, dryRun));

  return steps;
}

function registerHandoffKitIntegration(values, dryRun) {
  const projectRoot = process.cwd();
  const rulePacksPath = path.join(projectRoot, 'dev', 'RULE_PACKS.md');
  const projectIndexPath = path.join(projectRoot, 'dev', 'PROJECT_INDEX.md');
  const steps = [];

  const routeRow = '| APS / AI Public Squares / 教我用 APS / check Hub / Hub 有新嘢 / 跨機合作 / Drive 同步不到 / sync stuck / conflict | `dev/rules/aps-bridge.md` | APS cross-machine collaboration route: load the bridge rules and `.aps/config.json` before APS setup, daily use, inbox checks, or recovery. |';
  steps.push(upsertManagedBlock(
    rulePacksPath,
    'rule-pack-route',
    routeRow,
    /^## Routing Rule/m,
    dryRun
  ));

  const today = new Date().toISOString().slice(0, 10);
  const skillBlock = `### APS Installed Skill

| Field | Value |
|---|---|
| Installed by | \`@adamchanadam/aps init\` |
| Local bridge | \`dev/rules/aps-bridge.md\` |
| Local config | \`.aps/config.json\` |
| Hub project | \`${values.projectSlug}\` |
| Local agent | \`${values.agentId}\` |
| Partner agent | \`${values.otherAgentId}\` |
| Trigger route | Registered in \`dev/RULE_PACKS.md\`; when the user mentions APS / AI Public Squares / 教我用 APS / check Hub / Hub 有新嘢 / Drive sync / conflict, read \`dev/rules/aps-bridge.md\` and \`.aps/config.json\` before answering. |
| Last verified | ${today} |`;
  steps.push(upsertManagedBlock(
    projectIndexPath,
    'project-index-skill',
    skillBlock,
    /^### Source-of-truth Architecture/m,
    dryRun
  ));

  return steps;
}

if (!subcommand || subcommand === '--help' || subcommand === '-h') {
  console.log(`
APS — AI Public Squares v${packageVersion}
Two-machine AI agent collaboration via a shared Google Drive folder.

Usage:
  npx aps init                    Guided setup: ask questions, create Hub, and save config
  npx aps init --target claude    Install APS skill for Claude Code only
  npx aps init --target codex     Install APS skill for Codex only
  npx aps init --refresh-skill    Backup and refresh existing installed APS skill
  npx aps init --hub-root <path> --project <slug> --agent-id <id> --other-agent-id <id> --role A|B
                                  Advanced non-interactive setup
  npx aps init --dry-run          Show planned install paths without writing
  npx aps config                  Show saved local APS config
  npx aps config --hub-root <path> --project <slug> --agent-id <id> --other-agent-id <id> --role A|B
                                  Save or update local APS config only
  npx aps publish --topic <snake> --body <text>
                                  Publish a v1 packet and append outbox
  npx aps revise --packet-id <id> --body <text> --reason <text>
                                  Publish the next immutable version of my packet
  npx aps inbox
                                  List pending packets from the other agent
  npx aps consume --packet-id <id> --version <n> --result <text>
                                  Mark a packet consumed in my ack file
  npx aps withdraw --packet-id <id> --reason <text>
                                  Withdraw my unconsumed latest packet version
  npx aps close --packet-id <id> --reason <text>
                                  Append a close event to my outbox
  npx aps doctor
                                  Check Hub skeleton, ack files, outboxes, and conflict filenames
  npx aps bridge-pack             Print Bridge Pack fixture (User A default)
  npx aps bridge-pack --role B    Print Bridge Pack fixture for User B role
  npx aps --help                  Show this help

bridge-pack writes fixture content to stdout — redirect to your workspace's
Bridge Pack location, e.g.:
  npx aps bridge-pack > dev/rules/aps-bridge.md

Local source test:
  node bin/aps.js bridge-pack > dev/rules/aps-bridge.md

After init saves .aps/config.json, daily commands can omit --hub-root,
--project, --agent-id, and --other-agent-id. You may still pass those flags
to override the saved config.

Status: bridge-pack, skill install, initial Hub setup, saved local config,
publish / revise / inbox / consume / withdraw / close, and read-only doctor
are available.
This pre-release has one maintainer-run Google Drive round-trip verification, but
each real project still needs its own project-specific verification.
Repo: https://github.com/Adamchanadam/ai-public-squares
`);
  process.exit(0);
}

if (subcommand === 'init' && args.length === 0) {
  runInteractiveInit()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(`互動式設定失敗:${err.message}`);
      process.exit(1);
    });
  return;
} else if (subcommand === 'init') {
  const validTargets = ['claude', 'codex', 'both'];
  const target = getFlagValue('--target', 'both').toLowerCase();
  const dryRun = hasFlag('--dry-run');
  const refreshSkill = hasFlag('--refresh-skill');
  const setupValues = {
    hubRoot: getRequiredFlagValue('--hub-root'),
    projectSlug: getRequiredFlagValue('--project'),
    agentId: getRequiredFlagValue('--agent-id'),
    otherAgentId: getRequiredFlagValue('--other-agent-id'),
    role: (getFlagValue('--role', '') || '').toUpperCase(),
  };
  const setupFlags = [setupValues.hubRoot, setupValues.projectSlug, setupValues.agentId, setupValues.otherAgentId, setupValues.role].filter(Boolean);
  if (!validTargets.includes(target)) {
    console.error(`Invalid --target value: must be claude, codex, or both (got '${target}').`);
    process.exit(1);
  }
  if (setupFlags.length > 0 && setupFlags.length < 5) {
    console.error('Hub setup requires all flags: --hub-root, --project, --agent-id, --other-agent-id, and --role A|B.');
    process.exit(1);
  }
  if (setupFlags.length === 5) {
    const errors = [
      validateNoPlaceholder('--hub-root', setupValues.hubRoot),
      validateSnakeCase('--project', setupValues.projectSlug),
      validateSnakeCase('--agent-id', setupValues.agentId),
      validateSnakeCase('--other-agent-id', setupValues.otherAgentId),
      setupValues.role === 'A' || setupValues.role === 'B' ? null : `--role must be A or B (got '${setupValues.role}').`,
    ].filter(Boolean);
    if (errors.length > 0) {
      for (const error of errors) console.error(error);
      process.exit(1);
    }
  }

  const root = homeDir();
  if (!root) {
    console.error('Could not detect your home directory. Set HOME or USERPROFILE, then rerun `npx aps init`.');
    process.exit(1);
  }
  if (setupFlags.length === 5) {
    try {
      ensureHandoffKitReady();
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  const installTargets = [];
  if (target === 'claude' || target === 'both') {
    installTargets.push({
      label: 'Claude Code',
      targetDir: path.join(root, '.claude', 'skills', 'aps'),
    });
  }
  if (target === 'codex' || target === 'both') {
    installTargets.push({
      label: 'Codex',
      targetDir: path.join(root, '.codex', 'skills', 'aps'),
    });
  }

  console.log(`APS init v${packageVersion} — skill installer${setupFlags.length === 5 ? ' + Hub setup' : ''}${dryRun ? ' (dry run)' : ''}`);
  console.log('');
  console.log('這個命令會安裝 APS skill 檔案,讓 AI 工具懂得使用 APS。');
  if (setupFlags.length === 5) {
    console.log('它也會建立初始 APS Hub skeleton、本地 Bridge Pack 與 `.aps/config.json`。');
    console.log('完成後,日常命令可以使用已保存設定,毋須重複輸入長參數。');
    console.log('目前仍屬前期測試;每個真實項目仍要驗證自己的 Google Drive 同步狀態。');
  } else {
    console.log('如要同時建立 Hub skeleton,請提供 --hub-root、--project、--agent-id、--other-agent-id 與 --role。');
  }
  console.log('');

  const results = installTargets.map((item) => installSkill({ ...item, dryRun, refresh: refreshSkill }));
  for (const result of results) {
    console.log(formatSetupResult(result, `${result.label}: `));
  }

  const failed = results.filter((result) => !result.ok && !result.skipped);
  const setupResults = [];
  if (setupFlags.length === 5) {
    console.log('');
    console.log('☁️ 建立 Hub:');
    try {
      setupResults.push(...setupHub(setupValues, dryRun));
      for (const result of setupResults) {
        console.log(formatSetupResult(result));
      }
    } catch (err) {
      console.error(`Hub 設定失敗:${err.message}`);
      process.exit(1);
    }
  }
  console.log('');
  const skipped = [
    ...results.filter((result) => result.skipped),
    ...setupResults.filter((result) => result.skipped),
  ];
  if (failed.length > 0) {
    console.log('有一個或多個目標安裝失敗。已盡量保留既有檔案不變。');
  } else if (dryRun && results.some((result) => result.refreshed)) {
    console.log('Dry run 完成。上方只列出將會備份與刷新哪些 skill;目前未改動任何檔案。');
  } else if (results.some((result) => result.refreshed)) {
    console.log('✅ APS skill 已刷新。原有 skill 已改名備份,新版本已安裝。');
    console.log('🚀 下一步:請重新啟動 Claude Code 或 Codex,再在項目資料夾輸入「教我用 APS」。');
  } else if (skipped.length > 0) {
    console.log('安裝完成,並安全略過既有檔案。既有檔案沒有被覆寫。');
    console.log('如要刷新既有安裝,請執行 `npx aps init --refresh-skill`;工具會先備份舊 skill,再安裝新版本。');
  } else if (dryRun) {
    console.log('Dry run 完成。移除 `--dry-run` 後重新執行,才會真正寫入。');
  } else {
    console.log('✅ 設定完成。如果 Claude Code 或 Codex 未即時看到 APS skill,請重新啟動該 AI 工具。');
    console.log('🚀 下一步:打開 AI 工具並輸入「教我用 APS」。AI 應讀取 `.aps/config.json`,檢查 Hub,查看 inbox,再主動建議測試交接或正式交接。');
  }
  console.log('');
  console.log('手動 Bridge Pack 備用命令仍可使用:');
  console.log('  npx aps bridge-pack > dev/rules/aps-bridge.md');
  process.exit(failed.length > 0 ? 1 : 0);
}

if (subcommand === 'bridge-pack') {
  const roleFlag = process.argv.indexOf('--role');
  const roleArg = (roleFlag >= 0 && process.argv[roleFlag + 1])
    ? process.argv[roleFlag + 1].toUpperCase()
    : 'A';
  if (roleArg !== 'A' && roleArg !== 'B') {
    console.error(`Invalid --role value: must be 'A' or 'B' (got '${process.argv[roleFlag + 1]}').`);
    process.exit(1);
  }
  const fixtureDir = roleArg === 'B' ? 'demo-agent-b' : 'demo-agent-a';
  const fixturePath = path.join(__dirname, '..', 'examples', fixtureDir, 'dev', 'rules', 'aps-bridge.md');
  try {
    process.stdout.write(fs.readFileSync(fixturePath, 'utf8'));
    process.exit(0);
  } catch (err) {
    console.error(`Failed to read Bridge Pack fixture at ${fixturePath}: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'config') {
  try {
    const dryRun = hasFlag('--dry-run');
    const values = {
      hubRoot: getRequiredFlagValue('--hub-root'),
      projectSlug: getRequiredFlagValue('--project'),
      agentId: getRequiredFlagValue('--agent-id'),
      otherAgentId: getRequiredFlagValue('--other-agent-id'),
      role: (getFlagValue('--role', '') || '').toUpperCase(),
    };
    const writeFlags = [values.hubRoot, values.projectSlug, values.agentId, values.otherAgentId, values.role].filter(Boolean);
    if (writeFlags.length > 0) {
      if (writeFlags.length < 5) {
        console.error('Config write requires all flags: --hub-root, --project, --agent-id, --other-agent-id, and --role A|B.');
        process.exit(1);
      }
      const errors = [
        validateNoPlaceholder('--hub-root', values.hubRoot),
        validateSnakeCase('--project', values.projectSlug),
        validateSnakeCase('--agent-id', values.agentId),
        validateSnakeCase('--other-agent-id', values.otherAgentId),
        values.role === 'A' || values.role === 'B' ? null : `--role must be A or B (got '${values.role}').`,
      ].filter(Boolean);
      if (errors.length > 0) {
        for (const error of errors) console.error(error);
        process.exit(1);
      }
      const result = writeConfig(values, dryRun);
      console.log(`APS config ${dryRun ? 'dry run' : 'saved'}`);
      console.log(result.message);
      process.exit(0);
    }

    const filePath = configPath();
    const config = loadConfig();
    if (!fs.existsSync(filePath)) {
      console.log('APS config: not found');
      console.log(filePath);
      console.log('');
      console.log('下一步:執行 `npx aps init` 進入互動式設定。');
      process.exit(1);
    }
    console.log('APS config');
    console.log(`path: ${filePath}`);
    console.log(`hubRoot: ${config.hubRoot || '(missing)'}`);
    console.log(`projectSlug: ${config.projectSlug || '(missing)'}`);
    console.log(`agentId: ${config.agentId || '(missing)'}`);
    console.log(`otherAgentId: ${config.otherAgentId || '(missing)'}`);
    console.log(`role: ${config.role || '(missing)'}`);
    process.exit(0);
  } catch (err) {
    console.error(`Config failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'publish') {
  requireFlags(['--topic', '--body']);
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const fromId = getRequiredFlagValue('--from') || getRequiredFlagValue('--agent-id') || config.agentId || null;
  const toId = getRequiredFlagValue('--to') || getRequiredFlagValue('--other-agent-id') || config.otherAgentId || null;
  const topic = getRequiredFlagValue('--topic');
  const body = getRequiredFlagValue('--body');
  const level = getFlagValue('--level', 'L2-aps-packet');
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--from': fromId, '--to': toId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--from', fromId),
    validateSnakeCase('--to', toId),
    validateTopic(topic),
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const result = writePacket({ hubRoot, projectSlug, fromId, toId, topic, body, level });
    console.log(`Published ${result.packetId} v${result.version}`);
    console.log(result.packetDir);
    console.log('');
    console.log('可直接複製貼上的通知訊息:');
    console.log(`我已用 APS 放了一個新交接包。項目: ${projectSlug};主題: ${topic};交接編號: ${result.packetId} v${result.version}。請打開你的 AI 工具,進入同一個項目資料夾,輸入「check Hub」。`);
    console.log('');
    console.log('Email 主旨: APS 有新交接包');
    console.log(`Email 正文: 我已用 APS 放了一個新交接包。項目: ${projectSlug};主題: ${topic};交接編號: ${result.packetId} v${result.version}。請打開你的 AI 工具,進入同一個項目資料夾,輸入「check Hub」。`);
    console.log('');
    console.log('下一步:把上面的通知訊息複製貼上到 WhatsApp、Email 或你們平常使用的通訊工具。CLI inbox 命令只作排錯備用。');
    process.exit(0);
  } catch (err) {
    console.error(`Publish failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'revise') {
  requireFlags(['--packet-id', '--body', '--reason']);
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const agentId = flagOrConfig('--agent-id', 'agentId', config);
  const packetId = getRequiredFlagValue('--packet-id');
  const body = getRequiredFlagValue('--body');
  const reason = getRequiredFlagValue('--reason');
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--agent-id': agentId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--agent-id', agentId),
    validatePacketId(packetId),
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const output = revisePacket({ hubRoot, projectSlug, agentId, packetId, body, reason });
    console.log(`已修訂 ${packetId}: v${output.previousVersion} -> v${output.version}`);
    console.log(output.packetDir);
    console.log('');
    console.log('下一步:請通知對方在 AI 工具中說「check Hub」。命令列備用做法是請對方執行 `npx aps inbox`;最新未讀版本會重新顯示為待處理項目。');
    process.exit(0);
  } catch (err) {
    console.error(`Revise failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'inbox') {
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const agentId = flagOrConfig('--agent-id', 'agentId', config);
  const otherAgentId = flagOrConfig('--other-agent-id', 'otherAgentId', config);
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--agent-id': agentId, '--other-agent-id': otherAgentId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--agent-id', agentId),
    validateSnakeCase('--other-agent-id', otherAgentId),
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const pending = pendingPackets({ hubRoot, projectSlug, agentId, otherAgentId });
    if (pending.length === 0) {
      console.log(`APS Hub: ${agentId} 沒有待處理項目`);
    } else {
      console.log(`APS Hub: ${agentId} 有 ${pending.length} 個待處理項目`);
      for (const item of pending) {
        console.log(`- ${item.packetId} v${item.version} | scope:${item.scope} | items:${item.items.join(',') || '(none)'}`);
        console.log(`  packet: ${item.packetPath}`);
        console.log(`  標記已處理命令: npx aps consume --packet-id ${item.packetId} --version ${item.version} --result "<你做了甚麼>"`);
      }
      console.log('');
      console.log('下一步:請先閱讀交接包內容。只有在確認要接受這個版本後,才標記已處理;若資料不足,應先請對方補交。');
    }
    process.exit(0);
  } catch (err) {
    console.error(`Inbox failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'consume') {
  requireFlags(['--packet-id', '--version', '--result']);
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const agentId = flagOrConfig('--agent-id', 'agentId', config);
  const packetId = getRequiredFlagValue('--packet-id');
  const version = Number(getRequiredFlagValue('--version'));
  const result = getRequiredFlagValue('--result');
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--agent-id': agentId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--agent-id', agentId),
    validatePacketId(packetId),
    Number.isInteger(version) && version >= 1 ? null : '--version must be an integer >= 1.',
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const output = consumePacket({ hubRoot, projectSlug, agentId, packetId, version, result });
    console.log(output.already ? `已標記過 ${packetId} v${version}` : `已標記處理 ${packetId} v${version}`);
    console.log(output.ackPath);
    console.log('');
    console.log('下一步:如需要回覆對方,請優先在 AI 工具中說「幫我回覆這個 APS 交接」。命令列備用做法是 `npx aps publish ...`;如事情已完成,請原發包方收結原交接。');
    process.exit(0);
  } catch (err) {
    console.error(`Consume failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'withdraw') {
  requireFlags(['--packet-id', '--reason']);
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const agentId = flagOrConfig('--agent-id', 'agentId', config);
  const packetId = getRequiredFlagValue('--packet-id');
  const versionArg = getRequiredFlagValue('--version');
  const version = versionArg ? Number(versionArg) : null;
  const reason = getRequiredFlagValue('--reason');
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--agent-id': agentId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--agent-id', agentId),
    validatePacketId(packetId),
    version === null || (Number.isInteger(version) && version >= 1) ? null : '--version must be an integer >= 1 when provided.',
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const output = withdrawPacket({ hubRoot, projectSlug, agentId, packetId, version, reason });
    console.log(`已撤回 ${packetId} v${output.version}`);
    console.log(output.outboxPath);
    console.log('');
    console.log(`已在可用時檢查接收方 ack: ${output.ackPath}`);
    console.log('下一步:請通知對方在 AI 工具中說「check Hub」。這個版本不應再顯示為待處理項目。');
    process.exit(0);
  } catch (err) {
    console.error(`Withdraw failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'close') {
  requireFlags(['--packet-id', '--reason']);
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const agentId = flagOrConfig('--agent-id', 'agentId', config);
  const packetId = getRequiredFlagValue('--packet-id');
  const reason = getRequiredFlagValue('--reason');
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--agent-id': agentId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--agent-id', agentId),
    validatePacketId(packetId),
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const output = closePacket({ hubRoot, projectSlug, agentId, packetId, reason });
    console.log(`已收結 ${packetId} v${output.version}`);
    console.log(output.outboxPath);
    console.log('');
    console.log('下一步:雙方可再說「check Hub」或執行 `npx aps inbox`;已收結的交接不應再顯示為待處理項目。');
    process.exit(0);
  } catch (err) {
    console.error(`Close failed: ${err.message}`);
    process.exit(1);
  }
}

if (subcommand === 'doctor') {
  const config = loadConfigOrExit();
  const hubRoot = flagOrConfig('--hub-root', 'hubRoot', config);
  const projectSlug = flagOrConfig('--project', 'projectSlug', config);
  const agentId = flagOrConfig('--agent-id', 'agentId', config);
  const otherAgentId = flagOrConfig('--other-agent-id', 'otherAgentId', config);
  requireValues({ '--hub-root': hubRoot, '--project': projectSlug, '--agent-id': agentId, '--other-agent-id': otherAgentId });
  const errors = [
    validateSnakeCase('--project', projectSlug),
    validateSnakeCase('--agent-id', agentId),
    validateSnakeCase('--other-agent-id', otherAgentId),
  ].filter(Boolean);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  try {
    const output = doctorHub({ hubRoot, projectSlug, agentId, otherAgentId });
    let failed = 0;
    console.log(`APS Hub doctor v${packageVersion}`);
    console.log(`設定檔: ${configPath()}`);
    console.log(`Hub root: ${hubRoot}`);
    console.log(`項目代號: ${projectSlug}`);
    console.log(`本機 agent: ${agentId}`);
    console.log(`對方 agent: ${otherAgentId}`);
    console.log('');
    for (const check of output.checks) {
      console.log(`${check.ok ? '✅ 正常' : '❌ 缺少'}  ${check.label}: ${check.path}`);
      if (!check.ok) failed += 1;
    }
    if (output.conflicts.length > 0) {
      console.log('');
      console.log('⚠️ 找到疑似衝突檔名:');
      for (const filePath of output.conflicts) console.log(`- ${filePath}`);
      failed += 1;
    } else {
      console.log('');
      console.log('✅ 沒有找到疑似衝突檔名。');
    }
    console.log('');
    if (failed === 0) {
      console.log('狀態: 通過');
      console.log('下一步:請優先在 AI 工具中輸入「教我用 APS」。AI 應先讀現有設定,再檢查收件箱,用總覽、摘要、預檢、細節與下一步整理結果。命令列備用指令包括 `npx aps inbox`、`npx aps publish --topic ... --body ...`、`npx aps consume ...`、`npx aps revise ...`、`npx aps withdraw ...`、`npx aps close ...`、`npx aps config`。');
    } else {
      console.log('狀態: 未通過');
      console.log('下一步:先修正缺少的路徑或疑似衝突檔,再繼續使用 APS。不要在未檢查內容前刪除衝突檔。');
      console.log('提示:如果剛剛重新執行過 `npx aps init`,請確認上方「項目代號」是否就是你剛才建立的項目。');
    }
    process.exit(failed === 0 ? 0 : 1);
  } catch (err) {
    console.error(`Doctor failed: ${err.message}`);
    process.exit(1);
  }
}

console.error(`Unknown subcommand: ${subcommand}`);
console.error('Try: npx aps --help');
process.exit(1);
