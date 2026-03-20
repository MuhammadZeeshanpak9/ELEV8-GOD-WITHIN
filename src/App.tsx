import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { GrandDesigner } from './sections/GrandDesigner';
import { Creations } from './sections/Creations';
import { Movement } from './sections/Movement';
import { LoveGift } from './sections/LoveGift';
import { PsychedelicExperience } from './sections/PsychedelicExperience';
import { JoinCreators } from './sections/JoinCreators';
import { Footer } from './sections/Footer';
import { SoapBubbles } from './components/animations/SoapBubbles';
import './App.css';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    // Add smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen lg:pl-52 pt-16 lg:pt-0">
      {/* Global soap bubble background — fixed, z-index 0, behind everything */}
      <SoapBubbles count={8} />
      <Navbar />
      <main>
        <Hero />
        <GrandDesigner />
        <Creations />
        <Movement />
        <LoveGift />
        <PsychedelicExperience />
        <JoinCreators />
      </main>
      <Footer />
    </div>
  );
}

export default App;
