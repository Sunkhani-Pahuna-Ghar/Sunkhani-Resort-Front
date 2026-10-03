import { Link } from 'react-router-dom';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const packages = [
  {
    title: 'Stay + Dolakha Bhimsen Tour',
    drive: '30 min drive',
    tone: 'clay',
    img: '/images/route-dolakha-bhimsen.jpg',
    desc: 'A relaxed half-day trip to the historic Dolakha Bhimsen temple, paired with your stay at Sunkhani. Vehicle and guide available on request.',
  },
  {
    title: 'Stay + Kalinchowk Day Trip',
    drive: '1.5 hr drive',
    tone: 'pine',
    img: '/images/route-kalinchowk.jpg',
    desc: 'A full day trip to Kalinchowk for pilgrimage and mountain views, with transport arranged from the resort.',
  },
  {
    title: 'Trek to Tsho Rolpa / Dudhkunda',
    drive: 'Multi-day trek',
    tone: 'dusk',
    img: '/images/route-tsho-rolpa.jpg',
    desc: "Start your trek from our doorstep. We'll brief you on the route, and arrange a local guide and vehicle to the trailhead if you need one.",
  },
  {
    title: 'Full Region Combo',
    drive: 'Multi-day',
    tone: 'marigold',
    img: '/images/hero-village.jpg',
    desc: 'A multi-night stay combining both Dolakha Bhimsen and Kalinchowk, plus farm and village time in between.',
  },
];

export default function Explore() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Explore the Region</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        We can plan the whole trip, not just the stay
      </h1>
      <p className="text-ink-light mt-4 max-w-xl">
        Sunkhani sits close to two of Dolakha's best-known destinations, and directly on the route toward
        Tsho Rolpa and Dudhkunda — making us a natural stopover for trekkers heading further into the
        Rolwaling region. Ask us to build a package around any of them.
      </p>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((p) => (
          <div key={p.title}>
            <PhotoPlaceholder label={p.title} src={p.img} tone={p.tone} className="aspect-[4/3]" />
            <p className="text-xs font-medium text-clay mt-4">{p.drive}</p>
            <h3 className="font-display text-xl mt-1">{p.title}</h3>
            <p className="text-sm text-ink-light mt-2 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-8">
        <div className="flex gap-5">
          <PhotoPlaceholder label="Tsho Rolpa" src="/images/route-tsho-rolpa.jpg" tone="dusk" className="w-32 h-32 shrink-0" />
          <div>
            <h3 className="font-display text-xl">Tsho Rolpa</h3>
            <p className="text-sm text-ink-light mt-1">Nepal's largest glacial lake — we're on the route in, a good stopover for trekkers.</p>
          </div>
        </div>
        <div className="flex gap-5">
          <PhotoPlaceholder label="Dudhkunda" src="/images/route-dudhkunda.jpg" tone="marigold" className="w-32 h-32 shrink-0" />
          <div>
            <h3 className="font-display text-xl">Dudhkunda</h3>
            <p className="text-sm text-ink-light mt-1">A sacred alpine lake in the Rolwaling region, further along the same route.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-pine text-stone rounded-sm p-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl">Not sure what fits your trip?</h2>
          <p className="text-stone/80 mt-1 text-sm">Tell us your dates and interests — we'll put together a package for you.</p>
        </div>
        <Link to="/contact" className="bg-marigold text-ink font-semibold px-6 py-3 rounded-full hover:bg-marigold-light transition-colors shrink-0">
          Ask about a package
        </Link>
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl">Trek information</h3>
          <p className="text-sm text-ink-light mt-2 leading-relaxed">
            We can walk you through routes, timing, and what to expect on the way to Tsho Rolpa or Dudhkunda,
            based on years of local knowledge.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl">Local guides</h3>
          <p className="text-sm text-ink-light mt-2 leading-relaxed">
            A local guide can be arranged if you'd rather not go it alone, for a day trip or the fuller trek.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl">Vehicle arrangement</h3>
          <p className="text-sm text-ink-light mt-2 leading-relaxed">
            Need transport to a trailhead or between sites? We can arrange a vehicle as part of your stay.
          </p>
        </div>
      </div>
    </div>
  );
}
