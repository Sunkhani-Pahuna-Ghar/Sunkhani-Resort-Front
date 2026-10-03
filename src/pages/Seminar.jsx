import { Link } from 'react-router-dom';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import { Check } from 'lucide-react';

const features = [
  'Seating for group workshops & retreats',
  'Natural light and mountain views',
  'Steps from the main house rooms',
  'Meals from the farm kitchen on request',
  'Suitable for corporate offsites, trainings, and community events',
];

export default function Seminar() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Seminar Hall</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        A hall built for gathering, not just meeting
      </h1>

      <div className="grid md:grid-cols-2 gap-12 mt-14 items-center">
        <PhotoPlaceholder label="Seminar hall" src="/images/seminar-hall.jpg" tone="clay" className="aspect-[4/3]" />
        <div>
          <p className="text-ink-light leading-relaxed">
            Whether it's a retreat, a training, or a community meeting, our hall gives groups a quiet place
            to work — away from the city, but still close to comfortable rooms and warm meals.
          </p>
          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-ink-light">
                <Check size={18} className="text-pine shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="inline-block mt-7 bg-clay text-stone font-semibold px-6 py-3 rounded-full hover:bg-clay-dark transition-colors">
            Enquire about the hall
          </Link>
        </div>
      </div>
    </div>
  );
}
