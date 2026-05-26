const fs = require('fs');
const path = require('path');
const project = path.resolve('dev/qc/evidence/2026-05-25-full-audit/roundtrip-hub/aps_full_audit_probe');
const agents = [
  { agent: 'adam', other: 'jay' },
  { agent: 'jay', other: 'adam' }
];
function parseOutbox(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).filter(line => !line.startsWith('<!--')).map(line => {
    const parts = line.split('|').map(s => s.trim());
    const m = parts[2]?.match(/^(.+) v(\d+)$/);
    return { line, at: parts[0], verb: parts[1], packet_id: m?.[1], version: Number(m?.[2] || 0), fields: parts.slice(3) };
  }).filter(e => e.packet_id && e.version);
}
function pendingFor(agent, other) {
  const outbox = parseOutbox(path.join(project, `from_${other}`, 'outbox.log.md'));
  const ackFile = path.join(project, '_ack', `${agent}.ack.json`);
  const ack = JSON.parse(fs.readFileSync(ackFile, 'utf8'));
  const consumed = new Set((ack.consumed || []).map(e => `${e.packet_id}#${e.version}`));
  const byPacket = new Map();
  for (const e of outbox) {
    const existing = byPacket.get(e.packet_id) || { latest: null, closed: false, withdrawn: new Set() };
    if (!existing.latest || e.version >= existing.latest.version) existing.latest = e;
    if (e.verb === 'close') existing.closed = true;
    if (e.verb === 'withdraw') existing.withdrawn.add(e.version);
    byPacket.set(e.packet_id, existing);
  }
  const pending = [];
  for (const [packet_id, state] of byPacket) {
    const latest = state.latest;
    if ((latest.verb === 'publish' || latest.verb === 'revise') && !state.closed && !consumed.has(`${packet_id}#${latest.version}`) && !state.withdrawn.has(latest.version)) {
      pending.push(`${packet_id} v${latest.version}`);
    }
  }
  return pending;
}
const result = agents.map(({agent, other}) => ({ agent, other, pending: pendingFor(agent, other) }));
console.log(JSON.stringify(result, null, 2));
