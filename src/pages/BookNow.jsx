import { useState } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import BookingCalendar from '../components/BookingCalendar';
import { createBooking } from '../api/booking';

const roomTypes = [
  { id: 'farm', label: 'Farm Retreat Rooms', sub: '3 rooms · 5 min walk from main house' },
  { id: 'main', label: 'Main House Rooms', sub: '5 rooms · within the main compound' },
];

export default function BookNow() {
  const [roomType, setRoomType] = useState('farm');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await createBooking({
        roomType,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        guestName: form.name,
        guestEmail: form.email,
        guestPhone: form.phone,
        notes: form.notes,
      });
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error === 'DATES_UNAVAILABLE'
          ? "Sorry, those dates just became unavailable. Please pick different dates."
          : 'Something went wrong sending your request. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong sending your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-28 text-center">
        <p className="text-clay font-medium mb-3">Request sent</p>
        <h1 className="font-display text-3xl sm:text-4xl">Thank you, {form.name.split(' ')[0] || 'traveller'}.</h1>
        <p className="text-ink-light mt-4 leading-relaxed">
          We've received your request for {roomTypes.find(r => r.id === roomType)?.label.toLowerCase()} from{' '}
          {checkIn && format(checkIn, 'd MMM')} to {checkOut && format(checkOut, 'd MMM yyyy')} ({nights} nights,{' '}
          {guests} guests). We'll confirm availability and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-clay font-medium mb-3">Book Now</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">Check availability</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12 mt-14">
        <div>
          <label className="block text-sm font-medium mb-3">Room type</label>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {roomTypes.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRoomType(r.id)}
                className={`text-left p-4 rounded-sm border transition-colors ${
                  roomType === r.id ? 'border-pine bg-pine/5' : 'border-ink/15 hover:border-ink/30'
                }`}
              >
                <p className="font-medium">{r.label}</p>
                <p className="text-xs text-ink-light mt-1">{r.sub}</p>
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium mb-3">Dates</label>
          <BookingCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={(a, b) => { setCheckIn(a); setCheckOut(b); }}
          />
          {checkIn && (
            <p className="text-sm mt-3">
              <span className="font-medium">{format(checkIn, 'd MMM yyyy')}</span>
              {checkOut && <> &rarr; <span className="font-medium">{format(checkOut, 'd MMM yyyy')}</span> ({nights} nights)</>}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Guests</label>
          <input
            type="number" min={1} max={12} value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 mb-6 bg-white/60"
          />

          <label className="block text-sm font-medium mb-2">Full name</label>
          <input
            required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 mb-4 bg-white/60"
          />

          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 mb-4 bg-white/60"
          />

          <label className="block text-sm font-medium mb-2">Phone / WhatsApp</label>
          <input
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 mb-4 bg-white/60"
          />

          <label className="block text-sm font-medium mb-2">Notes (travel package interest, dietary needs, etc.)</label>
          <textarea
            rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 mb-6 bg-white/60"
          />

          {error && (
            <p className="text-sm text-red-700 mb-4" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={!checkIn || !checkOut || submitting}
            className="w-full bg-clay text-stone font-semibold px-6 py-3.5 rounded-full hover:bg-clay-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending…' : 'Send booking request'}
          </button>
        </div>
      </form>
    </div>
  );
}
