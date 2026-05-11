// Újrafelhasználható React komponens statisztikai adatok megjelenítéséhez, amely modern üveghatású (backdrop-blur) dizájnt, egyedi színvilágot és interaktív hover-effekteket használ.

export default function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: 'cyan' | 'emerald' | 'rose' | 'violet';
}) {
  // Modernizált színpaletta: csak a szövegre és a finom ragyogásra hat
  const colors = {
    cyan: 'text-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]',
    emerald: 'text-emerald-400 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]',
    rose: 'text-rose-400 group-hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]',
    violet: 'text-violet-400 group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]',
  };

  const dotColors = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    rose: 'bg-rose-400',
    violet: 'bg-violet-400',
  };

  return (
    <div
      className={`group relative p-8 border border-white/5 bg-black/40 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:border-white/20 ${colors[color]}`}
    >
      {/* Kis dekorációs pötty a sarokban a szín jelzésére */}
      <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${dotColors[color]} opacity-50 group-hover:opacity-100 transition-opacity`} />

      <h3 className='text-sm uppercase tracking-widest text-gray-500 font-medium mb-3'>
        {title}
      </h3>
      
      <p className='text-5xl font-bold tracking-tighter text-white group-hover:scale-110 transition-transform duration-500'>
        {value}
      </p>

      {/* Finom alsó vonal akcentus */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${dotColors[color]} group-hover:w-1/2 transition-all duration-500 opacity-50`} />
    </div>
  );
}