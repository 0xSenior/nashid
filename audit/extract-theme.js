const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

let idx = 0;
while ((idx = s.indexOf('#0a0a0a', idx)) !== -1) {
  console.log('--- #0a0a0a occurrence ---');
  console.log(s.slice(Math.max(0, idx - 150), Math.min(s.length, idx + 250)));
  idx += 7;
}
