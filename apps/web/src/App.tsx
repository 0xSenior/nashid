import React, { useState, useEffect, useRef } from 'react';
import { NasheedSummary, LyricsData, DictionaryWord, SavedWord, Playlist } from '@nashid/types';
import { Sidebar } from './components/Sidebar.js';
import { BottomPlayer } from './components/BottomPlayer.js';
import { SyncedLyricsModal } from './components/SyncedLyricsModal.js';
import { WordModal } from './components/WordModal.js';
import { HomeView } from './views/HomeView.js';
import { LibraryView } from './views/LibraryView.js';
import { CardsView } from './views/CardsView.js';
import { PlaylistsView } from './views/PlaylistsView.js';
import { MaintenanceView } from './views/MaintenanceView.js';
import { AccountView } from './views/AccountView.js';
import { fetchNasheeds, fetchNasheedLyrics, lookupDictionaryWords, fetchSavedWords, saveWordToLearn, fetchPlaylists } from './api.js';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [nasheeds, setNasheeds] = useState<NasheedSummary[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);

  // Audio State
  const [currentTrack, setCurrentTrack] = useState<NasheedSummary | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(182);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  // Lyrics & Modals
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [currentLyrics, setCurrentLyrics] = useState<LyricsData | null>(null);

  // Word Popup
  const [selectedWord, setSelectedWord] = useState<DictionaryWord | null>(null);
  const [selectedWordRaw, setSelectedWordRaw] = useState<string>('');
  const [isWordModalOpen, setIsWordModalOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Fetch initial data
  useEffect(() => {
    async function load() {
      const nList = await fetchNasheeds();
      if (nList && nList.length > 0) {
        setNasheeds(nList);
        setCurrentTrack(nList[0]);
      }

      const pList = await fetchPlaylists();
      if (pList && pList.length > 0) setPlaylists(pList);

      const wList = await fetchSavedWords();
      if (wList && wList.length > 0) setSavedWords(wList);
    }
    load();
  }, []);

  // Fetch lyrics when track changes
  useEffect(() => {
    if (currentTrack) {
      fetchNasheedLyrics(currentTrack).then((l) => {
        if (l) setCurrentLyrics(l);
      });
    }
  }, [currentTrack]);

  // Audio events
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 180);
    }
  };

  const handleTrackEnded = () => {
    handleNextTrack();
  };

  const handlePlayNasheed = (track: NasheedSummary) => {
    if (currentTrack?.id === track.id) {
      handleTogglePlay();
      return;
    }

    setCurrentTrack(track);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Playback error on track switch:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      if (!audioRef.current.src && currentTrack) {
        audioRef.current.src = currentTrack.audioUrl;
        audioRef.current.load();
      }
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Play error:', err);
            setIsPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (timeSec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeSec;
      setCurrentTime(timeSec);
    }
  };

  const handlePrevTrack = () => {
    if (!currentTrack || nasheeds.length === 0) return;
    const idx = nasheeds.findIndex((n) => n.id === currentTrack.id);
    const prevIdx = (idx - 1 + nasheeds.length) % nasheeds.length;
    handlePlayNasheed(nasheeds[prevIdx]);
  };

  const handleNextTrack = () => {
    if (!currentTrack || nasheeds.length === 0) return;
    const idx = nasheeds.findIndex((n) => n.id === currentTrack.id);
    const nextIdx = (idx + 1) % nasheeds.length;
    handlePlayNasheed(nasheeds[nextIdx]);
  };

  const handleSelectWord = async (wordText: string) => {
    setSelectedWordRaw(wordText);
    setIsWordModalOpen(true);

    const dictMap = await lookupDictionaryWords([wordText]);
    if (dictMap && dictMap[wordText]) {
      setSelectedWord(dictMap[wordText]);
    } else {
      setSelectedWord({
        id: wordText,
        arabic: wordText,
        normalized: wordText,
        partOfSpeech: 'مفردة عربية',
        meanings: ['معنى لغوي في سياق النشيد'],
        meaningsEn: ['contextual meaning'],
        root: 'ـ'
      });
    }
  };

  const handleSaveWord = async (wordText: string) => {
    const saved = await saveWordToLearn(wordText);
    if (saved) {
      setSavedWords([saved, ...savedWords]);
    } else {
      const localEntry: SavedWord = {
        id: `saved-${Date.now()}`,
        word: selectedWord || {
          id: wordText,
          arabic: wordText,
          normalized: wordText,
          partOfSpeech: 'كلمة',
          meanings: ['مفردة محفوظة'],
          root: 'ـ'
        },
        masteryLevel: 1,
        savedAt: new Date().toISOString()
      };
      setSavedWords([localEntry, ...savedWords]);
    }
  };

  const isCurrentWordSaved = savedWords.some(
    (w) => w.word.arabic === (selectedWord?.arabic || selectedWordRaw)
  );

  return (
    <div className="app-layout">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        theme={theme}
        onSelectTab={setCurrentTab}
        onToggleTheme={toggleTheme}
      />

      {/* Content Area */}
      <main className="content-area">
        <div key={currentTab} className="tab-view-wrapper">
          {currentTab === 'home' && (
            <HomeView
              nasheeds={nasheeds}
              savedWordCount={savedWords.length}
              onPlayNasheed={handlePlayNasheed}
              onOpenDetails={(n) => {
                handlePlayNasheed(n);
                setIsLyricsOpen(true);
              }}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'library' && (
            <LibraryView
              nasheeds={nasheeds}
              onPlayNasheed={handlePlayNasheed}
              onOpenDetails={(n) => {
                handlePlayNasheed(n);
                setIsLyricsOpen(true);
              }}
            />
          )}

          {currentTab === 'playlists' && (
            <MaintenanceView
              sectionName="Playlists"
              onNavigateHome={() => setCurrentTab('home')}
              onNavigateLibrary={() => setCurrentTab('library')}
            />
          )}

          {currentTab === 'studio' && (
            <MaintenanceView
              sectionName="Studio"
              onNavigateHome={() => setCurrentTab('home')}
              onNavigateLibrary={() => setCurrentTab('library')}
            />
          )}

          {currentTab === 'cards' && (
            <CardsView savedWords={savedWords} />
          )}

          {currentTab === 'account' && (
            <AccountView onBack={() => setCurrentTab('home')} />
          )}
        </div>
      </main>

      {/* Persistent Bottom Player Bar */}
      <BottomPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        showSubtitles={showSubtitles}
        onTogglePlay={handleTogglePlay}
        onSeek={handleSeek}
        onPrev={handlePrevTrack}
        onNext={handleNextTrack}
        onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
        onOpenFullLyrics={() => setIsLyricsOpen(true)}
      />

      {/* Synced Lyrics Fullscreen Modal */}
      {isLyricsOpen && currentTrack && (
        <SyncedLyricsModal
          nasheed={currentTrack}
          lyrics={currentLyrics}
          currentTimeMs={currentTime * 1000}
          durationMs={duration * 1000}
          isPlaying={isPlaying}
          showSubtitles={showSubtitles}
          selectedWord={selectedWord}
          selectedWordRaw={selectedWordRaw}
          isWordModalOpen={isWordModalOpen}
          isWordSaved={isCurrentWordSaved}
          onClose={() => {
            setIsLyricsOpen(false);
            setIsWordModalOpen(false);
          }}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onPrev={handlePrevTrack}
          onNext={handleNextTrack}
          onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
          onSelectWord={handleSelectWord}
          onSaveWord={handleSaveWord}
          onCloseWordCard={() => setIsWordModalOpen(false)}
        />
      )}

      {/* Standalone Word Popup Modal (when not in full lyrics view) */}
      {!isLyricsOpen && isWordModalOpen && (
        <WordModal
          word={selectedWord}
          rawWordText={selectedWordRaw}
          isSaved={isCurrentWordSaved}
          onClose={() => setIsWordModalOpen(false)}
          onSaveWord={handleSaveWord}
        />
      )}
    </div>
  );
};
