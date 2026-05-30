import { useState } from 'react';
import { ArrowRight, Flame, Users, UserCheck, GraduationCap } from 'lucide-react';
import { RiMedalLine, RiEyeOffLine, RiPauseLine, RiCloseLine } from 'react-icons/ri';

const WHATSAPP_NUMBER = '971501695989';

function getWhatsappURL(plan, tab) {
  const bonus = plan.bonus ? ` (${plan.bonus})` : '';
  const msg = `Hi, I'm interested in joining Fit City Gym!\n\nPlan: ${tab}\nDuration: ${plan.duration}\nPrice: ${plan.price} AED${bonus}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const plans = [
  {
    id: 'BASIC',
    label: 'Basic',
    icon: UserCheck,
    items: [
      { duration: '1 Month',   price: '129',  bonus: null,             featured: false, popular: false },
      { duration: '50 Days',   price: '199',  bonus: null,             featured: false, popular: true  },
      { duration: '3 Months',  price: '399',  bonus: '+1 Month Free',  featured: false, popular: false },
      { duration: '6 Months',  price: '699',  bonus: '+2 Months Free', featured: false, popular: false },
      { duration: '12 Months', price: '1299', bonus: '+1 Month PT',    featured: true,  popular: false },
    ],
  },
  {
    id: 'STUDENTS',
    label: 'Students',
    icon: GraduationCap,
    items: [
      { duration: '1 Month',  price: '111',  bonus: null,             featured: false, popular: false },
      { duration: '3 Months', price: '333',  bonus: '+1 Month Free',  featured: false, popular: false },
      { duration: '6 Months', price: '666',  bonus: '+2 Months Free', featured: true,  popular: false },
    ],
  },
  {
    id: 'COUPLE',
    label: 'Couple',
    icon: Users,
    items: [
      { duration: '1 Month',  price: '249',  bonus: null,            featured: false, popular: false },
      { duration: '3 Months', price: '699',  bonus: '+1 Month Free', featured: false, popular: false },
      { duration: '6 Months', price: '1299', bonus: '+1 Month PT',   featured: false, popular: false },
    ],
  },
];

export default function MembershipSection() {
  const [activeTab, setActiveTab] = useState('BASIC');
  const activeSection = plans.find((p) => p.id === activeTab);

  return (
    <section
      id="membership"
      className="relative overflow-hidden bg-black py-10 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 max-w-3xl">
          <h2 className="title-gotham uppercase text-red-500 font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight">
            Choose Your{' '}
            <span className="text-white">Perfect Plan</span>
          </h2>
        </div>

        {/* TABS */}
        <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isActive = activeTab === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setActiveTab(plan.id)}
                className={`
                  title-gotham flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold uppercase tracking-[0.15em]
                  whitespace-nowrap flex-shrink-0 transition-all duration-300
                  ${isActive
                    ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-red-500/50 hover:text-white'
                  }
                `}
              >
                <Icon size={15} />
                {plan.label}
              </button>
            );
          })}
        </div>

        {/* PLAN CARDS */}
        <div
          key={activeTab}
          className={`
            grid gap-4
            ${activeSection.items.length === 5
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
              : 'grid-cols-1 sm:grid-cols-3'
            }
          `}
          style={{ animation: 'fadeUp 0.4s ease both' }}
        >
          {activeSection.items.map((plan, i) => (
            <div
              key={i}
              className={`
                group relative overflow-hidden rounded-2xl border backdrop-blur-sm
                flex flex-col transition-all duration-500 hover:-translate-y-2
                hover:shadow-[0_0_35px_rgba(255,0,0,0.35)]
                ${plan.featured || plan.popular
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-red-500/30 bg-white/[0.03]'
                }
              `}
              style={{ animation: `cardIn 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s both` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]" />

              <div className="relative z-10 p-5 sm:p-6 flex flex-col flex-1">

                {/* Duration + badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <p className="title-gotham text-gray-400 uppercase text-xs tracking-[0.25em]">
                    {plan.duration}
                  </p>
                  {plan.featured && (
                    <span className="title-gotham bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                      <Flame size={9} />
                      Most Popular
                    </span>
                  )}
                  {plan.popular && (
                    <span className="title-gotham bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                      <Flame size={9} />
                       Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-3">
                  <span className="title-gotham text-4xl sm:text-5xl font-black leading-none">
                    {plan.price}
                  </span>
                  <span className="title-gotham text-red-500 font-bold text-sm mb-1">AED</span>
                </div>

                {/* Bonus */}
                <div className="min-h-[22px] mb-5">
                  {plan.bonus && (
                    <p className="title-gotham text-red-400 text-xs sm:text-sm font-medium">
                      {plan.bonus}
                    </p>
                  )}
                </div>

                {/* Button — WhatsApp with plan details */}
                <a
                  href={getWhatsappURL(plan, activeSection.label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    title-gotham mt-auto flex items-center justify-center gap-2 rounded-xl py-3
                    text-xs sm:text-sm font-bold uppercase tracking-[0.15em]
                    transition-all duration-300 active:scale-95
                    ${plan.featured || plan.popular
                      ? 'bg-red-500 hover:bg-red-400 text-white shadow-[0_4px_20px_rgba(220,38,38,0.5)] hover:shadow-[0_4px_28px_rgba(220,38,38,0.7)]'
                      : 'bg-red-950 hover:bg-red-900 border border-red-800/60 hover:border-red-600 text-red-200 hover:text-white'
                    }
                  `}
                >
                  Get Started
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM FEATURES */}
         <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          {[
            { icon: RiMedalLine,   title: 'No Joining Fee'    },
            { icon: RiEyeOffLine,  title: 'No Hidden Charges' },
            { icon: RiPauseLine,   title: 'Freeze Anytime'    },
            { icon: RiCloseLine,   title: 'Cancel Anytime'    },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-red-600/30 bg-red-600/5 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                  <Icon className="text-2xl text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="title-gotham text-xs font-bold uppercase tracking-wider text-white group-hover:text-red-500 transition">
                  {item.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}