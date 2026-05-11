'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useGlobal } from '@/app/context/GlobalContext';

export default function Navbar() {
  const { state, login, logout } = useGlobal();
  const user = state.user;

  // Lokális jelszó input
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = async () => {
    const success = await login(password);
    if (!success) {
      setError('Hibás jelszó!');
      setPassword('');
    } else {
      setError('');
      setPassword('');
    }
  };

  return (
    <nav className='bg-black text-gray-200 p-4 flex justify-between items-center shadow-lg'>
      {/* Bal oldal – logo + fő navigáció */}
      <div className='flex items-center space-x-6'>
        <Link
          href='/'
          className='flex items-center text-cyan-400 font-bold text-lg'
        >
          <FaHome className='mr-2' /> HWC
        </Link>

        <Link href='/nyilvantartas' className='hover:text-cyan-400 transition'>
          Hardvereink
        </Link>
        <Link href='/statisztikak' className='hover:text-cyan-400 transition'>
          Statisztikák
        </Link>
        <Link href='/sugo' className='hover:text-cyan-400 transition'>
          Segítség
        </Link>
        <Link href='/kapcsolat' className='hover:text-cyan-400 transition'>
          Kapcsolatfelvétel
        </Link>
        <Link href='/admin' className='hover:text-cyan-400 transition'>
          Készletkezelő
        </Link>
      </div>

      {/* Jobb oldal – felhasználói rész */}
      <div className='flex items-center space-x-4'>
        {user ? (
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-1 text-emerald-400 font-semibold'>
              <FaUserCircle size={20} />
              <span>{user.name}</span>
            </div>

            <button
              onClick={logout}
              className='flex items-center bg-emerald-400 text-black px-3 py-1 rounded hover:bg-emerald-500 transition'
            >
              <FaSignOutAlt className='mr-1' /> Kijelentkezés
            </button>
          </div>
        ) : (
          <div className='flex items-center space-x-2'>
            <input
              type='password'
              placeholder='Jelszó'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-black border border-gray-700 text-gray-200 rounded px-2 py-1 focus:outline-none focus:border-cyan-400 transition'
            />
            <button
              onClick={handleLogin}
              className='bg-cyan-400 text-black px-3 py-1 rounded hover:bg-cyan-500 transition'
            >
              Bejelentkezés
            </button>
            {error && <span className='text-red-500 text-sm'>{error}</span>}
          </div>
        )}
      </div>
    </nav>
  );
}
