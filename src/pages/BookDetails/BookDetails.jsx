import { useNavigate, useParams } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import RatingStars from '../../components/RatingStars/RatingStars'
import BookCard from '../../components/BookCard/BookCard'
import Button from '../../components/Button/Button'
import EmptyState from '../../components/EmptyState/EmptyState'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import {
  formatCurrency,
  formatNumber,
  getDiscountPercent,
} from '../../utils/format'
import books from '../../data/books'
import './BookDetails.css'

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const book = books.find((item) => String(item.id) === id)

  if (!book) {
    return (
      <section className="section-space">
        <div className="page-container">
          <EmptyState
            title="Book not found"
            description="The ebook you are looking for is unavailable."
            actionText="Continue Shopping"
            actionLink="/shop"
          />
        </div>
      </section>
    )
  }

  const discount = getDiscountPercent(book.price, book.originalPrice)
  const relatedBooks = books
    .filter((item) => item.category === book.category && item.id !== book.id)
    .slice(0, 5)

  const handleBuyNow = () => {
    addToCart(book)
    navigate('/checkout')
  }

  return (
    <>
      <PageBanner title={book.title} subtitle={`by ${book.author}`} />

      <section className="section-space">
        <div className="page-container-wide">
          <article className="book-details card">
            <div className="book-details__image-area">
              <img src={book.image} alt={`${book.title} cover`} className="book-details__image" />
            </div>

            <div className="book-details__info">
              <p className="book-details__category">{book.category}</p>
              <h1>{book.title}</h1>
              <p className="book-details__author">by {book.author}</p>

              <div className="book-details__ratings">
                <RatingStars rating={book.rating} reviews={book.reviews} />
                <span>{formatNumber(book.reviews)} ratings</span>
              </div>

              <div className="book-details__price">
                <strong>{formatCurrency(book.price)}</strong>
                <del>{formatCurrency(book.originalPrice)}</del>
                {discount > 0 ? <span className="badge badge--deal">{discount}% off</span> : null}
              </div>

              <p className="book-details__availability">{book.stock} • Instant digital access after purchase</p>

              <ul className="book-details__highlights">
                {book.tags?.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <div className="book-details__actions">
                <Button onClick={() => addToCart(book)}>Add to Cart</Button>
                <Button variant="secondary" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button variant="ghost" onClick={() => toggleWishlist(book)}>
                  {isInWishlist(book.id) ? 'Remove Wishlist' : 'Add Wishlist'}
                </Button>
              </div>

              <p className="book-details__support">
                Need help? Contact support for ebook access issues or order help.
              </p>
            </div>
          </article>

          <article className="book-specs card">
            <h2>Book Description</h2>
            <p>{book.fullDescription}</p>

            <h3>Specifications</h3>
            <div className="book-specs__grid">
              <div><span>Pages</span><strong>{book.pages}</strong></div>
              <div><span>Language</span><strong>{book.language}</strong></div>
              <div><span>Publisher</span><strong>{book.publisher}</strong></div>
              <div><span>Published Year</span><strong>{book.publishedYear}</strong></div>
              <div><span>Format</span><strong>{book.format}</strong></div>
              <div><span>Category</span><strong>{book.category}</strong></div>
              <div><span>Author</span><strong>{book.author}</strong></div>
            </div>
          </article>
        </div>
      </section>

      {relatedBooks.length ? (
        <section className="section-space">
          <div className="page-container-wide">
            <SectionTitle
              title="Students Also Bought"
              subtitle="Related ebooks from similar category."
            />
            <div className="books-grid">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default BookDetails
