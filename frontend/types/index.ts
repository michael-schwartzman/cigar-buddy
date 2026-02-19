export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  isPremium: boolean;
  joinedAt: string;
}

export interface Cigar {
  id: string;
  name: string;
  brand: string;
  vitola: string;
  origin: string;
  wrapper: string;
  binder: string;
  filler: string;
  strength: 'Mild' | 'Mild-Medium' | 'Medium' | 'Medium-Full' | 'Full';
  ringGauge: number;
  length: number; // inches
  price?: number;
  imageUrl?: string;
  description?: string;
}

export interface JournalEntry {
  id: string;
  cigar: Cigar;
  rating: number; // 1-5
  date: string;
  location?: string;
  notes?: string;
  flavorNotes: string[];
  pairing?: string;
  photoUrl?: string;
  smokingTime?: number; // minutes
  occasion?: string;
}

export interface PairingSuggestion {
  id: string;
  cigarId: string;
  category: 'Beverage' | 'Food' | 'Spirit';
  name: string;
  description: string;
  matchScore: number; // 0-100
  imageUrl?: string;
}

export interface DashboardStats {
  totalSmoked: number;
  favoriteBrand: string;
  averageRating: number;
  totalBrands: number;
  thisMonth: number;
  longestSession: number; // minutes
}

export type TabId = 'home' | 'journal' | 'camera' | 'search' | 'profile';
