import { Route, Routes, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Header from './components/Header/Header'
import CategoryStrip from './components/CategoryStrip/CategoryStrip'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import BookDetails from './pages/BookDetails/BookDetails'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Wishlist from './pages/Wishlist/Wishlist'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'
import AddBook from './pages/AddBook/AddBook'
import Orders from './pages/Orders/Orders'

function App() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <TopBar />
      <Header />
      <CategoryStrip />
      <main className="app-main page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop key={location.search} />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
