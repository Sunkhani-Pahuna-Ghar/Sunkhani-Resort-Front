import { format } from "date-fns";
import { request, ApiError } from "./client";

export type RoomTypeId = "farm-retreat" | "main-house";
export type BookingStatus = "pending" | "confirmed" | "declined" | "cancelled";

export interface BookedRange {
  checkIn: string;
  checkOut: string;
}
export interface BookingRecord {
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
  language: "en" | "ne";
  createdAt: string;
}
export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

/** Old pages used 'farm' / 'main'; the backend uses 'farm-retreat' / 'main-house'. */
export function normalizeRoomType(id: string): RoomTypeId {
  if (id === "farm" || id === "farm-retreat") return "farm-retreat";
  if (id === "main" || id === "main-house") return "main-house";
  return id as RoomTypeId;
}

/** Accepts Date, 'YYYY-MM-DD' or an ISO datetime; returns the LOCAL calendar day as YYYY-MM-DD. */
export function toDay(value: Date | string): string {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = value instanceof Date ? value : new Date(value);
  return format(d, "yyyy-MM-dd");
}

export async function getAvailability(roomTypeId: string) {
  const id = normalizeRoomType(roomTypeId);
  const bookedRanges = await request<BookedRange[]>(
    `/availability?roomTypeId=${encodeURIComponent(id)}`,
    { auth: false },
  );
  return { roomTypeId: id, bookedRanges };
}

export interface CreateBookingInput {
  roomTypeId?: string;
  roomType?: string;
  checkIn: Date | string;
  checkOut: Date | string;
  guests: number | string;
  guestName?: string;
  name?: string;
  guestEmail?: string;
  email?: string;
  guestPhone?: string;
  phone?: string;
  notes?: string;
  language?: "en" | "ne";
}

export type CreateBookingResult =
  | { success: true; bookingId: string; status: BookingStatus }
  | { success: false; error: string; message: string };

export async function createBooking(p: CreateBookingInput): Promise<CreateBookingResult> {
  const phone = p.guestPhone ?? p.phone;
  const notes = p.notes;
  const body: Record<string, unknown> = {
    roomTypeId: normalizeRoomType(p.roomTypeId ?? p.roomType ?? ""),
    checkIn: toDay(p.checkIn),
    checkOut: toDay(p.checkOut),
    guests: Number(p.guests),
    guestName: (p.guestName ?? p.name ?? "").trim(),
    guestEmail: (p.guestEmail ?? p.email ?? "").trim(),
    language: p.language === "ne" ? "ne" : "en",
  };
  if (phone && phone.trim()) body.guestPhone = phone.trim();
  if (notes && notes.trim()) body.notes = notes.trim();

  try {
    const r = await request<{ id: string; status: BookingStatus }>("/bookings", {
      method: "POST",
      body,
    });
    return { success: true, bookingId: r.id, status: r.status };
  } catch (e) {
    if (e instanceof ApiError) return { success: false, error: e.code, message: e.message };
    throw e;
  }
}

export async function submitInquiry(p: { name: string; email: string; message: string }) {
  try {
    await request("/inquiries", {
      method: "POST",
      body: { name: p.name.trim(), email: p.email.trim(), message: p.message.trim() },
      auth: false,
    });
    return { success: true as const };
  } catch (e) {
    if (e instanceof ApiError) return { success: false as const, error: e.code, message: e.message };
    throw e;
  }
}

export const getMyBookings = () => request<BookingRecord[]>("/bookings/mine");
export const getAdminBookings = (status?: BookingStatus) =>
  request<BookingRecord[]>(`/admin/bookings${status ? `?status=${status}` : ""}`);
export const getAdminInquiries = () => request<InquiryRecord[]>("/admin/inquiries");

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  try {
    await request(`/admin/bookings/${encodeURIComponent(bookingId)}`, {
      method: "PATCH",
      body: { status },
    });
    return { success: true as const };
  } catch (e) {
    if (e instanceof ApiError) return { success: false as const, error: e.code, message: e.message };
    throw e;
  }
}
