// Reusable, UI-independent validation for the reservation form.
// Kept out of components so it can be unit tested directly and reused
// anywhere a booking needs to be validated.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} dateString - "YYYY-MM-DD" or ""
 * @returns {boolean} true if the date is today or in the future
 */
function isTodayOrFuture(dateString) {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(`${dateString}T00:00:00`);
  return selected.getTime() >= today.getTime();
}

/**
 * Validates a booking form submission.
 * @param {object} formData
 * @param {string} formData.date
 * @param {string} formData.time
 * @param {string|number} formData.guests
 * @param {string} formData.occasion
 * @param {string} formData.name
 * @param {string} formData.email
 * @param {string} [formData.specialRequest]
 * @returns {{isValid: boolean, errors: Record<string,string>}}
 */
export function validateBookingForm(formData) {
  const errors = {};
  const { date, time, guests, occasion, name, email } = formData;

  // Date
  if (!date) {
    errors.date = 'Please select a reservation date.';
  } else if (!isTodayOrFuture(date)) {
    errors.date = 'Please select a valid future date.';
  }

  // Time
  if (!time) {
    errors.time = 'Please select a reservation time.';
  }

  // Guests
  const guestCount = Number(guests);
  if (guests === '' || guests === undefined || guests === null) {
    errors.guests = 'Please enter the number of guests.';
  } else if (Number.isNaN(guestCount) || !Number.isInteger(guestCount)) {
    errors.guests = 'Please enter a valid number of guests.';
  } else if (guestCount < 1) {
    errors.guests = 'Please enter at least 1 guest.';
  } else if (guestCount > 10) {
    errors.guests = 'Reservations are limited to 10 guests.';
  }

  // Occasion
  if (!occasion) {
    errors.occasion = 'Please select an occasion.';
  }

  // Name
  if (!name || !name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  // Email
  if (!email || !email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
