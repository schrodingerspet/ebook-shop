import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import EmptyState from '../../components/EmptyState/EmptyState'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { apiRequest } from '../../utils/api'
import { formatCurrency } from '../../utils/format'
import './Checkout.css'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
}

function Checkout() {
  const { cartItems, subtotal, cartCount, clearCart } = useCart()
  const { isLoggedIn, userInfo } = useAuth()
  const [formData, setFormData] = useState(initialForm)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [errors, setErrors] = useState({})
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [orderError, setOrderError] = useState('')
  const [placingOrder, setPlacingOrder] = useState(false)

  const validateForm = () => {
    const formErrors = {}

    if (!formData.fullName.trim()) formErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) formErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = 'Enter a valid email address.'
    }
    if (!formData.phone.trim()) formErrors.phone = 'Phone is required.'
    if (!formData.address.trim()) formErrors.address = 'Address is required.'
    if (!formData.city.trim()) formErrors.city = 'City is required.'
    if (!formData.state.trim()) formErrors.state = 'State is required.'
    if (!formData.zipCode.trim()) formErrors.zipCode = 'ZIP code is required.'

    return formErrors
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handlePlaceOrder = async (event) => {
    event.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)
    setOrderError('')

    if (Object.keys(formErrors).length > 0) return

    if (!isLoggedIn || !userInfo?.token) {
      setOrderError('Please login before placing an order.')
      return
    }

    try {
      setPlacingOrder(true)
      const order = await apiRequest('/api/orders', {
        method: 'POST',
        token: userInfo.token,
        body: {
          items: cartItems.map((item) => ({
            book: item.id,
            title: item.title,
            qty: item.quantity,
            price: item.price,
            image: item.image,
          })),
          totalPrice: Number(totalPayable.toFixed(2)),
          paymentMethod,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.zipCode,
            country: formData.state,
          },
          paymentResult: {
            status: 'created',
          },
        },
      })

      setOrderSuccess(order._id || `EBK${Math.floor(Math.random() * 900000 + 100000)}`)
      setFormData(initialForm)
      clearCart()
    } catch (error) {
      setOrderError(error.message)
    } finally {
      setPlacingOrder(false)
    }
  }

  const totalPayable = useMemo(() => {
    const tax = subtotal * 0.05
    const platformFee = subtotal > 0 ? 1.99 : 0
    return subtotal + tax + platformFee
  }, [subtotal])

  if (orderSuccess) {
    return (
      <>
        <PageBanner title="Order Placed Successfully" subtitle="Thank you for shopping with Ebook Shop." />
        <section className="section-space">
          <div className="page-container">
            <div className="checkout-success card">
              <div className="checkout-success__icon">✅</div>
              <h2>Order Confirmed</h2>
              <p>
                Your order ID is <strong>{orderSuccess}</strong>. The order is saved in your database.
              </p>
              <Button to="/shop">Continue Shopping</Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (!cartItems.length) {
    return (
      <>
        <PageBanner title="Checkout" subtitle="Complete your order details." />
        <section className="section-space">
          <div className="page-container">
            <EmptyState
              title="No items available for checkout"
              description="Please add ebooks to your cart first."
              actionText="Go to Shop"
              actionLink="/shop"
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageBanner title="Checkout" subtitle="Fill billing details and choose payment method." />

      <section className="section-space">
        <div className="page-container-wide">
          <form className="checkout-layout" onSubmit={handlePlaceOrder}>
            <div className="checkout-main card">
              <h2>Billing Details</h2>

              <FormInput
                id="fullName"
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
              />
              <FormInput
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <FormInput
                id="phone"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
              />
              <FormInput
                id="address"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
              />

              <div className="checkout-main__row">
                <FormInput
                  id="city"
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                />
                <FormInput
                  id="state"
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={errors.state}
                />
                <FormInput
                  id="zipCode"
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={errors.zipCode}
                />
              </div>

              <div className="checkout-payment card">
                <h3>Payment Method</h3>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Credit / Debit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  UPI
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Wallet
                </label>
              </div>
            </div>

            <aside className="checkout-side">
              <div className="checkout-items card">
                <h3>Order Items</h3>
                {cartItems.map((item) => (
                  <div className="checkout-items__row" key={item.id}>
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="checkout-items__total">
                  <span>Payable Total</span>
                  <strong>{formatCurrency(totalPayable)}</strong>
                </div>
              </div>

              <OrderSummary
                subtotal={subtotal}
                itemCount={cartCount}
                showCheckoutButton={false}
              />

              <Button type="submit" fullWidth disabled={placingOrder}>
                {placingOrder ? 'Placing Order...' : 'Place Order'}
              </Button>
              {orderError ? <p className="checkout-error">{orderError}</p> : null}
              {!isLoggedIn ? (
                <p className="checkout-login-note">
                  Please <Link to="/login" state={{ from: '/checkout' }}>login</Link> to place orders.
                </p>
              ) : null}
            </aside>
          </form>
        </div>
      </section>
    </>
  )
}

export default Checkout
