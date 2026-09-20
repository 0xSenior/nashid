const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const tMatches = s.match(/S\(['"]([a-zA-Z0-9_\.]+)['"]\)/g) || [];
const keys = new Set(tMatches.map(m => m.slice(3, -2)));
console.log('Sample translation keys used in UI:');
console.log(Array.from(keys).slice(0, 50));
