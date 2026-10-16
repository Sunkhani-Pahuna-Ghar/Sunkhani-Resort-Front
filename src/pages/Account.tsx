import { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { getMyBookings } from '../api/booking';
import { ROOM_TYPE_LABELS, STATUS_STYLES, type Booking } from '../types';

const day = (s: string) => parseISO(s).toLocaleDateString();

export default function Account() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    const load = () =>
      getMyBookings()
        .then((rows) => { if (alive) { setBookings(rows as Booking[]); setLoadError(false); } })
        .catch(() => { if (alive) setLoadError(true); });
    load();
    const timer = setInterval(load, 30000);
    return () => { alive = false; clearInterval(timer); };
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-5 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">My Bookings</h1>
          <p className="text-ink-light text-sm mt-1">{user?.email}</p>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm border border-ink/20 px-4 py-2 rounded-full hover:border-pine hover:text-pine transition-colors"
        >
          Sign out
        </button>
      </div>

      {loadError && (
        <p className="text-sm text-red-700 mb-4" role="alert">Could not load your bookings. Retrying…</p>
      )}

      {bookings.length === 0 && !loadError && (
        <p className="text-ink-light text-sm">
          You haven't made any bookings yet while signed in. Book a stay and it'll show up here.
        </p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="border border-ink/10 rounded-sm p-5 bg-white/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{ROOM_TYPE_LABELS[b.roomTypeId] || b.roomTypeId}</p>
                <p className="text-sm text-ink-light mt-1">
                  {day(b.checkIn)} → {day(b.checkOut)} · {b.guests} guest{b.guests !== 1 ? 's' : ''}
                </p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${STATUS_STYLES[b.status] ?? STATUS_STYLES.pending}`}>
                {b.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
