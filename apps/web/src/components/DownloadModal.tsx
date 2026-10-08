import React, { useState } from 'react';
import { X, Download, Smartphone, Sparkles, CheckCircle2, QrCode, ShieldCheck, Music2, BookOpen } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const apkUrl = '/nashid.apk';

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + apkUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="download-modal-backdrop" onClick={onClose}>
      <div className="download-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="download-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="download-modal-header">
          <div className="download-app-icon-wrap">
            <img src="/logo.png" alt="NASHID Logo" className="download-app-icon" />
            <div className="download-app-glow" />
          </div>
          <div className="download-modal-title-group">
            <div className="download-badge">
              <Sparkles size={13} color="var(--accent-primary)" />
              <span>إصدار أندرويد الرسمي · Android Release</span>
            </div>
            <h2 className="download-modal-title">تطبيق نشيد للهاتف المحمول</h2>
            <p className="download-modal-subtitle">
              استمع إلى أناشيدك في الهاتف بشكل أسرع مع مزامنة الكلمات الحية ومؤقت النوم الذكي
            </p>
          </div>
        </div>

        {/* Specs Badges */}
        <div className="download-specs-row">
          <div className="download-spec-pill">
            <span className="spec-label">الحجم</span>
            <span className="spec-value">53.5 MB</span>
          </div>
          <div className="download-spec-pill">
            <span className="spec-label">الإصدار</span>
            <span className="spec-value">v1.0.0 Gold</span>
          </div>
          <div className="download-spec-pill">
            <span className="spec-label">النظام</span>
            <span className="spec-value">Android 8.0+</span>
          </div>
          <div className="download-spec-pill">
            <span className="spec-label">الإعلانات</span>
            <span className="spec-value highlight">مجاني 100%</span>
          </div>
        </div>

        {/* Primary Download CTA */}
        <div className="download-cta-box">
          <a
            href={apkUrl}
            download="nashid.apk"
            className="btn-download-main"
          >
            <Download size={20} />
            <div className="btn-download-text">
              <span className="btn-main-label">تحميل التطبيق مباشرة (APK)</span>
              <span className="btn-sub-label">Direct Download · 53.5 MB</span>
            </div>
          </a>

          <button className="btn-copy-link" onClick={handleCopyLink}>
            {copied ? (
              <>
                <CheckCircle2 size={16} color="var(--accent-primary)" />
                <span>تم نسخ الرابط!</span>
              </>
            ) : (
              <>
                <QrCode size={16} />
                <span>نسخ رابط التحميل</span>
              </>
            )}
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="download-features-grid">
          <div className="feature-item">
            <div className="feature-icon-box">
              <Music2 size={16} color="var(--accent-primary)" />
            </div>
            <div>
              <div className="feature-title">129 نشيداً بالصوت والكلمات</div>
              <div className="feature-desc">تزامن حي دقيق لكل كلمة مع مؤقت نوم ذكي</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <BookOpen size={16} color="var(--accent-primary)" />
            </div>
            <div>
              <div className="feature-title">قاموس وبطاقات تعلم الفصحى</div>
              <div className="feature-desc">شرح معاني المفردات وجذورها مع بطاقات المراجعة</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Sparkles size={16} color="var(--accent-primary)" />
            </div>
            <div>
              <div className="feature-title">واجهة ليلية مريحة وسريعة</div>
              <div className="feature-desc">تجربة استماع انسيابية وهادئة ومريحة للعين</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <ShieldCheck size={16} color="var(--accent-primary)" />
            </div>
            <div>
              <div className="feature-title">آمن وخفيف على الهاتف</div>
              <div className="feature-desc">لا يتطلب صلاحيات معقدة ولا يعرض أي إعلانات</div>
            </div>
          </div>
        </div>

        {/* Installation Steps */}
        <div className="install-steps-box">
          <div className="steps-title">طريقة التثبيت السريعة:</div>
          <ol className="steps-list">
            <li>اضغط على زر <strong>«تحميل التطبيق»</strong> لتنزيل ملف <code>nashid.apk</code>.</li>
            <li>افتح الملف بعد اكتمال التحميل واضغط <strong>«تثبيت»</strong> (Install).</li>
            <li>في حال ظهور تنبيه الحماية، اختر <em>«السماح من هذا المصدر»</em> ثم تابع التثبيت.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
