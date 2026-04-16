import Button from '../../components/Button/Button'
import './NotFound.css'

function NotFound() {
  return (
    <section className="not-found section-space">
      <div className="page-container">
        <div className="not-found__card card">
          <p className="not-found__code">404</p>
          <h1>Page not found</h1>
          <p>
            Sorry, this page is unavailable right now. Continue shopping from our
            ebook store.
          </p>
          <Button to="/shop">Continue Shopping</Button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
