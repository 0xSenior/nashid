import React from 'react';
import { Play, Heart, Bookmark } from 'lucide-react';
import { NasheedSummary } from '@nashid/types';

interface NasheedCardProps {
  nasheed: NasheedSummary;
  onPlay: (nasheed: NasheedSummary) => void;
  onOpenDetails: (nasheed: NasheedSummary) => void;
}

export const NasheedCard: React.FC<NasheedCardProps> = ({ nasheed, onPlay, onOpenDetails }) => {
  const formatDuration = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getDifficultyClass = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return diff;
    }
  };

  return (
    <div className="nasheed-card" onClick={() => onOpenDetails(nasheed)}>
      <div className="cover-wrapper">
        <img src={nasheed.coverUrl} alt={nasheed.title} loading="lazy" />
        <button
          className="card-play-btn"
          onClick={(e) => {
            e.stopPropagation();
            onPlay(nasheed);
          }}
          title="تشغيل"
        >
          <Play size={20} fill="#000" color="#000" style={{ transform: 'translateX(-1px)' }} />
        </button>
      </div>

      <div className="nasheed-title">{nasheed.title}</div>
      <div className="nasheed-artist">{nasheed.artistName}</div>

      <div className="nasheed-meta">
        <span className={`difficulty-pill ${getDifficultyClass(nasheed.difficulty)}`}>
          {getDifficultyLabel(nasheed.difficulty)}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{formatDuration(nasheed.durationMs)}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
            <Heart size={12} /> {nasheed.likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};
