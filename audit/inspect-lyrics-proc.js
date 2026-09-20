const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const idx = s.indexOf('const l=E(n,o);');
if (idx !== -1) {
  console.log('--- Context before and after E(n, o) ---');
  console.log(s.slice(Math.max(0, idx - 600), idx + 1000));
}
