# Database Design — Firestore

Firestore is a NoSQL document database, so this is a collection/document design rather than a
relational schema. All dates are stored as Firestore Timestamps.

## Collections

### `rooms`
One document per bookable room type (not per physical room — the 8 rooms are grouped into two
bookable types, matching how guests choose them on the site).

```
rooms/{roomTypeId}
  id: string              // "farm-retreat" | "main-house"
  name: string             // "Farm Retreat Rooms"
  totalUnits: number        // 3 or 5
  description: string
  priceRange: string        // simple display string for now, e.g. "NPR 2,500–3,500/night"
```

### `bookings`
One document per booking request.

```
bookings/{bookingId}
  roomTypeId: string        // references rooms/{roomTypeId}
  checkIn: timestamp
  checkOut: timestamp
  guests: number
  guestName: string
  guestEmail: string
  guestPhone: string
  notes: string
  status: string             // "pending" | "confirmed" | "declined"
  createdAt: timestamp
  language: string           // "en" | "ne" — which language the guest booked in
```

**Availability check**: to check if a room type is free for a date range, query
`bookings` where `roomTypeId == X AND status == "confirmed"` and check for date overlap
client-side or in the Cloud Function (Firestore can't do range-overlap queries natively).

### `inquiries`
General contact form submissions (not tied to specific dates).

```
inquiries/{inquiryId}
  name: string
  email: string
  message: string
  createdAt: timestamp
  status: string             // "new" | "read" | "replied"
```

## Security rules (summary)

- `rooms`: publicly readable, writable only by an authenticated admin (the owner's account)
- `bookings`: creatable by anyone (guests submitting requests) via the Cloud Function only —
  direct client writes to Firestore should be disabled so the overlap-check logic can't be bypassed;
  readable/updatable only by the authenticated admin
- `inquiries`: creatable by anyone; readable/updatable only by the authenticated admin

## Why not a relational DB

A small property with two room types and a modest volume of bookings doesn't need SQL joins or
transactions beyond what Firestore already handles. Firestore also keeps hosting free/cheap and
avoids running a separate database server — consistent with NFR2 (simple for a non-technical admin)
and the "no server to manage" goal from the system design doc.
