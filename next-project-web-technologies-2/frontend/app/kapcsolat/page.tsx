'use client';

import { useGlobal } from '@/app/context/GlobalContext';
import { SET_CONTACT_FORM, SET_MESSAGE_SENT } from '@/app/context/Actions';

export default function KapcsolatPage() {
  const { state, dispatch, sendMessage } = useGlobal();

  const { contactForm, messageSent } = state;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    dispatch({
      type: SET_CONTACT_FORM,
      payload: {
        ...contactForm,
        [e.target.name]: e.target.value,
      },
    });

    if (messageSent) {
      dispatch({ type: SET_MESSAGE_SENT, payload: false });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await sendMessage(contactForm);
  }

  return (
    <div className='space-y-20 px-4 md:px-20 py-10'>
      {/* HERO */}
      <section className='text-center py-16'>
        <h1 className='text-5xl font-bold text-cyan-400 drop-shadow-lg mb-6'>
          Hardver Szakértői Támogatás
        </h1>

        <p className='text-gray-300 max-w-2xl mx-auto'>
          Kérdésed van egy konkrét alkatrész kompatibilitásával kapcsolatban? 
          Problémába ütköztél a leltár használata során? Írj nekünk!
        </p>
      </section>

      {/* CONTENT */}
      <section className='grid md:grid-cols-2 gap-10'>
        {/* CONTACT INFO */}
        <div className='p-8 border-2 border-cyan-400 rounded-xl shadow-lg space-y-6 bg-black/40'>
          <h2 className='text-2xl font-semibold text-cyan-400'>
            Elérhetőségeink
          </h2>

          <div className='space-y-4 text-gray-300'>
            <p className='flex items-center gap-3'>
              <span className='text-cyan-400 font-bold w-20'>Email:</span>
              support@hardverleltar.hu
            </p>

            <p className='flex items-center gap-3'>
              <span className='text-cyan-400 font-bold w-20'>Szerviz:</span>
              +36 70 987 6543
            </p>

            <p className='flex items-center gap-3'>
              <span className='text-cyan-400 font-bold w-20'>Cím:</span>
              1134 Budapest, Váci út 45.
            </p>
          </div>

          <div className='bg-gray-900 border border-cyan-400/30 rounded-lg p-4 text-sm text-gray-300 italic'>
            Technikai csapatunk munkanapokon <span className='text-cyan-400 font-semibold'>9:00 - 18:00</span> között 
            aktívan válaszol a megkeresésekre.
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className='p-8 border-2 border-emerald-400 rounded-xl shadow-lg space-y-5 bg-black/40'
        >
          <h2 className='text-2xl font-semibold text-emerald-400'>
            Műszaki üzenet küldése
          </h2>

          {messageSent && (
            <div className='border border-emerald-400 text-emerald-400 p-3 rounded-lg bg-emerald-400/10'>
              ✅ Üzenet sikeresen rögzítve! Hamarosan keresünk.
            </div>
          )}

          <input
            type='text'
            name='name'
            placeholder='Teljes név'
            value={contactForm.name}
            onChange={handleChange}
            required
            className='w-full bg-black border border-gray-700 rounded-lg p-3 text-gray-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition'
          />

          <input
            type='email'
            name='email'
            placeholder='Email cím'
            value={contactForm.email}
            onChange={handleChange}
            required
            className='w-full bg-black border border-gray-700 rounded-lg p-3 text-gray-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition'
          />

          <textarea
            name='message'
            placeholder='Miben segíthetünk? (pl. CPU kompatibilitás, rendelés állapota...)'
            rows={5}
            value={contactForm.message}
            onChange={handleChange}
            required
            className='w-full bg-black border border-gray-700 rounded-lg p-3 text-gray-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition'
          />

          <button
            type='submit'
            className='w-full bg-cyan-500 text-black font-bold py-3 rounded-lg shadow-lg hover:bg-cyan-400 hover:shadow-cyan-500/20 transition'
          >
            Üzenet elküldése
          </button>
        </form>
      </section>

      {/* EXTRA INFO */}
      <section className='bg-gray-900/50 rounded-2xl border border-gray-800 shadow-lg p-10 text-center'>
        <h2 className='text-3xl font-semibold text-cyan-400 mb-8'>
          Mivel fordulhat hozzánk?
        </h2>

        <div className='grid md:grid-cols-3 gap-6 text-gray-300'>
          <Info 
            title='Kompatibilitás' 
            text='Segítünk eldönteni, hogy az adott alaplap támogatja-e a választott processzort.' 
          />
          <Info 
            title='Garancia' 
            text='Hardveres meghibásodás esetén segítünk az RMA folyamat elindításában.' 
          />
          <Info 
            title='B2B Ajánlatok' 
            text='Nagyobb mennyiségű alkatrész beszerzése esetén egyedi árazást biztosítunk.' 
          />
        </div>
      </section>
    </div>
  );
}

// Kicsit felturbózott Info komponens
function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className='border border-violet-400/50 bg-violet-400/5 rounded-xl p-6 hover:border-violet-400 hover:bg-violet-400/10 transition group cursor-default'>
      <h3 className='text-violet-400 font-bold mb-2 group-hover:scale-105 transition'>{title}</h3>
      <p className='text-sm leading-relaxed'>{text}</p>
    </div>
  );
}