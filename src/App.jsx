import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ProgramsSection from './components/sections/ProgramsSection';
import TrainersSection from './components/sections/TrainersSection';
import MembershipSection from './components/sections/MembershipSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import MarqueeTicker from './components/ui/MarqueeTicker';
import WhatsAppButton from './components/ui/WhatsAppButton';
import LoadingScreen from './components/ui/LoadingScreen';
import GallerySection from './components/sections/Gallery';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading, lang]);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.08 }
      );
      const elements = document.querySelectorAll(
        '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)'
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [isLoading, lang]);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-brand-dark text-white${isRTL ? ' lang-ar' : ''}`}
    >
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />
      <main>
        <HeroSection isLoading={isLoading} />
        {/* <MarqueeTicker /> */}
        <ProgramsSection />
        <TrainersSection />
        <MembershipSection />
        {/* <MarqueeTicker /> */}
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
