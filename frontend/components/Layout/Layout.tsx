import React, { ReactNode } from 'react';
import {
  HomeIcon,
  BookOpenIcon,
  CameraIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  CameraIcon as CameraIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import type { TabId } from '@/types';

interface LayoutProps {
  children: ReactNode;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; Icon: typeof HomeIcon; ActiveIcon: typeof HomeIconSolid }[] = [
  { id: 'home', label: 'Home', Icon: HomeIcon, ActiveIcon: HomeIconSolid },
  { id: 'journal', label: 'Journal', Icon: BookOpenIcon, ActiveIcon: BookOpenIconSolid },
  { id: 'camera', label: 'Scan', Icon: CameraIcon, ActiveIcon: CameraIconSolid },
  { id: 'search', label: 'Search', Icon: MagnifyingGlassIcon, ActiveIcon: MagnifyingGlassIconSolid },
  { id: 'profile', label: 'Profile', Icon: UserIcon, ActiveIcon: UserIconSolid },
];

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cigar-bg flex flex-col">
      {/* Main content — scrollable, padded for bottom nav */}
      <main className="flex-1 overflow-y-auto pb-20 safe-top">
        {children}
      </main>

      {/* Bottom tab navigation — fixed, mobile-native feel */}
      <nav className="fixed bottom-0 inset-x-0 bg-cigar-card/95 backdrop-blur-lg border-t border-cigar-border safe-bottom z-40">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {tabs.map(({ id, label, Icon, ActiveIcon }) => {
            const isActive = activeTab === id;
            const IconComponent = isActive ? ActiveIcon : Icon;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              >
                <IconComponent className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-medium">{label}</span>
                {isActive && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cigar-accent rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
