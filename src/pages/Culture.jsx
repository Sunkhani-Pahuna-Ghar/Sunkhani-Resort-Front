import PhotoPlaceholder from '../components/PhotoPlaceholder';

export default function Culture() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Culture & Experiences</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        Evenings shared with the village
      </h1>

      <div className="grid md:grid-cols-2 gap-12 mt-14 items-center">
        <div className="space-y-5 text-ink-light leading-relaxed">
          <p>
            On most evenings, local musicians join guests for an evening of traditional songs and stories —
            informal, warm, and open to whoever's staying that night, whether you've come from Kathmandu or
            from the other side of the world.
          </p>
          <p>
            Beyond music, guests can take part in local festivals when the calendar allows, learn about
            traditional farming and cooking, and hear the history of Sunkhani and the wider Kalinchok area
            from the family directly.
          </p>
        </div>
        <PhotoPlaceholder label="Musical evening by the fire" src="/images/culture-fire.jpg" tone="marigold" className="aspect-[4/5]" />
      </div>

      <div className="mt-20 grid sm:grid-cols-2 gap-8">
        <div>
          <PhotoPlaceholder label="Local cuisine" src="/images/culture-cuisine.jpg" tone="clay" className="aspect-video" />
          <h3 className="font-display text-xl mt-4">Home-cooked meals</h3>
          <p className="text-sm text-ink-light mt-2">Traditional Nepali meals made with produce from the farm.</p>
        </div>
        <div>
          <PhotoPlaceholder label="Seasonal festivals" src="/images/culture-festival.jpg" tone="pine" className="aspect-video" />
          <h3 className="font-display text-xl mt-4">Seasonal festivals</h3>
          <p className="text-sm text-ink-light mt-2">Join local celebrations when your visit lines up with the calendar.</p>
        </div>
      </div>
    </div>
  );
}
