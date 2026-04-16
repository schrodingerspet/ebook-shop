import { formatCurrency } from '../../utils/format'
import Button from '../Button/Button'
import './OrderSummary.css'

function OrderSummary({
  subtotal,
  itemCount,
  showCheckoutButton = true,
  checkoutPath = '/checkout',
  buttonText = 'Proceed to Checkout',
  showContinueButton = false,
}) {
  const shipping = 0
  const tax = subtotal * 0.05
  const convenienceFee = subtotal > 0 ? 1.99 : 0
  const total = subtotal + shipping + tax + convenienceFee

  return (
    <aside className="order-summary card">
      <h3>Order Summary</h3>
      <div className="order-summary__row">
        <span>Items ({itemCount})</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="order-summary__row">
        <span>Shipping</span>
        <span>Free (Digital)</span>
      </div>
      <div className="order-summary__row">
        <span>Tax (5%)</span>
        <span>{formatCurrency(tax)}</span>
      </div>
      <div className="order-summary__row">
        <span>Platform Fee</span>
        <span>{formatCurrency(convenienceFee)}</span>
      </div>
      <div className="order-summary__row total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {showContinueButton ? (
        <Button to="/shop" variant="ghost" fullWidth className="order-summary__btn">
          Continue Shopping
        </Button>
      ) : null}

      {showCheckoutButton ? (
        <Button to={checkoutPath} fullWidth className="order-summary__btn">
          {buttonText}
        </Button>
      ) : null}
    </aside>
  )
}

export default OrderSummary
