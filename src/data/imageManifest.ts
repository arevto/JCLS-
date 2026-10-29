/**
 * ============================================================================
 * JCLS Church Website — Centralized Image Asset Manifest
 * ============================================================================
 *
 * This manifest documents all required image assets across the website.
 * Upload the corresponding photographs into `public/images/` using the exact
 * filenames listed below.
 */

export interface ImageAssetInfo {
  filename: string;
  path: string;
  page: 'Homepage' | 'About' | 'Ministries' | 'Leadership' | 'Messages' | 'Events' | 'Visit Us' | 'General';
  section: string;
  description: string;
  recommendedDimensions: string;
  aspectRatio: string;
}

export const imageManifest: ImageAssetInfo[] = [
  // ── HOMEPAGE ──────────────────────────────────────────────────────────────
  {
    filename: 'church-hero.jpg',
    path: '/images/church-hero.jpg',
    page: 'Homepage',
    section: 'Hero Banner',
    description: 'Cinematic wide photo of the congregation worshipping with hands lifted, or wide angle of the sanctuary during service.',
    recommendedDimensions: '1920 x 1080 px (16:9)',
    aspectRatio: '16:9'
  },
  {
    filename: 'church-worship.jpg',
    path: '/images/church-worship.jpg',
    page: 'Homepage',
    section: 'Worship Atmosphere / Feature',
    description: 'Vibrant close/medium shot of the praise and worship team, singers, and musicians on stage.',
    recommendedDimensions: '1200 x 800 px (3:2)',
    aspectRatio: '3:2'
  },
  {
    filename: 'church-community.jpg',
    path: '/images/church-community.jpg',
    page: 'Homepage',
    section: 'Welcome & Fellowship',
    description: 'Warm, candid photograph of church members greeting one another, smiling, conversing after service.',
    recommendedDimensions: '1200 x 800 px (3:2)',
    aspectRatio: '3:2'
  },
  {
    filename: 'church-thanksgiving.jpg',
    path: '/images/church-thanksgiving.jpg',
    page: 'Homepage',
    section: 'Upcoming Events / Annual Thanksgiving',
    description: 'Celebratory photo from a previous Annual Thanksgiving service or banner photo representing thanksgiving praise.',
    recommendedDimensions: '1200 x 800 px (3:2)',
    aspectRatio: '3:2'
  },

  // ── ABOUT PAGE ────────────────────────────────────────────────────────────
  {
    filename: 'church-about.jpg',
    path: '/images/church-about.jpg',
    page: 'About',
    section: 'About Hero Banner',
    description: 'Wide view of the church sanctuary, congregation gathered, or exterior building photo.',
    recommendedDimensions: '1920 x 800 px (21:9 or 16:9)',
    aspectRatio: '16:9'
  },
  {
    filename: 'church-interior.jpg',
    path: '/images/church-interior.jpg',
    page: 'About',
    section: 'Sanctuary & Community Story',
    description: 'Interior view of the main sanctuary showing seating, pulpit, and warm worship lighting.',
    recommendedDimensions: '1200 x 800 px (3:2)',
    aspectRatio: '3:2'
  },

  // ── MINISTRIES ────────────────────────────────────────────────────────────
  {
    filename: 'worship.jpg',
    path: '/images/worship.jpg',
    page: 'Ministries',
    section: 'Worship Ministry Card',
    description: 'Worship team vocalists, musicians, or sound booth volunteers during Sunday morning praise.',
    recommendedDimensions: '800 x 500 px (16:10)',
    aspectRatio: '16:10'
  },
  {
    filename: 'young-professionals.jpg',
    path: '/images/young-professionals.jpg',
    page: 'Ministries',
    section: 'Young Professionals Ministry Card',
    description: 'Young adult believers in a fellowship circle, Bible study discussion, or coffee fellowship.',
    recommendedDimensions: '800 x 500 px (16:10)',
    aspectRatio: '16:10'
  },
  {
    filename: 'youth.jpg',
    path: '/images/youth.jpg',
    page: 'Ministries',
    section: 'Youth Fellowship (GIMIK) Card',
    description: 'Youth fellowship gathering showing students singing, laughing, playing games, or in small groups.',
    recommendedDimensions: '800 x 500 px (16:10)',
    aspectRatio: '16:10'
  },
  {
    filename: 'children.jpg',
    path: '/images/children.jpg',
    page: 'Ministries',
    section: 'Children Ministry Card',
    description: 'Kids with teachers during Sunday school, doing Bible crafts, or worshipping together.',
    recommendedDimensions: '800 x 500 px (16:10)',
    aspectRatio: '16:10'
  },
  {
    filename: 'womens.jpg',
    path: '/images/womens.jpg',
    page: 'Ministries',
    section: 'Women\'s Ministry Card',
    description: 'Sisters in Christ gathered together in prayer, fellowship table, or retreat gathering.',
    recommendedDimensions: '800 x 500 px (16:10)',
    aspectRatio: '16:10'
  },
  {
    filename: 'mens.jpg',
    path: '/images/mens.jpg',
    page: 'Ministries',
    section: 'Men\'s Ministry Card',
    description: 'Men of the church in prayer, breakfast gathering, or service project.',
    recommendedDimensions: '800 x 500 px (16:10)',
    aspectRatio: '16:10'
  },

  // ── LEADERSHIP ────────────────────────────────────────────────────────────
  {
    filename: 'pastor-zaldy-ordonio.jpg',
    path: '/images/pastor-zaldy-ordonio.jpg',
    page: 'Leadership',
    section: 'Senior Pastor Profile',
    description: 'Formal or ministry portrait of Rev. Zaldy Ordonio, Senior Pastor of JCLS Church.',
    recommendedDimensions: '600 x 750 px (4:5 portrait)',
    aspectRatio: '4:5'
  },
  {
    filename: 'rogin-ordonio.jpg',
    path: '/images/rogin-ordonio.jpg',
    page: 'Leadership',
    section: 'Pastoral Elder & Women\'s Leader Profile',
    description: 'Portrait of Sis. Rogin Ordonio, Pastoral Elder & Women\'s Ministry Leader.',
    recommendedDimensions: '600 x 750 px (4:5 portrait)',
    aspectRatio: '4:5'
  },
  {
    filename: 'genrev-ordonio.jpg',
    path: '/images/genrev-ordonio.jpg',
    page: 'Leadership',
    section: 'Ministry Coordinator Profile',
    description: 'Portrait of Bro. Genrev Ordonio, Ministry Coordinator & Youth Leader.',
    recommendedDimensions: '600 x 750 px (4:5 portrait)',
    aspectRatio: '4:5'
  },
  {
    filename: 'isaiah-ordonio.jpg',
    path: '/images/isaiah-ordonio.jpg',
    page: 'Leadership',
    section: 'Creative & Media Leader Profile',
    description: 'Portrait of Bro. Isaiah Ordonio, Worship & Creative Media Leader.',
    recommendedDimensions: '600 x 750 px (4:5 portrait)',
    aspectRatio: '4:5'
  },

  // ── MESSAGES / SERMONS ───────────────────────────────────────────────────
  {
    filename: 'message-01.jpg',
    path: '/images/message-01.jpg',
    page: 'Messages',
    section: 'Featured Message Thumbnail',
    description: 'Thumbnail showing Pastor Zaldy preaching or sermon series graphic for "Go and Make Disciples".',
    recommendedDimensions: '1280 x 720 px (16:9)',
    aspectRatio: '16:9'
  },
  {
    filename: 'message-02.jpg',
    path: '/images/message-02.jpg',
    page: 'Messages',
    section: 'Recent Sermon 2 Thumbnail',
    description: 'Thumbnail for "Standing Firm in Faith Through Trials" (James 1:2–4).',
    recommendedDimensions: '1280 x 720 px (16:9)',
    aspectRatio: '16:9'
  },
  {
    filename: 'message-03.jpg',
    path: '/images/message-03.jpg',
    page: 'Messages',
    section: 'Recent Sermon 3 Thumbnail',
    description: 'Thumbnail for "The Power of United Corporate Prayer" (Acts 4:29–31).',
    recommendedDimensions: '1280 x 720 px (16:9)',
    aspectRatio: '16:9'
  },

  // ── VISIT US ─────────────────────────────────────────────────────────────
  {
    filename: 'church-visit.jpg',
    path: '/images/church-visit.jpg',
    page: 'Visit Us',
    section: 'Visit Hero / Location Photo',
    description: 'Clear exterior of JCLS Church building at 71 Hills Street, Talanay Area C, Batasan Hills.',
    recommendedDimensions: '1200 x 800 px (3:2)',
    aspectRatio: '3:2'
  },

  // ── BRANDING ─────────────────────────────────────────────────────────────
  {
    filename: 'church-logo.png',
    path: '/images/church-logo.png',
    page: 'General',
    section: 'Brand Identity',
    description: 'Official JCLS Church emblem / crest with transparent background.',
    recommendedDimensions: '512 x 512 px (1:1 PNG)',
    aspectRatio: '1:1'
  }
];

/**
 * Helper to get manifest entry by filename
 */
export function getImageInfo(filename: string): ImageAssetInfo | undefined {
  return imageManifest.find(i => i.filename === filename);
}
