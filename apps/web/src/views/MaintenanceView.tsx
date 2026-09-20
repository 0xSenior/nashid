import React from 'react';
import { Wrench, Sparkles, ChevronLeft, ArrowRight, Home, Library, ShieldAlert } from 'lucide-react';

interface MaintenanceViewProps {
  sectionName: 'Playlists' | 'Studio';
  onNavigateHome: () => void;
  onNavigateLibrary: () => void;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({
  sectionName,
  onNavigateHome,
  onNavigateLibrary,
}) => {
  const isPlaylists = sectionName === 'Playlists';

  return (
    <div className="maintenance-container">
      {/* Top Header with Back Button */}
      <div className="maintenance-top-nav">
        <button className="btn-back-round" onClick={onNavigateHome} title="العودة">
          <ChevronLeft size={20} />
        </button>
        <span className="maintenance-top-title">
          {isPlaylists ? 'قوائم التشغيل · Playlists' : 'استوديو نشيد · NASHID Studio'}
        </span>
        <div style={{ width: '40px' }} />
      </div>

      {/* Main Maintenance Card */}
      <div className="maintenance-card">
        {/* Glow & Badge */}
        <div className="maintenance-badge">
          <Wrench size={14} />
          <span>قيد الصيانة والتطوير · Under Development</span>
        </div>

        {/* Animated Icon Container */}
        <div className="maintenance-icon-halo">
          <div className="icon-pulse-glow" />
          <div className="maintenance-icon-box">
            <Sparkles size={36} color="var(--accent-primary)" />
          </div>
        </div>

        {/* Headings */}
        <h2 className="maintenance-heading">
          {isPlaylists
            ? 'قسم قوائم التشغيل غير متاح حالياً'
            : 'استوديو صانعي المحتوى قيد التجهيز'}
        </h2>
        <div className="maintenance-heading-en">
          {isPlaylists
            ? 'Playlists Feature is Currently Under Maintenance'
            : 'NASHID Studio is Coming Soon'}
        </div>

        {/* Description */}
        <p className="maintenance-desc">
          {isPlaylists
            ? 'نعمل حالياً على تحديث البنية التحتية لإتاحة إنشاء وتنظيم قوائم التشغيل السحابية ومزامنتها بين أجهزتك بدقة فائقة. شكراً لصبركم.'
            : 'نظام رفع الأناشيد وإدارة الكلمات المتزامنة وتدقيق النصوص قيد المراجعة النهائية لإطلاق بيئة إبداعية تليق بالمحتوى الهادف.'}
        </p>

        {/* Progress Pill */}
        <div className="maintenance-progress-bar">
          <div className="progress-fill" />
        </div>
        <div className="progress-label">نسبة الإنجاز 85% · التحديث القادم</div>

        {/* Actions */}
        <div className="maintenance-actions">
          <button className="btn-primary-action" onClick={onNavigateHome}>
            <Home size={16} />
            <span>العودة للرئيسية (Home)</span>
          </button>
          <button className="btn-secondary-action" onClick={onNavigateLibrary}>
            <Library size={16} />
            <span>تصفح مكتبة الأناشيد (Library)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
