import { ArrowRight, Flame } from 'lucide-react';

const plans = [
  {
    category: 'STUDENTS',
    items: [
      { duration: '1 Month', price: '111', bonus: null, featured: false },
      { duration: '3 Months', price: '333', bonus: '+1 Month Free', featured: false },
      { duration: '6 Months', price: '666', bonus: '+2 Months Free', featured: true },
    ],
  },
  {
    category: 'COUPLE',
    items: [
      { duration: '1 Month', price: '249', bonus: null, featured: false },
      { duration: '3 Months', price: '699', bonus: '+1 Month Free', featured: false },
      { duration: '6 Months', price: '1299', bonus: '+1 Month PT', featured: false },
    ],
  },
  {
    category: 'BASIC',
    items: [
      { duration: '1 Month', price: '129', bonus: null, featured: false },
      { duration: '50 Days', price: '199', bonus: null, featured: false },
      { duration: '3 Months', price: '399', bonus: '+1 Month Free', featured: false },
      { duration: '6 Months', price: '699', bonus: '+2 Months Free', featured: false },
      { duration: '12 Months', price: '1299', bonus: '+1 Month PT', featured: true },
    ],
  },
];

export default function MembershipSection() {
  return (
    <section
      id="membership"
      className="relative overflow-hidden bg-black py-20 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent_40%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-red-500" />

            <span className="uppercase tracking-[0.3em] text-red-500 text-xs font-semibold">
              Membership Plans
            </span>
          </div>

          <h2 className="uppercase text-red-500 font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight whitespace-nowrap">
            Choose Your{' '}
            <span className="text-white">Perfect Plan</span>
          </h2>
        </div>

        {/* PLAN SECTIONS */}
        <div className="space-y-10">
          {plans.map((section, sectionIndex) => (
            <div key={section.category}>
              {/* CATEGORY */}
              <div className="flex items-center gap-4 mb-5">
                <h3 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white/90">
                  {section.category}
                </h3>

                <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
              </div>

              {/* GRID */}
              <div
                className={`grid gap-5 items-stretch ${
                  section.items.length === 5
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                    : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                {section.items.map((plan, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm
                    transition-all duration-500 hover:-translate-y-2
                    hover:shadow-[0_0_35px_rgba(255,0,0,0.35)]
                    animate-fadeUp flex h-full

                    ${
                      plan.featured
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-red-500/40 bg-white/[0.03]'
                    }
                  `}
                    style={{
                      animationDelay: `${(sectionIndex + i) * 0.08}s`,
                    }}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]" />

                    {/* Featured Badge */}
                    {plan.featured && (
                      <div className="absolute right-3 top-3 z-20 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                        <Flame size={10} />
                        Popular
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col flex-1">
                      {/* Duration */}
                      <p className="text-gray-400 uppercase text-xs tracking-[0.25em] mb-4">
                        {plan.duration}
                      </p>

                      {/* Price */}
                      <div className="flex items-end gap-1 mb-4">
                        <span className="text-5xl font-black leading-none">
                          {plan.price}
                        </span>

                        <span className="text-red-500 font-bold text-sm mb-1">
                          AED
                        </span>
                      </div>

                      {/* Bonus */}
                      <div className="min-h-[22px] mb-5">
                        {plan.bonus && (
                          <p className="text-red-400 text-sm font-medium">
                            {plan.bonus}
                          </p>
                        )}
                      </div>

                      {/* Button */}
                      <button
                        className={`mt-auto flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300

                        ${
                          plan.featured
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-white'
                        }
                      `}
                      >
                        Get Started

                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM FEATURES */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          {[
            {
              title: 'No Joining Fee',
              desc: 'Start your fitness journey with zero joining fees.',
            },
            {
              title: 'No Hidden Charges',
              desc: 'Transparent pricing with no surprises.',
            },
            {
              title: 'Freeze Anytime',
              desc: 'Pause your membership whenever needed.',
            },
            {
              title: 'Cancel Anytime',
              desc: 'Flexible cancellation with no hassle.',
            },
          ].map((item) => (
            <div key={item.title} className="group">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2 group-hover:text-red-500 transition">
                {item.title}
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}