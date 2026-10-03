# Sunkhani Pahuna Ghar Resort — Website

A React website for Sunkhani Pahuna Ghar Resort (Sunkhani, Kalinchok Rural Municipality, Dolakha).
Bilingual (English/Nepali), with a booking calendar and pages for rooms, farm & nature, culture,
the seminar hall, regional travel packages, gallery, and contact.

## Running it locally

You'll need Node.js installed (v18+).

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

To build a production version (a `dist/` folder you can upload to any host):

```bash
npm run build
```

## What's built vs. what's next

**Built:**
- Full site structure: Home, Our Story, Stay With Us (Farm Retreat + Main House rooms), Farm & Nature,
  Culture & Experiences, Seminar Hall, Explore the Region (travel packages + Tsho Rolpa/Dudhkunda route),
  Gallery, Book Now, Contact
- English/Nepali language toggle (top right of the navigation)
- A working booking calendar UI — pick check-in/check-out dates, room type, guest count, and submit a request
- "In Their Words" testimonials section on the homepage — tabs for Owner, Guests, and Locals (see below)
- Design system (colors, fonts) tailored to the property, defined in tailwind.config.js and src/index.css
- Real-photo support: every image on the site now points at a filename in public/images — see
  public/images/README.md for the full list. Drop a photo in with the matching filename and it replaces
  the color placeholder automatically, no code changes needed.

**Still needed before this goes live:**
1. Real photos — drop them into public/images using the filenames listed in public/images/README.md.
2. Real testimonial quotes — src/components/Testimonials.jsx currently has placeholder quotes for
   Owner/Guests/Locals tabs. Swap in real words once you have them (even a short WhatsApp message from a
   happy guest works well).
3. A real Firebase project — the frontend already calls the API described in docs/api-design.md
   (see src/api/booking.js and src/firebase.js), and runs in a safe "demo mode" until you connect one:
   forms appear to succeed but nothing is actually saved. To go live:
   - Create a Firebase project, enable Firestore, Functions, and Auth
   - Copy .env.example to .env and fill in your project's config values
   - Implement the Cloud Functions described in docs/api-design.md (getAvailability, createBooking,
     onBookingCreated, updateBookingStatus, submitInquiry) — this also sets up email notifications
     for your dad when a new booking comes in
   - Build the admin dashboard page (not yet built) using updateBookingStatus
4. Full Nepali translation — the navigation and homepage are already translated
   (src/i18n/config.js); the other pages still need Nepali copy added the same way.
5. A domain and hosting — once ready, this can be deployed for free on Vercel or Netlify, or on
   Firebase Hosting (which pairs naturally with the Firestore/Functions backend above).

## Project docs

See the docs/ folder for the requirements, system design, database schema, and API design this
project was built against:
- docs/requirements.md
- docs/system-design.md
- docs/db-design.md
- docs/api-design.md

## Project structure

```
src/
  components/   Navbar, Footer, BookingCalendar, PhotoPlaceholder
  pages/        One file per page (Home, About, Stay, Farm, Culture, Seminar, Explore, Gallery, BookNow, Contact)
  i18n/         English/Nepali translations
```
