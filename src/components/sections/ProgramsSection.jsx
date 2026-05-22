import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

import {
  RiBoxingLine,
  RiFlashlightLine,
  RiTeamLine,
  RiHeartPulseLine,
  RiFireLine,
  RiRunLine,
} from "react-icons/ri";

const programs = [
  {
    id: 1,
    title: "Aerobics",
    desc: "Boost stamina, improve flexibility and burn calories through energetic cardio-focused sessions.",
    image: "/program/aerobics.png",
    icon: RiRunLine,
  },

  {
    id: 2,
    title: "Fitness Program",
    desc: "A complete body conditioning program designed to improve strength, endurance and mobility.",
    image: "/program/fitness.png",
    icon: RiFlashlightLine,
  },

  {
    id: 3,
    title: "Personal Training",
    desc: "Get one-on-one expert guidance with customized workouts tailored to your fitness goals.",
    image: "/program/personal.png",
    icon: RiTeamLine,
  },

  {
    id: 4,
    title: "Strength Training",
    desc: "Build muscle, increase power and develop total-body strength with progressive training plans.",
    image: "/program/strength-training.png",
    icon: RiBoxingLine,
  },

  {
    id: 5,
    title: "Weight Loss & Gain",
    desc: "Scientifically designed programs focused on healthy fat loss or effective muscle weight gain.",
    image: "/program/weight-loss.png",
    icon: RiFireLine,
  },

  {
    id: 6,
    title: "Nutritional Program",
    desc: "Personalized nutrition guidance and meal planning to support your fitness transformation.",
    image: "/program/nutrition.png",
    icon: RiHeartPulseLine,
  },
];

export default function ProgramsSection() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-black py-20 md:py-24"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-red-600" />

              <span className="uppercase text-white font-bold text-2xl sm:text-3xl">
                <span className="text-red-600">Our</span> Programs
              </span>
            </div>
          </motion.div>

          {/* ================= ARROWS ================= */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#111]
              text-white flex items-center justify-center
              hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={scrollRight}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#111]
              text-white flex items-center justify-center
              hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-hidden scroll-smooth pb-4"
        >
          {programs.map((program, i) => {
            const Icon = program.icon;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="
                group relative flex-shrink-0
                w-[85vw]
                sm:w-[320px]
                lg:w-[350px]
                overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f0f]
                hover:border-red-600/40
                hover:shadow-[0_0_35px_rgba(220,38,38,0.2)]
                transition-all duration-500
                "
              >
                {/* ================= IMAGE ================= */}
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  {/* Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at top, rgba(220,38,38,0.18), transparent 65%)",
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center
                    rounded-2xl border border-red-600/30 bg-black/70 backdrop-blur-md
                    transition-all duration-500 group-hover:bg-red-600"
                  >
                    <Icon className="text-2xl text-red-600 transition-colors duration-500 group-hover:text-white" />
                  </motion.div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="relative z-10 p-6">
                  <h3
                    className="text-xl font-bold uppercase tracking-wide text-white
                    transition-colors duration-300 group-hover:text-red-500"
                  >
                    {program.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {program.desc}
                  </p>

                  {/* Button */}
                  <motion.a
                    href="#"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]
                    text-red-500 transition-all duration-300"
                  >
                    Learn More

                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.a>
                </div>

                {/* Bottom Border */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-[2px] bg-red-600"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}