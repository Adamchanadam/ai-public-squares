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
  const filePath = configPath();
  const content = {
    hubRoot: values.hubRoot,
    projectSlug: values.projectSlug,
    agentId: values.agentId,
    otherAgentId: values.otherAgentId,
    role: values.role,
  };
  return writeFileIfMissing(filePath, `${JSON.stringify(content, null, 2)}\n`, dryRun);
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
  return { ok: true, path: filePath, message: dryRun ? `would write ${filePath}` : `wrote ${filePath}` };
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

function ensureDirectory(dirPath, dryRun) {
  if (!dryRun) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return { ok: true, path: dirPath, message: dryRun ? `would create ${dirPath}` : `created ${dirPath}` };
}

function installSkill({ label, targetDir, dryRun }) {
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
    if (answer === null) throw new Error('Input ended before guided setup was complete. Rerun `npx aps init` and answer each question.');
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

  console.log('APS init — guided setup');
  console.log('');
  console.log('This guided setup asks only for the values APS needs, then shows the write plan before changing files.');
  console.log('You can press Enter to accept a suggested value.');
  console.log('');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const role = await askWithDefault(rl, 'Are you the starter side? Type A for starter, B for partner', 'A', (value) => {
      const upper = String(value).toUpperCase();
      return upper === 'A' || upper === 'B' ? null : 'Use A or B.';
    });
    const roleValue = role.toUpperCase();
    const defaultProject = toSnakeCase(path.basename(process.cwd()), 'aps_uat');
    const projectSlug = await askWithDefault(rl, 'Project code (lowercase letters, numbers, underscores)', defaultProject, (value) => (
      validateNoPlaceholder('--project', value) || validateSnakeCase('--project', value)
    ));
    const defaultAgent = toSnakeCase(process.env.USERNAME || process.env.USER || 'adam', 'adam');
    const agentId = await askWithDefault(rl, 'Your agent id', defaultAgent, (value) => (
      validateNoPlaceholder('--agent-id', value) || validateSnakeCase('--agent-id', value)
    ));
    const defaultOther = agentId === 'jay' ? 'adam' : 'jay';
    const otherAgentId = await askWithDefault(rl, 'Partner agent id', defaultOther, (value) => (
      validateNoPlaceholder('--other-agent-id', value) || validateSnakeCase('--other-agent-id', value)
    ));
    const hubRoot = await askWithDefault(
      rl,
      'Hub root path (paste the real AI_Public_Squares folder path from File Explorer)',
      '',
      (value) => validateNoPlaceholder('--hub-root', value) || (path.isAbsolute(value) ? null : '--hub-root must be an absolute path.')
    );

    const values = { hubRoot, projectSlug, agentId, otherAgentId, role: roleValue };
    const projectPath = projectDir(values.hubRoot, values.projectSlug);
    console.log('');
    console.log('Plan:');
    console.log(`  hub-root: ${values.hubRoot}`);
    console.log(`  project: ${values.projectSlug}`);
    console.log(`  this side: ${values.agentId} (role ${values.role})`);
    console.log(`  partner: ${values.otherAgentId}`);
    console.log(`  project folder to create/use: ${projectPath}`);
    console.log(`  local config: ${configPath()}`);
    console.log('');
    const confirm = await askLine(rl, 'Type yes to install the skill, create the Hub skeleton, and save local config: ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Cancelled. No APS Hub files were written.');
      return 1;
    }

    const installTargets = [
      { label: 'Claude Code', targetDir: path.join(root, '.claude', 'skills', 'aps') },
      { label: 'Codex', targetDir: path.join(root, '.codex', 'skills', 'aps') },
    ];
    console.log('');
    for (const result of installTargets.map((item) => installSkill({ ...item, dryRun: false }))) {
      const prefix = result.ok ? 'ok' : result.skipped ? 'skip' : 'fail';
      console.log(`${prefix}  ${result.label}: ${result.message}`);
      if (!result.ok && !result.skipped) return 1;
    }
    console.log('');
    console.log('Hub setup:');
    for (const result of setupHub(values, false)) {
      const prefix = result.skipped ? 'skip' : 'ok';
      console.log(`${prefix}  ${result.message}`);
    }
    console.log('');
    console.log('Setup complete.');
    console.log('Next: open your AI tool in this project folder and say "set up APS" or "教我用 APS".');
    console.log('Daily commands can now use the saved config, for example: npx aps doctor');
    return 0;
  } finally {
    rl.close();
  }
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
  const level = previousHeader.level || 'L2-handoff';
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
  function checkDir(dirPath, label) {
    const ok = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    checks.push({ ok, label, path: dirPath });
  }
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

