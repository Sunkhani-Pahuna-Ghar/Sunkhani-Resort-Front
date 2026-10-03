import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { updateBookingStatus } from '../../api/booking';
import { ROOM_TYPE_LABELS, type Booking, type Inquiry } from '../../types';

type Tab = 'bookings' | 'messages';

// Firestore gives back Timestamp objects; this converts a raw snapshot doc into
// our typed Booking/Inquiry shape with plain JS Dates.
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

function toInquiry(id: string, data: Record<string, unknown>): Inquiry {
  return {
    id,
    name: String(data.name || ''),
    email: String(data.email || ''),
    message: String(data.message || ''),
    status: (data.status as Inquiry['status']) || 'new',
    createdAt: (data.createdAt as Timestamp)?.toDate?.() ?? new Date(),
  };
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tab, setTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const bookingsQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubBookings = onSnapshot(bookingsQuery, (snapshot) => {
      setBookings(snapshot.docs.map((d) => toBooking(d.id, d.data())));
    });

    const inquiriesQuery = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubInquiries = onSnapshot(inquiriesQuery, (snapshot) => {
      setInquiries(snapshot.docs.map((d) => toInquiry(d.id, d.data())));
    });

    return () => {
      unsubBookings();
      unsubInquiries();
    };
  }, []);

  const handleStatusChange = async (bookingId: string, status: 'confirmed' | 'declined') => {
    setUpdatingId(bookingId);
    try {
      await updateBookingStatus(bookingId, status);
    } catch {
      alert('Something went wrong updating that booking. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Admin Dashboard</h1>
          <p className="text-ink-light text-sm mt-1">Sunkhani Pahuna Ghar Resort</p>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm border border-ink/20 px-4 py-2 rounded-full hover:border-pine hover:text-pine transition-colors"
        >
          Sign out
        </button>
      </div>

      {!isFirebaseConfigured() && (
        <p className="text-sm bg-marigold/20 border border-marigold rounded-sm px-4 py-3 mb-8">
          Firebase isn't configured yet — this dashboard will stay empty until a real project is
          connected (see README.md).
        </p>
      )}

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab('bookings')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tab === 'bookings' ? 'bg-pine text-stone' : 'border border-ink/20 text-ink-light hover:border-pine'
          }`}
        >
          Bookings {pendingCount > 0 && `(${pendingCount} pending)`}
        </button>
        <button
          onClick={() => setTab('messages')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tab === 'messages' ? 'bg-pine text-stone' : 'border border-ink/20 text-ink-light hover:border-pine'
          }`}
        >
          Messages
        </button>
      </div>

      {tab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 && (
            <p className="text-ink-light text-sm">No booking requests yet.</p>
          )}
          {bookings.map((b) => (
            <div key={b.id} className="border border-ink/10 rounded-sm p-5 bg-white/50">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{b.guestName}</p>
                  <p className="text-sm text-ink-light">{b.guestEmail} {b.guestPhone && `· ${b.guestPhone}`}</p>
                  <p className="text-sm mt-2">
                    {ROOM_TYPE_LABELS[b.roomTypeId] || b.roomTypeId} ·{' '}
                    {b.checkIn.toLocaleDateString()} → {b.checkOut.toLocaleDateString()} ·{' '}
                    {b.guests} guest{b.guests !== 1 ? 's' : ''}
                  </p>
                  {b.notes && <p className="text-sm text-ink-light mt-2 italic">"{b.notes}"</p>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      b.status === 'confirmed'
                        ? 'bg-pine/15 text-pine'
                        : b.status === 'declined'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-marigold/20 text-clay-dark'
                    }`}
                  >
                    {b.status}
                  </span>
                  {b.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(b.id, 'confirmed')}
                        disabled={updatingId === b.id}
                        className="text-xs font-semibold bg-pine text-stone px-3 py-1.5 rounded-full hover:bg-pine-dark transition-colors disabled:opacity-40"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'declined')}
                        disabled={updatingId === b.id}
                        className="text-xs font-semibold border border-ink/20 px-3 py-1.5 rounded-full hover:border-red-400 hover:text-red-700 transition-colors disabled:opacity-40"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'messages' && (
        <div className="space-y-4">
          {inquiries.length === 0 && (
            <p className="text-ink-light text-sm">No messages yet.</p>
          )}
          {inquiries.map((i) => (
            <div key={i.id} className="border border-ink/10 rounded-sm p-5 bg-white/50">
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-ink-light">{i.email}</p>
              <p className="text-sm mt-2">{i.message}</p>
              <p className="text-xs text-ink-light mt-2">{i.createdAt.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
