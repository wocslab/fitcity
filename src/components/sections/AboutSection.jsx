import {
  ArrowRight,
  Dumbbell,
  Trophy,
  Sparkles,
  Target,
  BadgeDollarSign,
  Star,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const featureIcons = [Dumbbell, Trophy, Sparkles, Target, BadgeDollarSign];

export default function AboutSection() {
  const { t } = useLanguage();
  const features = t('about', 'features');

  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] text-white/[0.02] pointer-events-none select-none uppercase whitespace-nowrap">
        FIT CITY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left: Text */}
          <div className="reveal-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="title-gotham text-brand-red text-xs font-accent tracking-[0.3em] uppercase">
                {t('about', 'label')}
              </span>
            </div>
            <h2 className="title-gotham text-5xl font-semibold sm:text-6xl text-white uppercase tracking-wide leading-tight mb-6">
              {t('about', 'headingLine1')}{' '}
              <span className="text-brand-red">{t('about', 'headingLine2')}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              {t('about', 'para1')}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {t('about', 'para2')}
            </p>
            <a
              href="#membership"
              className="title-gotham group inline-flex rounded-xl items-center gap-3 bg-brand-red text-white px-8 py-4 font-semibold tracking-widest uppercase text-sm hover:bg-brand-red-dark transition-colors duration-300"
            >
              {t('about', 'cta')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200 rtl:rotate-180" />
            </a>
          </div>

          {/* Right: Photo/Stats */}
          <div className="reveal-right relative">
            <div className="relative h-[400px] bg-brand-dark-3 border rounded-2xl border-white/5 overflow-hidden">
              <img
                src="/about.jpeg"
                alt="Fit City gym interior"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark to-transparent">
  <div className="grid grid-cols-3 gap-4">
    {[
      { v: '1+', lKey: 'statYears' },
      { v: '1500+', lKey: 'statMembers' },
      { v: '4.9', lKey: 'statRating', rating: true },
    ].map((s) => (
      <div key={s.lKey} className="text-center">
        <div className="title-gotham text-brand-red text-2xl flex items-center justify-center gap-1">
          {s.v}

          {s.rating && (
            <Star size={22} fill="currentColor" strokeWidth={0} className="text-yellow-400" />
          )}
        </div>

        <div className="title-gotham text-gray-400 text-xs uppercase tracking-wider">
          {t('about', s.lKey)}
        </div>
      </div>
    ))}
  </div>
</div>
            </div>
            <div className="absolute -top-4 ltr:-right-4 rtl:-left-4 w-24 h-24 border-t-2 ltr:border-r-2 rtl:border-l-2 border-brand-red ltr:rounded-tr-2xl rtl:rounded-tl-2xl" />
            <div className="absolute -bottom-4 ltr:-left-4 rtl:-right-4 w-24 h-24 border-b-2 ltr:border-l-2 rtl:border-r-2 border-brand-red ltr:rounded-bl-2xl rtl:rounded-br-2xl" />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={i}
                className="reveal group p-6 border-2 border-brand-red/40 bg-transparent hover:border-brand-red transition-all duration-300 card-hover rounded-lg"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 border-2 border-brand-red rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-red/10 transition-all duration-300">
                  <Icon size={22} className="text-brand-red" strokeWidth={2} />
                </div>
                <h3 className="title-gotham font-semibold text-white text-xl uppercase tracking-wide mb-2 group-hover:text-brand-red transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}

          {/* CTA card */}
          <div className="reveal group p-6 bg-brand-red relative overflow-hidden rounded-xl card-hover" style={{ transitionDelay: '0.5s' }}>
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 font-display text-8xl text-white/10 rounded-xl leading-none">→</div>
            <h3 className="title-gotham font-semibold text-white text-xl uppercase tracking-wide mb-2">
              {t('about', 'ctaCardHeading')}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              {t('about', 'ctaCardDesc')}
            </p>
            <a
              href="#membership"
              className="title-gotham inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 text-sm font-semibold tracking-widest uppercase hover:bg-white rounded-xl hover:text-brand-red transition-all duration-300"
            >
              {t('about', 'ctaCardBtn')} <ArrowRight size={14} className="rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
