import { RESTAURANT_INFO } from '../data/bookingData';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
];

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-text">Little Lemon</span>
          <p>{RESTAURANT_INFO.city}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-heading">Navigation</h2>
          <ul className="footer-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#reservations">Reservations</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-list">
            <li>{RESTAURANT_INFO.address}</li>
            <li>
              <a href={`tel:${RESTAURANT_INFO.phone.replace(/[^\d+]/g, '')}`}>{RESTAURANT_INFO.phone}</a>
            </li>
            <li>
              <a href={`mailto:${RESTAURANT_INFO.email}`}>{RESTAURANT_INFO.email}</a>
            </li>
          </ul>
          <p className="footer-demo-note">Demo contact details for coursework purposes only.</p>
        </div>

        <div>
          <h2 className="footer-heading">Hours</h2>
          <ul className="footer-list">
            <li>{RESTAURANT_INFO.hoursWeekday}</li>
            <li>{RESTAURANT_INFO.hoursWeekend}</li>
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">Follow us</h2>
          <ul className="footer-list footer-social">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a href={social.href} aria-label={`Little Lemon on ${social.label} (opens in a new tab)`} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-copyright">© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
