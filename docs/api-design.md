# API Design — Cloud Functions

All booking-affecting operations go through callable Cloud Functions rather than direct Firestore
writes from the client, so the same functions can later serve a mobile app without any rework.

## `getAvailability`
**Type**: Callable function
**Purpose**: Returns booked date ranges for a room type, so the frontend calendar can gray out
unavailable dates.

**Request**
```json
{ "roomTypeId": "farm-retreat" }
```

**Response**
```json
{
  "roomTypeId": "farm-retreat",
  "bookedRanges": [
    { "checkIn": "2026-10-05", "checkOut": "2026-10-07" },
    { "checkIn": "2026-10-14", "checkOut": "2026-10-16" }
  ]
}
```

## `createBooking`
**Type**: Callable function
**Purpose**: Validates and creates a booking request. Rejects if the dates overlap an existing
confirmed booking for that room type.

**Request**
```json
{
  "roomTypeId": "farm-retreat",
  "checkIn": "2026-10-20",
  "checkOut": "2026-10-23",
  "guests": 2,
  "guestName": "Jane Doe",
  "guestEmail": "jane@example.com",
  "guestPhone": "+1 555 0100",
  "notes": "Interested in the Kalinchowk day trip package",
  "language": "en"
}
```

**Response (success)**
```json
{ "success": true, "bookingId": "abc123", "status": "pending" }
```

**Response (conflict)**
```json
{ "success": false, "error": "DATES_UNAVAILABLE" }
```

**Side effect**: on success, triggers an email to the owner (see `onBookingCreated` below).

## `onBookingCreated` (background trigger, not called by frontend)
**Type**: Firestore trigger — fires automatically when a new document is added to `bookings`
**Purpose**: Sends an email notification to the owner with the booking details, so he doesn't have
to check the dashboard manually.

## `updateBookingStatus`
**Type**: Callable function (admin-only — requires Firebase Auth)
**Purpose**: Lets the owner confirm or decline a pending booking from the admin dashboard.

**Request**
```json
{ "bookingId": "abc123", "status": "confirmed" }
```

**Response**
```json
{ "success": true }
```

## `submitInquiry`
**Type**: Callable function
**Purpose**: Handles the general Contact page form (not tied to a booking).

**Request**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "message": "Do you offer airport pickup?" }
```

**Response**
```json
{ "success": true, "inquiryId": "xyz789" }
```

## Auth

- Guest-facing functions (`getAvailability`, `createBooking`, `submitInquiry`) require no login.
- `updateBookingStatus` and any dashboard read of raw `bookings`/`inquiries` require Firebase Auth
  with the owner's account — enforced both in the function and in Firestore security rules.
