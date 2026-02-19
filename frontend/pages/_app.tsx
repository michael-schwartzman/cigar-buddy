import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import AgeGate from '@/components/AgeVerification/AgeGate';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [ageVerified, setAgeVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const verified = localStorage.getItem('cigar_age_verified') === 'true';
    setAgeVerified(verified);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-cigar-bg" />
    );
  }

  if (!ageVerified) {
    return <AgeGate onVerified={() => setAgeVerified(true)} />;
  }

  return <Component {...pageProps} />;
}
