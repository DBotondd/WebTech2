import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { GlobalProvider } from './context/GlobalContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HardwareCore | Hardver Nyilvántartó',
  description: 'Profi hardver leltár és specifikációs adatbázis',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='hu' className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/30`}
      >
        <GlobalProvider>
          {/* Háttér dekorációs elemek a modern hatáshoz */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Egy elmosott fényfolt a háttérben */}
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[120px]" />
          </div>

          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            
            {/* Fő tartalom finom animációval és keretezéssel */}
            <main className='flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8'>
              <div className="animate-in fade-in duration-700">
                {children}
              </div>
            </main>

            {/* Modern Footer (opcionális, de ajánlott) */}
            <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/5">
              © {new Date().getFullYear()} HardwareCore System — Built for Performance
            </footer>
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}