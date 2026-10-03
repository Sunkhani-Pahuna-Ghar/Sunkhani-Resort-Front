import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import Testimonials from '../components/Testimonials';
import { Wheat, Music, Mountain, Users } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <PhotoPlaceholder label="Sunkhani village, Dolakha" src="/images/hero-village.jpg" tone="dusk" className="h-[78vh] min-h-[480px] w-full" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-5 pb-14 w-full">
            <p className="text-marigold-light font-medium mb-3">{t('hero.tagline')}</p>
            <h1 className="font-display text-4xl sm:text-6xl text-stone leading-[1.05] max-w-2xl">
              {t('hero.title')}
            </h1>
            <p className="text-stone/85 mt-4 max-w-lg">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link to="/book" className="bg-marigold text-ink font-semibold px-6 py-3 rounded-full hover:bg-marigold-light transition-colors">
                {t('hero.cta')}
              </Link>
              <Link to="/about" className="border border-stone/50 text-stone px-6 py-3 rounded-full hover:bg-stone/10 transition-colors">
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="max-w-6xl mx-auto px-5 py-16 grid sm:grid-cols-4 gap-8 text-center">
        {[
          { icon: Wheat, label: 'Working farm — cows, hens, crops' },
          { icon: Mountain, label: 'Jungle trails and village walks' },
          { icon: Music, label: 'Musical evenings with local people' },
          { icon: Users, label: 'Seminar hall for retreats & events' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="text-clay" size={28} strokeWidth={1.5} />
            <p className="text-sm text-ink-light">{label}</p>
          </div>
        ))}
      </section>

      <div className="woven-divider max-w-6xl mx-auto" />

      {/* Two room types */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="font-display text-3xl sm:text-4xl mb-10 max-w-lg">{t('rooms.title')}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <Link to="/stay" className="group">
            <PhotoPlaceholder label="Farm Retreat Rooms" src="/images/rooms-farm.jpg" tone="pine" className="aspect-[4/3]" />
            <h3 className="font-display text-2xl mt-4 group-hover:text-clay transition-colors">{t('rooms.farmTitle')}</h3>
            <p className="text-ink-light mt-2 text-sm leading-relaxed">{t('rooms.farmDesc')}</p>
          </Link>
          <Link to="/stay" className="group">
            <PhotoPlaceholder label="Main House Rooms" src="/images/rooms-main.jpg" tone="clay" className="aspect-[4/3]" />
            <h3 className="font-display text-2xl mt-4 group-hover:text-clay transition-colors">{t('rooms.mainTitle')}</h3>
            <p className="text-ink-light mt-2 text-sm leading-relaxed">{t('rooms.mainDesc')}</p>
          </Link>
        </div>
      </section>

      {/* Culture callout */}
      <section className="bg-pine text-stone">
        <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">An evening of local music, shared with you</h2>
            <p className="text-stone/80 mt-4 max-w-md leading-relaxed">
              Whether you've travelled from across the world or the next village over, guests gather for
              cultural evenings with local musicians — songs, stories, and warm hospitality by the fire.
            </p>
            <Link to="/culture" className="inline-block mt-6 border border-stone/50 px-6 py-3 rounded-full hover:bg-stone/10 transition-colors">
              Explore Culture & Experiences
            </Link>
          </div>
          <PhotoPlaceholder label="Musical evening" src="/images/culture-fire.jpg" tone="marigold" className="aspect-video" />
        </div>
      </section>

      <Testimonials />

      {/* Explore region */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <h2 className="font-display text-3xl sm:text-4xl">Explore the Region</h2>
          <Link to="/explore" className="text-clay font-medium hover:underline">See travel packages &rarr;</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="flex gap-5">
            <PhotoPlaceholder label="Dolakha Bhimsen" src="/images/route-dolakha-bhimsen.jpg" tone="clay" className="w-32 h-32 shrink-0" />
            <div>
              <h3 className="font-display text-xl">Dolakha Bhimsen</h3>
              <p className="text-sm text-ink-light mt-1">About 30 minutes' drive — a historic temple town.</p>
            </div>
          </div>
          <div className="flex gap-5">
            <PhotoPlaceholder label="Kalinchowk" src="/images/route-kalinchowk.jpg" tone="pine" className="w-32 h-32 shrink-0" />
            <div>
              <h3 className="font-display text-xl">Kalinchowk</h3>
              <p className="text-sm text-ink-light mt-1">About 1.5 hours' drive — pilgrimage site and mountain views.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
