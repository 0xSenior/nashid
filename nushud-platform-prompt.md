# NUSHUD-Like Platform: Master Prompt + Tech Plan

> منصة أناشيد مشابهة لـ https://nushud.com
> الملف يحتوي: (1) نتائج الفحص الأولي، (2) البرومبت الرئيسي للـ AI، (3) التقنيات، (4) خطة فحص الـ Endpoints، (5) خطة الـ Data Gathering، (6) هيكل المشروع، (7) خارطة الطريق.

---

## 0. ملاحظة مهمة (حقوق الملكية)

الأناشيد (الملفات الصوتية) والكلمات والصور وأغلفة الألبومات محمية بحقوق النشر لأصحابها (المنشدين/الشركات/الملحنين). لذلك:

- **التصميم والـ UX والبنية التقنية**: يمكن دراستها وبناء منصة مشابهة لها (Look & Feel + نفس الفكرة والمميزات).
- **المحتوى (صوت/صور/كلمات/ترجمات)**: لا يُنسخ حرفياً من موقع NUSHUD. المحتوى يُجمع من **مصادر مرخّصة أو بإذن**: اتفاقيات مع المنشدين، أناشيد بدون موسيقى مرخّصة، Creative Commons، Internet Archive (المسموح منها)، أو محتوى تنتجه أنت.
- الشعار والاسم والنصوص التسويقية الخاصة بـ NUSHUD: استبدلها باسمك وهويتك الخاصة.
- قبل أي جمع بيانات: راجع `robots.txt` وشروط الاستخدام لأي موقع، وراسل صاحب الموقع إن أردت استخدام بياناته.

البرومبت أدناه مكتوب على هذا الأساس، ويُنتج منصة **مطابقة في التجربة والمميزات** بدون انتهاك حقوق أحد.

---

## 1. نتائج الفحص الأولي للموقع

من `https://nushud.com/`:

| البند | القيمة |
|---|---|
| العنوان | NUSHUD - Listen to Arabic Nasheeds |
| الوصف | تطبيق بث أناشيد عربية مع كلمات متزامنة، ولمس أي كلمة لمعرفة معناها، وتعلّم العربية أثناء الاستماع |
| نوع التطبيق | **SPA** (الصفحة تعرض "You need to enable JavaScript to run this app") |
| المحتمل تقنياً | React Native Web / Expo Web أو React SPA (يحتاج تأكيد بالفحص) |
| PWA | نعم غالباً: `apple-mobile-web-app-capable`, `theme-color: #0a0a0a`, أيقونة `/icons/icon.png` |
| الثيم | داكن (`#0a0a0a`) |
| Locale | en_US (واجهة إنجليزية) |
| الكلمات المفتاحية | nasheed, acapella nasheed, nasheed without music, nasheed lyrics, nasheed translation, learn Arabic by listening |

### المميزات المستنتجة
1. بث أناشيد عربية (Streaming).
2. **كلمات متزامنة** مع الصوت (Synced Lyrics / LRC أو word-level timing).
3. **النقر على أي كلمة** لعرض معناها (Word-level dictionary popup).
4. تعلّم العربية أثناء الاستماع (Learning mode).
5. أناشيد بدون موسيقى (Acapella).
6. ترجمة الكلمات (Translation).
7. تطبيق ويب قابل للتثبيت (PWA).

> **ملاحظة:** الصفحة الرئيسية لا تكشف المحتوى قبل تشغيل JavaScript، لذلك يلزم فحص بمتصفح حقيقي (Playwright/DevTools) كما في القسم 4.

---

## 2. البرومبت الرئيسي (انسخه للـ AI)

