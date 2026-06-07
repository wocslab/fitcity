import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import {
  RiBoxingLine, RiFlashlightLine, RiTeamLine,
  RiHeartPulseLine, RiFireLine, RiRunLine,
} from "react-icons/ri";
import { useLanguage } from "../../context/LanguageContext";

const programIcons = [RiRunLine, RiFlashlightLine, RiTeamLine, RiBoxingLine, RiFireLine, RiHeartPulseLine];
const programLinks = ['#membership', '#membership', '#pt-plans', '#membership', '#membership', '#membership'];
const programImages = [
  '/program/aerobics.png',
  '/program/fitness.jpeg',
  '/program/personal.jpeg',
  '/program/strength-training.png',
  '/program/weight-loss.png',
  '/program/nutrition.png',
];

export default function ProgramsSection() {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const { t, lang } = useLanguage();

  const isPointerDragging  = useRef(false);
  const pointerStartX      = useRef(0);
  const pointerScrollStart = useRef(0);
  const pointerLastX       = useRef(0);
  const pointerVelocity    = useRef(0);

  const scrollLeft  = () => sliderRef.current.scrollBy({ left: -370, behavior: "smooth" });
  const scrollRight = () => sliderRef.current.scrollBy({ left:  370, behavior: "smooth" });

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    isPointerDragging.current  = true;
    pointerStartX.current      = e.clientX;
    pointerLastX.current       = e.clientX;
    pointerVelocity.current    = 0;
    pointerScrollStart.current = sliderRef.current.scrollLeft;
    sliderRef.current.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!isPointerDragging.current) return;
    pointerVelocity.current = e.clientX - pointerLastX.current;
    pointerLastX.current    = e.clientX;
    sliderRef.current.scrollLeft = pointerScrollStart.current + (pointerStartX.current - e.clientX);
  };
  const onPointerUp = () => {
    if (!isPointerDragging.current) return;
    isPointerDragging.current = false;
    setDragging(false);
    sliderRef.current.scrollBy({ left: -pointerVelocity.current * 4, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let startX = 0, startY = 0, scrollL = 0;
    let lastX = 0, lastTime = 0, velocity = 0;
    let isHoriz = null, rafId = null;

    const onTouchStart = (e) => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      startX   = e.touches[0].clientX;
      startY   = e.touches[0].clientY;
      scrollL  = el.scrollLeft;
      lastX    = startX;
      lastTime = Date.now();
      velocity = 0;
      isHoriz  = null;
    };
    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (isHoriz === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        isHoriz = Math.abs(dx) >= Math.abs(dy);
      }
      if (!isHoriz) return;
      e.preventDefault();
      const now = Date.now();
      velocity  = (e.touches[0].clientX - lastX) / (now - lastTime || 1);
      lastX     = e.touches[0].clientX;
      lastTime  = now;
      el.scrollLeft = scrollL - dx;
    };
    const onTouchEnd = () => {
      if (!isHoriz) return;
      let v = velocity * 16;
      const momentum = () => {
        if (Math.abs(v) < 0.5) return;
        el.scrollLeft -= v;
        v *= 0.92;
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

  const programs = t('programs', 'items');
  const headingAccent = t('programs', 'headingAccent');
  const heading = t('programs', 'heading');

  return (
    <section id="programs" className="relative overflow-hidden bg-black py-10 md:py-16">
      <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="title-gotham uppercase text-white font-bold text-2xl sm:text-3xl">
            <span className="text-red-600">{headingAccent}</span>{heading ? ` ${heading}` : ''}
          </span>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#111] text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#111] text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            cursor: dragging ? "grabbing" : "grab",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
          }}
          className="flex gap-6 pb-4 select-none [&::-webkit-scrollbar]:hidden"
        >
          {programs.map((program, i) => {
            const Icon = programIcons[i];
            return (
              <div
                key={i}
                className="group relative flex-shrink-0 w-[80vw] sm:w-[320px] lg:w-[350px]
                  overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f0f]
                  hover:border-red-600/40 hover:shadow-[0_0_35px_rgba(220,38,38,0.2)]
                  hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={programImages[i]}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at top, rgba(220,38,38,0.18), transparent 65%)" }}
                  />
                  <div className="absolute bottom-5 left-5 rtl:left-auto rtl:right-5 flex h-14 w-14 items-center justify-center
                    rounded-2xl border border-red-600/30 bg-black/70 backdrop-blur-md
                    transition-all duration-500 group-hover:bg-red-600 group-hover:scale-110 group-hover:rotate-3"
                  >
                    <Icon className="text-2xl text-red-600 transition-colors duration-500 group-hover:text-white" />
                  </div>
                </div>

                <div className="relative z-10 p-6">
                  <h3 className="title-gotham text-xl font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-red-500">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{program.desc}</p>
                  <a
                    href={programLinks[i]}
                    className="title-gotham mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 transition-all duration-300 hover:gap-3"
                  >
                    {t('programs', 'learnMore')}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
                  </a>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
