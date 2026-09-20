const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

function findContexts(query, window = 400) {
  let idx = 0;
  const results = [];
  while ((idx = s.indexOf(query, idx)) !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(s.length, idx + window);
    results.push(s.slice(start, end));
    idx += query.length;
    if (results.length >= 10) break;
  }
  return results;
}

console.log('=== DICTIONARY / TIMED WORDS CONTEXT ===');
for (const c of findContexts('by-timed-word-ids', 300)) {
  console.log('--- snippet ---');
  console.log(c);
}

console.log('=== NASHEEDS API CONTEXT ===');
for (const c of findContexts('https://api.nushud.com', 300)) {
  console.log('--- snippet ---');
  console.log(c);
}

console.log('=== WORKERS API CONTEXT ===');
for (const c of findContexts('nushud-api.nushud.workers.dev', 300)) {
  console.log('--- snippet ---');
  console.log(c);
}
