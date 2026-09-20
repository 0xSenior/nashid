import React from 'react';
import { ListMusic, Play } from 'lucide-react';
import { Playlist, NasheedSummary } from '@nashid/types';

interface PlaylistsViewProps {
  playlists: Playlist[];
  onPlayNasheed: (n: NasheedSummary) => void;
}

export const PlaylistsView: React.FC<PlaylistsViewProps> = ({ playlists }) => {
  return (
    <div style={{ padding: '24px 32px 48px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          قوائم التشغيل
        </h1>
        <p style={{ color: 'var(--text-subtitle)', fontSize: '14px' }}>
          قوائم مختارة من الأناشيد المرتبة حسب الموضوع والمستوى اللغوي.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {playlists.map((pl) => (
          <div
            key={pl.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            className="nasheed-card"
          >
            <div className="cover-wrapper" style={{ marginBottom: '16px' }}>
              <img src={pl.coverUrl || 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600'} alt={pl.title} />
              <button className="card-play-btn" title="تشغيل القائمة">
                <Play size={20} fill="#000" color="#000" style={{ transform: 'translateX(-1px)' }} />
              </button>
            </div>

            <div style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              {pl.title}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-subtitle)' }}>
              {pl.itemCount} أناشيد · قائمة عامة
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
