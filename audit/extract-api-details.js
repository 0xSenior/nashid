const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

// Search for patterns like .get( or .post( or .put( or .delete(
const regex = /\.(get|post|put|delete|patch)\(\s*[`'"](\/[^`'"]+)[`'"]/g;
let m;
const calls = new Set();
while ((m = regex.exec(s)) !== null) {
  calls.add(`${m[1].toUpperCase()} ${m[2]}`);
}

console.log('=== All API Calls ===');
for (const call of Array.from(calls).sort()) {
  console.log(call);
}

// Extract function s(n) which deserializes dictionary word
const sFuncIdx = s.indexOf('function s(n){return{id:n.');
if (sFuncIdx !== -1) {
  console.log('\n=== Dictionary Word Schema ===');
  console.log(s.slice(sFuncIdx, sFuncIdx + 400));
}

// Extract nasheed deserialization / schema
const nasheedSchemaIdx = s.indexOf('/nasheeds');
if (nasheedSchemaIdx !== -1) {
  console.log('\n=== Nasheed API Context ===');
  console.log(s.slice(nasheedSchemaIdx - 100, nasheedSchemaIdx + 600));
}
