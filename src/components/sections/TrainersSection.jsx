import { useState } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const trainers = [
  {
    name: "Akhil",
    role: "Strength Coach",
    image: "/trainers/akhil.png",
    specialty: "Powerlifting & Hypertrophy",
  },

  {
    name: "Ammu",
    role: "Fitness Trainer",
    image: "/trainers/ammu.png",
    specialty: "Functional & HIIT",
  },

  {
    name: "Aswin",
    role: "HIIT Specialist",
    image: "/trainers/aswin.png",
    specialty: "Conditioning & Cardio",
  },

  {
    name: "Rajinas",
    role: "Yoga Instructor",
    image: "/trainers/rajinas.png",
    specialty: "Yoga & Mobility",
  },

  {
    name: "Siddique",
    role: "CrossFit Coach",
    image: "/trainers/siddique.png",
    specialty: "Strength & Endurance",
  },
];

export default function TrainersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // cards per screen
  const visibleCards =
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 1
        : window.innerWidth < 1024
        ? 2
        : 4
      : 4;

  const maxIndex = trainers.length - visibleCards;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section
      id="trainers"
      className="relative overflow-hidden bg-black py-20 md:py-24"
    >
      {/* Background Glow */}
      <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-red-600" />

            <h2 className="uppercase text-white font-semibold text-2xl sm:text-3xl">
              <span className="text-red-600">Our</span> Trainers
            </h2>
          </div>

          {/* ================= ARROWS ================= */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className={`flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border transition-all duration-300
              ${
                currentIndex === 0
                  ? "border-white/10 text-gray-600 cursor-not-allowed"
                  : "border-red-600/30 text-white hover:bg-red-600 hover:border-red-600"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className={`flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border transition-all duration-300
              ${
                currentIndex >= maxIndex
                  ? "border-white/10 text-gray-600 cursor-not-allowed"
                  : "border-red-600/30 text-white hover:bg-red-600 hover:border-red-600"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleCards)
              }%)`,
            }}
          >
            {trainers.map((trainer, i) => (
              <div
                key={i}
                className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111]
                  transition-all duration-500 hover:-translate-y-2
                  hover:border-red-600/40
                  hover:shadow-[0_0_35px_rgba(220,38,38,0.18)]"
                >
                  {/* ================= IMAGE ================= */}
<div className="relative h-[420px] sm:h-80 overflow-hidden">                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />

                    {/* Social Icons */}
                    <div
                      className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-5
                      transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      {[Instagram, Facebook, Twitter].map((Icon, j) => (
                        <a
                          key={j}
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white
                          transition-all duration-300 hover:scale-110 hover:bg-red-700"
                        >
                          <Icon size={15} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* ================= INFO ================= */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                      {trainer.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-red-600">
                      {trainer.role}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {trainer.specialty}
                    </p>
                  </div>

                  {/* Bottom Hover Line */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600
                    transition-all duration-500 group-hover:w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}