This starter pack was generated by \`aps init\`.

## Shared Decisions

- project_slug: \`${values.projectSlug}\`
- your agent_id: \`${values.otherAgentId}\`
- counterpart agent_id: \`${values.agentId}\`
- your role: \`${counterpartRole}\`
- Hub root on your machine: replace this with your own Google Drive path

## Install

\`\`\`powershell
npm install --save-dev @adamchanadam/aps
npx aps init
\`\`\`

When the guided setup asks questions, use these values:

- role: \`${counterpartRole}\`
- project: \`${values.projectSlug}\`
- your agent id: \`${values.otherAgentId}\`
- partner agent id: \`${values.agentId}\`
- Hub root path: paste the real AI_Public_Squares folder path from File Explorer on your own machine

Do not copy placeholder paths such as \`G:\\...\\AI_Public_Squares\`. The path must be the real folder path on your machine.

After install, restart Claude Code or Codex if the APS skill does not appear immediately.

## Manual Bridge Pack Fallback

If you only need the Bridge Pack:

\`\`\`powershell
npx aps bridge-pack --role ${counterpartRole} > dev/rules/aps-bridge.md
\`\`\`

## Daily Trigger

When the other side tells you there is new traffic, open your AI tool and say:

> check Hub
`;
}

function setupHub(values, dryRun) {
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
  steps.push(writeFileIfMissing(bridgeTarget, bridgePackContent(values.role, values), dryRun));

  steps.push(saveConfig(values, dryRun));

  const counterpartRole = values.role === 'A' ? 'B' : 'A';
  const starterTarget = path.join(values.hubRoot, '_hub', `starter-pack-${values.otherAgentId}.md`);
  steps.push(writeFileIfMissing(starterTarget, starterPackContent(values, counterpartRole), dryRun));

  return steps;
}

if (!subcommand || subcommand === '--help' || subcommand === '-h') {
  console.log(`
APS — AI Public Squares
Two-machine AI agent collaboration via a shared Google Drive folder.

Usage:
  npx aps init                    Guided setup: ask questions, create Hub, and save config
  npx aps init --target claude    Install APS skill for Claude Code only
  npx aps init --target codex     Install APS skill for Codex only
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
This pre-release has one Adam/Jay Google Drive round-trip verification, but
each real project still needs its own project-specific verification.
Repo: https://github.com/Adamchanadam/ai-public-squares
`);
  process.exit(0);
}

