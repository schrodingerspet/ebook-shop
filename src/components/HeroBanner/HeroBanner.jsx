import Button from '../Button/Button'
import './HeroBanner.css'

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="page-container-wide hero-banner__layout">
        <div className="hero-banner__left">
          <p className="hero-banner__tag">Today&apos;s Featured Collection</p>
          <h1>Upgrade Your Skills with Bestselling Ebooks</h1>
          <p className="hero-banner__text">
            Explore top-rated books in coding, data science, AI, design, and
            business. Get instant download after purchase.
          </p>
          <div className="hero-banner__actions">
            <Button to="/shop">Shop Now</Button>
            <Button to="/shop?category=Web%20Development" variant="secondary">
              Explore Web Dev Deals
            </Button>
          </div>
        </div>

        <div className="hero-banner__right card">
          <h3>Student Special</h3>
          <p>Flat 30% OFF on selected Web Development ebooks.</p>
          <ul>
            <li>Instant digital delivery</li>
            <li>Curated by category experts</li>
            <li>Affordable for college learners</li>
          </ul>
          <Button to="/shop?category=Web%20Development" size="sm">
            Grab the Offer
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
