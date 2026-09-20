import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('audit/shots');
const destDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\db758a38-0294-43c0-9581-6e350632dc4b';

const files = [
  'nashid-app-home.png',
  'nashid-app-library.png',
  'nashid-app-lyrics.png',
  'nashid-app-word-modal.png'
];

for (const f of files) {
  const s = path.join(srcDir, f);
  const d = path.join(destDir, f);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Copied ${f} -> ${d}`);
  }
}
console.log('Done!');
