function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="section-inner about-inner">
        <div className="about-copy">
          <h2 id="about-heading">About Little Lemon</h2>
          <p>
            Little Lemon is a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist. Our chefs bring together fresh, locally sourced
            ingredients and time-honored Mediterranean flavors to create a menu that changes
            with the seasons.
          </p>
          <p>
            Whether you're joining us for a quiet family dinner or celebrating a special
            occasion, our friendly team and comfortable dining room are here to make every
            visit memorable.
          </p>
        </div>
        <div className="about-images">
          <img
            className="about-image about-image-front"
            src="/images/about-owners.jpg"
            alt="Little Lemon owners preparing fresh ingredients in the restaurant kitchen"
            width="280"
            height="320"
          />
          <img
            className="about-image about-image-back"
            src="/images/about-dining-room.jpg"
            alt="A warmly lit Little Lemon dining room set for the evening"
            width="280"
            height="320"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
