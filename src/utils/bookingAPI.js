import { ALL_TIME_SLOTS } from '../data/bookingData';

/**
 * Returns the list of reservation times available for a given date.
 * Kept separate from any component so the "business logic" of table
 * availability never lives inside JSX.
 *
 * This project has no real backend, so availability is simulated:
 * the restaurant is closed on Mondays, and the two dinner slots
 * closest to closing are unavailable on Sundays (shorter kitchen hours).
 *
 * @param {string} dateString - an ISO date string, e.g. "2026-09-04"
 * @returns {string[]} array of available "HH:MM" time strings
 */
export function getAvailableTimes(dateString) {
  if (!dateString) return [];

  // new Date("YYYY-MM-DD") is parsed as UTC; append a time to keep it local.
  const date = new Date(`${dateString}T00:00:00`);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday

  if (dayOfWeek === 1) {
    // Little Lemon is closed on Mondays.
    return [];
  }

  if (dayOfWeek === 0) {
    // Sunday: kitchen closes earlier.
    return ALL_TIME_SLOTS.filter((time) => time < '20:30');
  }

  return [...ALL_TIME_SLOTS];
}

/**
 * Simulates submitting a reservation to a booking service.
 * Resolves with the confirmed booking after a short delay, or rejects
 * with an Error carrying a user-friendly message.
 *
 * There is no real backend behind this project, so nothing here should
 * be mistaken for an actual external reservation system.
 *
 * @param {object} bookingDetails - validated booking form data
 * @returns {Promise<object>} the confirmed booking
 */
export function submitBooking(bookingDetails) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a fully booked date so the failure / error-handling
      // path in the UI is exercised and testable.
      if (bookingDetails.date === '1999-01-01') {
        reject(new Error("We couldn't complete your reservation right now. Please check your information and try again."));
        return;
      }

      resolve({
        ...bookingDetails,
        confirmationId: `LL-${Date.now()}`,
      });
    }, 600);
  });
}
