import { Link } from 'react-router-dom';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import { Leaf, Users2 } from 'lucide-react';

const rooms = [
  {
    id: 'farm',
    icon: Leaf,
    title: 'Farm Retreat Rooms',
    count: '3 rooms',
    tone: 'pine',
    img: '/images/rooms-farm.jpg',
    desc: "A five minute walk from the main house, these rooms sit among crops, flowers, and a resident cow. Chosen by guests who want quiet, and to fall asleep to the sound of the fields rather than the main house.",
    features: ['5 min walk from main house', 'Surrounded by crops & flowers', 'A cow grazes nearby', 'Most peaceful of the two'],
  },
  {
    id: 'main',
    icon: Users2,
    title: 'Main House Rooms',
    count: '5 rooms',
    tone: 'clay',
    img: '/images/rooms-main.jpg',
    desc: "Set within the main compound, steps from the dining hall and seminar space. Chosen by guests who want to be close to meals, gatherings, and the evening's music.",
    features: ['In the main compound', 'Steps from dining & seminar hall', 'Closest to evening gatherings', 'Easiest access overall'],
  },
];

export default function Stay() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Stay With Us</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        Two houses, eight rooms, two different paces
      </h1>
      <p className="text-ink-light mt-4 max-w-xl">
        Choose the rhythm of your stay — steps from the fields, or steps from the hearth.
      </p>

      <div className="mt-14 space-y-20">
        {rooms.map((r) => (
          <div key={r.id} className="grid md:grid-cols-2 gap-10 items-center">
            <PhotoPlaceholder label={r.title} src={r.img} tone={r.tone} className="aspect-[4/3]" />
            <div>
              <div className="flex items-center gap-2 text-clay mb-2">
                <r.icon size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">{r.count}</span>
              </div>
              <h2 className="font-display text-3xl">{r.title}</h2>
              <p className="text-ink-light mt-3 leading-relaxed">{r.desc}</p>
              <ul className="mt-5 space-y-2">
                {r.features.map((f) => (
                  <li key={f} className="text-sm text-ink-light flex gap-2">
                    <span className="text-marigold">&bull;</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/book" className="inline-block mt-6 bg-pine text-stone font-semibold px-6 py-3 rounded-full hover:bg-pine-dark transition-colors">
                Check availability
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
