export type NasheedDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Creator {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface NasheedSummary {
  id: string;
  slug: string;
  title: string;
  artistName: string;
  coverUrl: string;
  audioUrl: string;
  lyricsJsonUrl: string;
  durationMs: number;
  difficulty: NasheedDifficulty;
  totalWords: number;
  newWordsCount: number;
  tags: string[];
  playCount: number;
  likeCount: number;
  savedCount: number;
  commentCount: number;
  createdAt: string;
  createdBy: Creator;
}

export interface LyricsLine {
  lineIndex: number;
  startMs: number;
  endMs: number;
  ar: string;
  en?: string;
  ru?: string;
  tr?: string;
}

export interface LyricsData {
  id: string;
  title: string;
  artist: string;
  difficulty: NasheedDifficulty;
  durationMs: number;
  lineCount: number;
  languages: string[];
  lines: LyricsLine[];
}

export interface DictionaryWord {
  id: string;
  arabic: string;
  normalized: string;
  partOfSpeech: string;
  posBadge?: string;
  meanings: string[];
  meaningsEn?: string[];
  meaningHeading?: string;
  root?: string;
  plural?: string;
  singular?: string;
  wazn?: string;
  bab?: string;
  present?: string;
  imperative?: string;
  example?: string;
  quranExample?: {
    ayah: string;
    translation: string;
    surah: string;
  };
  audioUrl?: string;
}

export interface SavedWord {
  id: string;
  word: DictionaryWord;
  masteryLevel: number;
  savedAt: string;
  nextReviewAt?: string;
}

export interface Playlist {
  id: string;
  title: string;
  itemCount: number;
  isPublic: boolean;
  coverUrl?: string;
  createdAt: string;
  nasheedIds: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  isPro: boolean;
  savedWordCount: number;
}
