import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/stay', key: 'stay' },
  { to: '/farm', key: 'farm' },
  { to: '/culture', key: 'culture' },
  { to: '/seminar', key: 'seminar' },
  { to: '/explore', key: 'travel' },
  { to: '/gallery', key: 'gallery' },
  { to: '/contact', key: 'contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  // Admins have their own dashboard link elsewhere -- this is for registered guests only.
  const accountLink = user && !isAdmin ? '/account' : '/login';
  const accountLabel = user && !isAdmin ? (i18n.language === 'en' ? 'My Bookings' : 'मेरो बुकिङ') : (i18n.language === 'en' ? 'Sign In' : 'साइन इन');

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ne' : 'en');

  return (
    <header className="sticky top-0 z-40 bg-stone/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl text-pine tracking-tight">
          Sunkhani Pahuna Ghar
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-clay' : 'text-ink/80 hover:text-pine'}`
              }
            >
              {t(`nav.${l.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={accountLink}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-ink/80 hover:text-pine transition-colors"
          >
            <User size={16} /> {accountLabel}
          </Link>
          <button
            onClick={toggleLang}
            className="hidden sm:block text-sm font-medium px-3 py-1.5 rounded-full border border-ink/20 hover:border-pine hover:text-pine transition-colors"
          >
            {i18n.language === 'en' ? 'नेपाली' : 'English'}
          </button>
          <Link
            to="/book"
            className="hidden sm:inline-block bg-pine text-stone text-sm font-semibold px-4 py-2 rounded-full hover:bg-pine-dark transition-colors"
          >
            {t('nav.book')}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden px-5 pb-5 flex flex-col gap-3 bg-stone border-t border-ink/10">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-ink/80 py-1">
              {t(`nav.${l.key}`)}
            </NavLink>
          ))}
          <Link to={accountLink} onClick={() => setOpen(false)} className="text-ink/80 py-1">
            {accountLabel}
          </Link>
          <button onClick={toggleLang} className="text-left text-sm py-1 text-pine font-medium">
            {i18n.language === 'en' ? 'नेपालीमा हेर्नुहोस्' : 'View in English'}
          </button>
          <Link to="/book" onClick={() => setOpen(false)} className="bg-pine text-stone text-center font-semibold px-4 py-2 rounded-full mt-1">
            {t('nav.book')}
          </Link>
        </nav>
      )}
    </header>
  );
}