```text
أنت مهندس Full-Stack أول ومصمم UI/UX. مهمتك بناء منصة بث أناشيد إسلامية عربية
مماثلة في التجربة والمميزات لموقع https://nushud.com باسم ومحتوى وهوية بصرية خاصة بنا.

═══════════ المرحلة 1: فحص الـ Front-end (Reverse-engineering للتصميم) ═══════════
1. افتح https://nushud.com عبر Playwright (Chromium) بحجمين: Desktop 1440x900 و Mobile 390x844.
2. لكل صفحة/شاشة (الرئيسية، البحث، صفحة النشيد، المشغّل، المنشد، القوائم، المكتبة، الإعدادات، تسجيل الدخول):
   - خذ Screenshot كامل.
   - استخرج الـ DOM النهائي بعد تنفيذ JS.
   - استخرج Design Tokens: الألوان، الخطوط (family/weight/size)، المسافات، الـ border-radius،
     الظلال، الـ z-index، الـ breakpoints، الأنيميشن والانتقالات.
   - سجّل سلوك المكوّنات: hover, active, focus, loading, empty, error states.
3. حدّد إطار العمل المستخدم (فحص window.__NEXT_DATA__ / __NUXT__ / React DevTools / bundle names / sourcemaps).
4. أنتج ملف `design-system.md` و `tokens.json` (colors, typography, spacing, radius, shadows).
5. أعد بناء نفس الـ Layout والمكوّنات بكود نظيف (لا تنسخ الكود المصدري حرفياً، أعد كتابته).
6. المكوّنات الأساسية المطلوبة:
   - Sidebar/Bottom Tab Bar، Header + Search
   - Nasheed Card، Artist Card، Playlist Card
   - Mini Player + Full Player (progress, seek, volume, repeat, shuffle, next/prev, speed)
   - Synced Lyrics View (تمييز السطر الحالي + التمرير التلقائي)
   - Word Popup: عند النقر على كلمة يظهر (الجذر، المعنى، النطق، مثال)
   - Learn Mode (كلمات محفوظة، مراجعة)
   - Dark theme افتراضي (#0a0a0a) + RTL/LTR + i18n (AR/EN على الأقل)

═══════════ المرحلة 2: فحص الـ Endpoints (Network Analysis) ═══════════
1. باستخدام Playwright: فعّل `page.on('request')` و `page.on('response')` وسجّل كل طلب XHR/fetch/WebSocket/EventSource.
2. نفّذ سيناريوهات المستخدم بالكامل (تصفح، بحث، تشغيل نشيد، نقر كلمة، إضافة للمفضلة، تسجيل دخول إن أمكن) وسجّل لكل طلب:
   - Method + URL + Query params + Headers (بدون تسريب Tokens حقيقية) + Body
   - Response status + schema (استنتج JSON Schema من الاستجابة)
   - Auth type (Bearer / Cookie / Anonymous) + Rate-limit headers + Pagination style
3. اكتب النتائج في `api-spec.openapi.yaml` (OpenAPI 3.1) + `endpoints.md`.
4. حدّد كيفية بث الصوت: (MP3 مباشر / HLS m3u8 / DASH / Range requests) والـ CDN المستخدم.
5. حدّد كيف تُخزَّن الكلمات المتزامنة (LRC / JSON بتوقيت لكل كلمة) وكيف يُجلب معنى الكلمة.
6. التزم: طلبات بمعدل بطيء (≤1 req/sec)، بدون تجاوز حماية، بدون Brute-force، واحترم robots.txt.
7. الهدف: **فهم العقد (API contract)** لبناء Backend خاص بنا بنفس الشكل، وليس الاعتماد على Backend الموقع.

═══════════ المرحلة 3: بناء Backend خاص بنا ═══════════
- صمّم Endpoints مكافئة (بأسمائنا) تغطي: 
  /nasheeds, /nasheeds/:id, /artists, /artists/:id, /playlists, /search, 
  /lyrics/:nasheedId (word-level timing), /words/:word (dictionary), 
  /me/favorites, /me/history, /me/learned-words, /auth/*
- طبّق: Pagination (cursor)، Filtering، Full-text search (عربي مع تطبيع التشكيل/الهمزات)، Caching، Rate limiting.
- تخزين الصوت والصور على Object Storage مع CDN وروابط موقّعة (signed URLs) وHLS.

═══════════ المرحلة 4: المحتوى (Data Gathering المشروع) ═══════════
- لا تنسخ الصوتيات/الصور/الكلمات من nushud.com.
- ابنِ Pipeline لاستيراد المحتوى من مصادر مرخّصة/بإذن (CSV/JSON/API المنشدين، محتوى Creative Commons، رفع يدوي من لوحة إدارة).
- لكل نشيد سجّل: العنوان (ar/en)، المنشد، الألبوم، المدة، اللغة، النوع (بدون موسيقى/بإيقاع)،
  الترخيص + مصدر الإذن، الغلاف، الصوت، الكلمات، الترجمة، التوقيت الزمني للكلمات.
- ابنِ لوحة Admin لرفع/تعديل المحتوى ومزامنة الكلمات (Lyrics Sync Editor).

═══════════ المخرجات المطلوبة ═══════════
1. design-system.md + tokens.json + لقطات الشاشة المرجعية
2. api-spec.openapi.yaml + endpoints.md
3. مشروع Monorepo كامل يعمل (web + api + admin) مع Docker Compose وملف README
4. Seed data تجريبي بمحتوى مرخّص/وهمي
5. اختبارات (Unit + E2E Playwright) وCI
6. خطة نشر (Deployment)

اعمل على مراحل، وبعد كل مرحلة اعرض الملخص وانتظر تأكيدي قبل الانتقال للتالية.
```

