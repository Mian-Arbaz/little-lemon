import { MENU_ITEMS } from '../data/bookingData';
import MenuCard from './MenuCard';

function Highlights() {
  return (
    <section className="highlights" id="menu" aria-labelledby="highlights-heading">
      <div className="section-inner">
        <div className="highlights-header">
          <h2 id="highlights-heading">This Week's Specials</h2>
          <a className="btn btn-secondary" href="#reservations">
            Online Menu
          </a>
        </div>
        <div className="menu-card-grid">
          {MENU_ITEMS.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
