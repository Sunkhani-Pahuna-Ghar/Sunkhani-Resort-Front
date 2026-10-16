export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'cancelled';
export type RoomTypeId = 'farm-retreat' | 'main-house';

// Dates from the API are plain 'YYYY-MM-DD' strings (check-in night up to, not including, check-out).
export interface Booking {
  id: string;
  roomTypeId: RoomTypeId;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  notes: string | null;
  status: BookingStatus;
  createdAt: string;
  language: 'en' | 'ne';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export const ROOM_TYPE_LABELS: Record<RoomTypeId, string> = {
  'farm-retreat': 'Farm Retreat Rooms',
  'main-house': 'Main House Rooms',
};

export const STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: 'bg-pine/15 text-pine',
  declined: 'bg-red-100 text-red-700',
  cancelled: 'bg-ink/10 text-ink-light',
  pending: 'bg-marigold/20 text-clay-dark',
};
