import React, { useState } from 'react';
import { User, ChevronLeft, UserPlus, Settings } from 'lucide-react';

interface AccountViewProps {
  onBack: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ onBack }) => {
  const [lang, setLang] = useState<'en' | 'ar' | 'ru'>('en');

  return (
    <div className="account-container">
      {/* Header with back button */}
      <div className="account-header">
        <button
          className="btn-icon"
          onClick={onBack}
          style={{ width: '40px', height: '40px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '50%' }}
        >
          <ChevronLeft size={20} color="var(--text-main)" />
        </button>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>Account</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sign in to save progress</div>
        </div>
        <div
          style={{
            width: '40px',
            height: '40px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-subtitle)'
          }}
        >
          <User size={18} />
        </div>
      </div>

      {/* Main Sign in Card */}
      <div className="account-card">
        <div className="account-avatar">
          <User size={32} color="#000" />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
          Sign in to NASHID
        </h2>

        <p style={{ fontSize: '13px', color: 'var(--text-subtitle)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 20px auto' }}>
          Save listening progress, keep your cards, upload a profile photo, and request nasheeds.
        </p>

        <button
          className="btn-primary-auth"
          onClick={() => alert('Sign in functionality')}
        >
          Sign in
        </button>

        <button
          className="btn-secondary-auth"
          onClick={() => alert('Create account functionality')}
        >
          <UserPlus size={16} />
          <span>Create account</span>
        </button>

        <div style={{ marginTop: '16px' }}>
          <a
            href="#"
            style={{ fontSize: '13px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}
            onClick={(e) => { e.preventDefault(); alert('Reset password link sent'); }}
          >
            Forgot password?
          </a>
        </div>
      </div>

      {/* Settings Card */}
      <div className="account-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '15px', fontWeight: 700 }}>
          <Settings size={18} color="var(--accent-primary)" />
          <span>Settings</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-subtitle)', fontWeight: 600 }}>
            Language
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'en', label: 'English' },
              { id: 'ar', label: 'العربية' },
              { id: 'ru', label: 'Русский' }
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id as any)}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  background: lang === l.id ? 'var(--accent-primary)' : 'var(--bg-canvas)',
                  color: lang === l.id ? '#000' : 'var(--text-subtitle)',
                  fontWeight: lang === l.id ? 700 : 500,
                  border: lang === l.id ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <span>TikTok</span>
        <span>·</span>
        <span>Instagram</span>
        <span>·</span>
        <span>Telegram</span>
        <span>·</span>
        <span>Terms</span>
        <span>·</span>
        <span>Privacy</span>
        <span>·</span>
        <span>Contact</span>
        <span>·</span>
        <span>Learn Arabic by listening</span>
        <span>·</span>
        <span>v0.1.1</span>
      </div>
    </div>
  );
};
