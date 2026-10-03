import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-ink text-stone mt-24">
      <div className="woven-divider" />
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl mb-2">Sunkhani Pahuna Ghar Resort</h3>
          <p className="text-stone/70 text-sm max-w-xs">
            Sunkhani, Kalinchok Rural Municipality, Dolakha District, Nepal
          </p>
        </div>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2 text-stone/80"><MapPin size={16} /> Sunkhani, Dolakha</div>
          <div className="flex items-center gap-2 text-stone/80"><Phone size={16} /> +977 XX-XXXXXXX</div>
          <div className="flex items-center gap-2 text-stone/80"><Mail size={16} /> stay@sunkhanipahunaghar.com</div>
        </div>
        <div className="text-sm text-stone/60">
          <p>&copy; {new Date().getFullYear()} Sunkhani Pahuna Ghar Resort. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
