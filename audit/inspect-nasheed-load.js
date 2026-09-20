const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const idx = s.indexOf('getCurrentNasheed(){');
if (idx !== -1) {
  console.log('--- Context around getCurrentNasheed ---');
  console.log(s.slice(idx, idx + 1000));
}
