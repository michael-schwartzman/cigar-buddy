import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import JournalForm from '@/components/Journal/JournalForm';
import Camera from '@/components/Camera/Camera';
import {
  FireIcon,
  PlusIcon,
  CameraIcon,
  RectangleStackIcon,
  StarIcon,
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import type { TabId, JournalEntry, DashboardStats } from '@/types';

// ── Mock Data ──────────────────────────────────────────────

const MOCK_STATS: DashboardStats = {
  totalSmoked: 47,
  favoriteBrand: 'Padrón',
  averageRating: 4.2,
  totalBrands: 12,
  thisMonth: 6,
  longestSession: 95,
};

const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    cigar: {
      id: 'c1', name: 'Padrón 1964 Anniversary', brand: 'Padrón',
      vitola: 'Torpedo', origin: 'Nicaragua', wrapper: 'Maduro',
      binder: 'Habano', filler: 'Nicaraguan', strength: 'Medium-Full',
      ringGauge: 52, length: 6,
    },
    rating: 5,
    date: '2026-02-18T20:30:00Z',
    location: 'Backyard',
    notes: 'Incredible complexity. Rich cocoa and espresso with a creamy finish.',
    flavorNotes: ['Cocoa', 'Coffee', 'Creamy', 'Cedar'],
    pairing: 'Macallan 12 Double Cask',
    smokingTime: 85,
  },
  {
    id: '2',
    cigar: {
      id: 'c2', name: 'Arturo Fuente Opus X', brand: 'Arturo Fuente',
      vitola: 'Robusto', origin: 'Dominican Republic', wrapper: 'Rosado',
      binder: 'Dominican', filler: 'Dominican', strength: 'Full',
      ringGauge: 50, length: 5.25,
    },
    rating: 5,
    date: '2026-02-15T19:00:00Z',
    location: 'Lounge',
    notes: 'A masterpiece. Spicy start that mellows into sweet cedar and leather.',
    flavorNotes: ['Spicy', 'Cedar', 'Leathery', 'Sweet'],
    pairing: 'Zacapa 23',
  },
  {
    id: '3',
    cigar: {
      id: 'c3', name: 'Oliva Serie V Melanio', brand: 'Oliva',
      vitola: 'Churchill', origin: 'Nicaragua', wrapper: 'Ecuadorian Sumatra',
      binder: 'Nicaraguan', filler: 'Nicaraguan', strength: 'Medium-Full',
      ringGauge: 48, length: 7,
    },
    rating: 4,
    date: '2026-02-12T21:00:00Z',
    location: 'Balcony',
    notes: 'Smooth and balanced. Nutty sweetness with a peppery kick.',
    flavorNotes: ['Nutty', 'Sweet', 'Peppery', 'Earthy'],
    pairing: 'Espresso',
  },
  {
    id: '4',
    cigar: {
      id: 'c4', name: 'My Father Le Bijou 1922', brand: 'My Father',
      vitola: 'Toro', origin: 'Nicaragua', wrapper: 'Oscuro',
      binder: 'Nicaraguan', filler: 'Nicaraguan', strength: 'Full',
      ringGauge: 52, length: 6.5,
    },
    rating: 4,
    date: '2026-02-08T18:30:00Z',
    location: 'Cigar Bar TLV',
    notes: 'Bold and satisfying. Dark chocolate and roasted coffee.',
    flavorNotes: ['Cocoa', 'Coffee', 'Toasty', 'Leathery'],
    pairing: 'Bourbon',
    smokingTime: 70,
  },
];

const TRENDING = [
  { name: 'Davidoff Winston Churchill', brand: 'Davidoff', strength: 'Medium', score: 94 },
  { name: 'Liga Privada No. 9', brand: 'Drew Estate', strength: 'Full', score: 93 },
  { name: 'Montecristo Epic Craft', brand: 'Montecristo', strength: 'Medium', score: 91 },
];

