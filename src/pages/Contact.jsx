import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import { submitInquiry } from '../api/booking';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const result = await submitInquiry(form);
      setStatus(result.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Contact</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">Get in touch</h1>

      <div className="grid md:grid-cols-2 gap-12 mt-14">
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <MapPin className="text-clay mt-1" size={20} />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-ink-light text-sm">Sunkhani, Kalinchok Rural Municipality, Dolakha, Nepal</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Phone className="text-clay mt-1" size={20} />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-ink-light text-sm">+977 XX-XXXXXXX</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <MessageCircle className="text-clay mt-1" size={20} />
            <div>
              <p className="font-medium">WhatsApp</p>
              <p className="text-ink-light text-sm">+977 XX-XXXXXXX</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Mail className="text-clay mt-1" size={20} />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-ink-light text-sm">stay@sunkhanipahunaghar.com</p>
            </div>
          </div>
          <PhotoPlaceholder label="Map — Sunkhani, Dolakha" src="/images/contact-map.jpg" tone="dusk" className="aspect-video mt-4" />
        </div>

        {status === 'sent' ? (
          <div className="bg-pine/5 border border-pine/20 rounded-sm p-8">
            <h2 className="font-display text-2xl">Message sent</h2>
            <p className="text-ink-light mt-2">Thanks for reaching out — we'll get back to you soon.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-ink/20 rounded-sm px-4 py-2.5 bg-white/60" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-ink/20 rounded-sm px-4 py-2.5 bg-white/60" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-ink/20 rounded-sm px-4 py-2.5 bg-white/60" />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-700" role="alert">Something went wrong sending your message. Please try again.</p>
            )}
            <button type="submit" disabled={status === 'sending'} className="bg-pine text-stone font-semibold px-6 py-3 rounded-full hover:bg-pine-dark transition-colors disabled:opacity-40">
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
