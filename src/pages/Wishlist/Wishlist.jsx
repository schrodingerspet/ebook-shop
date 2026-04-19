import { Link } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import EmptyState from '../../components/EmptyState/EmptyState'
import Button from '../../components/Button/Button'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/format'
import './Wishlist.css'

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
    moveToCartFromWishlist,
    wishlistLoading,
    wishlistError,
  } = useWishlist()
  const { addToCart } = useCart()

  return (
    <>
      <PageBanner
        title="Your Wishlist"
        subtitle="Keep track of your saved ebooks and move them to cart when ready."
      />

      <section className="section-space">
        <div className="page-container-wide">
          {wishlistItems.length ? (
            <div className="wishlist-list">
              {wishlistItems.map((book) => (
                <article key={book.id} className="wishlist-item card">
                  <img src={book.image} alt={`${book.title} cover`} />
                  <div className="wishlist-item__content">
                    <h3>
                      <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </h3>
                    <p>{book.author}</p>
                    <p>{book.category}</p>
                  </div>
                  <div className="wishlist-item__price">
                    <strong>{formatCurrency(book.price)}</strong>
                    <small>{book.stock}</small>
                  </div>
                  <div className="wishlist-item__actions">
                    <Button
                      size="sm"
                      onClick={() => void moveToCartFromWishlist(book, addToCart)}
                    >
                      Move to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => void removeFromWishlist(book.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Wishlist is empty"
              description="Save books to wishlist and buy them later."
              actionText="Browse Ebooks"
              actionLink="/shop"
            />
          )}
          {wishlistLoading ? <p className="muted">Refreshing wishlist...</p> : null}
          {wishlistError ? <p className="muted">{wishlistError}</p> : null}
        </div>
      </section>
    </>
  )
}

export default Wishlist
