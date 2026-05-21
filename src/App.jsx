import { useEffect } from 'react';
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

function App() {
  // Initialize scroll reveal observer
  useEffect(() => {
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
  }, []);

  // Re-run reveal on route changes / dynamic content
  useEffect(() => {
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
      const elements = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeTicker />
        <ProgramsSection />
        <TrainersSection />
        <MembershipSection />
        <MarqueeTicker />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
