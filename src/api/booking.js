import { httpsCallable } from 'firebase/functions';
import { functions, isFirebaseConfigured } from '../firebase';

// Thin client for the Cloud Functions described in docs/api-design.md.
// Every function here falls back to harmless local behavior when Firebase isn't configured yet
// (see src/firebase.js), so the site keeps working as a demo until a real backend is connected.

export async function getAvailability(roomTypeId) {
  if (!isFirebaseConfigured()) {
    return { roomTypeId, bookedRanges: [] };
  }
  const call = httpsCallable(functions, 'getAvailability');
  const { data } = await call({ roomTypeId });
  return data;
}

export async function createBooking(payload) {
  if (!isFirebaseConfigured()) {
    // Demo mode: pretend it succeeded so the UI flow can still be reviewed end to end.
    console.info('[demo] createBooking called with no backend configured:', payload);
    return { success: true, bookingId: 'demo', status: 'pending', demo: true };
  }
  const call = httpsCallable(functions, 'createBooking');
  const { data } = await call(payload);
  return data;
}

export async function submitInquiry(payload) {
  if (!isFirebaseConfigured()) {
    console.info('[demo] submitInquiry called with no backend configured:', payload);
    return { success: true, inquiryId: 'demo', demo: true };
  }
  const call = httpsCallable(functions, 'submitInquiry');
  const { data } = await call(payload);
  return data;
}

export async function updateBookingStatus(bookingId, status) {
  if (!isFirebaseConfigured()) {
    console.info('[demo] updateBookingStatus called with no backend configured:', bookingId, status);
    return { success: true, demo: true };
  }
  const call = httpsCallable(functions, 'updateBookingStatus');
  const { data } = await call({ bookingId, status });
  return data;
}
