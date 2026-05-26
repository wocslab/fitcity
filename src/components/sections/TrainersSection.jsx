import { useState, useRef, useEffect } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const trainers = [
  { name: "Akhil",    role: "Strength Coach",   image: "/trainers/akhil.png",    specialty: "Powerlifting & Hypertrophy" },
  { name: "Ammu",     role: "Fitness Trainer",  image: "/trainers/ammu.png",     specialty: "Functional & HIIT" },
  { name: "Aswin",    role: "HIIT Specialist",  image: "/trainers/aswin.png",    specialty: "Conditioning & Cardio" },
  { name: "Rajinas",  role: "Yoga Instructor",  image: "/trainers/rajinas.png",  specialty: "Yoga & Mobility" },
  { name: "Siddique", role: "CrossFit Coach",   image: "/trainers/siddique.png", specialty: "Strength & Endurance" },
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
        {/* IMAGE */}
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

        {/* INFO */}
        <div className="p-5">
          <h3 className="title-gotham text-xl font-bold uppercase tracking-wide text-white">
            {trainer.name}
          </h3>
          <p className="title-gotham mt-1 text-sm font-medium text-red-600">
            {trainer.role}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            {trainer.specialty}
          </p>
        </div>

        {/* Bottom Hover Line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}

export default function TrainersSection() {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const lastX       = useRef(0);
  const velocity    = useRef(0);

  // ── Desktop pointer drag ──────────────────────────────────────────
  function handlePointerDown(e) {
    if (e.button !== 0) return;
    isDragging.current  = true;
    startX.current      = e.clientX;
    lastX.current       = e.clientX;
    velocity.current    = 0;
    scrollStart.current = sliderRef.current.scrollLeft;
    sliderRef.current.setPointerCapture(e.pointerId);
    setDragging(true);
  }
  function handlePointerMove(e) {
    if (!isDragging.current) return;
    velocity.current = e.clientX - lastX.current;
    lastX.current    = e.clientX;
    sliderRef.current.scrollLeft = scrollStart.current + (startX.current - e.clientX);
  }
  function handlePointerUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    sliderRef.current.scrollBy({ left: -velocity.current * 4, behavior: "smooth" });
  }

  // ── Native touch — useEffect so we can pass { passive: false } ───
  // Required to call e.preventDefault() and block vertical page scroll
  // while the user is swiping horizontally inside the slider.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let touchStartX     = 0;
    let touchStartY     = 0;
    let scrollStartLeft = 0;
    let isHorizontal    = null;

    const onTouchStart = (e) => {
      touchStartX     = e.touches[0].clientX;
      touchStartY     = e.touches[0].clientY;
      scrollStartLeft = el.scrollLeft;
      isHorizontal    = null;
    };

    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;

      if (isHorizontal === null) {
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      }

      if (isHorizontal) {
        e.preventDefault(); // stop page from scrolling vertically
        el.scrollLeft = scrollStartLeft - dx;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  function handleScrollLeft()  { sliderRef.current.scrollBy({ left: -300, behavior: "smooth" }); }
  function handleScrollRight() { sliderRef.current.scrollBy({ left:  300, behavior: "smooth" }); }

  return (
    <section id="trainers" className="relative overflow-hidden bg-black py-20 md:py-24">
      <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="title-gotham uppercase text-white font-semibold text-2xl sm:text-3xl">
              <span className="text-red-600">Our</span> Trainers
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
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
          </div>
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
            WebkitOverflowScrolling: "touch",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="flex gap-5 pb-4 scroll-smooth select-none [&::-webkit-scrollbar]:hidden"
        >
          {trainers.map((trainer, i) => (
            <TrainerCard key={i} trainer={trainer} />
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-white/20 sm:hidden tracking-widest uppercase">
          ← swipe to explore →
        </p>
      </div>
    </section>
  );
}