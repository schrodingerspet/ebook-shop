# Ebook Shop

A React + Vite frontend with an Express + MongoDB backend.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start frontend development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Backend Setup

1. Install backend dependencies:
   ```bash
   npm --prefix backend install
   ```
2. Create backend env file:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Update `backend/.env` values (`MONGO_URI`, `JWT_SECRET`, optional Cloudinary keys).
4. Start backend:
   ```bash
   npm --prefix backend run start
   ```

## Main Tech Used

- React + Vite
- React Router
- Context API (Auth + Cart + Wishlist + Books)
- MongoDB (Mongoose)
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

- `src/context/AuthContext.jsx`
  - login/register/logout
  - token persistence in `localStorage`
- `src/context/BooksContext.jsx`
  - fetch books from backend (`/api/books`)
  - normalize backend data for UI
- `src/context/CartContext.jsx`
  - add/remove books
  - update quantity
  - subtotal and cart count (stored locally)
- `src/context/WishlistContext.jsx`
  - add/remove/toggle wishlist through backend APIs
  - wishlist count synced with database for logged-in users

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
  data/         # categories and fallback static data
  pages/        # Route-level pages
  utils/        # small helpers (currency formatting)
  App.jsx       # main layout + routes
  main.jsx      # app bootstrap + providers
  index.css     # global theme and utility styles
```

## API Behavior

- Login/Register hits `/api/auth/*`
- Shop/Home/Book Details fetch books from `/api/books`
- Wishlist actions update MongoDB via `/api/users/wishlist/*`
- Checkout creates orders via `/api/orders`