if (subcommand === 'init' && args.length === 0) {
  runInteractiveInit()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(`Guided setup failed: ${err.message}`);
      process.exit(1);
    });
  return;
} else if (subcommand === 'init') {
  const validTargets = ['claude', 'codex', 'both'];
  const target = getFlagValue('--target', 'both').toLowerCase();
  const dryRun = hasFlag('--dry-run');
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

  console.log(`APS init — skill installer${setupFlags.length === 5 ? ' + Hub setup' : ''}${dryRun ? ' (dry run)' : ''}`);
  console.log('');
  console.log('This command installs the APS skill files for AI tools.');
  if (setupFlags.length === 5) {
    console.log('It also creates the initial APS Hub skeleton and local Bridge Pack.');
    console.log('It saves .aps/config.json so daily commands can omit long setup flags.');
    console.log('Minimal CLI publish / inbox / consume / close commands are available for local smoke tests.');
    console.log('Natural-language daily use remains pending; each real project still needs its own Google Drive verification.');
  } else {
    console.log('Provide --hub-root, --project, --agent-id, --other-agent-id, and --role to create the Hub skeleton.');
  }
  console.log('');

  const results = installTargets.map((item) => installSkill({ ...item, dryRun }));
  for (const result of results) {
    const prefix = result.ok ? 'ok' : result.skipped ? 'skip' : 'fail';
    console.log(`${prefix}  ${result.label}: ${result.message}`);
  }

  const failed = results.filter((result) => !result.ok && !result.skipped);
  const setupResults = [];
  if (setupFlags.length === 5) {
    console.log('');
    console.log('Hub setup:');
    try {
      setupResults.push(...setupHub(setupValues, dryRun));
      for (const result of setupResults) {
        const prefix = result.skipped ? 'skip' : 'ok';
        console.log(`${prefix}  ${result.message}`);
      }
    } catch (err) {
      console.error(`Hub setup failed: ${err.message}`);
      process.exit(1);
    }
  }
  console.log('');
  const skipped = [
    ...results.filter((result) => result.skipped),
    ...setupResults.filter((result) => result.skipped),
  ];
  if (failed.length > 0) {
    console.log('Install failed for one or more required targets. Existing files were left untouched where possible.');
  } else if (skipped.length > 0) {
    console.log('Install complete with safe skips. Existing files were left untouched.');
    console.log('To refresh an existing install, remove or rename the existing target first, then rerun this command.');
  } else if (dryRun) {
    console.log('Dry run complete. Rerun without `--dry-run` to install.');
  } else {
    console.log('Setup complete. Restart Claude Code or Codex if the skill does not appear immediately.');
    console.log('Next: open your AI tool and say "set up APS" or "教我用 APS".');
  }
  console.log('');
  console.log('Manual Bridge Pack fallback remains available:');
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
      console.log('Next: run `npx aps init` for guided setup.');
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
  const fromId = getRequiredFlagValue('--from') || config.agentId || null;
  const toId = getRequiredFlagValue('--to') || config.otherAgentId || null;
  const topic = getRequiredFlagValue('--topic');
  const body = getRequiredFlagValue('--body');
  const level = getFlagValue('--level', 'L2-handoff');
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
    console.log('Copy-ready message for the other side:');
    console.log(`APS has new Hub traffic for you: ${topic} (${result.packetId} v${result.version}). Please open your AI tool in the project workspace and say "check Hub".`);
    console.log('');
    console.log('Next: tell the other side there is new Hub traffic, then ask them to run `npx aps inbox` or say "check Hub" in their AI tool.');
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
    console.log(`Revised ${packetId}: v${output.previousVersion} -> v${output.version}`);
    console.log(output.packetDir);
    console.log('');
    console.log('Next: tell the receiver to run inbox again; the latest unconsumed version is now the pending item.');
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
      console.log(`APS Hub: no pending items for ${agentId}`);
    } else {
      console.log(`APS Hub: ${pending.length} pending item(s) for ${agentId}`);
      for (const item of pending) {
        console.log(`- ${item.packetId} v${item.version} | scope:${item.scope} | items:${item.items.join(',') || '(none)'}`);
        console.log(`  packet: ${item.packetPath}`);
        console.log(`  accept command: npx aps consume --packet-id ${item.packetId} --version ${item.version} --result "<what you did>"`);
      }
      console.log('');
      console.log('Next: read the packet first. Run the accept command only after you decide to accept that exact version.');
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
    console.log(output.already ? `Already consumed ${packetId} v${version}` : `Consumed ${packetId} v${version}`);
    console.log(output.ackPath);
    console.log('');
    console.log('Next: reply with `npx aps publish ...` if work is due back to the sender, or ask the sender to close their original packet when the thread is settled.');
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
    console.log(`Withdrew ${packetId} v${output.version}`);
    console.log(output.outboxPath);
    console.log('');
    console.log(`Checked receiver ack when available: ${output.ackPath}`);
    console.log('Next: tell the receiver to run inbox again; this version should no longer appear as pending.');
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
    console.log(`Closed ${packetId} v${output.version}`);
    console.log(output.outboxPath);
    console.log('');
    console.log('Next: both sides can run inbox once more; the settled thread should no longer appear as pending.');
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
    console.log('APS Hub doctor');
    for (const check of output.checks) {
      console.log(`${check.ok ? 'ok' : 'missing'}  ${check.label}: ${check.path}`);
      if (!check.ok) failed += 1;
    }
    if (output.conflicts.length > 0) {
      console.log('');
      console.log('Conflict-like filenames found:');
      for (const filePath of output.conflicts) console.log(`- ${filePath}`);
      failed += 1;
    } else {
      console.log('');
      console.log('No conflict-like filenames found.');
    }
    console.log('');
    if (failed === 0) {
      console.log('status: passed');
      console.log('Next: run inbox, publish, consume, revise, withdraw, or close as needed.');
    } else {
      console.log('status: failed');
      console.log('Next: fix the missing paths or conflict-like files before continuing. Do not delete conflict files without reviewing them.');
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
