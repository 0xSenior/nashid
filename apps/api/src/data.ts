import { NasheedSummary, LyricsData, DictionaryWord, Playlist, SavedWord } from '@nashid/types';
import { normalizeArabic } from './arabic.js';

export const NASHEEDS: (NasheedSummary & { lyrics: LyricsData })[] = [
  {
    id: 'shar3iatul-fakhri',
    slug: 'shar3iatul-fakhri',
    title: 'شَرْعِيَّةُ الفَخْرِ',
    artistName: 'يوسف نصر الله',
    coverUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://media.nushud.com/nasheed-audio/d885d37a-3779-4b99-8132-d0c6e892514d-shar3iatul-fakhri.mp3',
    lyricsJsonUrl: '/api/nasheeds/shar3iatul-fakhri/lyrics',
    durationMs: 182000,
    difficulty: 'beginner',
    totalWords: 315,
    newWordsCount: 24,
    tags: ['عزة', 'أناشيد بدون موسيقى', 'فخر'],
    playCount: 420,
    likeCount: 68,
    savedCount: 35,
    commentCount: 12,
    createdAt: '2026-09-01T10:00:00.000Z',
    createdBy: {
      id: 'nashid-admin',
      displayName: 'فريق نشيد',
      avatarUrl: null
    },
    lyrics: {
      id: 'shar3iatul-fakhri',
      title: 'شَرْعِيَّةُ الفَخْرِ',
      artist: 'يوسف نصر الله',
      difficulty: 'beginner',
      durationMs: 182000,
      lineCount: 8,
      languages: ['ar', 'en'],
      lines: [
        {
          lineIndex: 0,
          startMs: 0,
          endMs: 3819,
          ar: 'خُطُوَاتُ الحَقِّ تَمْضِي وَلِرَبِّ الكَوْنِ تُرْضِي',
          en: 'The steps of truth march on, pleasing the Lord of the universe'
        },
        {
          lineIndex: 1,
          startMs: 3819,
          endMs: 6671,
          ar: 'وَأَقَامَتْ فَوْقَ أَرْضِي وَلَهَا عِنْدِي دُوَلْ',
          en: 'Established upon my land, holding sovereignty in my heart'
        },
        {
          lineIndex: 2,
          startMs: 6671,
          endMs: 10255,
          ar: 'خُطُوَاتُ الحَقِّ تَمْضِي وَلِرَبِّ الكَوْنِ تُرْضِي',
          en: 'The steps of truth march on, pleasing the Lord of the universe'
        },
        {
          lineIndex: 3,
          startMs: 10255,
          endMs: 13226,
          ar: 'وَأَقَامَتْ فَوْقَ أَرْضِي وَلَهَا عِنْدِي دُوَلْ',
          en: 'Established upon my land, holding sovereignty in my heart'
        },
        {
          lineIndex: 4,
          startMs: 13226,
          endMs: 17590,
          ar: 'شَرْعِيَّةُ الفَخْرِ أَنَا دَوْماً سَأَبْقَى',
          en: 'The emblem of honour, I shall forever remain'
        },
        {
          lineIndex: 5,
          startMs: 17590,
          endMs: 20859,
          ar: 'وَدَرْبِي دَرْبٌ شَامِخٌ فِيهِ سَأَرْقَى',
          en: 'My path is towering and lofty, on which I shall ascend'
        },
        {
          lineIndex: 6,
          startMs: 20859,
          endMs: 25000,
          ar: 'شَرْعِيَّةُ الفَخْرِ أَنَا دَوْماً سَأَبْقَى',
          en: 'The emblem of honour, I shall forever remain'
        },
        {
          lineIndex: 7,
          startMs: 25000,
          endMs: 32000,
          ar: 'وَدَرْبِي دَرْبٌ شَامِخٌ فِيهِ سَأَرْقَى',
          en: 'My path is towering and lofty, on which I shall ascend'
        }
      ]
    }
  },
  {
    id: 'sal-al-rimah',
    slug: 'sal-al-rimah',
    title: 'سَلِ الرِّمَاحَ العَوَالِي',
    artistName: 'صفي الدين الحلي',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://media.nushud.com/nasheed-audio/610dcd81-ff4e-4f91-9107-b6f40f7252b9-ayn-al-quroonul-madiyah.mp3',
    lyricsJsonUrl: '/api/nasheeds/sal-al-rimah/lyrics',
    durationMs: 195000,
    difficulty: 'advanced',
    totalWords: 240,
    newWordsCount: 45,
    tags: ['شعر عربي', 'فروسية', 'أصالة'],
    playCount: 890,
    likeCount: 142,
    savedCount: 90,
    commentCount: 28,
    createdAt: '2026-09-05T12:00:00.000Z',
    createdBy: {
      id: 'nashid-admin',
      displayName: 'فريق نشيد',
      avatarUrl: null
    },
    lyrics: {
      id: 'sal-al-rimah',
      title: 'سَلِ الرِّمَاحَ العَوَالِي',
      artist: 'صفي الدين الحلي',
      difficulty: 'advanced',
      durationMs: 195000,
      lineCount: 6,
      languages: ['ar', 'en'],
      lines: [
        {
          lineIndex: 0,
          startMs: 0,
          endMs: 4500,
          ar: 'سَلِ الرِّمَاحَ العَوَالِي عَنْ مَعَالِينَا',
          en: 'Ask the lofty spears about our exalted glory'
        },
        {
          lineIndex: 1,
          startMs: 4500,
          endMs: 9200,
          ar: 'وَاسْتَشْهِدِ البِيضَ هَلْ خَابَ الرَّجَا فِينَا',
          en: 'And call the gleaming swords to witness if hope in us was ever disappointed'
        },
        {
          lineIndex: 2,
          startMs: 9200,
          endMs: 14000,
          ar: 'بِيضٌ صَنَائِعُنَا سُودٌ وَقَائِعُنَا',
          en: 'Pure white are our noble deeds, dark and fierce are our battles'
        },
        {
          lineIndex: 3,
          startMs: 14000,
          endMs: 19500,
          ar: 'خُضْرٌ مَرَابِعُنَا حُمْرٌ مَوَاضِينَا',
          en: 'Flourishing green are our lands, steeped red are our sharp swords'
        },
        {
          lineIndex: 4,
          startMs: 19500,
          endMs: 25000,
          ar: 'لا يَظْلِمُونَ إِذَا مَا الأَمْرُ أَمْرُهُمُ',
          en: 'They never transgress when authority rests within their command'
        },
        {
          lineIndex: 5,
          startMs: 25000,
          endMs: 32000,
          ar: 'وَإِنْ هُمُ ظُلِمُوا كَانُوا مَيَامِينَا',
          en: 'And should they be oppressed, they stand steadfast and blessed'
        }
      ]
    }
  },
  {
    id: 'ghuraba',
    slug: 'ghuraba',
    title: 'غُرَبَاءُ',
    artistName: 'سعد الغامدي',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://media.nushud.com/nasheed-audio/d885d37a-3779-4b99-8132-d0c6e892514d-shar3iatul-fakhri.mp3',
    lyricsJsonUrl: '/api/nasheeds/ghuraba/lyrics',
    durationMs: 210000,
    difficulty: 'intermediate',
    totalWords: 180,
    newWordsCount: 30,
    tags: ['إيماني', 'هدوء', 'بدون موسيقى'],
    playCount: 1540,
    likeCount: 320,
    savedCount: 215,
    commentCount: 45,
    createdAt: '2026-09-10T14:00:00.000Z',
    createdBy: {
      id: 'nashid-admin',
      displayName: 'فريق نشيد',
      avatarUrl: null
    },
    lyrics: {
      id: 'ghuraba',
      title: 'غُرَبَاءُ',
      artist: 'سعد الغامدي',
      difficulty: 'intermediate',
      durationMs: 210000,
      lineCount: 4,
      languages: ['ar', 'en'],
      lines: [
        {
          lineIndex: 0,
          startMs: 0,
          endMs: 5200,
          ar: 'غُرَبَاءُ وَارْتَضَيْنَاهَا شِعَارَا',
          en: 'Strangers, and we have embraced this as our noble motto'
        },
        {
          lineIndex: 1,
          startMs: 5200,
          endMs: 10800,
          ar: 'فِي سَبِيلِ اللهِ لَا نَبْغِي سِوَاهُ',
          en: 'For the sake of God, seeking none other besides Him'
        },
        {
          lineIndex: 2,
          startMs: 10800,
          endMs: 16500,
          ar: 'قَدْ عَزَمْنَا فِي دُرُوبِ الحَقِّ سَيْرَا',
          en: 'We have resolved to walk steadfast along the avenues of truth'
        },
        {
          lineIndex: 3,
          startMs: 16500,
          endMs: 24000,
          ar: 'نَبْتَغِي الفِرْدَوْسَ دَاراً وَمُقَامَا',
          en: 'Seeking the highest gardens of Paradise as our everlasting abode'
        }
      ]
    }
  }
];

