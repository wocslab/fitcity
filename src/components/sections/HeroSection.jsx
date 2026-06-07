import { useEffect, useRef, useState } from "react";
import { Play, ChevronDown } from "lucide-react";
import {
  RiVipCrownLine,
  RiUserStarLine,
  RiTeamLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import { useLanguage } from "../../context/LanguageContext";

export default function HeroSection({ isLoading = false }) {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (isLoading) return;
    setLoaded(true);
  }, [isLoading]);

  const features = [
    { icon: RiVipCrownLine,   labelKey: 'f1' },
    { icon: RiUserStarLine,   labelKey: 'f2' },
    { icon: RiTeamLine,       labelKey: 'f3' },
    { icon: RiShieldCheckLine,labelKey: 'f4' },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-[700px] lg:min-h-screen xl:h-[700px] 2xl:h-[700px] 3xl:h-[700px] overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/bg.png" alt="Gym Hero" className="hidden md:block w-full h-full object-cover animate-slowZoom" />
        <img src="/bg-mobile.jpeg" alt="Gym Hero Mobile" className="block md:hidden w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-red-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-10 min-h-[700px] lg:min-h-screen flex items-end lg:items-start pt-52 lg:pt-[150px] pb-16">
        <div className="max-w-2xl w-full">

          <h1 className="title-gotham uppercase leading-[0.9]">
            <div className={`text-white text-3xl sm:text-5xl lg:text-7xl transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t('hero', 'line1')}
            </div>
            <div className={`text-3xl sm:text-5xl lg:text-7xl transition-all duration-500 delay-150 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <span className="text-white">{t('hero', 'line2a')}</span>
              <span className="text-red-600">{t('hero', 'line2b')}</span>
            </div>
            <div className={`text-3xl sm:text-5xl lg:text-7xl transition-all duration-500 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <span className="text-white">{t('hero', 'line3a')}</span>
              <span className="text-red-600">{t('hero', 'line3b')}</span>
            </div>
          </h1>

          <p className={`mt-4 md:mt-6 text-gray-300 text-sm md:text-lg leading-relaxed max-w-xs md:max-w-lg transition-all duration-500 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t('hero', 'desc')}
          </p>

          <div className={`flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 transition-all duration-500 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <a
              href="#membership"
              className="title-gotham rounded-xl w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30"
            >
              {t('hero', 'cta1')}
            </a>
            <a
              href="#video"
              className="title-gotham w-full rounded-xl sm:w-auto flex items-center justify-center gap-3 px-8 py-3 border border-white/20 hover:border-red-600 text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-all duration-300 hover:bg-white/5"
            >
              <span className="w-8 h-8 rounded-full border border-red-600 flex items-center justify-center text-red-600">
                <Play size={12} fill="currentColor" />
              </span>
              {t('hero', 'cta2')}
            </a>
          </div>

          <div className={`hidden sm:grid grid-cols-4 gap-y-8 gap-x-4 mt-10 md:mt-14 transition-all duration-500 delay-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.labelKey} className="flex flex-col items-center text-center group">
                  <div className="flex items-center justify-center text-red-600 text-3xl md:text-4xl transition-all duration-300 group-hover:scale-110">
                    <Icon />
                  </div>
                  <span className="title-gotham mt-2 text-[10px] md:text-xs uppercase tracking-widest text-white font-semibold leading-relaxed">
                    {t('hero', item.labelKey)}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#programs"
        className="hidden md:flex absolute bottom-8 right-6 z-30 flex-col items-center text-white/50 hover:text-red-600 transition-all rtl:right-auto rtl:left-6"
      >
        <span className="title-gotham text-[10px] uppercase tracking-[0.3em] rotate-90 mb-6">
          {t('hero', 'scroll')}
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
