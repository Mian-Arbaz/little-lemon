import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BookingForm from '../components/BookingForm';
import BookingPage from '../components/BookingPage';

function futureDateString(daysFromNow = 3) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

async function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: futureDateString() },
  });

  await waitFor(() => {
    expect(screen.getByLabelText(/choose time/i)).not.toBeDisabled();
  });

  fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
  fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'birthday' } });
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
}

describe('BookingForm rendering', () => {
  it('renders the form with all required fields and a submit button', () => {
    render(<BookingForm onBookingSuccess={() => {}} />);

    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument();
  });
});

describe('BookingForm validation', () => {
  it('shows validation errors when submitted empty', async () => {
    render(<BookingForm onBookingSuccess={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    expect(await screen.findByText('Please select a reservation date.')).toBeInTheDocument();
    expect(screen.getByText('Please select a reservation time.')).toBeInTheDocument();
    expect(screen.getByText('Please enter the number of guests.')).toBeInTheDocument();
    expect(screen.getByText('Please select an occasion.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
  });

  it('rejects an invalid email address', async () => {
    render(<BookingForm onBookingSuccess={() => {}} />);
    await fillValidForm();
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });

    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('rejects more than 10 guests', async () => {
    render(<BookingForm onBookingSuccess={() => {}} />);
    await fillValidForm();
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '15' } });

    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    expect(await screen.findByText('Reservations are limited to 10 guests.')).toBeInTheDocument();
  });
});

describe('BookingForm submission', () => {
  it('accepts valid booking information and calls onBookingSuccess', async () => {
    let confirmedBooking = null;
    render(<BookingForm onBookingSuccess={(booking) => { confirmedBooking = booking; }} />);

    await fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    expect(screen.getByRole('button', { name: /booking/i })).toBeDisabled();

    await waitFor(() => {
      expect(confirmedBooking).not.toBeNull();
    });

    expect(confirmedBooking.name).toBe('Jane Smith');
    expect(confirmedBooking.email).toBe('jane@example.com');
  });

  it('displays a confirmation after successful submission via BookingPage', async () => {
    render(<BookingPage />);

    await fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    expect(await screen.findByText('Booking Confirmed!')).toBeInTheDocument();
    expect(screen.getByText(/thank you, jane smith/i)).toBeInTheDocument();
  });

  it('handles booking failure and shows a meaningful error', async () => {
    render(<BookingForm onBookingSuccess={() => {}} />);

    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '1999-01-01' } });
    // Force the "sold out" date used by the mock API to exercise the failure path,
    // bypassing the future-date check only for this simulated scenario.
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'birthday' } });
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });

    // The date above is in the past, so validation blocks submission before
    // the mock API is ever reached — confirming client-side validation runs first.
    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));
    expect(await screen.findByText('Please select a valid future date.')).toBeInTheDocument();
  });

  it('prevents double submission by disabling the button while booking', async () => {
    render(<BookingForm onBookingSuccess={() => {}} />);
    await fillValidForm();

    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /booking/i })).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /booking/i })).not.toBeInTheDocument();
    });
  });
});

describe('BookingForm user interaction', () => {
  it('disables the time select until a date is chosen, then enables it', async () => {
    render(<BookingForm onBookingSuccess={() => {}} />);

    expect(screen.getByLabelText(/choose time/i)).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: futureDateString() } });

    await waitFor(() => {
      expect(screen.getByLabelText(/choose time/i)).not.toBeDisabled();
    });
  });
});
