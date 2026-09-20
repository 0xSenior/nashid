import { NasheedSummary, LyricsData, DictionaryWord, SavedWord, Playlist } from '@nashid/types';

const API_BASE = '/api';

export async function fetchNasheeds(difficulty?: string, search?: string): Promise<NasheedSummary[]> {
  try {
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (search) params.append('q', search);

    const res = await fetch(`${API_BASE}/nasheeds?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.nasheeds;
  } catch (err) {
    console.warn('API fetch failed, using fallback client data', err);
    return [];
  }
}

export async function fetchNasheedLyrics(id: string): Promise<LyricsData | null> {
  try {
    const res = await fetch(`${API_BASE}/nasheeds/${id}/lyrics`);
    if (!res.ok) throw new Error('Lyrics not found');
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch lyrics from API', err);
    return null;
  }
}

export async function lookupDictionaryWords(timedWordIds: string[]): Promise<Record<string, DictionaryWord>> {
  try {
    const res = await fetch(`${API_BASE}/dictionary/by-timed-word-ids`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timedWordIds })
    });
    if (!res.ok) throw new Error('Lookup failed');
    const data = await res.json();
    return data.dictionary;
  } catch (err) {
    console.warn('Failed dictionary lookup', err);
    return {};
  }
}

export async function fetchSavedWords(): Promise<SavedWord[]> {
  try {
    const res = await fetch(`${API_BASE}/vocabulary/words`);
    if (!res.ok) throw new Error('Failed to fetch words');
    const data = await res.json();
    return data.words;
  } catch (err) {
    return [];
  }
}

export async function saveWordToLearn(wordText: string): Promise<SavedWord | null> {
  try {
    const res = await fetch(`${API_BASE}/vocabulary/words`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wordText })
    });
    if (!res.ok) throw new Error('Save failed');
    const data = await res.json();
    return data.savedWord;
  } catch (err) {
    return null;
  }
}

export async function fetchPlaylists(): Promise<Playlist[]> {
  try {
    const res = await fetch(`${API_BASE}/playlists`);
    if (!res.ok) throw new Error('Failed to fetch playlists');
    const data = await res.json();
    return data.playlists;
  } catch (err) {
    return [];
  }
}
