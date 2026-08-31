function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-heading">Little Lemon</h1>
          <p className="hero-subheading">Mediterranean Restaurant</p>
          <p className="hero-description">
            Enjoy fresh Mediterranean flavors, locally sourced ingredients and a warm dining
            experience at Little Lemon, right in the heart of Chicago.
          </p>
          <a className="btn btn-primary" href="#reservations">
            Reserve a Table
          </a>
        </div>
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="/images/hero-dish.jpg"
            alt="Chef plating a Mediterranean dish of grilled vegetables, olives and fresh herbs at Little Lemon"
            width="480"
            height="360"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
