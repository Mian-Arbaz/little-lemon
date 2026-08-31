import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders without crashing and shows the Little Lemon brand', () => {
    render(<App />);
    expect(screen.getAllByText('Little Lemon').length).toBeGreaterThan(0);
  });

  it('renders primary navigation with the required links', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    ['Home', 'About', 'Menu', 'Reservations', 'Contact'].forEach((label) => {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    });
  });

  it('renders a hero section with a "Reserve a Table" call to action', () => {
    render(<App />);
    const heroLinks = screen.getAllByRole('link', { name: /reserve a table/i });
    expect(heroLinks.length).toBeGreaterThan(0);
  });

  it('renders the reservation heading and booking form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /table reservation form/i })).toBeInTheDocument();
  });

  it('renders footer contact information', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(/info@littlelemon.example/i)).toBeInTheDocument();
    expect(within(footer).getByText(/Monday – Friday/i)).toBeInTheDocument();
  });
});
