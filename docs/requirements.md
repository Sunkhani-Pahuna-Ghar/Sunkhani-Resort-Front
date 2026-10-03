# Requirements — Sunkhani Pahuna Ghar Resort Website

## 1. Overview
A bilingual (English/Nepali) marketing and booking website for Sunkhani Pahuna Ghar Resort, a
family-run homestay/hotel/lodge in Sunkhani, Kalinchok Rural Municipality, Dolakha, Nepal. The site
showcases the property (farm, jungle, culture, seminar hall) and lets guests check room availability
and submit booking requests.

## 2. Stakeholders
| Role | Person | Responsibility |
|---|---|---|
| Owner / Admin | Iraj's father | Reviews and manages bookings once the site is live |
| Developer | Iraj | Builds and maintains the site |
| End users | International & domestic travellers | Browse the property, submit booking requests |

## 3. Functional Requirements

### 3.1 Content pages
- FR1: Homepage with hero banner, room type overview, culture callout, testimonials, and nearby
  destinations
- FR2: About/Our Story page
- FR3: Stay With Us page detailing the two room types (Farm Retreat — 3 rooms; Main House — 5 rooms)
- FR4: Farm & Nature page (animals, crops, jungle)
- FR5: Culture & Experiences page (musical evenings, cuisine, festivals)
- FR6: Seminar Hall page
- FR7: Explore the Region page — Dolakha Bhimsen, Kalinchowk, and the Tsho Rolpa/Dudhkunda trekking
  route, including trek info, guide, and vehicle arrangement
- FR8: Gallery page
- FR9: Contact page with inquiry form

### 3.2 Booking
- FR10: Guest can select a room type (Farm Retreat or Main House)
- FR11: Guest can pick check-in/check-out dates on a calendar showing real availability
- FR12: Guest can specify number of guests
- FR13: Guest submits name, email, phone, and notes with the booking request
- FR14: Booking requests are saved to a database and are not lost on page refresh
- FR15: Owner (admin) can view all booking requests in a simple dashboard
- FR16: Owner receives an email notification when a new booking request comes in
- FR17: Owner can mark a booking as confirmed or declined

### 3.3 Language
- FR18: Guest can toggle the site between English and Nepali

## 4. Non-Functional Requirements
- NFR1: Usable on mobile devices (most guests will browse on phones)
- NFR2: Admin dashboard must be simple enough for a non-technical user (Iraj's father) to operate
- NFR3: Page load should stay reasonable on slower rural internet connections — images optimized/compressed
- NFR4: No double-booking of the same room for overlapping dates
- NFR5: Data (bookings, availability) must persist reliably — no data loss
- NFR6: Codebase should support adding a mobile app later without a rebuild (API-first backend)

## 5. Out of Scope (for now)
- Online payment processing (bookings are requests, confirmed manually for now)
- Native mobile app (may be revisited later; a PWA path stays open)
- Automated translation — Nepali content is written manually, not machine-translated
