import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import EmptyState from '../../components/EmptyState/EmptyState'
import { useAuth } from '../../context/AuthContext'
import { apiRequest } from '../../utils/api'
import { formatCurrency } from '../../utils/format'
import './Orders.css'

function Orders() {
  const { isLoggedIn, userInfo } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await apiRequest('/api/orders/my', {
          token: userInfo?.token,
        })
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (isLoggedIn && userInfo?.token) {
      fetchOrders()
    } else {
      setOrders([])
    }
  }, [isLoggedIn, userInfo?.token])

  if (!isLoggedIn) {
    return (
      <>
        <PageBanner title="My Purchases" subtitle="Login to view your purchased ebooks." />
        <section className="section-space">
          <div className="page-container">
            <EmptyState
              title="Please sign in"
              description="You need to login to access your purchased ebooks."
              actionText="Go to Login"
              actionLink="/login"
            />
          </div>
        </section>
      </>
    )
  }

  if (loading) {
    return (
      <>
        <PageBanner title="My Purchases" subtitle="Loading your purchased ebooks..." />
        <section className="section-space">
          <div className="page-container">
            <p>Loading orders...</p>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageBanner title="My Purchases" subtitle="Unable to load your purchases." />
        <section className="section-space">
          <div className="page-container">
            <EmptyState
              title="Error loading orders"
              description={error}
              actionText="Back to Shop"
              actionLink="/shop"
            />
          </div>
        </section>
      </>
    )
  }

  if (!orders.length) {
    return (
      <>
        <PageBanner title="My Purchases" subtitle="No purchased ebooks yet." />
        <section className="section-space">
          <div className="page-container">
            <EmptyState
              title="No purchases found"
              description="Complete a checkout to see your purchased ebooks here."
              actionText="Browse Shop"
              actionLink="/shop"
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageBanner title="My Purchases" subtitle="Access ebooks you have purchased." />
      <section className="section-space orders-page">
        <div className="page-container">
          {orders.map((order) => (
            <div className="orders-card card" key={order._id}>
              <div className="orders-card__header">
                <div>
                  <h2>Order #{order._id}</h2>
                  <p>
                    Placed on {new Date(order.createdAt).toLocaleDateString()} ·{' '}
                    {order.isPaid ? 'Paid' : 'Pending payment'}
                  </p>
                </div>
                <div>
                  <span className="orders-card__total">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="orders-card__items">
                {order.orderItems.map((item) => {
                  const accessUrl = item.pdfUrl || item.preview
                  const accessText = item.pdfUrl ? 'Read ebook' : item.preview ? 'View preview' : null

                  return (
                    <div className="orders-item" key={`${order._id}-${item.book}-${item.title}`}>
                      <img src={item.image} alt={item.title} />
                      <div className="orders-item__body">
                        <h3>{item.title}</h3>
                        <p>Qty: {item.qty}</p>
                        <p>{formatCurrency(item.price)} each</p>
                        <div className="orders-item__actions">
                          <Link to={`/book/${item.book}`} className="orders-item__link">
                            View ebook details
                          </Link>
                          {accessUrl ? (
                            <a
                              href={accessUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="orders-item__access"
                            >
                              {accessText}
                            </a>
                          ) : (
                            <span className="orders-item__no-access">
                              No access link available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Orders;
