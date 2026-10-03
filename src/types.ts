export type BookingStatus = 'pending' | 'confirmed' | 'declined';
export type RoomTypeId = 'farm-retreat' | 'main-house';

export interface Booking {
  id: string;
  roomTypeId: RoomTypeId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
  status: BookingStatus;
  createdAt: Date;
  language: 'en' | 'ne';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

export const ROOM_TYPE_LABELS: Record<RoomTypeId, string> = {
  'farm-retreat': 'Farm Retreat Rooms',
  'main-house': 'Main House Rooms',
};
