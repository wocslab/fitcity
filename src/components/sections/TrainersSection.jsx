import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const trainers = [
  { name: "Siddique", image: "/trainers/siddique.jpeg" },
  { name: "Akhil",    image: "/trainers/akhil.jpeg"    },
  { name: "Aswin",    image: "/trainers/aswin.jpeg"    },
  { name: "Ammu",     image: "/trainers/ammu.jpeg"     },
];

function TrainerCard({ trainer, role }) {
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
        </div>
        <div className="p-5">
          <h3 className="title-gotham text-xl font-bold uppercase tracking-wide text-white">
            {trainer.name}
          </h3>
          <p className="title-gotham mt-1 text-sm font-medium text-red-600">
            {role}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}

export default function TrainersSection() {
  const sliderRef   = useRef(null);
  const [dragging, setDragging] = useState(false);
  const { t } = useLanguage();

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

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let startX = 0, startY = 0, scrollLeft = 0;
    let lastX = 0, lastTime = 0, velocity = 0;
    let isHoriz = null, rafId = null;

    const onTouchStart = (e) => {
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
      if (isHoriz === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        isHoriz = Math.abs(dx) >= Math.abs(dy);
      }
      if (!isHoriz) return;
      e.preventDefault();
      const now = Date.now();
      velocity  = (e.touches[0].clientX - lastX) / (now - lastTime || 1);
      lastX     = e.touches[0].clientX;
      lastTime  = now;
      el.scrollLeft = scrollLeft - dx;
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

  const headingAccent = t('trainers', 'headingAccent');
  const heading = t('trainers', 'heading');
  const role = t('trainers', 'role');

  return (
    <section id="trainers" className="relative overflow-hidden bg-black py-10 md:py-12">
      <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="title-gotham uppercase text-white font-semibold text-2xl sm:text-3xl">
              <span className="text-red-600">{headingAccent}</span>{heading ? ` ${heading}` : ''}
            </h2>
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
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
          }}
          className="flex gap-5 pb-4 select-none [&::-webkit-scrollbar]:hidden"
        >
          {trainers.map((trainer, i) => (
            <TrainerCard key={i} trainer={trainer} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
