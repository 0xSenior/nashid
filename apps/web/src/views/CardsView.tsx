import React, { useState } from 'react';
import { BookOpen, RotateCw, CheckCircle2, Volume2 } from 'lucide-react';
import { SavedWord } from '@nashid/types';

interface CardsViewProps {
  savedWords: SavedWord[];
}

export const CardsView: React.FC<CardsViewProps> = ({ savedWords }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '24px 32px 48px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          بطاقات المفردات والتعلّم
        </h1>
        <p style={{ color: 'var(--text-subtitle)', fontSize: '14px' }}>
          اضغط على أي بطاقة لعرض المعنى والجذر اللغوي وطريقة الاستخدام.
        </p>
      </div>

      {savedWords.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '60px 20px',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <BookOpen size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
            لا توجد كلمات محفوظة حتى الآن
          </div>
          <div style={{ fontSize: '14px' }}>
            أثناء استماعك للنشيد، اضغط على أي كلمة في الكلمات المتزامنة لحفظها في هذه القائمة.
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {savedWords.map((item, idx) => {
            const isFlipped = flippedIndex === idx;
            const word = item.word;

            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(idx)}
                style={{
                  background: isFlipped ? '#1c1c1c' : 'var(--bg-card)',
                  border: isFlipped ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '24px',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  boxShadow: isFlipped ? '0 10px 30px rgba(255,187,0,0.1)' : 'none',
                }}
              >
                {/* Header of Card */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      background: 'rgba(255,187,0,0.12)',
                      color: 'var(--accent-primary)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    مستوى الإتقان: {item.masteryLevel}/3
                  </span>

                  <button
                    className="btn-icon"
                    onClick={(e) => handleSpeak(word.arabic, e)}
                    title="نطق"
                    style={{ background: '#252525', width: '32px', height: '32px', borderRadius: '50%' }}
                  >
                    <Volume2 size={16} color="var(--accent-primary)" />
                  </button>
                </div>

                {/* Content */}
                {!isFlipped ? (
                  <div style={{ textAlign: 'center', margin: '24px 0' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-arabic)',
                        fontSize: '36px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '8px',
                      }}
                    >
                      {word.arabic}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      انقر للكشف عن المعنى والجذر
                    </div>
                  </div>
                ) : (
                  <div style={{ margin: '16px 0' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>الجذر:</span>
                      <span style={{ color: '#fff' }}>{word.root || 'ـ'}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', fontSize: '13px' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>المعنى:</span>
                      <span style={{ color: '#fff' }}>{word.meanings.join('، ')}</span>
                    </div>

                    {word.example && (
                      <div style={{ fontSize: '12px', color: 'var(--text-subtitle)', fontStyle: 'italic' }}>
                        "{word.example}"
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>{isFlipped ? 'انقر للعودة' : 'بطاقة تفاعلية'}</span>
                  <RotateCw size={14} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
