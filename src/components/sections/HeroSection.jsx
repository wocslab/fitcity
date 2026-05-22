import { useEffect, useRef, useState } from "react";
import { Play, ChevronDown } from "lucide-react";

import {
  RiVipCrownLine,
  RiUserStarLine,
  RiTeamLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const features = [
  { icon: RiVipCrownLine, label: "Premium Equipment" },
  { icon: RiUserStarLine, label: "Expert Coaches" },
  { icon: RiTeamLine, label: "Group Classes" },
  { icon: RiShieldCheckLine, label: "Strong Community" },
];

export default function HeroSection({ isLoading = false }) {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Only start the entrance animation once the loading screen is gone
    if (isLoading) return;

    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[900px] lg:min-h-screen overflow-hidden bg-black"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <img
          src="/bg.png"
          alt="Gym Hero"
          className="hidden md:block w-full h-full object-cover animate-slowZoom"
        />

        {/* Mobile Image */}
        <img
          src="/bg-mobile.png"
          alt="Gym Hero Mobile"
          className="block md:hidden w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-red-900/20" />

        {/* Right Red Bars */}
        <div className="absolute top-0 right-0 h-full w-[140px] md:w-[220px] opacity-40">
          <div className="absolute right-4 md:right-10 top-24 w-4 md:w-6 h-52 md:h-64 bg-red-600 rounded-full" />
          <div className="absolute right-14 md:right-24 top-40 w-4 md:w-6 h-64 md:h-72 bg-red-600 rounded-full" />
          <div className="absolute right-24 md:right-40 top-10 w-4 md:w-6 h-40 md:h-52 bg-red-600 rounded-full" />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-10 min-h-[900px] lg:min-h-screen flex items-end lg:items-start pt-80 lg:pt-[150px] pb-16">
        <div className="max-w-2xl w-full">
          {/* ================= HEADING ================= */}
          <h1 className="uppercase leading-[0.9] font-black">
            {/* Line 1 */}
            <div
              className={`text-white text-3xl sm:text-5xl lg:text-7xl italic transition-all duration-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              YOUR CITY.
            </div>

            {/* Line 2 */}
            <div
              className={`text-3xl sm:text-5xl lg:text-7xl italic font-black transition-all duration-700 delay-150 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="text-white">YOUR </span>
              <span className="text-red-600">FITNESS.</span>
            </div>

            {/* Line 3 */}
            <div
              className={`text-3xl sm:text-5xl lg:text-7xl italic font-black transition-all duration-700 delay-300 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="text-white">YOUR </span>
              <span className="text-red-600">BEST SELF.</span>
            </div>
          </h1>

          {/* ================= PARAGRAPH ================= */}
          <p
            className={`mt-4 md:mt-6 text-gray-300 text-sm md:text-lg leading-relaxed max-w-xs md:max-w-lg transition-all duration-700 delay-500 ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Fit City is more than a gym. It's a community that empowers you to
            be stronger, healthier and unstoppable.
          </p>

          {/* ================= BUTTONS ================= */}
          <div
            className={`flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 transition-all duration-700 delay-700 ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="#membership"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Join Fit City
            </a>

            <a
              href="#video"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3 border border-white/20 hover:border-red-600 text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-all duration-300 hover:bg-white/5"
            >
              <span className="w-8 h-8 rounded-full border border-red-600 flex items-center justify-center text-red-600">
                <Play size={12} fill="currentColor" />
              </span>
              Watch Video
            </a>
          </div>

          {/* ================= FEATURES ================= */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 mt-10 md:mt-14 transition-all duration-700 delay-1000 ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-start text-left sm:items-center sm:text-center group"
                >
                  <div className="flex items-center justify-center text-red-600 text-3xl md:text-4xl transition-all duration-300 group-hover:scale-110">
                    <Icon />
                  </div>
                  <span className="mt-2 text-[10px] md:text-xs uppercase tracking-widest text-white font-semibold leading-relaxed">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= SCROLL ================= */}
      <a
        href="#programs"
        className="hidden md:flex absolute bottom-8 right-6 z-30 flex-col items-center text-white/50 hover:text-red-600 transition-all"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] rotate-90 mb-6">
          Scroll
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}