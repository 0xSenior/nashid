import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Play, Heart, Bookmark, User } from 'lucide-react';
import { NasheedSummary } from '@nashid/types';

interface LibraryViewProps {
  nasheeds: NasheedSummary[];
  onPlayNasheed: (n: NasheedSummary) => void;
  onOpenDetails: (n: NasheedSummary) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  nasheeds,
  onPlayNasheed,
  onOpenDetails,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const filtered = nasheeds.filter((n) => {
    const matchesQuery = query === '' ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.artistName.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === 'all' || n.difficulty === activeFilter;
    return matchesQuery && matchesFilter;
  });

  const formatDuration = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="library-container">
      {/* Top Search & Filter Bar */}
      <div className="library-top-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon-left" />
          <input
            type="text"
            placeholder="Search nasheeds, artists, tags"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="library-actions-right">
          <button
            className="library-filter-btn"
            onClick={() => setShowFiltersModal(!showFiltersModal)}
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>

          <button
            className="library-filter-btn"
            onClick={() => {
              // Toggle sorting
              nasheeds.reverse();
            }}
          >
            <ArrowUpDown size={14} />
            <span>Sort by</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar (if opened) */}
      {showFiltersModal && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['all', 'beginner', 'intermediate', 'advanced'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                height: '32px',
                padding: '0 14px',
                borderRadius: '8px',
                background: activeFilter === f ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: activeFilter === f ? '#000' : 'var(--text-subtitle)',
                fontWeight: 700,
                border: '1px solid var(--border-subtle)',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* 6-Column Responsive Grid */}
      <div className="library-grid">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="library-track-card"
            onClick={() => onOpenDetails(n)}
          >
            <div className="card-cover-container">
              <img src={n.coverUrl} alt={n.title} loading="lazy" />
              <button
                className="card-play-bubble"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayNasheed(n);
                }}
                title="Play track"
              >
                <Play size={16} fill="#000" color="#000" style={{ transform: 'translateX(1px)' }} />
              </button>
            </div>

            <div className="track-title" title={n.title}>{n.title}</div>
            <div className="track-artist">{n.artistName}</div>

            <div className="track-stats">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>▶ {n.playCount || 100}</span>
                <span>⚑ {n.savedCount || 2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={11} />
                <span>{n.likeCount || 0}</span>
              </div>
            </div>

            <div className="track-creator">
              <User size={10} style={{ display: 'inline', marginRight: '4px' }} />
              <span>by {n.createdBy?.displayName || 'NUSHUD'}</span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {formatDuration(n.durationMs)} · {n.difficulty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
