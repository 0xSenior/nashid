const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

function searchSnippet(pattern, len = 500) {
  const idx = s.indexOf(pattern);
  if (idx !== -1) {
    console.log(`=== Found: ${pattern} ===`);
    console.log(s.slice(idx, idx + len));
  } else {
    console.log(`=== Not found: ${pattern} ===`);
  }
}

searchSnippet('DESKTOP_SIDEBAR_WIDTH');
searchSnippet('PHONE_HEADER_HEIGHT');
searchSnippet('MiniPlayer');
searchSnippet('FullPlayer');
searchSnippet('LyricsView');
searchSnippet('WordModal');
searchSnippet('DictionaryModal');
