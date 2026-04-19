import { Link } from 'react-router-dom'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import BookCard from '../../components/BookCard/BookCard'
import PromoCard from '../../components/PromoCard/PromoCard'
import TrustSection from '../../components/TrustSection/TrustSection'
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection'
import categories from '../../data/categories'
import EmptyState from '../../components/EmptyState/EmptyState'
import { useBooks } from '../../context/BooksContext'
import './Home.css'

function Home() {
  const { books, booksLoading, booksError } = useBooks()
  const featuredBooks = books.filter((book) => book.featured).slice(0, 8)
  const trendingBooks = books.filter((book) => book.trending).slice(0, 8)

  const categoryCounts = categories.map((category) => ({
    ...category,
    count: books.filter((book) => book.category === category.name).length,
  }))

  if (booksLoading) {
    return (
      <section className="section-space">
        <div className="page-container">
          <p>Loading books...</p>
        </div>
      </section>
    )
  }

  if (booksError) {
    return (
      <section className="section-space">
        <div className="page-container">
          <EmptyState
            title="Could not load books"
            description={booksError}
            actionText="Go to Shop"
            actionLink="/shop"
          />
        </div>
      </section>
    )
  }

  return (
    <>
      <HeroBanner />

      <section className="section-space">
        <div className="page-container-wide">
          <SectionTitle
            title="Shop by Category"
            subtitle="Quickly browse ebooks the way you do on real ecommerce platforms."
          />
          <div className="home-categories">
            {categoryCounts.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="home-categories__card card"
              >
                <span>{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.count} ebooks</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container-wide">
          <SectionTitle
            title="Featured Books"
            subtitle="Recommended titles selected for students and practical learners."
          />
          <div className="books-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container-wide home-promos">
          <PromoCard
            title="Flat 30% Off on Web Development Ebooks"
            text="Perfect offer for students preparing frontend and MERN projects."
            ctaText="View Offer"
            ctaLink="/shop?category=Web%20Development"
          />
          <PromoCard
            title="Top AI Picks for Semester Projects"
            text="Trending AI & Machine Learning books with beginner-friendly explanations."
            ctaText="Explore AI Books"
            ctaLink="/shop?category=AI%20%26%20Machine%20Learning"
          />
        </div>
      </section>

      <section className="section-space">
        <div className="page-container-wide">
          <SectionTitle
            title="Trending & Bestsellers"
            subtitle="Most loved ebooks by learners this week."
          />
          <div className="books-grid">
            {trendingBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container-wide">
          <SectionTitle
            title="Why Students Choose Ebook Shop"
            subtitle="Built with practical ecommerce usability and student-friendly flow."
          />
          <TrustSection />
        </div>
      </section>

      <section className="section-space-lg">
        <div className="page-container-wide">
          <NewsletterSection />
        </div>
      </section>
    </>
  )
}

export default Home
