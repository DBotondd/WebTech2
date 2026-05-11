// ProductCard.tsx
import { Product } from '@/app/context/Reducer';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className='group relative p-6 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 flex flex-col shadow-xl'>
      
      {/* Kategória jelző */}
      <span className='text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-2'>
        {product.category || 'Hardver'}
      </span>

      <h2 className='text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors leading-tight'>
        {product.brand} 
      </h2>

      {/* Ár és Készlet szekció */}
      <div className='flex justify-between items-center mb-6 pb-4 border-b border-white/5'>
        <div className='text-left'>
          <p className='text-xs text-gray-500 uppercase font-medium'>Ár</p>
          <p className='text-lg font-semibold text-emerald-400'>
            {product.price > 0 ? `${product.price.toLocaleString()} Ft` : 'Kérjen ajánlatot'}
          </p>
        </div>
        <div className='text-right'>
          <p className='text-xs text-gray-300 uppercase font-medium'>Raktáron</p>
          <p className={`text-sm font-bold ${Number(product.stock) > 0 ? 'text-white' : 'text-rose-500'}`}>
            {product.stock ?? 0} db
          </p>
        </div>
      </div>

      {/* Technikai adatok - Dinamikusan bővítve az új mezőkkel */}
      <div className='flex-1 space-y-2 text-sm text-gray-400 mb-6'>
        
        {/* CPU / Alaplap specifikus */}
        {product.socket && (
          <div className='flex justify-between'>
            <span>Foglalat:</span>
            <span className='text-gray-200'>{product.socket}</span>
          </div>
        )}

        {/* GPU specifikus */}
        {product.vram && (
          <div className='flex justify-between'>
            <span>VRAM:</span>
            <span className='text-gray-200'>{product.vram}</span>
          </div>
        )}

        {/* SSD / Háttértár specifikus */}
        {product.capacity && (
          <div className='flex justify-between'>
            <span>Kapacitás:</span>
            <span className='text-gray-200 font-medium text-cyan-200'>{product.capacity}</span>
          </div>
        )}
        {product.interface && (
          <div className='flex justify-between'>
            <span>Csatlakozás:</span>
            <span className='text-gray-200'>{product.interface}</span>
          </div>
        )}

        {/* Tápegység specifikus */}
        {product.wattage && (
          <div className='flex justify-between'>
            <span>Teljesítmény:</span>
            <span className='text-gray-200'>{product.wattage}</span>
          </div>
        )}
        {product.efficiency && (
          <div className='flex justify-between'>
            <span>Hatásfok:</span>
            <span className='text-gray-200'>{product.efficiency}</span>
          </div>
        )}

        {/* RAM specifikus */}
        {product.ramType && (
          <div className='flex justify-between'>
            <span>Típus:</span>
            <span className='text-gray-200'>{product.ramType}</span>
          </div>
        )}

        {/* Régi mezők megtartása */}
        {product.cores && (
          <div className='flex justify-between'>
            <span>Magok száma:</span>
            <span className='text-gray-200'>{product.cores}</span>
          </div>
        )}
      </div>

      {/* Akció gomb */}
      {product.url ? (
        <button
          onClick={() => window.open(product.url, '_blank')}
          className='w-full bg-white text-black text-sm font-bold py-3 rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 transform active:scale-95'
        >
          Specifikáció megnyitása
        </button>
      ) : (
        <div className='text-xs text-center text-gray-600 py-3 italic border border-white/5 rounded-xl'>
          Nincs további specifikáció
        </div>
      )}

      {/* Hover ragyogás */}
      <div className='absolute -z-10 inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500' />
    </div>
  );
}