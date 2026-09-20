import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('apps/api/data');
const AUDIO_DIR = path.join(DATA_DIR, 'audio');
const COVERS_DIR = path.join(DATA_DIR, 'covers');
const LYRICS_DIR = path.join(DATA_DIR, 'lyrics');

for (const d of [DATA_DIR, AUDIO_DIR, COVERS_DIR, LYRICS_DIR]) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
}

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    return true; // already downloaded
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to download ${url}: status ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

// Concurrency pool helper
async function pool(items, concurrency, fn) {
  const results = [];
  const executing = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);
    if (concurrency <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

async function main() {
  console.log('Fetching nasheeds master catalog from https://api.nushud.com/nasheeds ...');
  const res = await fetch('https://api.nushud.com/nasheeds');
  const data = await res.json();
  const nasheeds = data.nasheeds || [];
  console.log(`Total nasheeds found: ${nasheeds.length}`);

  const localNasheeds = [];
  let lyricsDone = 0;
  let coversDone = 0;
  let audioDone = 0;

  // 1. Download Lyrics
  console.log('\n--- 1. Downloading Lyrics JSON files ---');
  await pool(nasheeds, 10, async (n) => {
    const filename = `${n.slug || n.id}.json`;
    const dest = path.join(LYRICS_DIR, filename);
    if (n.lyricsJsonUrl) {
      await downloadFile(n.lyricsJsonUrl, dest);
    }
    lyricsDone++;
    if (lyricsDone % 25 === 0 || lyricsDone === nasheeds.length) {
      console.log(`Downloaded lyrics: ${lyricsDone}/${nasheeds.length}`);
    }
  });

  // 2. Download Covers
  console.log('\n--- 2. Downloading Cover Images ---');
  await pool(nasheeds, 10, async (n) => {
    const ext = n.coverUrl.includes('.jpg') ? 'jpg' : 'png';
    const filename = `${n.slug || n.id}.${ext}`;
    const dest = path.join(COVERS_DIR, filename);
    if (n.coverUrl) {
      await downloadFile(n.coverUrl, dest);
    }
    coversDone++;
    if (coversDone % 25 === 0 || coversDone === nasheeds.length) {
      console.log(`Downloaded covers: ${coversDone}/${nasheeds.length}`);
    }
  });

  // 3. Download Audio Files (concurrency: 6)
  console.log('\n--- 3. Downloading MP3 Audio Files ---');
  await pool(nasheeds, 6, async (n) => {
    const filename = `${n.slug || n.id}.mp3`;
    const dest = path.join(AUDIO_DIR, filename);
    if (n.audioUrl) {
      const ok = await downloadFile(n.audioUrl, dest);
      if (ok) {
        const sizeMb = (fs.statSync(dest).size / (1024 * 1024)).toFixed(2);
        audioDone++;
        if (audioDone % 10 === 0 || audioDone === nasheeds.length) {
          console.log(`[${audioDone}/${nasheeds.length}] Audio downloaded: ${n.title} (${sizeMb} MB)`);
        }
      }
    }
  });

  // 4. Build local metadata with local URLs
  for (const n of nasheeds) {
    const coverExt = n.coverUrl.includes('.jpg') ? 'jpg' : 'png';
    localNasheeds.push({
      ...n,
      audioUrl: `/media/audio/${n.slug || n.id}.mp3`,
      coverUrl: `/media/covers/${n.slug || n.id}.${coverExt}`,
      lyricsJsonUrl: `/media/lyrics/${n.slug || n.id}.json`,
      isLocal: true
    });
  }

  const catalogPath = path.join(DATA_DIR, 'nasheeds.json');
  fs.writeFileSync(catalogPath, JSON.stringify(localNasheeds, null, 2));
  console.log(`\nSuccessfully created local catalog: ${catalogPath} (${localNasheeds.length} items)`);
}

main().catch(console.error);
