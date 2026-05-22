import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    // Hold for 1.8s → start exit fade AND notify parent simultaneously
    const holdTimer = setTimeout(() => {
      setPhase("exit");
      onComplete?.();
    }, 1800);
    return () => clearTimeout(holdTimer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated red bars background — mirrors the hero section */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-4 top-24 w-4 h-52 bg-red-600 rounded-full opacity-20 animate-pulse" />
        <div className="absolute right-14 top-40 w-4 h-64 bg-red-600 rounded-full opacity-15 animate-pulse delay-200" />
        <div className="absolute right-24 top-10 w-4 h-40 bg-red-600 rounded-full opacity-20 animate-pulse delay-500" />
        <div className="absolute left-6 bottom-32 w-3 h-36 bg-red-600 rounded-full opacity-10 animate-pulse delay-300" />
      </div> */}

      {/* Logo block */}
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          phase === "enter" ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ animationFillMode: "forwards" }}
      >
        {/* Logo image */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Glow pulse rings */}
          <span className="absolute w-32 h-32 rounded-full bg-red-600/15 animate-ping" />
          <span className="absolute w-24 h-24 rounded-full bg-red-600/10 animate-ping" style={{ animationDelay: "0.4s" }} />

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Fit City Logo"
            className="relative w-28 h-28 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </div>

        {/* Premium wordmark */}
        <div className="text-center mb-8">
          <div className="relative flex items-center justify-center gap-3">
            {/* Left thin line */}
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />

            <div className="flex items-baseline gap-[6px]">
              <span
                className="font-black uppercase italic tracking-[0.15em] text-2xl leading-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FIT
              </span>
              <span
                className="font-black uppercase italic tracking-[0.15em] text-2xl leading-none"
                style={{
                  background: "linear-gradient(180deg, rgba(220,38,38,0.95) 0%, rgba(220,38,38,0.35) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CITY
              </span>
            </div>

            {/* Right thin line */}
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Tagline */}
          <p className="mt-2 text-[9px] uppercase tracking-[0.45em] font-medium"
            style={{ color: "rgba(255,255,255,0.2)" }}>
            Stronger Every Day
          </p>
        </div>

        {/* Loading bar */}
        <div className="mt-10 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 rounded-full loading-bar" />
        </div>
      </div>

      <style>{`
        .loading-bar {
          width: 0%;
          animation: loadBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes loadBar {
          0%   { width: 0%; }
          60%  { width: 80%; }
          85%  { width: 90%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}