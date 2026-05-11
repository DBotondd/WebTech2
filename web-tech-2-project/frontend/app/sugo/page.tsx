'use client';

export default function SugoPage() {
  return (
    <div className='max-w-6xl mx-auto space-y-24 px-4 py-16'>
      {/* HERO SECTION */}
      <section className='text-center space-y-6'>
        <h1 className='text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500'>
          Tudásbázis
        </h1>
        <p className='text-gray-400 max-w-xl mx-auto text-lg leading-relaxed'>
          Minden, amit a HardwareCore készletkezelő rendszer használatáról tudni érdemes.
        </p>
      </section>

      {/* HELP CARDS GRID */}
      <section className='grid md:grid-cols-3 gap-8'>
        <HelpCard
          title='Komponens felvitel'
          text='Az Admin felületen rögzítheti az új processzorokat, videokártyákat és egyéb modulokat az adatbázisba.'
          color='cyan'
        />
        <HelpCard
          title='Készlet-szinkron'
          text='A rendszer valós időben frissíti a raktárkészletet minden egyes mentés és eladás után.'
          color='emerald'
        />
        <HelpCard
          title='Paraméterek'
          text='Módosíthatja a TDP-t, órajelet és egyéb specifikációkat a komponens adatlapján.'
          color='violet'
        />
      </section>

      {/* FAQ SECTION */}
      <section className='relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent'>
        <div className='bg-[#050505] rounded-[2.4rem] p-12 backdrop-blur-3xl'>
          <h2 className='text-3xl font-bold text-white mb-10 tracking-tight text-center'>
            Gyakori Kérdések
          </h2>

          <div className='grid md:grid-cols-2 gap-12'>
            <Faq
              q='Biztonságos az adattárolás?'
              a='Igen. Minden módosítás a központi SQL/NoSQL adatbázisban kerül rögzítésre, így az adatok eszközfüggetlenek és védettek.'
            />
            <Faq
              q='Hogyan kezelhető a több telephely?'
              a='A rendszer támogatja a raktárkódok használatát, így egyetlen felületről látható a teljes hálózati készlet.'
            />
            <Faq
              q='Van API hozzáférés?'
              a='Természetesen. A RESTful API végpontokon keresztül külső szoftverek is lekérdezhetik a hardver specifikációkat.'
            />
            <Faq
              q='Mi történik hibás adatbevitelkor?'
              a='Az adminisztrációs panelen bármely tétel visszamenőlegesen javítható a "Módosítás" funkcióval.'
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// MODERN HELP CARD KOMPONENS
function HelpCard({
  title,
  text,
  color,
}: {
  title: string;
  text: string;
  color: 'cyan' | 'emerald' | 'violet';
}) {
  const accentColors = {
    cyan: 'bg-cyan-500',
    emerald: 'bg-emerald-500',
    violet: 'bg-violet-500',
  };

  return (
    <div className='group relative p-8 border border-white/5 bg-black/20 rounded-3xl hover:border-white/20 transition-all duration-500'>
      <div className={`w-2 h-2 rounded-full ${accentColors[color]} mb-6 shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
      <h3 className='text-xl font-bold text-white mb-4'>{title}</h3>
      <p className='text-gray-400 text-sm leading-relaxed leading-6'>{text}</p>
      
      {/* Dekorációs háttérfény hoverre */}
      <div className='absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity' />
    </div>
  );
}

// MODERN FAQ KOMPONENS
function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className='space-y-3 group'>
      <h4 className='text-white font-semibold text-lg flex items-center gap-2 transition-colors group-hover:text-cyan-400'>
        <span className='text-cyan-500/50'>?</span> {q}
      </h4>
      <p className='text-gray-500 text-sm leading-relaxed pl-5 border-l border-white/5'>
        {a}
      </p>
    </div>
  );
}