---

## 3. التقنيات المقترحة (Tech Stack)

### Frontend
| الغرض | التقنية |
|---|---|
| الإطار | **Next.js 15 (App Router) + React 19 + TypeScript** |
| بديل يدعم Web+Mobile بكود واحد | Expo (React Native Web) |
| التنسيق | Tailwind CSS + shadcn/ui + CSS variables للـ tokens |
| الحالة | Zustand (المشغّل) + TanStack Query (البيانات) |
| الصوت | Howler.js أو `<audio>` + **hls.js** للبث |
| الأنيميشن | Framer Motion |
| i18n/RTL | next-intl + `dir="rtl"` |
| PWA | Serwist / next-pwa + Media Session API (أزرار القفل/الإشعارات) |
| الخطوط العربية | Noto Naskh Arabic / Amiri / IBM Plex Sans Arabic |

### Backend
| الغرض | التقنية |
|---|---|
| الإطار | **NestJS (TypeScript)** أو FastAPI (Python) |
| قاعدة البيانات | **PostgreSQL** + Prisma/Drizzle |
| البحث | **Meilisearch** أو Typesense (يدعم العربية جيداً) |
| الكاش/الطوابير | Redis + BullMQ |
| المصادقة | Auth.js / Clerk / Supabase Auth (JWT + OAuth Google/Apple) |
| التخزين | S3 / Cloudflare R2 |
| CDN | Cloudflare |
| تحويل الصوت | FFmpeg → HLS (AAC 64/128/256 kbps) |
| قاموس الكلمات | جدول خاص + مصادر مفتوحة (Wiktionary dumps, Arabic morphological analyzers مثل CAMeL Tools / Farasa) |

### مزامنة الكلمات
- صيغة LRC للأسطر + JSON للكلمات: `[{ "w": "كلمة", "start": 12.34, "end": 12.80 }]`
- للتوليد شبه الآلي: Whisper / WhisperX (forced alignment) ثم مراجعة يدوية عبر لوحة Admin.

### DevOps
Docker + Docker Compose، GitHub Actions، Vercel/Fly.io/Hetzner، Sentry، Plausible/PostHog، Playwright للاختبارات.

---

## 4. خطة فحص الموقع بالأدوات (Playwright Script)

```bash
mkdir nushud-audit && cd nushud-audit
npm init -y
npm i -D playwright
npx playwright install chromium
```

```js
// audit.mjs
import { chromium } from 'playwright';
import fs from 'fs';

const START = 'https://nushud.com/';
const log = [];

const browser = await chromium.launch();
for (const vp of [{ width: 1440, height: 900, name: 'desktop' }, { width: 390, height: 844, name: 'mobile' }]) {
  const ctx = await browser.newContext({ viewport: vp, locale: 'en-US' });
  const page = await ctx.newPage();

  page.on('response', async (res) => {
    const req = res.request();
    const type = req.resourceType();
    if (['xhr', 'fetch', 'websocket', 'eventsource', 'media'].includes(type)) {
      log.push({
        viewport: vp.name,
        method: req.method(),
        url: res.url(),
        status: res.status(),
        type,
        contentType: res.headers()['content-type'],
        reqHeaders: Object.fromEntries(Object.entries(req.headers()).filter(([k]) => !/cookie|authorization/i.test(k))),
      });
    }
  });

  await page.goto(START, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `shots/${vp.name}-home.png`, fullPage: true });

  // استخراج tokens أساسية
  const tokens = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    return { bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily, size: cs.fontSize };
  });
  fs.writeFileSync(`out/${vp.name}-tokens.json`, JSON.stringify(tokens, null, 2));

  // TODO: تنقّل يدوي/آلي: بحث، فتح نشيد، تشغيل، نقر كلمة... مع تسجيل كل طلب
  await ctx.close();
}
fs.writeFileSync('out/network-log.json', JSON.stringify(log, null, 2));
await browser.close();
```

