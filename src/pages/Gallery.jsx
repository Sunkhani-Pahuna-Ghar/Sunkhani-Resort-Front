import PhotoPlaceholder from '../components/PhotoPlaceholder';

const photos = [
  { label: 'Main house', tone: 'pine', img: '/images/gallery-main-house.jpg' },
  { label: 'Farm retreat rooms', tone: 'clay', img: '/images/gallery-farm-rooms.jpg' },
  { label: 'The cow & fields', tone: 'marigold', img: '/images/farm-animals.jpg' },
  { label: 'Seminar hall', tone: 'dusk', img: '/images/seminar-hall.jpg' },
  { label: 'Musical evening', tone: 'marigold', img: '/images/culture-fire.jpg' },
  { label: 'Jungle trail', tone: 'pine', img: '/images/farm-jungle.jpg' },
  { label: 'Home-cooked meal', tone: 'clay', img: '/images/culture-cuisine.jpg' },
  { label: 'Village view', tone: 'dusk', img: '/images/hero-village.jpg' },
  { label: 'Nearby lake', tone: 'pine', img: '/images/gallery-lake.jpg' },
];

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Gallery</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight mb-4">A look around Sunkhani</h1>
      <p className="text-ink-light max-w-xl mb-14">
        Drop real photos into <code>public/images</code> using the filenames below and they'll appear automatically.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((p) => (
          <PhotoPlaceholder key={p.label} label={p.label} src={p.img} tone={p.tone} className="aspect-square" />
        ))}
      </div>
    </div>
  );
}
