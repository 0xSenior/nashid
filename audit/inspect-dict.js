const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

const idx = s.indexOf('/dictionary/by-timed-word-ids');
if (idx !== -1) {
  console.log('--- Context around by-timed-word-ids ---');
  console.log(s.slice(Math.max(0, idx - 400), idx + 800));
}

const lemmaIdx = s.indexOf('/dictionary/by-lemma-keys');
if (lemmaIdx !== -1) {
  console.log('--- Context around by-lemma-keys ---');
  console.log(s.slice(Math.max(0, lemmaIdx - 200), lemmaIdx + 600));
}