**بدائل مساعدة:** Chrome DevTools → Network → Export HAR، ثم تحويل الـ HAR إلى OpenAPI عبر `mitmproxy2swagger`.

---

## 5. خطة Data Gathering (جمع البيانات بشكل قانوني)

```
[مصادر مرخّصة] ──► Ingestion Pipeline ──► Validation ──► Storage ──► Search Index
   │                      │                    │
   │                      ├─ FFmpeg (HLS)      ├─ تحقق الترخيص
   │                      ├─ WhisperX (توقيت)  ├─ تحقق الجودة
   │                      └─ Arabic NLP        └─ منع التكرار (audio fingerprint)
   ├─ رفع مباشر من المنشدين/الشركات
   ├─ اتفاقيات ترخيص
   ├─ محتوى Creative Commons / Public Domain
   └─ محتوى تنتجه أنت (تسجيلات أصلية)
```

### مخطط قاعدة البيانات (مختصر)

```sql
artists(id, name_ar, name_en, bio, avatar_url, created_at)
albums(id, title_ar, title_en, cover_url, artist_id, year)
nasheeds(id, title_ar, title_en, artist_id, album_id, duration_sec, type, -- 'acapella' | 'with_music'
         audio_hls_url, cover_url, language, license, license_proof_url, created_at)
lyrics(id, nasheed_id, lang, format, content_json)      -- word-level timing
words(id, lemma, root, pos, meaning_en, meaning_ar, audio_url, example)
lyric_word_links(lyric_id, word_id, position)
playlists(id, owner_id, title, is_public)
playlist_items(playlist_id, nasheed_id, position)
users(id, email, locale, created_at)
favorites(user_id, nasheed_id)
learned_words(user_id, word_id, level, next_review_at)  -- Spaced repetition
play_history(user_id, nasheed_id, played_at, progress_sec)
```

---

## 6. هيكل المشروع

```
nasheed-platform/
├─ apps/
│  ├─ web/            # Next.js (PWA)
│  ├─ api/            # NestJS
│  └─ admin/          # لوحة الإدارة + Lyrics Sync Editor
├─ packages/
│  ├─ ui/             # مكوّنات مشتركة + tokens
│  ├─ types/          # أنواع TypeScript مشتركة (من OpenAPI)
│  └─ config/
├─ workers/
│  ├─ transcode/      # FFmpeg → HLS
│  └─ align/          # WhisperX
├─ docs/
│  ├─ design-system.md
│  ├─ api-spec.openapi.yaml
│  └─ endpoints.md
├─ docker-compose.yml
└─ README.md
```

---

## 7. خارطة الطريق

| المرحلة | المدة التقريبية | المخرجات |
|---|---|---|
| 1. فحص التصميم + Design System | 3-5 أيام | tokens + Figma/Storybook |
| 2. فحص الـ API وكتابة العقد | 2-3 أيام | OpenAPI |
| 3. Backend + DB + Auth | 1-2 أسبوع | API يعمل |
| 4. Web App (Home/Search/Player) | 2-3 أسابيع | نسخة MVP |
| 5. Synced Lyrics + Word Popup | 1-2 أسبوع | الميزة المميزة |
| 6. Admin + Ingestion Pipeline | 1-2 أسبوع | رفع وإدارة المحتوى |
| 7. PWA + Learn Mode + تحسينات | 1-2 أسبوع | نسخة قابلة للإطلاق |
| 8. اختبارات + نشر | 1 أسبوع | Production |

---

## 8. نصائح للتميّز

- ركّز على **الميزة الفارقة**: الكلمات المتزامنة + معنى الكلمة بالنقر + التعلّم.
- اجعل المحتوى مرخّصاً من البداية، فذلك يحميك من الحجب وإزالة الموقع.
- ابدأ بمحتوى صغير عالي الجودة (50-100 نشيد مرخّص) بدل آلاف الملفات المنسوخة.
- أضف مشاركة الكلمات على السوشيال، وقوائم تشغيل جاهزة (رمضان، الأطفال، الحماس، الهدوء).