export const DICTIONARY: Record<string, DictionaryWord> = {
  فقالوا: {
    id: 'فقالوا',
    arabic: 'فقالوا',
    normalized: 'فقالوا',
    partOfSpeech: 'فعل ماضٍ متصل بواو الجماعة',
    posBadge: 'VERB',
    meaningHeading: '• to say',
    meanings: ['نطقوا بالقول وتحدثوا'],
    meaningsEn: ['they said', 'they spoke'],
    root: 'ق و ل',
    quranExample: {
      ayah: 'إِذْ قَالَ لَهُۥ رَبُّهُۥٓ أَسْلِمْ ۖ قَالَ أَسْلَمْتُ لِرَبِّ ٱلْعَـٰلَمِينَ',
      translation: 'When his Lord said to him, "Submit", he said "I have submitted [in Islam] to the Lord of the worlds."',
      surah: 'AL-BAQARA 2:131'
    }
  },
  قالوا: {
    id: 'قالوا',
    arabic: 'قالوا',
    normalized: 'قالوا',
    partOfSpeech: 'فعل ماضٍ',
    posBadge: 'VERB',
    meaningHeading: '• to say',
    meanings: ['تحدثوا وقالوا'],
    meaningsEn: ['they said'],
    root: 'ق و ل',
    quranExample: {
      ayah: 'إِذْ قَالَ لَهُۥ رَبُّهُۥٓ أَسْلِمْ ۖ قَالَ أَسْلَمْتُ لِرَبِّ ٱلْعَـٰلَمِينَ',
      translation: 'When his Lord said to him, "Submit", he said "I have submitted [in Islam] to the Lord of the worlds."',
      surah: 'AL-BAQARA 2:131'
    }
  },
  ضحكت: {
    id: 'ضحكت',
    arabic: 'ضَحِكْتُ',
    normalized: 'ضحكت',
    partOfSpeech: 'فعل ماضٍ متصل بتاء الفاعل',
    posBadge: 'VERB',
    meaningHeading: '• to laugh',
    meanings: ['انفرجت أسناني تبسماً وسروراً'],
    meaningsEn: ['I laughed'],
    root: 'ض ح ك',
    quranExample: {
      ayah: 'فَضَحِكَتْ فَبَشَّرْنَاهَا بِإِسْحَاقَ',
      translation: 'And she laughed, and We gave her good tidings of Isaac.',
      surah: 'HUD 11:71'
    }
  },
  تحتشم: {
    id: 'تحتشم',
    arabic: 'تَحْتَشِمْ',
    normalized: 'تحتشم',
    partOfSpeech: 'فعل مضارع مجزوم',
    posBadge: 'VERB',
    meaningHeading: '• to be modest / shy',
    meanings: ['تستحي وتتأدب بالخُلق الرفيع'],
    meaningsEn: ['have shame', 'be modest'],
    root: 'ح ش م'
  },
  خطوات: {
    id: 'خطوات',
    arabic: 'خُطُوَاتُ',
    normalized: 'خطوات',
    partOfSpeech: 'اسم مؤنث (جمع)',
    meanings: ['مسيرات', 'خطى السير في الدرب'],
    meaningsEn: ['steps', 'paces', 'footsteps'],
    root: 'خ - ط - و',
    singular: 'خُطْوَة',
    plural: 'خُطُوَات',
    wazn: 'فُعُلاَت',
    example: 'خُطُوَاتُ الحَقِّ تَمْضِي وَلِرَبِّ الكَوْنِ تُرْضِي'
  },
  الحق: {
    id: 'الحق',
    arabic: 'الحَقُّ',
    normalized: 'الحق',
    partOfSpeech: 'اسم معرف بأل',
    meanings: ['العدل والصدق الثابت، وهو من أسماء الله الحسنى'],
    meaningsEn: ['the truth', 'justice', 'rightfulness'],
    root: 'ح - ق - ق',
    wazn: 'الفَعْل',
    example: 'وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ'
  },
  تمضي: {
    id: 'تمضي',
    arabic: 'تَمْضِي',
    normalized: 'تمضي',
    partOfSpeech: 'فعل مضارع',
    meanings: ['تسير إلى الأمام وتتقدم بثبات'],
    meaningsEn: ['proceeds', 'advances', 'moves forward'],
    root: 'م - ض - ي',
    present: 'يَمْضِي',
    imperative: 'امْضِ',
    bab: 'فَعَلَ يَفْعِلُ',
    example: 'تَمْضِي قَوَافِلُ الخَيْرِ'
  },
  الكون: {
    id: 'الكون',
    arabic: 'الكَوْنِ',
    normalized: 'الكون',
    partOfSpeech: 'اسم مجرور',
    meanings: ['الوجود بأسره وما خلقه الله في السماوات والأرض'],
    meaningsEn: ['the universe', 'cosmos', 'creation'],
    root: 'ك - و - ن',
    wazn: 'الفَعْل',
    example: 'رَبُّ الكَوْنِ وَخَالِقُهُ'
  },
  ترضي: {
    id: 'ترضي',
    arabic: 'تُرْضِي',
    normalized: 'ترضي',
    partOfSpeech: 'فعل مضارع',
    meanings: ['تنال الرضا والقبول والحسن'],
    meaningsEn: ['pleases', 'satisfies', 'brings contentment'],
    root: 'ر - ض - ي',
    present: 'يُرْضِي',
    bab: 'أَفْعَلَ يُفْعِلُ',
    example: 'أَعْمَالٌ تُرْضِي اللهَ'
  },
  الرماح: {
    id: 'الرماح',
    arabic: 'الرِّمَاحَ',
    normalized: 'الرماح',
    partOfSpeech: 'اسم (جمع تكسير)',
    meanings: ['أسلحة الطعن القديمة الطويلة ذات السنان الحاد'],
    meaningsEn: ['spears', 'lances'],
    root: 'ر - م - ح',
    singular: 'رُمْح',
    plural: 'رِمَاح',
    wazn: 'الفِعَال',
    example: 'سَلِ الرِّمَاحَ العَوَالِي عَنْ مَعَالِينَا'
  },
  العوالي: {
    id: 'العوالي',
    arabic: 'العَوَالِي',
    normalized: 'العوالي',
    partOfSpeech: 'نعت منصوب (جمع)',
    meanings: ['المرتفعة الشامخة، وأعالي الأسنة الشريفة'],
    meaningsEn: ['the lofty ones', 'exalted heights'],
    root: 'ع - ل - و',
    singular: 'عَالِيَة',
    wazn: 'الفَوَاعِل'
  },
  معالينا: {
    id: 'معالينا',
    arabic: 'مَعَالِينَا',
    normalized: 'معالينا',
    partOfSpeech: 'اسم مضاف لضمير نا',
    meanings: ['مراتب الشرف والمجد والرفعة'],
    meaningsEn: ['our lofty glories', 'exalted achievements'],
    root: 'ع - ل - و',
    singular: 'مَعْلَاة',
    wazn: 'مَفَاعِل'
  },
  البيض: {
    id: 'البيض',
    arabic: 'البِيضَ',
    normalized: 'البيض',
    partOfSpeech: 'اسم (جمع صفة)',
    meanings: ['السيوف المصقولة اللامعة لصفائها ونقائها'],
    meaningsEn: ['the gleaming white swords'],
    root: 'ب - ي - ض',
    singular: 'أَبْيَض / بَيْضَاء',
    wazn: 'الفُعْل'
  },
  غرباء: {
    id: 'غرباء',
    arabic: 'غُرَبَاءُ',
    normalized: 'غرباء',
    partOfSpeech: 'اسم (جمع تكسير)',
    meanings: ['أهل الاستقامة والتمسك بالحق عند فساد الزمان'],
    meaningsEn: ['strangers', 'the righteous few'],
    root: 'غ - ر - ب',
    singular: 'غَرِيب',
    wazn: 'فُعَلَاء',
    example: 'بَدَأَ الإِسْلَامُ غَرِيباً وَسَيَعُودُ كَمَا بَدَأَ فَطُوبَى لِلْغُرَبَاءِ'
  }
};

