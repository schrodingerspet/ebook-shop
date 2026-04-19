import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'All Books' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { isLoggedIn, userInfo, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const submitSearch = () => {
    const query = searchTerm.trim()
    if (!query) {
      navigate('/shop')
      return
    }
    navigate(`/shop?search=${encodeURIComponent(query)}`)
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="header">
      <div className="page-container-wide header__top">
        <Link to="/" className="header__brand">
          Ebook <span>Shop</span>
        </Link>

        <div className="header__search">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={submitSearch}
            placeholder="Search ebooks by title, author or topic"
            buttonText="Search"
          />
        </div>

        <div className="header__actions">
          <Link to="/wishlist" className="header__action">
            <span>♡</span> Wishlist
            {wishlistCount > 0 ? <i>{wishlistCount}</i> : null}
          </Link>
          <Link to="/cart" className="header__action">
            <span>🛒</span> Cart
            {cartCount > 0 ? <i>{cartCount}</i> : null}
          </Link>
          {isLoggedIn ? (
            <>
              <span className="header__login">Hi, {userInfo?.name || 'User'}</span>
              <button
                type="button"
                className="header__register"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__login">
                Login
              </Link>
              <Link to="/register" className="header__register">
                Register
              </Link>
            </>
          )}
          <button
            className="header__menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`page-container-wide header__bottom ${mobileMenuOpen ? 'is-open' : ''}`}>
        <nav className="header__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
