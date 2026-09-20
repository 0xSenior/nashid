import React from 'react';
import { X, BookmarkPlus, Check, Volume2 } from 'lucide-react';
import { DictionaryWord } from '@nashid/types';

interface WordModalProps {
  word: DictionaryWord | null;
  rawWordText: string;
  isSaved: boolean;
  onClose: () => void;
  onSaveWord: (wordText: string) => void;
}

export const WordModal: React.FC<WordModalProps> = ({
  word,
  rawWordText,
  isSaved,
  onClose,
  onSaveWord,
}) => {
  if (!word && !rawWordText) return null;

  return (
    <div className="word-modal-backdrop" onClick={onClose}>
      <div className="word-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="word-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="modal-word-arabic">{word ? word.arabic : rawWordText}</span>
            <button
              className="btn-icon"
              style={{ background: '#222', borderRadius: '50%', width: '36px', height: '36px' }}
              title="نطق الكلمة"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(word?.arabic || rawWordText);
                utterance.lang = 'ar-SA';
                window.speechSynthesis.speak(utterance);
              }}
            >
              <Volume2 size={18} color="var(--accent-primary)" />
            </button>
          </div>

          <button
            className="btn-icon"
            onClick={onClose}
            style={{ background: '#222', borderRadius: '50%', width: '36px', height: '36px' }}
          >
            <X size={18} color="#fff" />
          </button>
        </div>

        {/* Word Info Grid */}
        <div className="word-details-grid">
          <div className="word-detail-box">
            <div className="word-detail-label">الجذر اللغوي</div>
            <div className="word-detail-value" style={{ color: 'var(--accent-primary)' }}>
              {word?.root || 'غير محدد'}
            </div>
          </div>

          <div className="word-detail-box">
            <div className="word-detail-label">النوع والصرف</div>
            <div className="word-detail-value">{word?.partOfSpeech || 'مفردة عربية'}</div>
          </div>

          {word?.wazn && (
            <div className="word-detail-box">
              <div className="word-detail-label">الوزن الصرفي</div>
              <div className="word-detail-value">{word.wazn}</div>
            </div>
          )}

          {word?.singular && (
            <div className="word-detail-box">
              <div className="word-detail-label">المفرد</div>
              <div className="word-detail-value">{word.singular}</div>
            </div>
          )}
        </div>

        {/* Meanings */}
        <div className="word-meanings-list">
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
            المعاني والشرح:
          </div>
          <ul>
            {word?.meanings?.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
            {word?.meaningsEn?.map((en, idx) => (
              <li key={`en-${idx}`} style={{ direction: 'ltr', textAlign: 'right', color: 'var(--text-muted)' }}>
                {en}
              </li>
            ))}
          </ul>
        </div>

        {word?.example && (
          <div style={{ fontSize: '13px', color: 'var(--text-subtitle)', marginBottom: '20px', padding: '0 8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>مثال: </span>
            <span style={{ fontStyle: 'italic' }}>"{word.example}"</span>
          </div>
        )}

        <button
          className="btn-save-word"
          onClick={() => onSaveWord(word?.arabic || rawWordText)}
          style={{
            background: isSaved ? 'var(--color-success)' : 'var(--accent-primary)',
            color: '#000',
          }}
        >
          {isSaved ? (
            <>
              <Check size={18} />
              <span>تم الحفظ في قائمة التعلّم</span>
            </>
          ) : (
            <>
              <BookmarkPlus size={18} />
              <span>حفظ الكلمة في بطاقات التعلّم</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