export const PLAYLISTS: Playlist[] = [
  {
    id: 'fav-acapella',
    title: 'أناشيد العزة والأصالة',
    itemCount: 3,
    isPublic: true,
    coverUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-09-15T08:00:00.000Z',
    nasheedIds: ['shar3iatul-fakhri', 'sal-al-rimah', 'ghuraba']
  },
  {
    id: 'learning-playlist',
    title: 'مختارات لتعلم المفردات',
    itemCount: 2,
    isPublic: true,
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-09-18T10:00:00.000Z',
    nasheedIds: ['shar3iatul-fakhri', 'sal-al-rimah']
  }
];

export const SAVED_WORDS: SavedWord[] = [
  {
    id: 'saved-1',
    word: DICTIONARY['خطوات'],
    masteryLevel: 2,
    savedAt: '2026-09-19T10:00:00.000Z',
    nextReviewAt: '2026-09-22T10:00:00.000Z'
  },
  {
    id: 'saved-2',
    word: DICTIONARY['الرماح'],
    masteryLevel: 1,
    savedAt: '2026-09-19T11:00:00.000Z',
    nextReviewAt: '2026-09-21T11:00:00.000Z'
  },
  {
    id: 'saved-3',
    word: DICTIONARY['غرباء'],
    masteryLevel: 3,
    savedAt: '2026-09-18T09:00:00.000Z',
    nextReviewAt: '2026-09-25T09:00:00.000Z'
  }
];
