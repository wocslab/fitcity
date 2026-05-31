import { useState, useRef, useEffect } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const trainers = [
    { name: "Siddique", role: "CrossFit Coach",   image: "/trainers/siddique.png", specialty: "Strength & Endurance" },

  { name: "Akhil",    role: "Strength Coach",   image: "/trainers/akhil.png",    specialty: "Powerlifting & Hypertrophy" },
    { name: "Aswin",    role: "HIIT Specialist",  image: "/trainers/aswin.png",    specialty: "Conditioning & Cardio" },

  { name: "Ammu",     role: "Fitness Trainer",  image: "/trainers/ammu.png",     specialty: "Functional & HIIT" },
];

function SocialIcons() {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-5 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
      <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-all duration-300 hover:scale-110 hover:bg-red-700">
        <Instagram size={15} />
      </a>
      <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-all duration-300 hover:scale-110 hover:bg-red-700">
        <Facebook size={15} />
      </a>
      <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-all duration-300 hover:scale-110 hover:bg-red-700">
        <Twitter size={15} />
      </a>
    </div>
  );
}

function TrainerCard({ trainer }) {
  return (
    <div className="flex-shrink-0 w-[80vw] sm:w-[260px] lg:w-[calc(25%-15px)]">
      <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111] transition-all duration-500 hover:-translate-y-2 hover:border-red-600/40 hover:shadow-[0_0_35px_rgba(220,38,38,0.18)]">
        <div className="relative h-[420px] sm:h-80 overflow-hidden">
          <img
            src={trainer.image}
            alt={trainer.name}
            draggable={false}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />
          <SocialIcons />
        </div>
        <div className="p-5">
          <h3 className="title-gotham text-xl font-bold uppercase tracking-wide text-white">
            {trainer.name}
          </h3>
          <p className="title-gotham mt-1 text-sm font-medium text-red-600">
            Fitness Trainer
          </p>
          {/* <p className="mt-3 text-sm leading-relaxed text-gray-400">
            {trainer.specialty}
          </p> */}
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}

export default function TrainersSection() {
  const sliderRef   = useRef(null);
  const [dragging, setDragging] = useState(false);

  // ── Desktop pointer drag ──────────────────────────────────────────
  const isPointerDragging = useRef(false);
  const pointerStartX     = useRef(0);
  const pointerScrollStart = useRef(0);
  const pointerLastX      = useRef(0);
  const pointerVelocity   = useRef(0);

  function handlePointerDown(e) {
    if (e.button !== 0) return;
    isPointerDragging.current   = true;
    pointerStartX.current       = e.clientX;
    pointerLastX.current        = e.clientX;
    pointerVelocity.current     = 0;
    pointerScrollStart.current  = sliderRef.current.scrollLeft;
    sliderRef.current.setPointerCapture(e.pointerId);
    setDragging(true);
  }
  function handlePointerMove(e) {
    if (!isPointerDragging.current) return;
    pointerVelocity.current = e.clientX - pointerLastX.current;
    pointerLastX.current    = e.clientX;
    sliderRef.current.scrollLeft = pointerScrollStart.current + (pointerStartX.current - e.clientX);
  }
  function handlePointerUp() {
    if (!isPointerDragging.current) return;
    isPointerDragging.current = false;
    setDragging(false);
    sliderRef.current.scrollBy({ left: -pointerVelocity.current * 4, behavior: "smooth" });
  }

  // ── Touch handling ────────────────────────────────────────────────
  // Attached via useEffect with { passive: false } so e.preventDefault()
  // actually works (React synthetic handlers are always passive).
  // Includes velocity tracking + momentum flick on touchend.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let startX       = 0;
    let startY       = 0;
    let scrollLeft   = 0;
    let lastX        = 0;
    let lastTime     = 0;
    let velocity     = 0;
    let isHoriz      = null;  // direction locked on first move
    let rafId        = null;

    const onTouchStart = (e) => {
      // cancel any ongoing momentum
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

      startX     = e.touches[0].clientX;
      startY     = e.touches[0].clientY;
      scrollLeft = el.scrollLeft;
      lastX      = startX;
      lastTime   = Date.now();
      velocity   = 0;
      isHoriz    = null;
    };

    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // Lock direction on first significant move
      if (isHoriz === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        isHoriz = Math.abs(dx) >= Math.abs(dy);
      }
      if (!isHoriz) return; // vertical — let page scroll naturally

      e.preventDefault(); // block page scroll while swiping slider

      // Track velocity (px/ms) using last two frames
      const now = Date.now();
      const dt  = now - lastTime || 1;
      velocity  = (e.touches[0].clientX - lastX) / dt;
      lastX     = e.touches[0].clientX;
      lastTime  = now;

      el.scrollLeft = scrollLeft - dx;
    };

    const onTouchEnd = () => {
      if (!isHoriz) return;

      // Momentum: decay velocity with rAF for buttery feel
      let v = velocity * 16; // scale to px/frame (~16ms)

      const momentum = () => {
        if (Math.abs(v) < 0.5) return;
        el.scrollLeft -= v;
        v *= 0.92; // friction factor — tune between 0.88 (fast stop) and 0.95 (long glide)
        rafId = requestAnimationFrame(momentum);
      };
      rafId = requestAnimationFrame(momentum);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true  });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true  });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  function handleScrollLeft()  { sliderRef.current.scrollBy({ left: -300, behavior: "smooth" }); }
  function handleScrollRight() { sliderRef.current.scrollBy({ left:  300, behavior: "smooth" }); }

  return (
    <section id="trainers" className="relative overflow-hidden bg-black py-10 md:py-12">
      <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="title-gotham uppercase text-white font-semibold text-2xl sm:text-3xl">
              <span className="text-red-600">Our</span> Trainers
            </h2>
          </div>
          {/* <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleScrollLeft}
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-red-600/30 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleScrollRight}
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-red-600/30 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div> */}
        </div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            cursor: dragging ? "grabbing" : "grab",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            // Disable browser's own touch-scroll on this element so our
            // JS momentum takes over; vertical scroll still works on the page
            touchAction: "pan-y",
          }}
          className="flex gap-5 pb-4 select-none [&::-webkit-scrollbar]:hidden"
        >
          {trainers.map((trainer, i) => (
            <TrainerCard key={i} trainer={trainer} />
          ))}
        </div>

       
      </div>
    </section>
  );
}