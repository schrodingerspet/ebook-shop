# Ebook Shop (Frontend Only)

A polished and beginner-friendly React + Vite frontend for a MERN stack academic mini project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Main Tech Used

- React + Vite
- React Router
- Context API (Cart + Wishlist)
- LocalStorage persistence
- Mock data (no backend)
- Simple CSS files (component/page based)

## Routing

Defined in `src/App.jsx` using `Routes` and `Route`:

- `/` Home
- `/shop` Shop
- `/book/:id` Book Details
- `/cart` Cart
- `/checkout` Checkout
- `/login` Login
- `/register` Register
- `/wishlist` Wishlist
- `/about` About
- `/contact` Contact
- `*` Not Found

## State Management

- `src/context/CartContext.jsx`
  - add/remove books
  - update quantity
  - subtotal and cart count
- `src/context/WishlistContext.jsx`
  - add/remove/toggle wishlist
  - wishlist count

Both contexts save data to `localStorage`, so refresh does not clear cart/wishlist.

## Folder Structure

```text
src/
  components/
    TopBar/ Header/ SearchBar/ CategoryStrip/
    HeroBanner/ SectionTitle/ BookCard/ RatingStars/
    FilterSidebar/ SortBar/ CartItem/ OrderSummary/
    EmptyState/ NewsletterSection/ TrustSection/
    PromoCard/ Footer/ PageBanner/ Button/ FormInput/
  context/      # Cart and Wishlist contexts
  data/         # books and categories mock data
  pages/        # Route-level pages
  utils/        # small helpers (currency formatting)
  App.jsx       # main layout + routes
  main.jsx      # app bootstrap + providers
  index.css     # global theme and utility styles
```

## Viva / Presentation Short Explanation

Ebook Shop is a frontend-only ecommerce UI made with React and Vite. It uses React Router for page navigation and Context API for global cart and wishlist state. We used mock book data and stored cart/wishlist in localStorage to simulate real shopping behavior without backend integration. The design is modern and responsive, while the code stays simple and easy to explain page by page.
