import PhotoPlaceholder from '../components/PhotoPlaceholder';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Our Story</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        A family home in the hills, opened up to travellers
      </h1>
      <div className="grid md:grid-cols-2 gap-12 mt-14 items-center">
        <PhotoPlaceholder label="The family homestead" src="/images/about-homestead.jpg" tone="pine" className="aspect-[4/5] order-2 md:order-1" />
        <div className="order-1 md:order-2 space-y-5 text-ink-light leading-relaxed">
          <p>
            Sunkhani Pahuna Ghar Resort began as a family home in Sunkhani, in Kalinchok Rural Municipality,
            Dolakha — the same land our family has farmed for generations, with cows, hens, and crops
            worked by hand.
          </p>
          <p>
            Over time, we opened our doors to guests: trekkers on their way to Kalinchowk, families
            wanting a slower pace, and groups needing a quiet place to gather. What hasn't changed is the
            hospitality — the same warmth we'd offer any guest in our own home.
          </p>
          <p>
            Today we offer two kinds of stay across our two village houses, a hall for seminars and
            gatherings, and evenings of local music and culture — all set against the jungle, crops, and
            mountain air of Dolakha.
          </p>
        </div>
      </div>
    </div>
  );
}
