import { OCCASIONS } from '../data/bookingData';
import SuccessMessage from './SuccessMessage';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(timeString) {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

function occasionLabel(value) {
  return OCCASIONS.find((occasion) => occasion.value === value)?.label ?? value;
}

function Confirmation({ booking, onReset }) {
  return (
    <div className="confirmation" aria-labelledby="confirmation-heading">
      <SuccessMessage>
        <h2 id="confirmation-heading">Booking Confirmed!</h2>
        <p>
          Thank you, {booking.name}. Your table has been reserved. We look forward to
          welcoming you to Little Lemon!
        </p>
      </SuccessMessage>

      <dl className="confirmation-details">
        <div>
          <dt>Name</dt>
          <dd>{booking.name}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDate(booking.date)}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{formatTime(booking.time)}</dd>
        </div>
        <div>
          <dt>Guests</dt>
          <dd>{booking.guests}</dd>
        </div>
        <div>
          <dt>Occasion</dt>
          <dd>{occasionLabel(booking.occasion)}</dd>
        </div>
        {booking.confirmationId && (
          <div>
            <dt>Confirmation ID</dt>
            <dd>{booking.confirmationId}</dd>
          </div>
        )}
      </dl>

      <button type="button" className="btn btn-secondary" onClick={onReset}>
        Make Another Reservation
      </button>
    </div>
  );
}

export default Confirmation;
