import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="page-container-wide footer__top">
        <h3>Back to top</h3>
      </div>

      <div className="page-container-wide footer__grid">
        <section>
          <h4 className="footer__title">Get to Know Us</h4>
          <div className="footer__links">
            <Link to="/about">About Ebook Shop</Link>
            <Link to="/about">Our Mission</Link>
            <Link to="/contact">Contact Support</Link>
          </div>
        </section>

        <section>
          <h4 className="footer__title">Shop Categories</h4>
          <div className="footer__links">
            <Link to="/shop?category=Programming">Programming</Link>
            <Link to="/shop?category=Web%20Development">Web Development</Link>
            <Link to="/shop?category=AI%20%26%20Machine%20Learning">
              AI & Machine Learning
            </Link>
            <Link to="/shop?category=UI%2FUX%20Design">UI/UX Design</Link>
          </div>
        </section>

        <section>
          <h4 className="footer__title">Your Account</h4>
          <div className="footer__links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </section>

        <section>
          <h4 className="footer__title">Contact</h4>
          <p className="footer__text">Email: support@ebookshop.com</p>
          <p className="footer__text">Phone: +1 123-456-7890</p>
          <p className="footer__text">Address: Campus Road, Knowledge City</p>
          <p className="footer__text">Download format: PDF / EPUB</p>
        </section>
      </div>

      <div className="footer__bottom">
        <div className="page-container-wide footer__bottom-inner">
          <p>© {new Date().getFullYear()} Ebook Shop. All rights reserved.</p>
          <p>Built for Web Technology Mini Project (Frontend Only)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