// ── Helper Components ──────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`w-4 h-4 ${s <= rating ? 'text-cigar-star' : 'text-cigar-border'}`}
        />
      ))}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: {
  icon: typeof FireIcon;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card p-4 flex flex-col items-center text-center min-w-[140px]">
      <Icon className="w-6 h-6 text-cigar-accent mb-2" />
      <span className="text-2xl font-bold text-cigar-text">{value}</span>
      <span className="text-xs text-cigar-text-secondary mt-0.5">{label}</span>
      {sub && <span className="text-[10px] text-cigar-accent mt-1">{sub}</span>}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── Tab Views ──────────────────────────────────────────────

function HomeTab() {
  return (
    <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-cigar-text">Good evening 🔥</h1>
        <p className="text-cigar-text-secondary text-sm mt-1">
          Ready for your next smoke?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button className="card-interactive p-4 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-cigar-accent/10 flex items-center justify-center mb-2">
            <PlusIcon className="w-6 h-6 text-cigar-accent" />
          </div>
          <span className="text-xs font-medium text-cigar-text">Log Cigar</span>
        </button>
        <button className="card-interactive p-4 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-cigar-accent/10 flex items-center justify-center mb-2">
            <CameraIcon className="w-6 h-6 text-cigar-accent" />
          </div>
          <span className="text-xs font-medium text-cigar-text">Identify</span>
        </button>
        <button className="card-interactive p-4 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-cigar-accent/10 flex items-center justify-center mb-2">
            <RectangleStackIcon className="w-6 h-6 text-cigar-accent" />
          </div>
          <span className="text-xs font-medium text-cigar-text">Collection</span>
        </button>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-lg font-semibold text-cigar-text mb-3">Your Stats</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <StatCard icon={FireIcon} label="Total Smoked" value={MOCK_STATS.totalSmoked} />
          <StatCard icon={TrophyIcon} label="Favorite" value={MOCK_STATS.favoriteBrand} />
          <StatCard icon={StarIcon} label="Avg Rating" value={MOCK_STATS.averageRating} sub="out of 5" />
          <StatCard icon={ChartBarIcon} label="Brands" value={MOCK_STATS.totalBrands} />
          <StatCard icon={ClockIcon} label="Longest" value={`${MOCK_STATS.longestSession}m`} sub="session" />
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-cigar-text">Recent Sessions</h2>
          <button className="text-sm text-cigar-accent font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {MOCK_ENTRIES.map((entry) => (
            <div key={entry.id} className="card-interactive p-4 flex gap-4">
              {/* Cigar icon placeholder */}
              <div className="w-14 h-14 rounded-xl bg-cigar-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🪵</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-cigar-text text-sm truncate">
                  {entry.cigar.name}
                </h3>
                <p className="text-xs text-cigar-text-secondary mt-0.5">
                  {entry.cigar.brand} · {entry.cigar.vitola}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating rating={entry.rating} />
                  <span className="text-xs text-cigar-text-secondary">·</span>
                  <span className="text-xs text-cigar-text-secondary">
                    {formatDate(entry.date)}
                  </span>
                </div>
                {entry.flavorNotes.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {entry.flavorNotes.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-[10px] bg-cigar-accent/10 text-cigar-accent px-2 py-0.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                    {entry.flavorNotes.length > 3 && (
                      <span className="text-[10px] text-cigar-text-secondary">
                        +{entry.flavorNotes.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <h2 className="text-lg font-semibold text-cigar-text mb-3">Trending Cigars</h2>
        <div className="space-y-2">
          {TRENDING.map((cigar, i) => (
            <div key={cigar.name} className="card-interactive p-3 flex items-center gap-3">
              <span className="text-lg font-bold text-cigar-accent w-6 text-center">{i + 1}</span>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-cigar-text">{cigar.name}</h3>
                <p className="text-xs text-cigar-text-secondary">
                  {cigar.brand} · {cigar.strength}
                </p>
              </div>
              <div className="bg-cigar-accent/10 px-2.5 py-1 rounded-lg">
                <span className="text-sm font-bold text-cigar-accent">{cigar.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchTab() {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-cigar-text mb-4">Search</h2>
      <input
        type="text"
        placeholder="Search cigars, brands, notes..."
        className="input-field mb-4"
      />
      <div className="card p-8 flex flex-col items-center text-center">
        <span className="text-4xl mb-3">🔍</span>
        <p className="text-cigar-text-secondary text-sm">
          Search our database of thousands of cigars
        </p>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-cigar-accent/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl">🧔</span>
        </div>
        <h2 className="text-xl font-bold text-cigar-text">Cigar Enthusiast</h2>
        <p className="text-sm text-cigar-text-secondary">Member since 2025</p>
      </div>

      <div className="card divide-y divide-cigar-border">
        {['Preferences', 'Export Data', 'Premium', 'Help & Support', 'About'].map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-3.5 text-sm text-cigar-text hover:bg-cigar-card-hover transition-colors first:rounded-t-2xl last:rounded-b-2xl"
          >
            {item}
          </button>
        ))}
      </div>

      <button className="btn-secondary w-full text-cigar-danger">
        Sign Out
      </button>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [showCamera, setShowCamera] = useState(false);

  const handleTabChange = (tab: TabId) => {
    if (tab === 'camera') {
      setShowCamera(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'journal':
        return <JournalForm onCancel={() => setActiveTab('home')} />;
      case 'search':
        return <SearchTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <>
      <Head>
        <title>Cigar Buddy</title>
        <meta name="description" content="Your personal cigar companion" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="theme-color" content="#1a1410" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {renderTab()}
      </Layout>

      {showCamera && (
        <Camera
          onCapture={(img) => {
            setShowCamera(false);
            // TODO: send to identification pipeline
            console.log('Captured image for identification');
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
}
