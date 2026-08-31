function MenuCard({ item }) {
  return (
    <article className="menu-card">
      <img className="menu-card-image" src={item.image} alt={item.alt} width="320" height="200" />
      <div className="menu-card-body">
        <div className="menu-card-heading">
          <h3>{item.name}</h3>
          <span className="menu-card-price">{item.price}</span>
        </div>
        <p>{item.description}</p>
        <a className="menu-card-link" href="#reservations">
          Reserve a Table
        </a>
      </div>
    </article>
  );
}

export default MenuCard;
