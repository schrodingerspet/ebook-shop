import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/format'
import Button from '../Button/Button'
import './CartItem.css'

function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
  const itemTotal = item.price * item.quantity

  return (
    <article className="cart-item card">
      <img src={item.image} alt={`${item.title} cover`} className="cart-item__image" />

      <div className="cart-item__content">
        <h3>{item.title}</h3>
        <p className="muted">by {item.author}</p>
        <p className="cart-item__meta">{item.category}</p>
        <p className="cart-item__meta">Price: {formatCurrency(item.price)}</p>
      </div>

      <div className="cart-item__quantity">
        <button
          aria-label={`Decrease quantity of ${item.title}`}
          onClick={() => decreaseQuantity(item.id)}
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          aria-label={`Increase quantity of ${item.title}`}
          onClick={() => increaseQuantity(item.id)}
        >
          +
        </button>
      </div>

      <div className="cart-item__right">
        <strong>{formatCurrency(itemTotal)}</strong>
        <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
          Remove
        </Button>
      </div>
    </article>
  )
}

export default CartItem
