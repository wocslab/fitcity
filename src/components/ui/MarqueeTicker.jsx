const items = [
  'Strength Training',
  'Functional Fitness',
  'Group Classes',
  'Yoga & Wellness',
  'HIIT Training',
  'Personal Training',
];

export default function MarqueeTicker() {
  return (
   <div className="overflow-hidden whitespace-nowrap">
  <div
    className="flex items-center h-[50px] gap-8 w-max"
    style={{
      animation: 'marquee 20s linear infinite',
    }}
  >
    {[...items, ...items, ...items].map((item, i) => (
      <div
        key={i}
        className="flex items-center gap-8 shrink-0"
      >
        <span className="font-black italic text-red-600 text-sm md:text-base tracking-[0.3em]">
          {item}
        </span>

        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
      </div>
    ))}
  </div>
</div>
  );
}