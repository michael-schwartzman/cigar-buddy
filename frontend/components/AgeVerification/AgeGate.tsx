import React, { useState, useEffect } from 'react';

export default function AgeGate({ onVerified }: { onVerified: () => void }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleVerify = () => {
    localStorage.setItem('cigar_age_verified', 'true');
    onVerified();
  };

  const handleDeny = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-cigar-bg flex items-center justify-center p-6 transition-opacity duration-500 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-sm w-full text-center">
        {/* Logo / Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-cigar-card rounded-2xl flex items-center justify-center mb-4">
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-3xl font-bold text-cigar-text mb-2">Cigar Buddy</h1>
          <p className="text-cigar-text-secondary text-sm">Your Personal Cigar Companion</p>
        </div>

        {/* Age verification card */}
        <div className="card p-8">
          <div className="w-16 h-16 mx-auto bg-cigar-accent/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl">🛡️</span>
          </div>

          <h2 className="text-xl font-bold text-cigar-text mb-3">Age Verification</h2>
          <p className="text-cigar-text-secondary text-sm mb-8 leading-relaxed">
            This app is intended for adults of legal smoking age. 
            You must be at least <span className="text-cigar-accent font-semibold">21 years old</span> to continue.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleVerify}
              className="btn-primary w-full text-lg py-4"
            >
              I am 21 or older
            </button>
            <button
              onClick={handleDeny}
              className="btn-secondary w-full text-sm"
            >
              I am under 21
            </button>
          </div>

          <p className="text-cigar-text-secondary text-xs mt-6 leading-relaxed">
            By continuing, you confirm that you are of legal smoking age
            in your jurisdiction. This app is for educational purposes only
            and does not sell tobacco products.
          </p>
        </div>
      </div>
    </div>
  );
}
