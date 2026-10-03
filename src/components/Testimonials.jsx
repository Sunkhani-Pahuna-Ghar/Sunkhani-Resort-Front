import { useState } from 'react';
import { Quote } from 'lucide-react';

// Placeholder quotes -- swap in real words from your family, past guests, and neighbours
// once you have them. Keep each short (2-4 sentences) so the cards stay readable.
const groups = {
  owner: {
    label: 'From the Owner',
    quotes: [
      {
        name: "Iraj's father",
        role: 'Owner, Sunkhani Pahuna Ghar Resort',
        quote: 'This land has been in our family for generations. Opening it up to guests means sharing the same hospitality we would give anyone who walks through our door.',
      },
    ],
  },
  guests: {
    label: 'What Guests Say',
    quotes: [
      { name: 'Guest name', role: 'Visited from —', quote: "Add a real guest quote here once you've collected feedback from your first bookings." },
      { name: 'Guest name', role: 'Visited from —', quote: 'A second guest quote can go here — even a short WhatsApp message from a happy guest works well.' },
    ],
  },
  locals: {
    label: 'What Locals Say',
    quotes: [
      { name: 'Local name', role: 'Sunkhani village', quote: 'A quote from a neighbour or local musician about the resort and its place in the village.' },
    ],
  },
};

export default function Testimonials() {
  const [tab, setTab] = useState('owner');
  const active = groups[tab];

  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">In Their Words</p>
      <h2 className="font-display text-3xl sm:text-4xl max-w-lg">Owner, guests, and neighbours</h2>

      <div className="flex flex-wrap gap-2 mt-8 mb-10">
        {Object.entries(groups).map(([key, g]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === key ? 'bg-pine text-stone' : 'border border-ink/20 text-ink-light hover:border-pine'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {active.quotes.map((q, i) => (
          <div key={i} className="bg-white/50 border border-ink/10 rounded-sm p-6">
            <Quote className="text-marigold mb-3" size={22} />
            <p className="text-ink-light leading-relaxed">{q.quote}</p>
            <p className="mt-4 font-medium text-sm">{q.name}</p>
            <p className="text-xs text-ink-light">{q.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
