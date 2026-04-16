import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatCurrency, getDiscountPercent } from '../../utils/format'
import Button from '../Button/Button'
import RatingStars from '../RatingStars/RatingStars'
import './BookCard.css'

function BookCard({ book }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const wished = isInWishlist(book.id)
  const discount = getDiscountPercent(book.price, book.originalPrice)

  return (
    <article className="book-card card">
      <div className="book-card__image-wrap">
        <img src={book.image} alt={`${book.title} cover`} className="book-card__image" />
        {discount > 0 ? <span className="book-card__discount">-{discount}%</span> : null}
      </div>

      <div className="book-card__body">
        <div className="book-card__top">
          <p className="book-card__category">{book.category}</p>
          <span className="badge badge--success">{book.stock}</span>
        </div>

        <h3 className="book-card__title">
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </h3>
        <p className="book-card__author">by {book.author}</p>
        <RatingStars rating={book.rating} reviews={book.reviews} />

        <div className="book-card__price">
          <span className="book-card__price-current">{formatCurrency(book.price)}</span>
          {book.originalPrice ? (
            <del>{formatCurrency(book.originalPrice)}</del>
          ) : null}
        </div>

        <div className="book-card__actions">
          <Button size="sm" className="book-card__primary-btn" onClick={() => addToCart(book)}>
            Add to Cart
          </Button>
          <div className="book-card__secondary-actions">
            <Button size="sm" variant="ghost" to={`/book/${book.id}`}>
              View
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toggleWishlist(book)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wished ? 'Saved' : 'Wishlist'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BookCard
