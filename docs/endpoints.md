# Endpoints & Architecture Documentation

توثيق شامل للعقد البرمجي (API Contract) وهندسة نقل البيانات، مستخلص ومطوّر بعد الهندسة العكسية لمنصة NUSHUD.

---

## 1. النظرة المعمارية (Architecture Overview)

```
[Web / Mobile Client] 
         │
         ├──► GET /nasheeds (Metadata + URLs)
         │
         ├──► GET {audioUrl} (Cloudflare R2 / CloudFront CDN - MP3 / HLS)
         │
         ├──► GET {lyricsJsonUrl} (Static JSON - Timed Lyrics Lines)
         │
         └──► POST /dictionary/by-timed-word-ids (Interactive Dictionary Lookup)
```

### آلية تخزين وعرض الكلمات المتزامنة (Synced Lyrics Mechanism)
1. كل نشيد يحتوي على خاصية `lyricsJsonUrl` تشير لملف JSON ثابت على التخزين السحابي (CDN/R2).
2. الملف يتضمن الأسطر وتوقيتها بالملي ثانية (`startMs`, `endMs`) والنص العربي المشكول `ar`، مع أي لغات ترجمة إضافية.
3. يقوم العميل (Frontend) بتقطيع النص العربي إلى كلمات عبر `tokenizeArabicLine` وإزالة الحركات للمقارنة عبر `normalizeArabicWord`.
4. عند تفاعل المستخدم أو لمس أي كلمة، يتم الاستعلام عن تفاصيل الكلمة من `/dictionary/by-timed-word-ids` لعرض الجذر اللغوي والمعنى والوزن الصرفي.

---

## 2. قائمة نقاط النهاية (Endpoints Catalog)

### الأناشيد (Nasheeds)
| Method | Endpoint | Auth | الوصف |
|---|---|---|---|
| `GET` | `/nasheeds` | Optional | جلب قائمة الأناشيد مع ترقيم الصفحات والفلترة |
| `GET` | `/nasheeds/:id` | Optional | جلب تفاصيل نشيد محدد مع روابط الصوت والكلمات |
| `GET` | `/nasheeds/first` | Optional | جلب النشيد الافتراضي لبدء التشغيل عند فتح التطبيق |
| `POST` | `/nasheeds/by-ids` | Optional | جلب تفاصيل مجموعة أناشيد بمعرفاتها (IDs) |
| `POST` | `/nasheeds/:id/play` | Optional | تسجيل تشغيل نشيد للتحليلات والإحصائيات |
| `POST` | `/nasheeds/:id/favorite` | Required | تبديل حالة المفضلة للنشيد |
| `GET` | `/nasheeds/favorites/ids` | Required | جلب معرفات كافة الأناشيد المفضلة للمستخدم |

### القاموس والكلمات (Dictionary & Vocabulary)
| Method | Endpoint | Auth | الوصف |
|---|---|---|---|
| `POST` | `/dictionary/by-timed-word-ids` | Optional | استرجاع بيانات الكلمات (الجذر، المعنى، الوزن الصرفي) بمعرفاتها |
| `POST` | `/dictionary/by-lemma-keys` | Optional | استرجاع الكلمات عبر المفتاح اللغوي أو الجذر |
| `GET` | `/vocabulary/words` | Required | جلب قائمة الكلمات المحفوظة للمستخدم للمراجعة |
| `POST` | `/vocabulary/words` | Required | إضافة كلمة لقائمة تعلم المستخدم |
| `DELETE` | `/vocabulary/words/:id` | Required | إزالة كلمة من قائمة التعلم |

### قوائم التشغيل (Playlists)
| Method | Endpoint | Auth | الوصف |
|---|---|---|---|
| `GET` | `/playlists` | Required | استرجاع قوائم التشغيل الخاصة بالمستخدم |
| `POST` | `/playlists` | Required | إنشاء قائمة تشغيل جديدة |
| `GET` | `/playlists/:id` | Optional | جلب تفاصيل قائمة التشغيل والأناشيد بداخلها |
| `POST` | `/playlists/:id/nasheeds/:nasheedId` | Required | إضافة نشيد إلى قائمة التشغيل |
| `DELETE` | `/playlists/:id/nasheeds/:nasheedId` | Required | حذف نشيد من قائمة التشغيل |

### المصادقة والحساب (Auth & User)
| Method | Endpoint | Auth | الوصف |
|---|---|---|---|
| `POST` | `/auth/signup` | Public | إنشاء حساب جديد |
| `POST` | `/auth/signin` | Public | تسجيل الدخول واستلام JWT |
| `POST` | `/auth/signout` | Required | إنهاء الجلسة |
| `GET` | `/auth/me` | Required | استرجاع بيانات المستخدم الحالي وصلاحياته |
| `PATCH` | `/auth/password` | Required | تغيير كلمة المرور |

---

## 3. نماذج البيانات (Data Schemas)

### نموذج سطر الكلمات المتزامنة (Lyrics Line JSON)
```json
{
  "lineIndex": 0,
  "startMs": 0,
  "endMs": 3819,
  "ar": "خُطُوَاتُ الحَقِّ تَمْضِي وَلِرَبِّ الكَوْنِ تُرْضِي",
  "en": "The steps of truth proceed, pleasing the Lord of the universe"
}
```

### نموذج الكلمة في القاموس (Dictionary Word Entry)
```json
{
  "id": "خطوات",
  "arabic": "خُطُوَاتُ",
  "normalized": "خطوات",
  "partOfSpeech": "noun",
  "meanings": ["steps", "paces", "strides"],
  "root": "خ-ط-و",
  "plural": "خُطُوَات",
  "singular": "خُطْوَة",
  "wazn": "فُعُلاَت",
  "example": "خُطُوَاتُ الحَقِّ تَمْضِي"
}
```
