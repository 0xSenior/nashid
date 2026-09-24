import { NasheedSummary, LyricsData, DictionaryWord, SavedWord, Playlist } from '@nashid/types';

export const API_HOST = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : '';

const API_BASE = API_HOST ? `${API_HOST}/api` : '';
const MEDIA_BASE = API_HOST;

// Helper to normalize arabic for search
function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel
    .replace(/[إأآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase();
}

let cachedNasheeds: NasheedSummary[] | null = null;

export async function fetchNasheeds(difficulty?: string, search?: string): Promise<NasheedSummary[]> {
  // 1. If external API_HOST is explicitly configured, try network API first
  if (API_BASE) {
    try {
      const params = new URLSearchParams();
      if (difficulty && difficulty !== 'all') params.append('difficulty', difficulty);
      if (search) params.append('q', search);

      const res = await fetch(`${API_BASE}/nasheeds?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        return (data.nasheeds || []).map((n: NasheedSummary) => ({
          ...n,
          coverUrl: n.coverUrl && !n.coverUrl.startsWith('http') ? `${MEDIA_BASE}${n.coverUrl}` : n.coverUrl,
          audioUrl: n.audioUrl && !n.audioUrl.startsWith('http') ? `${MEDIA_BASE}${n.audioUrl}` : n.audioUrl
        }));
      }
    } catch (err) {
      console.warn('API fetch failed, falling back to local static catalog', err);
    }
  }

  // 2. Direct static catalog /media/nasheeds.json (always available on Vercel & local static)
  try {
    if (!cachedNasheeds) {
      const res = await fetch('/media/nasheeds.json');
      if (res.ok) {
        const list = await res.json();
        cachedNasheeds = list.map((n: any) => ({
          ...n,
          coverUrl: n.coverUrl && !n.coverUrl.startsWith('http') ? `${MEDIA_BASE}${n.coverUrl}` : n.coverUrl,
          audioUrl: n.audioUrl && !n.audioUrl.startsWith('http') ? `${MEDIA_BASE}${n.audioUrl}` : n.audioUrl
        }));
      }
    }

    if (cachedNasheeds && cachedNasheeds.length > 0) {
      let filtered = [...cachedNasheeds];
      if (difficulty && difficulty !== 'all') {
        filtered = filtered.filter(n => n.difficulty === difficulty);
      }
      if (search && search.trim()) {
        const normQ = normalizeArabic(search.trim());
        filtered = filtered.filter(n => {
          const title = normalizeArabic(n.title || '');
          const artist = normalizeArabic(n.artistName || '');
          return title.includes(normQ) || artist.includes(normQ);
        });
      }
      return filtered;
    }
  } catch (err) {
    console.error('Failed to load static catalog /media/nasheeds.json', err);
  }

  return [];
}

export async function fetchNasheedLyrics(trackOrId: string | NasheedSummary): Promise<LyricsData | null> {
  let targetUrl = '';
  let id = '';
  let slug = '';

  if (typeof trackOrId === 'object' && trackOrId !== null) {
    id = trackOrId.id;
    slug = trackOrId.slug || '';
    targetUrl = trackOrId.lyricsJsonUrl || '';
  } else {
    id = trackOrId;
    if (cachedNasheeds) {
      const found = cachedNasheeds.find(n => n.id === id || n.slug === id);
      if (found) {
        slug = found.slug || '';
        targetUrl = found.lyricsJsonUrl || '';
      }
    }
  }

  // 1. Direct lyricsJsonUrl from catalog
  if (targetUrl) {
    try {
      const url = targetUrl.startsWith('http') ? targetUrl : `${MEDIA_BASE}${targetUrl}`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
  }

  // 2. Fallback to slug-based static lyrics: /media/lyrics/{slug}.json
  if (slug) {
    try {
      const res = await fetch(`/media/lyrics/${slug}.json`);
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
  }

  // 3. Fallback to id-based static lyrics: /media/lyrics/{id}.json
  if (id) {
    try {
      const res = await fetch(`/media/lyrics/${id}.json`);
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
  }

  // 4. API endpoint fallback if API_BASE is configured
  if (API_BASE) {
    try {
      const key = slug || id;
      const res = await fetch(`${API_BASE}/nasheeds/${key}/lyrics`);
      if (res.ok) return await res.json();
    } catch (err) {
      // fallback
    }
  }

  return null;
}

export async function lookupDictionaryWords(timedWordIds: string[]): Promise<Record<string, DictionaryWord>> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/dictionary/by-timed-word-ids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timedWordIds })
      });
      if (res.ok) {
        const data = await res.json();
        return data.dictionary;
      }
    } catch (err) {
      // fallback
    }
  }

  // Client-side fallback dictionary builder
  const result: Record<string, DictionaryWord> = {};
  for (const w of timedWordIds) {
    const norm = normalizeArabic(w);
    result[w] = {
      id: norm,
      arabic: w,
      normalized: norm,
      partOfSpeech: 'مفردة عربية',
      meanings: ['معنى لغوي وسياقي للمفردة في النشيد'],
      meaningsEn: ['Contextual Arabic term'],
      root: norm.length >= 3 ? norm.slice(0, 3) : norm
    };
  }
  return result;
}

const LOCAL_STORAGE_KEY_WORDS = 'nashid_saved_words';
const DEFAULT_PLAYLISTS: Playlist[] = [
  {
    id: 'fakhri-playlist',
    title: 'أناشيد الفخر والعزة',
    itemCount: 5,
    isPublic: true,
    coverUrl: '/media/covers/shar3iatul-fakhri.png',
    createdAt: '2026-09-01T00:00:00.000Z',
    nasheedIds: ['shar3iatul-fakhri', 'ask-the-lofty-spears', 'darbuna', 'tauhiduna', 'qad-fuztaya-ghundar']
  },
  {
    id: 'heritage-playlist',
    title: 'مختارات التراث والقصائد',
    itemCount: 5,
    isPublic: true,
    coverUrl: '/media/covers/ayn-al-quroonul-madiyah.png',
    createdAt: '2026-09-01T00:00:00.000Z',
    nasheedIds: ['ayn-al-quroonul-madiyah', 'wa-madhayta-hussein', 'qatalatny-til-kal-qalawat', 'awwahun', 'o-salafi-take-my-advice']
  }
];

export async function fetchSavedWords(): Promise<SavedWord[]> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_WORDS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return [];
}

export async function saveWordToLearn(wordText: string): Promise<SavedWord | null> {
  const norm = normalizeArabic(wordText);
  const newEntry: SavedWord = {
    id: `saved-${Date.now()}`,
    word: {
      id: norm,
      arabic: wordText,
      normalized: norm,
      partOfSpeech: 'مفردة',
      meanings: ['مفردة مضافة للتعلم والمراجعة'],
      meaningsEn: ['Saved vocabulary item'],
      root: 'ـ'
    },
    masteryLevel: 1,
    savedAt: new Date().toISOString()
  };

  try {
    const list = await fetchSavedWords();
    list.unshift(newEntry);
    localStorage.setItem(LOCAL_STORAGE_KEY_WORDS, JSON.stringify(list));
  } catch (e) {
    console.warn('Failed to save word to localStorage', e);
  }

  return newEntry;
}

export async function fetchPlaylists(): Promise<Playlist[]> {
  return DEFAULT_PLAYLISTS;
}
