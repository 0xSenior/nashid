import fs from 'fs';
import path from 'path';

const possibleSources = [
  path.resolve('apps/api/data'),
  path.resolve('../api/data'),
  path.resolve('../../apps/api/data')
];

const srcDir = possibleSources.find(p => fs.existsSync(p));
if (!srcDir) {
  console.warn('Could not find apps/api/data directory to copy media.');
  process.exit(0);
}

const targetMediaDir = path.resolve(
  fs.existsSync(path.resolve('apps/web/public')) 
    ? 'apps/web/public/media' 
    : 'public/media'
);

console.log(`Syncing media from ${srcDir} to ${targetMediaDir}...`);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(srcDir, targetMediaDir);
console.log('Media synchronized successfully for static build!');
