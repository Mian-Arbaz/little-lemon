import { useMemo, useState } from 'react';
import { OCCASIONS } from '../data/bookingData';
import { getAvailableTimes, submitBooking } from '../utils/bookingAPI';
import { validateBookingForm } from '../utils/validation';
import ErrorMessage from './ErrorMessage';

const INITIAL_FORM_STATE = {
  date: '',
  time: '',
  guests: '',
  occasion: '',
  name: '',
  email: '',
  specialRequest: '',
};

function getTodayISODate() {
  return new Date().toISOString().split('T')[0];
}

function BookingForm({ onBookingSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const minDate = useMemo(getTodayISODate, []);
  const availableTimes = useMemo(() => getAvailableTimes(formData.date), [formData.date]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // Changing the date can invalidate a previously chosen time.
      if (name === 'date') {
        next.time = '';
      }
      return next;
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: validationErrors } = validateBookingForm({ ...formData });
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { isValid, errors: validationErrors } = validateBookingForm(formData);
    setErrors(validationErrors);
    setTouched({
      date: true,
      time: true,
      guests: true,
      occasion: true,
      name: true,
      email: true,
    });

    if (!isValid || isSubmitting) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const confirmedBooking = await submitBooking(formData);
      onBookingSuccess(confirmedBooking);
    } catch (error) {
      setSubmitError(error.message || "We couldn't complete your reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (field) => (touched[field] && errors[field] ? errors[field] : '');

  return (
    <form className="booking-form" noValidate onSubmit={handleSubmit} aria-label="Table reservation form">
      {submitError && (
        <div className="form-alert" role="alert">
          {submitError}
        </div>
      )}

      <fieldset className="form-section">
        <legend>Reservation Details</legend>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="date">Choose date</label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={minDate}
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('date'))}
              aria-describedby={fieldError('date') ? 'date-error' : undefined}
            />
            <ErrorMessage id="date-error">{fieldError('date')}</ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="time">Choose time</label>
            <select
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('time'))}
              aria-describedby={fieldError('time') ? 'time-error' : undefined}
              disabled={!formData.date}
            >
              <option value="">
                {formData.date ? 'Select a time' : 'Choose a date first'}
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {formData.date && availableTimes.length === 0 && (
              <p className="field-hint">Little Lemon is closed on the selected date. Please choose another date.</p>
            )}
            <ErrorMessage id="time-error">{fieldError('time')}</ErrorMessage>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="guests">Number of guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="10"
              required
              value={formData.guests}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('guests'))}
              aria-describedby={fieldError('guests') ? 'guests-error' : undefined}
            />
            <ErrorMessage id="guests-error">{fieldError('guests')}</ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              required
              value={formData.occasion}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('occasion'))}
              aria-describedby={fieldError('occasion') ? 'occasion-error' : undefined}
            >
              <option value="">Select an occasion</option>
              {OCCASIONS.map((occasion) => (
                <option key={occasion.value} value={occasion.value}>
                  {occasion.label}
                </option>
              ))}
            </select>
            <ErrorMessage id="occasion-error">{fieldError('occasion')}</ErrorMessage>
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Guest Information</legend>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('name'))}
              aria-describedby={fieldError('name') ? 'name-error' : undefined}
            />
            <ErrorMessage id="name-error">{fieldError('name')}</ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('email'))}
              aria-describedby={fieldError('email') ? 'email-error' : undefined}
            />
            <ErrorMessage id="email-error">{fieldError('email')}</ErrorMessage>
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Additional Information</legend>
        <div className="form-field">
          <label htmlFor="specialRequest">Special Requests (optional)</label>
          <textarea
            id="specialRequest"
            name="specialRequest"
            rows="4"
            placeholder="Let us know if you have any special requests, such as dietary requirements or seating preferences..."
            value={formData.specialRequest}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Reserve Table'}
      </button>
    </form>
  );
}

export default BookingForm;
