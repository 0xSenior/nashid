import React from 'react';
import { Home, Library, ListMusic, Layers, Mic, ExternalLink, Sun, Moon, User, Smartphone, Download } from 'lucide-react';
import { NashidLogo } from './NashidLogo.js';

interface SidebarProps {
  currentTab: string;
  theme: 'dark' | 'light';
  onSelectTab: (tab: string) => void;
  onToggleTheme: () => void;
  onOpenDownloadModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  theme,
  onSelectTab,
  onToggleTheme,
  onOpenDownloadModal,
}) => {
  const menu = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'cards', label: 'Cards', icon: Layers },
  ];

  return (
    <aside className="nushud-sidebar">
      <div>
        {/* Brand Header */}
        <div className="sidebar-brand" onClick={() => onSelectTab('home')}>
          <div className="brand-logo-wrap">
            <NashidLogo size={22} />
          </div>
          <div className="brand-name-group">
            <span className="brand-name-en">NASHID</span>
            <span className="brand-badge-ar">نَشِيد</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <div
                key={item.id}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(item.id)}
              >
                <div className="menu-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}

          {/* Studio with maintenance view */}
          <div
            className={`menu-item ${currentTab === 'studio' ? 'active' : ''}`}
            onClick={() => onSelectTab('studio')}
          >
            <div className="menu-item-left">
              <Mic size={18} />
              <span>Studio</span>
            </div>
            <ExternalLink size={14} color="var(--text-muted)" />
          </div>
        </nav>
      </div>

      {/* Footer / App Promo, Theme & Account */}
      <div className="sidebar-bottom-section">
        {/* Mobile App Promo Card */}
        <div className="sidebar-app-promo" onClick={onOpenDownloadModal}>
          <div className="sidebar-app-promo-header">
            <div className="sidebar-app-icon-wrap">
              <Smartphone size={16} color="var(--accent-primary)" />
            </div>
            <span className="sidebar-app-tag">APK · Android</span>
          </div>
          <div className="sidebar-app-title">تطبيق نشيد للهاتف</div>
          <div className="sidebar-app-sub">129 أنشودة وتصميم زجاجي فاخر</div>
          <a
            href="/nashid.apk"
            download="nashid.apk"
            className="sidebar-app-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={13} />
            <span>تحميل مباشر</span>
          </a>
        </div>

        <div className="sidebar-footer">
          <div className="menu-item" onClick={onToggleTheme}>
            <div className="menu-item-left">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
            </div>
          </div>

          <div
            className={`menu-item ${currentTab === 'account' ? 'active' : ''}`}
            onClick={() => onSelectTab('account')}
          >
            <div className="menu-item-left">
              <User size={18} />
              <span>Account</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
