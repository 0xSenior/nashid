const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const idx = s.indexOf('class c extends Error{}');
if (idx !== -1) {
  // Print the module up to 3000 chars
  console.log(s.slice(idx, idx + 2500));
}
