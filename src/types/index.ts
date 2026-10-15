export type PageId = 
  | 'home' 
  | 'about' 
  | 'ministries' 
  | 'sermons' 
  | 'events' 
  | 'visit' 
  | 'prayer' 
  | 'contact';

export interface ServiceSchedule {
  id: string;
  day: string;
  time: string;
  name: string;
  description: string;
  location: string;
  isOnlineStreamed: boolean;
  isPlaceholder?: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  category: 'generation' | 'worship' | 'discipleship' | 'care' | 'outreach';
  tagline: string;
  description: string;
  schedule: string;
  audience: string;
  image: string;
  leaderTitle: string;
  isPlaceholder?: boolean;
}

export interface Sermon {
  id: string;
  title: string;
  series: string;
  speaker: string;
  speakerRole: string;
  date: string;
  passage: string;
  description: string;
  duration: string;
  videoUrl?: string; // YouTube / Facebook video embed or placeholder
  audioUrl?: string;
  thumbnail: string;
  notes?: string[];
  keyVerses?: string[];
  isFeatured?: boolean;
  isPlaceholder?: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  category: 'service' | 'conference' | 'fellowship' | 'youth' | 'prayer';
  dateDisplay: string;
  isoDate: string;
  time: string;
  location: string;
  description: string;
  image: string;
  registrationRequired: boolean;
  registrationStatus?: 'open' | 'closed' | 'coming-soon';
  highlight?: boolean;
  isPlaceholder?: boolean;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  isPlaceholder?: boolean;
}

export interface BeliefItem {
  id: string;
  topic: string;
  summary: string;
  scriptureReferences: string[];
  details: string;
}

export interface ChurchInfo {
  name: string;
  shortName: string;
  tagline: string;
  themeScripture: {
    verse: string;
    reference: string;
  };
  visionStatement: string;
  missionStatement: string;
  city: string;
  country: string;
  locationName: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  email: string;
  officeHours: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  logo?: string;
  mapsUrl?: string;
  isAddressPendingVerification?: boolean;
}
