import { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { getAdminBookings, getAdminInquiries, updateBookingStatus } from '../../api/booking';
import { ROOM_TYPE_LABELS, STATUS_STYLES, type Booking, type BookingStatus, type Inquiry } from '../../types';

type Tab = 'bookings' | 'messages';

const day = (s: string) => parseISO(s).toLocaleDateString();
const POLL_MS = 20000;

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tab, setTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [loadError, setLoadError] = useState(false);

  const load = () =>
    Promise.all([getAdminBookings(), getAdminInquiries()])
      .then(([b, i]) => { setBookings(b as Booking[]); setInquiries(i as Inquiry[]); setLoadError(false); })
      .catch(() => setLoadError(true));

  useEffect(() => {
    load();
    const timer = setInterval(load, POLL_MS);
    return () => clearInterval(timer);
  }, []);

  const handleStatusChange = async (bookingId: string, status: BookingStatus) => {
    if (status === 'cancelled' && !window.confirm('Cancel this confirmed booking? The dates will become available again.')) return;
    setUpdatingId(bookingId);
    try {
      const result = await updateBookingStatus(bookingId, status);
      if (!result.success) {
        alert(result.error === 'DATES_UNAVAILABLE'
          ? 'Those dates overlap another confirmed booking, so this one cannot be confirmed.'
          : result.message || 'Something went wrong updating that booking.');
      }
      await load();
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

      {loadError && (
        <p className="text-sm text-red-700 mb-6" role="alert">Could not refresh data. Retrying…</p>
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
                  <p className="text-sm text-ink-light">{b.guestEmail} {b.guestPhone ? `· ${b.guestPhone}` : ''}</p>
                  <p className="text-sm mt-2">
                    {ROOM_TYPE_LABELS[b.roomTypeId] || b.roomTypeId} ·{' '}
                    {day(b.checkIn)} → {day(b.checkOut)} ·{' '}
                    {b.guests} guest{b.guests !== 1 ? 's' : ''}
                  </p>
                  {b.notes && <p className="text-sm text-ink-light mt-2 italic">"{b.notes}"</p>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_STYLES[b.status] ?? STATUS_STYLES.pending}`}
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
                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(b.id, 'cancelled')}
                      disabled={updatingId === b.id}
                      className="text-xs font-semibold border border-ink/20 px-3 py-1.5 rounded-full hover:border-red-400 hover:text-red-700 transition-colors disabled:opacity-40"
                    >
                      Cancel booking
                    </button>
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
              <p className="text-xs text-ink-light mt-2">{new Date(i.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
