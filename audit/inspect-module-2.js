const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const idx = s.indexOf('postComment(n,s){');
if (idx !== -1) {
  console.log(s.slice(idx, idx + 2500));
}
