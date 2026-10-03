import PhotoPlaceholder from '../components/PhotoPlaceholder';

const items = [
  { title: 'The animals', desc: 'Cows and hens kept on the property — mornings often start with feeding and milking, and guests are welcome to join.', tone: 'pine', img: '/images/farm-animals.jpg' },
  { title: 'The crops', desc: 'Seasonal crops grown around both houses, tended the traditional way. Walk the fields, or help with the harvest if the season is right.', tone: 'clay', img: '/images/farm-crops.jpg' },
  { title: 'The jungle', desc: 'Forest trails begin just beyond the property — short walks or longer treks toward Kalinchowk, depending on how much time you have.', tone: 'dusk', img: '/images/farm-jungle.jpg' },
];

export default function Farm() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Farm & Nature</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        A working farm, not a backdrop
      </h1>
      <p className="text-ink-light mt-4 max-w-xl">
        The farm isn't decoration — it's how the household runs, and guests are genuinely welcome in it.
      </p>

      <div className="mt-14 grid md:grid-cols-3 gap-8">
        {items.map((i) => (
          <div key={i.title}>
            <PhotoPlaceholder label={i.title} src={i.img} tone={i.tone} className="aspect-square" />
            <h3 className="font-display text-xl mt-4">{i.title}</h3>
            <p className="text-sm text-ink-light mt-2 leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
