import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const images = [
  { src: "/gallery/1.jpeg", alt: "Gym Floor" },
  { src: "/gallery/2.jpeg", alt: "Weight Area" },
  { src: "/gallery/3.jpeg", alt: "Cardio Zone" },
  { src: "/gallery/4.jpeg", alt: "Training Session" },
];

// ── Replace with your actual video file path or YouTube/Vimeo embed URL ──
const VIDEO_SRC = "/v.mp4";

export default function GallerySection() {
  const sliderRef   = useRef(null);
  const videoRef    = useRef(null);
  const [dragging, setDragging]       = useState(false);
  const [playing, setPlaying]         = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // ── Desktop pointer drag ──────────────────────────────────────────
  const isPointerDragging  = useRef(false);
  const pointerStartX      = useRef(0);
  const pointerScrollStart = useRef(0);
  const pointerLastX       = useRef(0);
  const pointerVelocity    = useRef(0);

  function handlePointerDown(e) {
    if (e.button !== 0) return;
    isPointerDragging.current  = true;
    pointerStartX.current      = e.clientX;
    pointerLastX.current       = e.clientX;
    pointerVelocity.current    = 0;
    pointerScrollStart.current = sliderRef.current.scrollLeft;
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

  // ── Touch with velocity + rAF momentum ───────────────────────────
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

  function handleScrollLeft()  { sliderRef.current.scrollBy({ left: -420, behavior: "smooth" }); }
  function handleScrollRight() { sliderRef.current.scrollBy({ left:  420, behavior: "smooth" }); }

  function handlePlay() {
    setPlaying(true);
    // Load video only when user clicks play (lazy load)
    setVideoLoaded(true);
    setTimeout(() => videoRef.current?.play(), 50);
  }

  return (
    <section id="gallery" className="relative overflow-hidden pt-16 md:py-20 bg-black">

      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-10">
          <h2
            data-aos="fade-right"
            data-aos-duration="700"
            className="title-gotham uppercase text-white font-bold text-2xl sm:text-3xl"
          >
            <span className="text-red-600">Our</span> Gallery
          </h2>

          {/* <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleScrollLeft}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#111] text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleScrollRight}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#111] text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div> */}
        </div>

        {/* ── IMAGE SLIDER ────────────────────────────────────────── */}
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
          className="flex gap-4 pb-2 select-none [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={i * 80}
              className="group relative flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 hover:border-red-600/40 transition-all duration-500 w-[80vw] sm:w-[340px] lg:w-[calc(25%-12px)] h-64 sm:h-80"
            >
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* ── VIDEO ROW ───────────────────────────────────────────── */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
          className="mt-4 relative w-full overflow-hidden rounded-2xl border border-white/5 hover:border-red-600/40 transition-all duration-500"
          style={{ aspectRatio: "16/7" }}
        >
          {/* Thumbnail + play button shown before user clicks */}
          {!playing && (
            <div id="video" className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
              {/* Poster image — replace with your own thumbnail */}
              <img
                src="/thump.png"
                alt="Gym video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <button
                onClick={handlePlay}
                aria-label="Play video"
                className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300 hover:scale-110"
              >
                <Play size={28} className="text-white ml-1" fill="white" />
              </button>
            </div>
          )}

          {/* Video — only loaded after play clicked (lazy) */}
          {videoLoaded && (
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              controls
              playsInline
              preload="none"
              className="w-full h-full object-cover"
              onPause={() => setPlaying(false)}
            />
          )}
        </div>

      </div>
    </section>
  );
}