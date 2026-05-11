'use client';

import StatCard from '@/components/StatCard';
import { useGlobal } from '@/app/context/GlobalContext';

export default function StatisztikakPage() {
  const { state } = useGlobal();
  const { products } = state;

  // Összes komponens száma
  const totalProducts = products.length;

  // Összes darabszám raktáron (logisztikai nézet)
  const totalInStock = products.reduce((sum, p) => sum + (p.stock ?? 0), 0);

  // Valódi logika az elfogyott termékekhez (stock === 0)
  const outOfStock = products.filter(p => (p.stock ?? 0) === 0).length;

  
  // Kategóriák száma (CPU, GPU, RAM stb.) - csak a létező kategóriákat számoljuk
  
    const categories = Array.from(new Set(products.map((p) => p.category))).length;

  return (
    <div className='space-y-20 px-4 md:px-20 py-10'>
      {/* HERO SECTION */}
      <section className='text-center py-16 relative overflow-hidden'>
        <h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 tracking-tighter'>
          Rendszeranalitika
        </h1>
        <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
          Valós idejű áttekintés a hardverkészletről, a piaci kategóriákról és a logisztikai állapotról.
        </p>
      </section>

      {/* STATS GRID */}
      <section className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <StatCard
          title='Összes Komponens'
          value={totalProducts.toString()}
          color='cyan'
        />
        <StatCard
          title='Raktárkészlet'
          value={totalInStock.toString()}
          color='emerald'
        />
        <StatCard
          title='Kritikus Hiány'
          value={outOfStock.toString()}
          color='rose'
        />
        <StatCard
          title='Hardver Típus'
          value={categories.toString()}
          color='violet'
        />
      </section>

      {/* SYSTEM STATUS INFO PANEL */}
      <section className='relative group'>
        {/* Dekorációs fény a panel mögött */}
        <div className='absolute inset-0 bg-cyan-500/5 blur-[100px] -z-10 group-hover:bg-cyan-500/10 transition-colors duration-700' />
        
        <div className='bg-black/40 border border-white/10 rounded-[2.5rem] p-12 text-center backdrop-blur-xl'>
          <h2 className='text-3xl text-white font-bold mb-6 tracking-tight'>
            Operatív Állapot
          </h2>
          <div className='grid md:grid-cols-2 gap-10 text-left max-w-4xl mx-auto'>
            <div className='space-y-3'>
              <h4 className='text-cyan-400 font-semibold uppercase text-xs tracking-widest'>Adatfrissítés</h4>
              <p className='text-gray-400 text-sm leading-relaxed'>
                Készletünket folyamatosan frissítjük a beérkező árukészlet alapján.
              </p>
            </div>
            <div className='space-y-3'>
              <h4 className='text-violet-400 font-semibold uppercase text-xs tracking-widest'>Beszerzési Jelzés</h4>
              <p className='text-gray-400 text-sm leading-relaxed'>
                A <span className='text-rose-400'>Kritikus Hiány</span> jelző automatikusan listázza azokat a tételeket, ahol a raktárkészlet elérte a nullát, prioritást adva a pótlásuknak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LÁBJEGYZET */}
      <footer className='text-center text-gray-600 text-xs pb-10'>
        HardwareCore v4.2 — Statisztikai modul frissítve: {new Date().toLocaleDateString('hu-HU')}
      </footer>
    </div>
  );
}