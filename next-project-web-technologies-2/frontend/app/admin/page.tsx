'use client';

import { useEffect } from 'react';
import { useGlobal } from '@/app/context/GlobalContext';
import { Product } from '@/app/context/Reducer';
import axios from 'axios';

import {
  SET_ADMIN_SELECTED,
  SET_ADMIN_FORM,
  SET_ADMIN_MESSAGE,
} from '@/app/context/Actions';

export default function AdminPage() {
  const { state, dispatch, updateProductWithName, fetchProducts } = useGlobal();

  const { user, products, admin } = state;
  const { selectedId, price, stock, message } = admin;

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='p-8 border border-rose-500/20 bg-rose-500/5 rounded-2xl text-rose-400 text-center backdrop-blur-md'>
          <h2 className='text-2xl font-bold mb-2'>Hozzáférés megtagadva</h2>
          <p className='opacity-80'>Kérjük, jelentkezz be a készletkezeléshez.</p>
        </div>
      </div>
    );
  }

  function handleSelect(id: string) {
    dispatch({ type: SET_ADMIN_SELECTED, payload: id });

    const selectedProduct = products.find((p) => p._id === id);

    if (selectedProduct) {
      dispatch({
        type: SET_ADMIN_FORM,
        payload: {
          price: String(selectedProduct.price ?? ''),
          stock: String(selectedProduct.stock ?? ''),
        },
      });
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!selectedId) return;

    try {
      // Megjegyzés: A valóságban itt érdemes környezeti változót (env) használni az URL-hez
      const res = await axios.put(
        `http://localhost:5000/api/products/${selectedId}`,
        {
          price: Number(price),
          stock: Number(stock),
        },
      );

      const updatedProduct: Product = res.data;
      updateProductWithName(updatedProduct);

      dispatch({
        type: SET_ADMIN_MESSAGE,
        payload: '✅ Készlet és ár sikeresen frissítve!',
      });

      // 3 másodperc után üzenet eltüntetése (opcionális)
      setTimeout(() => {
        dispatch({ type: SET_ADMIN_MESSAGE, payload: '' });
      }, 3000);

    } catch (err) {
      console.error(err);
      dispatch({
        type: SET_ADMIN_MESSAGE,
        payload: '❌ Hiba történt a mentés során!',
      });
    }
  }

  return (
    <div className='max-w-4xl mx-auto py-12 px-4 space-y-12'>
      <header className='space-y-2'>
        <h1 className='text-4xl font-extrabold tracking-tight text-white'>
          Készletkezelés
        </h1>
        <p className='text-gray-500'>Módosítsa a hardverek aktuális piaci árát és raktárkészletét.</p>
      </header>

      <div className='grid md:grid-cols-5 gap-10 items-start'>
        {/* Kontroll Panel */}
        <div className='md:col-span-3 bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6'>
          <div className='space-y-4'>
            <label className='text-sm font-medium text-gray-400 ml-1'>Alkatrész kiválasztása</label>
            <select
              value={selectedId}
              onChange={(e) => handleSelect(e.target.value)}
              className='w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all appearance-none cursor-pointer'
            >
              <option value='' disabled className='bg-gray-900'>
                Válasszon egy terméket...
              </option>
              {products.map((item) => (
                <option key={item._id} value={item._id} className='bg-gray-900'>
                   {item.brand} 
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-400 ml-1'>Új ár (Ft)</label>
              <input
                type='number'
                placeholder='0'
                value={price}
                onChange={(e) =>
                  dispatch({
                    type: SET_ADMIN_FORM,
                    payload: { price: e.target.value, stock },
                  })
                }
                className='w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-400 ml-1'>Készlet (db)</label>
              <input
                type='number'
                placeholder='0'
                value={stock}
                onChange={(e) =>
                  dispatch({
                    type: SET_ADMIN_FORM,
                    payload: { price, stock: e.target.value },
                  })
                }
                className='w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all'
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className='w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-all active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed shadow-lg shadow-white/5'
          >
            Módosítások mentése
          </button>

          {message && (
            <div className={`text-center text-sm font-medium p-3 rounded-lg animate-in fade-in slide-in-from-top-2 ${message.includes('✅') ? 'text-cyan-400 bg-cyan-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Információs kártya (Segédlet) */}
        <div className='md:col-span-2 space-y-6'>
          <div className='p-6 bg-white/5 border border-white/10 rounded-2xl'>
            <h3 className='text-white font-bold mb-3'>Gyors útmutató</h3>
            <ul className='text-sm text-gray-400 space-y-3'>
              <li className='flex gap-2'>• <span className='text-gray-300'>Válasszon</span> egy meglévő komponenst a listából.</li>
              <li className='flex gap-2'>• Adja meg a <span className='text-gray-300'>frissített árat</span> (bruttó).</li>
              <li className='flex gap-2'>• Állítsa be az aktuális <span className='text-gray-300'>raktármennyiséget</span>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}