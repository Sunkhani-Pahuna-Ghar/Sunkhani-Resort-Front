import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { ROOM_TYPE_LABELS, type Booking } from '../types';

function toBooking(id: string, data: Record<string, unknown>): Booking {
  return {
    id,
    roomTypeId: data.roomTypeId as Booking['roomTypeId'],
    checkIn: (data.checkIn as Timestamp).toDate(),
    checkOut: (data.checkOut as Timestamp).toDate(),
    guests: Number(data.guests) || 1,
    guestName: String(data.guestName || ''),
    guestEmail: String(data.guestEmail || ''),
    guestPhone: String(data.guestPhone || ''),
    notes: String(data.notes || ''),
    status: data.status as Booking['status'],
    createdAt: (data.createdAt as Timestamp)?.toDate?.() ?? new Date(),
    language: (data.language as Booking['language']) || 'en',
  };
}

export default function Account() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db || !user) return;

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map((d) => toBooking(d.id, d.data())));
    });
    return unsubscribe;
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

      {bookings.length === 0 && (
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
                  {b.checkIn.toLocaleDateString()} → {b.checkOut.toLocaleDateString()} ·{' '}
                  {b.guests} guest{b.guests !== 1 ? 's' : ''}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${
                  b.status === 'confirmed'
                    ? 'bg-pine/15 text-pine'
                    : b.status === 'declined'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-marigold/20 text-clay-dark'
                }`}
              >
                {b.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
