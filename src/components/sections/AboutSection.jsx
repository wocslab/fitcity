import {
  ArrowRight,
  Dumbbell,
  Trophy,
  Sparkles,
  Target,
  BadgeDollarSign,
} from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Top-Class Equipment',
    desc: 'Premium machines and free weights covering every muscle group — everything you need, nothing you don\'t.',
  },
  {
    icon: Trophy,
    title: 'Expert Coaches',
    desc: 'Experienced trainers with great vibes and real expertise. Personalized guidance for your specific goals.',
  },
  {
    icon: Sparkles,
    title: 'Spotless Facility',
    desc: 'Hygiene is taken seriously here. Clean equipment, fresh atmosphere, impeccable standards every day.',
  },
  {
    icon: Target,
    title: 'Incredible Ambience',
    desc: 'Inspiring wall graphics and a motivating atmosphere that elevates every workout session.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Unbeatable Value',
    desc: 'World-class facilities at prices that make sense. No nonsense, no hidden fees — just results.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Large red text BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] text-white/[0.02] pointer-events-none select-none uppercase whitespace-nowrap">
        FIT CITY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Text */}
          <div className="reveal-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-brand-red" />
              <span className="text-brand-red text-xs font-accent tracking-[0.3em] uppercase">About Us</span>
            </div>
            <h2 className="foy text-5xl font-semibold sm:text-6xl text-white uppercase tracking-wide leading-tight mb-6">
              Built For{' '}
              <span className="text-brand-red">Your Best</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Everything you need. Nothing you don't. Premium facilities. Expert guidance. Real results.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              At Fit City, we believe every person deserves access to world-class fitness. We've created an environment where beginners feel welcome and elite athletes thrive — a space where transformation is expected.
            </p>
            <a
              href="#membership"
              className="group inline-flex items-center gap-3 bg-brand-red text-white px-8 py-4 font-semibold  tracking-widest uppercase text-sm hover:bg-brand-red-dark transition-colors duration-300"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          {/* Right: Photo/Stats */}
          <div className="reveal-right relative">
            <div className="relative h-[400px] bg-brand-dark-3 border border-white/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="Fit City gym interior"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent" />
              {/* Stat overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark to-transparent">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: '5+', l: 'Years' },
                    { v: '1000+', l: 'Members' },
                    { v: '98%', l: 'Satisfaction' },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="font-seibold text-brand-red text-2xl">{s.v}</div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-red" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-red" />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
className="reveal group p-6 border-2 border-brand-red/40 bg-transparent hover:border-brand-red transition-all duration-300 card-hover rounded-lg"              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 border-2 border-brand-red rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-red/10 transition-all duration-300">
  <feature.icon
    size={22}
    className="text-brand-red"
    strokeWidth={2}
  />
</div>
              <h3 className="font-semibold text-white text-xl uppercase tracking-wide mb-2 group-hover:text-brand-red transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}

          {/* CTA card */}
          <div className="reveal group p-6 bg-brand-red relative overflow-hidden card-hover" style={{ transitionDelay: '0.5s' }}>
            <div className="absolute top-0 right-0 font-display text-8xl text-white/10 leading-none">→</div>
            <h3 className="font-semibold text-white text-xl uppercase tracking-wide mb-2">Ready to Level Up?</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Join FitCity Gym and be your best, every day.
            </p>
            <a
              href="#membership"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-brand-red transition-all duration-300"
            >
              Get Started <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
