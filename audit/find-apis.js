const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

// Find all URLs
const re = /https?:\/\/[^\s"'`<>]+/g;
let m;
const urls = new Set();
while ((m = re.exec(s)) !== null) {
  urls.add(m[0]);
}

console.log('--- Filtered URLs ---');
for (const u of urls) {
  if (
    !u.includes('w3.org') &&
    !u.includes('react') &&
    !u.includes('svelte') &&
    !u.includes('github') &&
    !u.includes('schema.org') &&
    !u.includes('expo.dev') &&
    !u.includes('google') &&
    !u.includes('revenuecat') &&
    !u.includes('rev.cat')
  ) {
    console.log(u);
  }
}

// Find string constants matching endpoints or paths
console.log('\n--- Endpoint Patterns ---');
const endpointRegex = /["'](\/(?:api\/|nasheed|track|artist|playlist|lyrics|words?|dict|search|user|auth)[^"']*)["']/g;
const endpoints = new Set();
while ((m = endpointRegex.exec(s)) !== null) {
  endpoints.add(m[1]);
}
for (const ep of endpoints) {
  console.log(ep);
}
