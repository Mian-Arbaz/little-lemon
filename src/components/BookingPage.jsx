import { useState } from 'react';
import BookingForm from './BookingForm';
import Confirmation from './Confirmation';

function BookingPage() {
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  return (
    <section className="booking-page" id="reservations" aria-labelledby="booking-heading">
      <div className="section-inner booking-inner">
        <h2 id="booking-heading">Reserve a Table</h2>
        <p className="booking-subheading">
          Book your table at Little Lemon and enjoy a memorable Mediterranean dining experience.
        </p>

        {confirmedBooking ? (
          <Confirmation booking={confirmedBooking} onReset={() => setConfirmedBooking(null)} />
        ) : (
          <BookingForm onBookingSuccess={setConfirmedBooking} />
        )}
      </div>
    </section>
  );
}

export default BookingPage;
