import React, { useEffect, useRef, useState } from 'react';
import { X, Heart, MessageSquare, MoreHorizontal, Play, Pause, SkipBack, SkipForward, RotateCcw, RotateCw, Repeat, Bookmark, Check, ChevronRight } from 'lucide-react';
import { NasheedSummary, LyricsData, DictionaryWord } from '@nashid/types';

interface SyncedLyricsModalProps {
  nasheed: NasheedSummary;
  lyrics: LyricsData | null;
  currentTimeMs: number;
  durationMs: number;
  isPlaying: boolean;
  showSubtitles: boolean;
  selectedWord: DictionaryWord | null;
  selectedWordRaw: string;
  isWordModalOpen: boolean;
  isWordSaved: boolean;
  onClose: () => void;
  onTogglePlay: () => void;
  onSeek: (timeSec: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleSubtitles: () => void;
  onSelectWord: (word: string) => void;
  onSaveWord: (word: string) => void;
  onCloseWordCard: () => void;
}

export const SyncedLyricsModal: React.FC<SyncedLyricsModalProps> = ({
  nasheed,
  lyrics,
  currentTimeMs,
  durationMs,
  isPlaying,
  showSubtitles,
  selectedWord,
  selectedWordRaw,
  isWordModalOpen,
  isWordSaved,
  onClose,
  onTogglePlay,
  onSeek,
  onPrev,
  onNext,
  onToggleSubtitles,
  onSelectWord,
  onSaveWord,
  onCloseWordCard,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x' | '0.75x'>('1x');
  const [isLoop, setIsLoop] = useState<boolean>(false);

  // Auto-scroll active line to center
  useEffect(() => {
    if (activeLineRef.current && scrollRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTimeMs]);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const lines = lyrics?.lines || [];

  // Determine active line
  const activeLineIndex = lines.findIndex(
    (line) => currentTimeMs >= line.startMs && currentTimeMs <= line.endMs
  );

  const progressPercent = durationMs > 0 ? (currentTimeMs / durationMs) * 100 : 0;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek((ratio * durationMs) / 1000);
  };

  return (
    <div className="nushud-lyrics-overlay">
      {/* Subtle ambient lighting top-right */}
      <div className="ambient-glow" />

      {/* 1. Close Button top-left */}
      <button className="lyrics-close-btn" onClick={onClose} title="Close lyrics">
        <X size={20} />
      </button>

      {/* 2. Main 2-Column Content */}
      <div className="lyrics-main-container">
        {/* Left Column: Artwork & Info or Embedded Word Dictionary Card */}
        <div className="lyrics-left-col">
          {/* Album Artwork Card */}
          <div className={`lyrics-cover-wrapper ${isWordModalOpen ? 'compact' : ''}`}>
            <img
              className="lyrics-cover-img"
              src={nasheed.coverUrl}
              alt={nasheed.title}
            />
            <button
              className={`lyrics-cover-heart-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
              title="Like track"
            >
              <Heart size={18} fill={isLiked ? '#ffbb00' : 'none'} color={isLiked ? '#ffbb00' : '#fff'} />
            </button>
          </div>

          {/* Condition: Word Dictionary Card when word is clicked */}
          {isWordModalOpen ? (
            <div className="word-inline-card">
              {/* Card Header: Word, POS badge, Bookmark */}
              <div className="word-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="word-card-arabic">
                    {selectedWord?.arabic || selectedWordRaw}
                  </span>
                  <span className="word-pos-badge">
                    {selectedWord?.posBadge || 'VERB'}
                  </span>
                </div>

                <button
                  className="word-bookmark-btn"
                  onClick={() => onSaveWord(selectedWord?.arabic || selectedWordRaw)}
                  title={isWordSaved ? 'Saved to cards' : 'Save to flashcards'}
                >
                  <Bookmark
                    size={20}
                    fill={isWordSaved ? '#ffbb00' : 'none'}
                    color={isWordSaved ? '#ffbb00' : 'var(--text-subtitle)'}
                  />
                </button>
              </div>

              {/* Meaning Heading */}
              <div className="word-meaning-heading">
                {selectedWord?.meaningHeading || `• ${selectedWord?.meaningsEn?.[0] || 'to say'}`}
              </div>

              {/* Root Pill */}
              <div className="word-root-pill">
                <span className="word-root-label">ROOT</span>
                <span className="word-root-letters">
                  {selectedWord?.root ? selectedWord.root.split('').join(' ') : 'ق و ل'}
                </span>
              </div>

              {/* Examples Section */}
              <div className="word-examples-label">EXAMPLES</div>

              {/* Quran Example Box */}
              <div className="word-quran-box">
                <div className="word-quran-ayah">
                  {selectedWord?.quranExample?.ayah || 'إِذْ قَالَ لَهُۥ رَبُّهُۥٓ أَسْلِمْ ۖ قَالَ أَسْلَمْتُ لِرَبِّ ٱلْعَـٰلَمِينَ'}
                </div>
                <div className="word-quran-translation">
                  {selectedWord?.quranExample?.translation ||
                    'When his Lord said to him, "Submit", he said "I have submitted [in Islam] to the Lord of the worlds."'}
                </div>
                <div className="word-quran-surah">
                  {selectedWord?.quranExample?.surah || 'AL-BAQARA 2:131'}
                </div>
              </div>

              {/* See More Link / Close */}
              <div className="word-card-footer">
                <span className="word-see-more" onClick={onCloseWordCard}>
                  See more <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ) : (
            /* Normal Nasheed Info below Cover */
            <div className="lyrics-track-info">
              <h2 className="lyrics-track-title">{nasheed.title}</h2>
              <div className="lyrics-track-artist">{nasheed.artistName}</div>

              <div className="lyrics-track-publisher">
                <div className="publisher-avatar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span>by {nasheed.createdBy?.displayName || 'beyond'}</span>
              </div>

              <div className="lyrics-track-stats">
                <span>{nasheed.likeCount || 30} likes</span>
                <span>·</span>
                <span>{nasheed.playCount || 1121} plays</span>
                <span>·</span>
                <span>{nasheed.savedCount || 13} saves</span>
              </div>

              <div className="lyrics-action-pills">
                <button className="lyrics-pill-btn" onClick={() => alert('Options: Share, Add to playlist, Report')}>
                  <MoreHorizontal size={14} />
                  <span>More</span>
                </button>
                <button className="lyrics-pill-btn" onClick={() => alert('Comments view')}>
                  <MessageSquare size={13} />
                  <span>Comments</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Synced Lyrics Lines */}
        <div className={`lyrics-right-col ${isWordModalOpen ? 'word-active' : ''}`} ref={scrollRef}>
          {lines.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '18px', textAlign: 'center', marginTop: '80px' }}>
              Loading synced lyrics...
            </div>
          ) : (
            lines.map((line, idx) => {
              const isActive = idx === activeLineIndex;
              const words = line.ar.split(/\s+/).filter(Boolean);

              return (
                <div
                  key={idx}
                  ref={isActive ? activeLineRef : null}
                  className={`lyrics-row ${isActive ? 'active' : ''}`}
                  onClick={() => onSeek(line.startMs / 1000)}
                >
                  <div className="lyrics-arabic-line">
                    {words.map((w, wIdx) => {
                      const cleanWord = w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
                      const isSelected = selectedWordRaw === cleanWord;
                      return (
                        <span
                          key={wIdx}
                          className={`word-span ${isSelected ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectWord(cleanWord);
                          }}
                          title="Click to view meaning & root"
                        >
                          {w}
                        </span>
                      );
                    })}
                  </div>

                  {showSubtitles && line.en && (
                    <div className="lyrics-sub-en">{line.en}</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Bottom Controls & Audio Waveform Timeline */}
      <div className="lyrics-bottom-bar">
        {/* Timeline Bar with Waveform */}
        <div className="timeline-wrapper">
          <span className="time-label">{formatTime(currentTimeMs)}</span>

          <div className="waveform-timeline" onClick={handleTimelineClick}>
            {/* Waveform visual peaks */}
            <div className="waveform-bg">
              {Array.from({ length: 90 }).map((_, i) => {
                const height = Math.sin(i * 0.22) * 10 + 12 + ((i * 7) % 8);
                const isPassed = (i / 90) * 100 <= progressPercent;
                return (
                  <div
                    key={i}
                    className="wave-bar"
                    style={{
                      height: `${height}px`,
                      background: isPassed ? '#ffbb00' : 'rgba(255, 187, 0, 0.25)',
                    }}
                  />
                );
              })}
            </div>

            {/* Progress line with round knob thumb */}
            <div className="waveform-progress-line" style={{ width: `${progressPercent}%` }}>
              <div className="waveform-thumb-knob" />
            </div>
          </div>

          <span className="time-label">{formatTime(durationMs)}</span>
        </div>

        {/* Media Controls Rows */}
        <div className="controls-container">
          {/* Row 1: CC, Repeat, Speed */}
          <div className="controls-row-secondary">
            <button
              className={`btn-subtitles-badge ${showSubtitles ? 'active' : ''}`}
              onClick={onToggleSubtitles}
              title="Toggle Subtitles (CC)"
            >
              CC
            </button>

            <button
              className={`btn-control-icon ${isLoop ? 'active' : ''}`}
              onClick={() => setIsLoop(!isLoop)}
              title="Repeat"
            >
              <Repeat size={16} />
            </button>

            <button
              className="btn-speed-badge"
              onClick={() => {
                const speeds: ('1x' | '1.25x' | '1.5x' | '0.75x')[] = ['1x', '1.25x', '1.5x', '0.75x'];
                const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                setPlaybackSpeed(speeds[nextIdx]);
              }}
              title="Playback speed"
            >
              {playbackSpeed}
            </button>
          </div>

          {/* Row 2: Prev, Rewind 5s, Play/Pause, Forward 5s, Next */}
          <div className="controls-row-primary">
            <button className="btn-control-icon" onClick={onPrev} title="Previous">
              <SkipBack size={18} />
            </button>

            <button
              className="btn-control-icon"
              onClick={() => onSeek(Math.max(0, (currentTimeMs - 5000) / 1000))}
              title="Rewind 5s"
            >
              <RotateCcw size={18} />
            </button>

            <button className="btn-round-play" onClick={onTogglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <Pause size={22} fill="#000" color="#000" />
              ) : (
                <Play size={22} fill="#000" color="#000" style={{ transform: 'translateX(1px)' }} />
              )}
            </button>

            <button
              className="btn-control-icon"
              onClick={() => onSeek(Math.min(durationMs / 1000, (currentTimeMs + 5000) / 1000))}
              title="Forward 5s"
            >
              <RotateCw size={18} />
            </button>

            <button className="btn-control-icon" onClick={onNext} title="Next">
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
