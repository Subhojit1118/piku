import React, { useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhotoShowcase } from './components/BgRemoverShowcase';
import { InteractiveCake } from './components/InteractiveCake';
import { MemoryGallery } from './components/MemoryGallery';
import { SurpriseGifts } from './components/SurpriseGifts';
import { GreetingCardGenerator } from './components/GreetingCardGenerator';
import { Footer } from './components/Footer';
import { triggerConfettiBurst } from './utils/confetti';

import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.jpeg';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';
import img5 from './assets/img5.jpeg';
import img6 from './assets/img6.jpeg';
import img7 from './assets/img7.jpeg';
import img8 from './assets/img8.jpeg';
import img9 from './assets/img9.jpeg';
import img10 from './assets/img10.jpeg';
import img11 from './assets/img11.jpeg';
import img12 from './assets/img12.jpeg';
import img13 from './assets/img13.jpeg';

function App() {
  const imagesMap = { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13 };
  const [isScreenProtected, setIsScreenProtected] = React.useState(false);
  const [showWarningToast, setShowWarningToast] = React.useState(false);

  useEffect(() => {
    // Initial celebration burst when page loads
    const timer = setTimeout(() => {
      triggerConfettiBurst(80);
    }, 600);

    // Prevent image context menu (right-click download) and dragging globally
    const preventImageDownloadAndDrag = (e) => {
      if (e.target && (e.target.tagName === 'IMG' || e.target.closest('img'))) {
        e.preventDefault();
        return false;
      }
    };

    // 1. Blur screen whenever window loses focus (e.g. Snipping Tool / Win+Shift+S / PrtScn active)
    const handleWindowBlur = () => {
      setIsScreenProtected(true);
    };

    const handleWindowFocus = () => {
      setIsScreenProtected(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsScreenProtected(true);
      } else {
        setIsScreenProtected(false);
      }
    };

    // 2. Intercept PrintScreen and save/print shortcut key combinations
    const handleKeyDown = (e) => {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        setIsScreenProtected(true);
        setShowWarningToast(true);
        setTimeout(() => setShowWarningToast(false), 3000);

        // Try clearing clipboard if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      }

      // Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setShowWarningToast(true);
        setTimeout(() => setShowWarningToast(false), 3000);
      }

      // Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }

      // Ctrl+Shift+I / F12 (DevTools)
      if (e.keyCode === 123 || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c'))) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        setTimeout(() => setIsScreenProtected(false), 1500);
      }
    };

    document.addEventListener('contextmenu', preventImageDownloadAndDrag);
    document.addEventListener('dragstart', preventImageDownloadAndDrag);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('contextmenu', preventImageDownloadAndDrag);
      document.removeEventListener('dragstart', preventImageDownloadAndDrag);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <AudioProvider>
      <div className={`min-h-screen bg-[#090d16] text-slate-100 selection:bg-pink-500 selection:text-white relative ${isScreenProtected ? 'screenshot-blur-protection' : ''}`}>
        {/* Navigation */}
        <Navbar />

        {/* Main Sections */}
        <main className="space-y-12">
          <HeroSection heroImage={img4} />
          <PhotoShowcase imagesMap={imagesMap} />
          <InteractiveCake />
          <MemoryGallery imagesMap={imagesMap} />
          <SurpriseGifts />
          <GreetingCardGenerator />
        </main>

        {/* Floating Audio Player */}
        <BackgroundMusicPlayer />

        {/* Footer */}
        <Footer />
      </div>

      {/* Screenshot / Focus Protection Overlay */}
      {isScreenProtected && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-3xl text-center p-6 select-none">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-3xl sm:text-4xl animate-bounce mb-4 text-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.4)]">
            🔒
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent mb-2">
            Protected Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Screenshots and window blur are restricted to keep these special birthday memories private and protected! 💖
          </p>
          <span className="mt-4 px-3 py-1 rounded-full bg-slate-800 text-pink-300 text-[11px] border border-pink-500/30 font-mono">
            Return focus to page to view
          </span>
        </div>
      )}

      {/* Anti-Screenshot Warning Toast */}
      {showWarningToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] px-4 py-2.5 rounded-full bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <span>🚫</span>
          <span>Screenshots & Printing are restricted on this gallery.</span>
        </div>
      )}
    </AudioProvider>
  );
}

export default App;


