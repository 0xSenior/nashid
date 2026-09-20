import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, RotateCcw, RotateCw, Subtitles, Maximize2, Heart } from 'lucide-react';
import { NasheedSummary } from '@nashid/types';

interface BottomPlayerProps {
  currentTrack: NasheedSummary | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  showSubtitles: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleSubtitles: () => void;
  onOpenFullLyrics: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  showSubtitles,
  onTogglePlay,
  onSeek,
  onPrev,
  onNext,
  onToggleSubtitles,
  onOpenFullLyrics,
}) => {
  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * duration);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bottom-player">
      {/* Left: Track Info */}
      <div className="player-left" onClick={onOpenFullLyrics} title="انقر لفتح الكلمات">
        <img className="player-cover" src={currentTrack.coverUrl} alt={currentTrack.title} />
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-subtitle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack.artistName}
          </div>
        </div>
      </div>

      {/* Center: Controls & Scrubber */}
      <div className="player-center">
        <div className="player-controls">
          <button className="btn-icon" onClick={onPrev} title="السابق">
            <SkipBack size={18} />
          </button>
          <button className="btn-icon" onClick={() => onSeek(Math.max(0, currentTime - 5))} title="ترجيع 5 ثواني">
            <RotateCcw size={16} />
          </button>
          <button className="btn-play-round" onClick={onTogglePlay} title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}>
            {isPlaying ? (
              <Pause size={20} fill="#000" color="#000" />
            ) : (
              <Play size={20} fill="#000" color="#000" style={{ transform: 'translateX(-1px)' }} />
            )}
          </button>
          <button className="btn-icon" onClick={() => onSeek(Math.min(duration, currentTime + 5))} title="تقديم 5 ثواني">
            <RotateCw size={16} />
          </button>
          <button className="btn-icon" onClick={onNext} title="التالي">
            <SkipForward size={18} />
          </button>
        </div>

        <div className="progress-bar-container">
          <span>{formatTime(currentTime)}</span>
          <div className="seek-bar" onClick={handleProgressBarClick}>
            <div className="seek-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Subtitles & Expand */}
      <div className="player-right">
        <button
          className={`btn-icon ${showSubtitles ? 'active' : ''}`}
          onClick={onToggleSubtitles}
          title="تبديل الترجمة الإنجليزية (CC)"
        >
          <Subtitles size={20} />
        </button>
        <button className="btn-icon" onClick={onOpenFullLyrics} title="عرض الكلمات المتزامنة">
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};
