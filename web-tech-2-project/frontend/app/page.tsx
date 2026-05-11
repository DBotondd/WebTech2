import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='space-y-24 px-4 md:px-20 py-10'>
      {/* HERO SECTION */}
      <section className='text-center py-20'>
        <h1 className='text-5xl font-bold mb-6 text-cyan-400 drop-shadow-lg'>
          HardwareCore - A Hardver Leltár 
        </h1>

        <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
          Professzionális megoldás számítógépes alkatrészek, processzorok, videokártyák és alaplapok
          nyilvántartására. Kövesd nyomon a készletet és a technikai specifikációkat egy modern felületen.
        </p>

        <div className='mt-10 flex justify-center gap-6'>
          <Link
            href='/nyilvantartas'
            className='bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-600 transition'
          >
            Alkatrészek böngészése
          </Link>

          <Link
            href='/kapcsolat'
            className='border-2 border-cyan-500 text-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-500 hover:text-black transition'
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <h2 className='text-3xl font-semibold text-center mb-12 text-cyan-400'>
          Rendszer funkciók
        </h2>

        <div className='grid md:grid-cols-3 gap-8'>
          <FeatureCard
            title='Részletes specifikációk'
            text='Minden hardverhez rögzíthető az órajel, magok száma, foglalat típusa, fogyasztás (TDP) és architektúra.'
            borderClass='border-cyan-400'
            textClass='text-cyan-400'
          />

          <FeatureCard
            title='Készletkezelés'
            text='Kezeld a beérkező szállítmányokat, kövesd a raktárkészletet és állíts be figyelmeztetést alacsony darabszám esetén.'
            borderClass='border-emerald-400'
            textClass='text-emerald-400'
          />

          <FeatureCard
            title='Gyors szűrés'
            text='Keress típus, gyártó (Intel/AMD/Nvidia) vagy teljesítmény kategória alapján pillanatok alatt.'
            borderClass='border-violet-400'
            textClass='text-violet-400'
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className='bg-gray-900 rounded-2xl shadow-lg p-10'>
        <h2 className='text-3xl font-semibold mb-6 text-center text-cyan-400'>
          Hogyan működik a hardver nyilvántartás?
        </h2>

        <div className='grid md:grid-cols-4 gap-6 text-center'>
          <Step
            number='1'
            text='Belépés a központi hardverkezelő dashboardra.'
          />
          <Step
            number='2'
            text='Új alkatrész hozzáadása a technikai paraméterek megadásával.'
          />
          <Step
            number='3'
            text='Az adatok biztonságosan tárolódnak a felhő alapú adatbázisunkban.'
          />
          <Step
            number='4'
            text='Azonnali hozzáférés a készletadatokhoz bármilyen eszközről.'
          />
        </div>
      </section>

      {/* HARDVER KATEGÓRIÁK */}
      <section className='mt-20'>
        <h2 className='text-3xl font-semibold text-center mb-8 text-cyan-400'>
          Támogatott hardver kategóriák
        </h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            {
              title: 'Processzorok (CPU)',
              text: 'Intel Core, AMD Ryzen szériák - magok, szálak és foglalatok kezelése.',
              borderClass: 'border-cyan-400',
              textClass: 'text-cyan-400',
            },
            {
              title: 'Videokártyák (GPU)',
              text: 'NVIDIA RTX és AMD Radeon kártyák, VRAM méret és hűtési típusok.',
              borderClass: 'border-emerald-400',
              textClass: 'text-emerald-400',
            },
            {
              title: 'Memóriák (RAM)',
              text: 'DDR4 és DDR5 modulok, órajel (MHz) és késleltetés (CL) adatok.',
              borderClass: 'border-violet-400',
              textClass: 'text-violet-400',
            },
            {
              title: 'Alaplapok',
              text: 'Chipsetek, méret szabványok (ATX, ITX) és bővítőhelyek száma.',
              borderClass: 'border-rose-400',
              textClass: 'text-rose-400',
            },
            {
              title: 'Háttértárak',
              text: 'NVMe SSD-k és HDD-k írási/olvasási sebessége és élettartama.',
              borderClass: 'border-amber-400',
              textClass: 'text-amber-400',
            },
            {
              title: 'Tápegységek (PSU)',
              text: 'Teljesítmény, hatékonysági besorolás (80+) és modularitás.',
              borderClass: 'border-fuchsia-400',
              textClass: 'text-fuchsia-400',
            },
          ].map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              text={item.text}
              borderClass={item.borderClass}
              textClass={item.textClass}
            />
          ))}
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className='mt-20'>
        <h2 className='text-3xl font-semibold text-center mb-10 text-cyan-400'>
          Rendszer architektúra
        </h2>

        <div className='bg-black flex flex-wrap justify-center gap-4 p-4 rounded-xl'>
          {[
            'Next.js 14',
            'React',
            'TypeScript',
            'Node.js / Express',
            'MongoDB Atlas',
            'Tailwind CSS',
            'Prisma ORM',
          ].map((tech) => (
            <span
              key={tech}
              className='bg-black border-2 border-cyan-400 px-4 py-2 rounded-full text-sm text-cyan-400 hover:bg-cyan-400 hover:text-black transition'
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='text-center py-16 bg-cyan-500 text-white rounded-2xl mt-24 shadow-lg'>
        <h2 className='text-3xl font-bold mb-4'>
          Készen állsz a gépépítésre?
        </h2>

        <p className='mb-6 max-w-2xl mx-auto'>
          Lépj be a rendszerbe és kezdd el rendszerezni a hardverparkodat még ma. 
          Pontos adatok, naprakész árak.
        </p>

        <Link
          href='/nyilvantartas'
          className='bg-black text-cyan-400 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-cyan-400 hover:text-black transition'
        >
          Készlet megnyitása →
        </Link>
      </section>
    </div>
  );
}

// Komponensek változatlan struktúrával
function FeatureCard({
  title,
  text,
  borderClass,
  textClass,
}: {
  title: string;
  text: string;
  borderClass: string;
  textClass: string;
}) {
  return (
    <div
      className={`p-6 border-2 ${borderClass} rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${textClass}`}>{title}</h3>
      <p className='text-gray-300'>{text}</p>
    </div>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className='space-y-2'>
      <div className='text-3xl font-bold text-cyan-400'>{number}</div>
      <p className='text-gray-300'>{text}</p>
    </div>
  );
}