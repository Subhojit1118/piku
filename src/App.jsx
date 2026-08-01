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

function App() {
  const imagesMap = { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12 };

  useEffect(() => {
    // Initial celebration burst when page loads
    const timer = setTimeout(() => {
      triggerConfettiBurst(80);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-pink-500 selection:text-white relative">
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
    </AudioProvider>
  );
}

export default App;

