import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const { lang, toggle, t } = useLanguage();
  const isRTL = lang === 'ar';

  const navLinks = [
    { labelKey: 'home',       href: '#home'       },
    { labelKey: 'programs',   href: '#programs'   },
    { labelKey: 'trainers',   href: '#trainers'   },
    { labelKey: 'membership', href: '#membership' },
    { labelKey: 'gallery',    href: '#gallery'    },
    { labelKey: 'contact',    href: '#contact'    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="#home" className="flex items-center group flex-shrink-0">
              <img
                src="/logo.png"
                alt="Fit City Gym"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav Links (center) */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`title-gotham text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${
                    activeLink === link.href
                      ? 'text-red-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t('nav', link.labelKey)}
                </a>
              ))}
            </div>

            {/* Right side: Lang Toggle + Join Now + Mobile Hamburger */}
            <div className="flex items-center gap-3">

              {/* Language toggle */}
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 hover:border-red-600 hover:text-white transition-all duration-200 text-xs font-semibold tracking-widest uppercase"
                aria-label="Toggle language"
              >
                <Globe size={14} />
                <span className="title-gotham">{t('nav', 'langLabel')}</span>
              </button>

              {/* Join Now — desktop only */}
              <a
                href="#membership"
                className="title-gotham hidden lg:inline-flex rounded-xl items-center px-6 py-2.5 border-2 border-red-600 text-white text-sm font-semibold tracking-widest uppercase hover:bg-red-600 transition-colors duration-200"
              >
                {t('nav', 'joinNow')}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-white rounded-xl p-2"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — slides in from the correct side based on direction */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col pt-20 transition-transform duration-300 lg:hidden ${
          menuOpen
            ? 'translate-x-0'
            : isRTL
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-0 px-6 mt-8">
          {navLinks.map((link) => (
            <a
              key={link.labelKey}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="title-gotham py-5 border-b border-white/10 text-2xl text-white tracking-widest uppercase hover:text-red-500 transition-colors"
            >
              {t('nav', link.labelKey)}
            </a>
          ))}

          <a
            href="#membership"
            onClick={() => setMenuOpen(false)}
            className="title-gotham rounded-xl mt-8 text-center py-4 bg-red-600 text-white text-xl tracking-widest uppercase"
          >
            {t('nav', 'joinNow')}
          </a>
        </div>
      </div>
    </>
  );
}
