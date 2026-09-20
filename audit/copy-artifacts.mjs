import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('audit/shots');
const destDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\db758a38-0294-43c0-9581-6e350632dc4b';

const filesToCopy = [
  { src: '1-desktop-home.png', dest: 'nushud-desktop-home.png' },
  { src: 'mobile-home.png', dest: 'nushud-mobile-home.png' },
  { src: '3-library-view.png', dest: 'nushud-library-grid.png' },
  { src: '4-track-playing.png', dest: 'nushud-player-lyrics.png' },
  { src: '6-word-click-result.png', dest: 'nushud-subtitles-active.png' }
];

for (const f of filesToCopy) {
  const from = path.join(srcDir, f.src);
  const to = path.join(destDir, f.dest);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`Copied ${f.src} -> ${to}`);
  }
}
console.log('Done copying artifacts!');
