const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const idx = s.indexOf('const l=E(n,o);');
if (idx !== -1) {
  // Let's look backwards to see the functions defined right before getCurrentNasheed
  console.log('--- 1500 chars before getCurrentNasheed ---');
  console.log(s.slice(Math.max(0, idx - 1500), idx));
}
