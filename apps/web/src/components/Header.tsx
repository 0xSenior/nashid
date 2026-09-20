import React from 'react';
import { Search, Sparkles, UserCircle } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="top-header">
      <div className="search-box">
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="ابحث عن نشيد، منشد، أو كلمة..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="pro-badge">
          <Sparkles size={14} />
          <span>PRO</span>
        </div>
        <div style={{ cursor: 'pointer', color: 'var(--text-subtitle)' }}>
          <UserCircle size={28} />
        </div>
      </div>
    </header>
  );
};
