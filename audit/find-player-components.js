const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

// Find occurrences of 'lyrics' or 'audio' or 'playback'
const matches = [];
const regex = /(?:function|const|class)\s+([a-zA-Z0-9_]*(?:Player|Lyric|Word|Audio|Track)[a-zA-Z0-9_]*)/g;
let m;
while ((m = regex.exec(s)) !== null) {
  matches.push(m[1]);
}
console.log('Detected Audio/Player/Lyric components and classes:', [...new Set(matches)]);
