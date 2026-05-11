'use client';

import { useState } from 'react';
import { useGlobal } from '@/app/context/GlobalContext';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { state } = useGlobal();
  const { products } = state;

  const [filter, setFilter] = useState('all');

  const filteredProducts =
    filter === 'all'
      ? products
      : products.filter((p) => {
          const searchTerm = filter.toLowerCase();
          // Ellenőrizzük a márkát ÉS a nevet is a biztonság kedvéért
          return (
            p.brand?.toLowerCase().includes(searchTerm) || 
            p.name?.toLowerCase().includes(searchTerm)
          );
        });
        
  if (!products.length) {
    return (
      <div className='text-center py-20 border border-dashed border-white/10 rounded-3xl'>
        <p className='text-gray-500 animate-pulse'>Nem található hardver a rendszerben...</p>
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      {/* Modern Szűrő Szekció */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <h2 className='text-2xl font-bold text-white tracking-tight'>Komponensek</h2>
          <p className='text-sm text-gray-500'>Válassz kategóriát vagy gyártót a szűréshez</p>
        </div>

        <div className='flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl flex-wrap'>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            label="Mind"
          />
          <FilterButton 
            active={filter === 'intel'} 
            onClick={() => setFilter('intel')}
            label="Intel"
          />
          <FilterButton 
            active={filter === 'amd'} 
            onClick={() => setFilter('amd')}
            label="AMD"
          />
          <FilterButton 
            active={filter === 'nvidia'} 
            onClick={() => setFilter('nvidia')}
            label="Nvidia"
          />
          <FilterButton 
            active={filter === 'asus'} 
            onClick={() => setFilter('asus')}
            label="Asus"
          />
          <FilterButton 
            active={filter === 'samsung'} 
            onClick={() => setFilter('samsung')}
            label="Samsung"
           />
           <FilterButton 
            active={filter === 'kingston'} 
            onClick={() => setFilter('kingston')}
            label="Kingston"
            />
            <FilterButton 
            active={filter === 'evga'} 
            onClick={() => setFilter('evga')}
            label="EVGA"
            />
            <FilterButton 
            active={filter === 'msi'} 
            onClick={() => setFilter('msi')}
            label="MSI"
            />
            <FilterButton 
            active={filter === 'seasonic'} 
            onClick={() => setFilter('seasonic')}
            label="Seasonic"
            />
            <FilterButton 
            active={filter === 'crucial'} 
            onClick={() => setFilter('crucial')}
            label="Crucial"
            />
            <FilterButton 
            active={filter === 'g.skill'} 
            onClick={() => setFilter('g.skill')}
            label="G.Skill"
            /> 
        </div>
      </div>

      {/* Termék lista háló */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Üres találat jelzése */}
      {filteredProducts.length === 0 && (
        <div className='text-center py-10'>
          <p className='text-gray-400'>Nincs találat a választott szűrő alapján.</p>
        </div>
      )}
    </div>
  );
}

// Külön komponens a gomboknak a tisztább kódért
function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-white text-black shadow-lg shadow-white/10' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {label}
    </button>
  );
}