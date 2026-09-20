import React, { useState } from 'react';
import { Play, Mic, MessageCircle, ArrowRight, Library, BookOpen, Clock, Sparkles, ChevronRight, Music2, User } from 'lucide-react';
import { NasheedSummary } from '@nashid/types';

interface HomeViewProps {
  nasheeds: NasheedSummary[];
  savedWordCount: number;
  onPlayNasheed: (n: NasheedSummary) => void;
  onOpenDetails: (n: NasheedSummary) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  nasheeds,
  savedWordCount,
  onPlayNasheed,
  onOpenDetails,
  onNavigateTab,
}) => {
  const [activeBanner, setActiveBanner] = useState<number>(1); // 1 = Discord banner as in screenshot

  const heroTrack =
    nasheeds.find(n => n.id === 'dhahiktu-faqalu' || n.title.toLowerCase().includes('dhahiktu')) ||
    nasheeds[0];

  const formatDuration = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="home-container">
      {/* 1. Banner Carousel at top */}
      {activeBanner === 0 ? (
        <div
          className="promo-banner yellow"
          onClick={() => onNavigateTab('studio')}
        >
          <div className="banner-left">
            <div className="banner-icon-box">
              <Mic size={18} color="#000" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>NASHID Studio</div>
              <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>
                Publish your own nasheeds and share them with the community
              </div>
            </div>
          </div>
          <div className="banner-arrow-btn">
            <ArrowRight size={15} />
          </div>
        </div>
      ) : (
        <div
          className="promo-banner indigo"
          onClick={() => alert('Discord Community')}
        >
          <div className="banner-left">
            <div className="banner-icon-box">
              <MessageCircle size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>Join our Discord</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>
                Chat with the community and get updates first
              </div>
            </div>
          </div>
          <div className="banner-arrow-btn">
            <ArrowRight size={15} />
          </div>
        </div>
      )}

      {/* Dots */}
      <div className="banner-dots">
        <div
          className={`dot ${activeBanner === 0 ? 'active' : ''}`}
          onClick={() => setActiveBanner(0)}
        />
        <div
          className={`dot ${activeBanner === 1 ? 'active' : ''}`}
          onClick={() => setActiveBanner(1)}
        />
      </div>

      {/* 2. Last Played Hero Card */}
      {heroTrack && (
        <div className="last-played-hero">
          <img
            className="hero-cover"
            src={heroTrack.coverUrl}
            alt={heroTrack.title}
          />
          <div className="hero-info">
            <div className="hero-tag">
              <Music2 size={12} />
              <span>Last played</span>
            </div>
            <div className="hero-title">{heroTrack.title}</div>
            <div className="hero-meta">
              {formatDuration(heroTrack.durationMs)} · {heroTrack.totalWords || 44} Words · {heroTrack.difficulty || 'Intermediate'}
            </div>
            <button
              className="btn-play-hero"
              onClick={() => onPlayNasheed(heroTrack)}
            >
              <Play size={12} fill="#000" color="#000" />
              <span>Play</span>
            </button>
          </div>

          <div className="hero-artist-right">
            {heroTrack.artistName}
          </div>
        </div>
      )}

      {/* 3. Action Buttons 2-column */}
      <div className="action-grid">
        <button className="action-btn" onClick={() => onNavigateTab('library')}>
          <Library size={16} color="var(--accent-primary)" />
          <span>Browse library</span>
        </button>
        <button className="action-btn" onClick={() => onNavigateTab('cards')}>
          <BookOpen size={16} color="var(--accent-primary)" />
          <span>Review cards</span>
        </button>
      </div>

      {/* 4. Vocabulary Progress Card */}
      <div className="vocab-progress-card" onClick={() => onNavigateTab('cards')}>
        <div className="vocab-left">
          <div className="vocab-icon-box">
            <BookOpen size={16} color="var(--accent-primary)" />
          </div>
          <div>
            <div className="vocab-title">
              Vocabulary progress
            </div>
            <div className="vocab-subtitle">
              {savedWordCount} words saved · 0/10 free
            </div>
          </div>
        </div>
        <ChevronRight size={16} color="var(--text-muted)" />
      </div>

      {/* 5. Recently Played Section */}
      <div className="section-header">
        <Clock size={15} color="var(--accent-primary)" />
        <span>Recently played</span>
      </div>
      <div className="horizontal-scroll-row">
        {nasheeds.slice(0, 10).map((n) => (
          <div
            key={n.id}
            className="horizontal-card"
            onClick={() => onOpenDetails(n)}
          >
            <img className="horizontal-card-cover" src={n.coverUrl} alt={n.title} loading="lazy" />
            <div className="horizontal-card-title">{n.title}</div>
            <div className="horizontal-card-subtitle">{n.artistName}</div>
            <div className="horizontal-card-creator">
              <User size={9} />
              <span>by {n.createdBy?.displayName || 'beyond'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Recommended for you Section */}
      <div className="section-header">
        <Sparkles size={15} color="var(--accent-primary)" />
        <span>Recommended for you</span>
      </div>
      <div className="horizontal-scroll-row">
        {nasheeds.slice(10, 20).map((n) => (
          <div
            key={n.id}
            className="horizontal-card"
            onClick={() => onOpenDetails(n)}
          >
            <img className="horizontal-card-cover" src={n.coverUrl} alt={n.title} loading="lazy" />
            <div className="horizontal-card-title">{n.title}</div>
            <div className="horizontal-card-subtitle">{n.artistName}</div>
            <div className="horizontal-card-creator">
              <User size={9} />
              <span>by {n.createdBy?.displayName || 'beyond'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
