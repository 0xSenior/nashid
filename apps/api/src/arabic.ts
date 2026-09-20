/**
 * Arabic NLP and Tashkeel normalization utilities
 */

// Regex for Arabic diacritics / Tashkeel: Fatha, Damma, Kasra, Sukun, Shadda, Tanween, etc.
const TASHKEEL_REGEX = /[\u064B-\u065F\u0670]/g;

export function stripTashkeel(text: string): string {
  if (!text) return '';
  return text.replace(TASHKEEL_REGEX, '');
}

export function normalizeArabic(text: string): string {
  if (!text) return '';
  let res = stripTashkeel(text);
  // Normalize Alef variants (أ, إ, آ, ٱ -> ا)
  res = res.replace(/[إأآٱ]/g, 'ا');
  // Normalize Yeh (ي -> ى / ي)
  res = res.replace(/ى/g, 'ي');
  // Normalize Teh Marbuta (ة -> ه)
  res = res.replace(/ة/g, 'ه');
  // Remove Tatweel (ـ)
  res = res.replace(/\u0640/g, '');
  // Remove punctuation and cleanup whitespace
  res = res.replace(/[.,/#!$%^&*;:{}=\-_`~()؟،]/g, '');
  return res.trim().toLowerCase();
}

export function tokenizeWords(text: string): string[] {
  if (!text) return [];
  // Split on whitespace and filter empty
  return text.split(/\s+/).filter(w => w.length > 0);
}
