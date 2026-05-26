import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setPhase("exit");
      onComplete?.();
    }, 1800);

    return () => clearTimeout(holdTimer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "exit"
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* Logo Only */}
      <div className="relative mb-8 flex items-center justify-center">
        <span className="absolute w-32 h-32 rounded-full bg-red-600/15 animate-ping" />

        <span
          className="absolute w-34 h-34 rounded-full bg-red-600/10 animate-ping"
          style={{ animationDelay: "0.4s" }}
        />
<img
  src="/logo.png"
  alt="Fit City Logo"
  className="relative w-40 h-38 sm:w-44 sm:h-40 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse"
  style={{ animationDuration: "2s" }}
/>
      </div>

      {/* Loading Bar */}
      <div className="mt-6 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-red-600 rounded-full loading-bar" />
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