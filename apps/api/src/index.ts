import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { NASHEEDS as DEFAULT_NASHEEDS, DICTIONARY, PLAYLISTS, SAVED_WORDS } from './data.js';
import { normalizeArabic } from './arabic.js';
import { NasheedSummary, LyricsData } from '@nashid/types';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve local media assets (audio, covers, lyrics)
const DATA_DIR = path.resolve('apps/api/data');
app.use('/media', express.static(DATA_DIR));

// Load local master catalog if available, otherwise fallback
let allNasheeds: any[] = [];
const localCatalogPath = path.join(DATA_DIR, 'nasheeds.json');

if (fs.existsSync(localCatalogPath)) {
  try {
    allNasheeds = JSON.parse(fs.readFileSync(localCatalogPath, 'utf8'));
    console.log(`Loaded ${allNasheeds.length} local nasheeds from ${localCatalogPath}`);
  } catch (err) {
    console.error('Failed to load local catalog, falling back', err);
    allNasheeds = DEFAULT_NASHEEDS;
  }
} else {
  allNasheeds = DEFAULT_NASHEEDS;
}

// In-memory state for favorites
const favoriteIds = new Set<string>(['shar3iatul-fakhri', 'sal-al-rimah']);

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'nashid-api',
    totalNasheeds: allNasheeds.length,
    isLocal: true,
    timestamp: new Date().toISOString()
  });
});

// 2. List nasheeds with filtering & search
app.get('/api/nasheeds', (req: Request, res: Response) => {
  const { difficulty, tag, q } = req.query;
  let list = [...allNasheeds];

  if (difficulty && typeof difficulty === 'string' && difficulty !== 'all') {
    list = list.filter(n => n.difficulty === difficulty);
  }

  if (tag && typeof tag === 'string') {
    list = list.filter(n => Array.isArray(n.tags) && n.tags.includes(tag));
  }

  if (q && typeof q === 'string') {
    const normQ = normalizeArabic(q);
    list = list.filter(n => {
      const titleNorm = normalizeArabic(n.title);
      const artistNorm = normalizeArabic(n.artistName || '');
      return titleNorm.includes(normQ) || artistNorm.includes(normQ);
    });
  }

  const summaries: NasheedSummary[] = list.map(n => {
    const { lyrics, ...rest } = n;
    return {
      ...rest,
      isFavorite: favoriteIds.has(n.id)
    } as any;
  });

  res.json({ nasheeds: summaries, total: summaries.length });
});

// 3. First default nasheed
app.get('/api/nasheeds/first', (req: Request, res: Response) => {
  const first = allNasheeds[0];
  res.json({ id: first ? first.id : null });
});

// 4. Get specific nasheed by ID or slug
app.get('/api/nasheeds/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const found = allNasheeds.find(n => n.id === id || n.slug === id);
  if (!found) {
    return res.status(404).json({ error: 'Nasheed not found' });
  }

  res.json({
    nasheed: {
      ...found,
      isFavorite: favoriteIds.has(found.id)
    }
  });
});

// 5. Get lyrics for nasheed
app.get('/api/nasheeds/:id/lyrics', (req: Request, res: Response) => {
  const { id } = req.params;
  const found = allNasheeds.find(n => n.id === id || n.slug === id);
  if (!found) {
    return res.status(404).json({ error: 'Nasheed not found' });
  }

  // Check if local lyrics file exists in data/lyrics
  const key = found.slug || found.id;
  const localLyricsFile = path.join(DATA_DIR, 'lyrics', `${key}.json`);

  if (fs.existsSync(localLyricsFile)) {
    try {
      const lyricsData = JSON.parse(fs.readFileSync(localLyricsFile, 'utf8'));
      return res.json(lyricsData);
    } catch (e) {
      console.warn('Error reading local lyrics file', e);
    }
  }

  // Fallback to inline lyrics if available
  if (found.lyrics) {
    return res.json(found.lyrics);
  }

  res.status(404).json({ error: 'Lyrics not found' });
});

// 6. Nasheeds by IDs
app.post('/api/nasheeds/by-ids', (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids must be an array' });
  }
  const idSet = new Set(ids);
  const matched = allNasheeds.filter(n => idSet.has(n.id)).map(n => {
    const { lyrics, ...rest } = n;
    return { ...rest, isFavorite: favoriteIds.has(n.id) };
  });
  res.json({ nasheeds: matched });
});

// 7. Record play event
app.post('/api/nasheeds/:id/play', (req: Request, res: Response) => {
  const { id } = req.params;
  const found = allNasheeds.find(n => n.id === id);
  if (found) {
    found.playCount = (found.playCount || 0) + 1;
  }
  res.status(204).end();
});

// 8. Toggle favorite
app.post('/api/nasheeds/:id/favorite', (req: Request, res: Response) => {
  const { id } = req.params;
  const { isFavorite } = req.body;
  if (isFavorite) {
    favoriteIds.add(id);
  } else {
    favoriteIds.delete(id);
  }
  res.json({ id, isFavorite: favoriteIds.has(id) });
});

// 9. Dictionary lookup by timed word IDs
app.post('/api/dictionary/by-timed-word-ids', (req: Request, res: Response) => {
  const { timedWordIds } = req.body;
  if (!Array.isArray(timedWordIds)) {
    return res.status(400).json({ error: 'timedWordIds must be an array' });
  }

  const result: Record<string, any> = {};
  for (const w of timedWordIds) {
    const norm = normalizeArabic(w);
    if (DICTIONARY[norm]) {
      result[w] = DICTIONARY[norm];
    } else {
      result[w] = {
        id: norm,
        arabic: w,
        normalized: norm,
        partOfSpeech: 'مفردة عربية',
        meanings: ['معنى لغوي في سياق النشيد'],
        meaningsEn: ['contextual meaning'],
        root: 'ـ'
      };
    }
  }

  res.json({ dictionary: result });
});

// 10. Direct word dictionary lookup
app.get('/api/dictionary/word/:word', (req: Request, res: Response) => {
  const { word } = req.params;
  const norm = normalizeArabic(word);
  const entry = DICTIONARY[norm];
  if (entry) {
    return res.json({ word: entry });
  }
  res.status(404).json({ error: 'Word not found in dictionary' });
});

// 11. Saved vocabulary words
app.get('/api/vocabulary/words', (req: Request, res: Response) => {
  res.json({ words: SAVED_WORDS });
});

app.post('/api/vocabulary/words', (req: Request, res: Response) => {
  const { wordText } = req.body;
  if (!wordText) {
    return res.status(400).json({ error: 'wordText required' });
  }
  const norm = normalizeArabic(wordText);
  const dictWord = DICTIONARY[norm] || {
    id: norm,
    arabic: wordText,
    normalized: norm,
    partOfSpeech: 'كلمة',
    meanings: ['مفردة مضافة للتعلم'],
    meaningsEn: ['saved word'],
    root: 'ـ'
  };

  const newEntry = {
    id: `saved-${Date.now()}`,
    word: dictWord,
    masteryLevel: 1,
    savedAt: new Date().toISOString()
  };

  SAVED_WORDS.unshift(newEntry);
  res.status(201).json({ savedWord: newEntry });
});

// 12. Playlists
app.get('/api/playlists', (req: Request, res: Response) => {
  res.json({ playlists: PLAYLISTS });
});

app.listen(PORT, () => {
  console.log(`Nashid Platform API running on http://localhost:${PORT}`);
  console.log(`Serving local media from ${DATA_DIR} at /media`);
});
