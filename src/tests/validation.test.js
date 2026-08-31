import { describe, expect, it } from 'vitest';
import { validateBookingForm } from '../utils/validation';

function futureDateString(daysFromNow = 3) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

function validFormData(overrides = {}) {
  return {
    date: futureDateString(),
    time: '18:00',
    guests: '2',
    occasion: 'birthday',
    name: 'John Doe',
    email: 'john@example.com',
    specialRequest: '',
    ...overrides,
  };
}

describe('validateBookingForm', () => {
  it('accepts a fully valid form', () => {
    const { isValid, errors } = validateBookingForm(validFormData());
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  it('rejects an empty form with a useful error per field', () => {
    const { isValid, errors } = validateBookingForm({
      date: '',
      time: '',
      guests: '',
      occasion: '',
      name: '',
      email: '',
    });

    expect(isValid).toBe(false);
    expect(errors.date).toBe('Please select a reservation date.');
    expect(errors.time).toBe('Please select a reservation time.');
    expect(errors.guests).toBe('Please enter the number of guests.');
    expect(errors.occasion).toBe('Please select an occasion.');
    expect(errors.name).toBe('Please enter your name.');
    expect(errors.email).toBe('Please enter your email address.');
  });

  it('rejects a past date', () => {
    const { isValid, errors } = validateBookingForm(validFormData({ date: '2000-01-01' }));
    expect(isValid).toBe(false);
    expect(errors.date).toBe('Please select a valid future date.');
  });

  it('rejects an invalid email address', () => {
    const { isValid, errors } = validateBookingForm(validFormData({ email: 'not-an-email' }));
    expect(isValid).toBe(false);
    expect(errors.email).toBe('Please enter a valid email address.');
  });

  it('rejects more than 10 guests', () => {
    const { isValid, errors } = validateBookingForm(validFormData({ guests: '11' }));
    expect(isValid).toBe(false);
    expect(errors.guests).toBe('Reservations are limited to 10 guests.');
  });

  it('rejects fewer than 1 guest', () => {
    const { isValid, errors } = validateBookingForm(validFormData({ guests: '0' }));
    expect(isValid).toBe(false);
    expect(errors.guests).toBe('Please enter at least 1 guest.');
  });

  it('treats special requests as optional', () => {
    const { isValid } = validateBookingForm(validFormData({ specialRequest: undefined }));
    expect(isValid).toBe(true);
  });
});
