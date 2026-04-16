import Button from '../../components/Button/Button'
import PageBanner from '../../components/PageBanner/PageBanner'
import EmptyState from '../../components/EmptyState/EmptyState'
import CartItem from '../../components/CartItem/CartItem'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import { useCart } from '../../context/CartContext'
import './Cart.css'

function Cart() {
  const { cartItems, subtotal, cartCount, clearCart } = useCart()

  return (
    <>
      <PageBanner
        title="Shopping Cart"
        subtitle="Review items, update quantity, and continue to checkout."
      />

      <section className="section-space">
        <div className="page-container-wide">
          {cartItems.length ? (
            <div className="cart-layout">
              <div className="cart-left">
                <div className="cart-left__head card">
                  <h2>Cart Items ({cartCount})</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>

                <div className="cart-items">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <OrderSummary
                subtotal={subtotal}
                itemCount={cartCount}
                showContinueButton
              />
            </div>
          ) : (
            <EmptyState
              title="Your cart is empty"
              description="Looks like you have not added any ebooks yet."
              actionText="Continue Shopping"
              actionLink="/shop"
            />
          )}
        </div>
      </section>
    </>
  )
}

export default Cart
