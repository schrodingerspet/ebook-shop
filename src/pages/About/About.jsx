import PageBanner from '../../components/PageBanner/PageBanner'
import './About.css'

function About() {
  return (
    <>
      <PageBanner
        title="About Ebook Shop"
        subtitle="A college Web Technology mini project made by a 2-member team."
      />

      <section className="section-space">
        <div className="page-container about-page">
          <article className="about-card card">
            <h2>What is Ebook Shop?</h2>
            <p>
              Ebook Shop is a frontend-only ecommerce website for digital books,
              inspired by practical shopping platforms like Amazon and Flipkart. It
              is designed for fast browsing, clear product details, and easy checkout
              flow.
            </p>
          </article>

          <article className="about-card card">
            <h2>Mission & Purpose</h2>
            <p>
              Our mission is to make ebook discovery easy for students by using
              category-first navigation, search-first design, and simple ecommerce
              interactions like cart, wishlist, and order simulation.
            </p>
          </article>

          <article className="about-card card">
            <h2>Student Mini Project Scope</h2>
            <p>
              We are a 2-member team working on a Web Technology mini project. This
              part covers complete frontend implementation with React Router, Context
              API, reusable components, and responsive ecommerce UI.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

export default About
