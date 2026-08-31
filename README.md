## Live Demo

Check out the live demo here: [Little Lemon — Live Demo](little-lemon-fcykd0n1v-arbazs-projects-85cefc61.vercel.app)# Little Lemon Restaurant — Table Booking Website

A responsive, accessible React web application for **Little Lemon**, a fictional
Mediterranean restaurant, built for the Coursera peer-graded assignment
*"Booking a table on the Little Lemon website"*.

## Project Description

The site introduces visitors to Little Lemon — its story, its weekly specials, and
its dining room — and lets them reserve a table through a fully validated booking
form. The booking flow is the core deliverable: choose a date, an available time,
party size, and occasion, fill in contact details, and receive a clear
confirmation (or a clear, actionable error) after submitting.

There is no real backend. Table availability and reservation submission are
simulated by a small mock API (`src/utils/bookingAPI.js`) so the full booking
experience — including a simulated failure path — can be exercised end to end.

## Features

- Responsive design (mobile, tablet, desktop, large desktop)
- Accessible, keyboard-navigable header with a hamburger menu on mobile
- Table reservation form with date, time, guest count, occasion, contact details
  and an optional special-requests field
- Client-side form validation with field-specific, human-readable error messages
- Date-aware available time slots (`getAvailableTimes`)
- Booking confirmation screen with a "Make Another Reservation" reset
- Meaningful error handling for failed submissions, with duplicate-submission
  prevention while a booking is in progress
- Unit tests covering rendering, validation, user interaction, successful
  booking, and booking failure

## Technologies

- React 18
- JavaScript (ES2020+)
- HTML5 / CSS3
- Vite (dev server & build)
- Vitest + React Testing Library (unit tests)
- Git / GitHub

## Installation

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd little-lemon
npm install
```

## Run the Development Server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in a
browser. `npm start` is also available as an alias for the same command.

## Run Tests

```bash
npm test
```

This runs the full Vitest + React Testing Library suite once and prints a
summary. Use `npm run test:watch` for interactive watch mode while developing.

## Build for Production

```bash
npm run build
```

Outputs an optimized static build to `dist/`. Preview it locally with
`npm run preview`.

## Project Structure

```
little-lemon/
├── public/
│   ├── images/            # Site imagery (placeholder photography for this demo)
│   └── favicon.ico
├── src/
│   ├── components/        # Header, Footer, Hero, Highlights, About,
│   │                       # BookingForm, BookingPage, Confirmation,
│   │                       # MenuCard, ErrorMessage, SuccessMessage
│   ├── data/
│   │   └── bookingData.js # Menu items, occasions, time slots, contact info
│   ├── utils/
│   │   ├── validation.js  # validateBookingForm() — reusable, UI-independent
│   │   └── bookingAPI.js  # getAvailableTimes() and submitBooking() mock API
│   ├── tests/              # Vitest + React Testing Library test suites
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── README.md
├── package.json
└── .gitignore
```

## Accessibility

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`,
  `<footer>`, `<form>`, `<fieldset>`/`<legend>`)
- Every form control has an associated `<label htmlFor>` — placeholders are
  never used as the only label
- Invalid fields use `aria-invalid` and `aria-describedby`, pointing to a
  field-level error message rendered with `role="alert"`
- The mobile navigation menu is fully keyboard operable and exposes
  `aria-expanded` / `aria-controls` on its toggle button
- Visible `:focus-visible` outlines on every interactive element
- All meaningful images carry descriptive `alt` text (no `image.jpg`/`photo`
  placeholders); purely decorative marks use `alt=""`
- Success and error states are communicated with text and an icon, not color
  alone, and use `role="status"` / `role="alert"` appropriately
- `prefers-reduced-motion` is respected — animations and smooth scrolling are
  disabled for users who request reduced motion

## Responsive Design

Tested and laid out for:

- Mobile — 320px and 375px
- Tablet — 768px
- Desktop — 1024px
- Large desktop — 1440px

The booking form stacks into a single column on mobile and uses a two-column
grid on larger screens; the header collapses into a hamburger menu below
768px. No section relies on horizontal scrolling at any breakpoint.

## Testing

`src/tests/` contains three suites:

- **validation.test.js** — unit tests for `validateBookingForm()`, covering a
  fully valid form, an empty form, a past date, an invalid email, and guest
  counts outside the 1–10 range.
- **BookingForm.test.jsx** — rendering, field-level validation, a successful
  booking (via `onBookingSuccess`) and the resulting confirmation screen
  (via `BookingPage`), a simulated booking failure, double-submission
  prevention, and the date → time selection interaction.
- **App.test.jsx** — smoke tests for the assembled app: navigation links,
  the hero's "Reserve a Table" CTA, the booking form landing correctly, and
  footer contact information.

Run `npm test` — all tests should pass with no console errors or warnings.

## Assumptions Made

- No real reservation backend was provided, so `bookingAPI.js` simulates one
  (with an artificial delay and one seeded failure case) rather than claiming
  to contact a live service.
- Contact details, address, and social links in the footer are placeholder
  demo content for this coursework project, not a real restaurant's information.
- The site is implemented as a single scrollable page with anchor-linked
  navigation (`#home`, `#about`, `#menu`, `#reservations`, `#contact`) rather
  than multiple routed pages, which keeps the reservation flow — the focus of
  the rubric — one click away from anywhere on the site.

## Submitting to GitHub

```bash
git init
git add .
git commit -m "Initial React project setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Then submit the repository URL for the Coursera peer-graded assignment.
