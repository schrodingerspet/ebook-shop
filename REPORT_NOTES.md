# REPORT_NOTES — Ebook Shop (Codebase Evidence)

## 1. Verified facts from code

1. **Project stack and structure**
   - Frontend is React + Vite (`package.json`) with React Router and Context-based state.
   - Backend is Express + MongoDB (Mongoose) (`backend/package.json`) with JWT auth, bcrypt password hashing, and optional Cloudinary upload support.
   - Main frontend routes are declared in `src/App.jsx`.
   - Main backend route mounting is in `backend/server.js` under `/api/auth`, `/api/books`, `/api/orders`, and `/api/users`.

2. **Frontend behavior**
   - Frontend providers: `AuthProvider`, `BooksProvider`, `WishlistProvider`, `CartProvider` in `src/main.jsx`.
   - Books are loaded from backend (`GET /api/books`) in `src/context/BooksContext.jsx`.
   - Authentication calls `POST /api/auth/login` and `POST /api/auth/register` in `src/context/AuthContext.jsx`.
   - Wishlist uses authenticated backend APIs (`GET/POST/DELETE /api/users/wishlist...`) in `src/context/WishlistContext.jsx`.
   - Cart is maintained in local storage (`ebook-shop-cart`) in `src/context/CartContext.jsx`.
   - Checkout posts an order to `POST /api/orders` if user is logged in in `src/pages/Checkout/Checkout.jsx`.

3. **Backend behavior**
   - Mongo connection requires `MONGO_URI` and is established in `backend/config/db.js`.
   - JWT verification and role check middleware (`protect`, `admin`) are in `backend/middleware/authMiddleware.js`.
   - Auth controller supports registration and login in `backend/controllers/authController.js`.
   - Book controller supports list/detail/create/update/delete and upload response in `backend/controllers/bookController.js`.
   - Order controller supports create, current user orders, order-by-id, mark paid, and admin all-orders in `backend/controllers/orderController.js`.
   - Wishlist operations are in `backend/controllers/userController.js`.

4. **Data model evidence**
   - `User` model includes `name`, `email`, `password`, `isAdmin`, and `wishlist` refs to `Book`.
   - `Book` model includes `title`, `author`, `price`, `image`, `description`, `category`, `stock`, `pdfUrl`, `preview`, and `summary`.
   - `Order` model includes `user` ref, `orderItems`, `shippingAddress`, `paymentMethod`, `paymentResult`, `totalPrice`, and payment status fields.

5. **Scripts and baseline checks**
   - Root scripts: `dev`, `build`, `lint`, `preview`.
   - Backend scripts: `start`, `dev`.
   - Executed successfully from root:
     - `npm run lint`
     - `npm run build`

## 2. Conservative inferences (explicitly marked)

1. **Current operational focus appears user-facing, not admin-facing**
   - Although backend contains admin-protected order listing (`GET /api/orders`), no frontend admin dashboard/routes were found.

2. **Book catalog management is likely intended for future admin tooling**
   - Backend has write routes for books (`POST/PUT/DELETE /api/books`) and upload endpoint, but no frontend management UI was found.

3. **Digital delivery is mostly conceptual in current implementation**
   - Models include `pdfUrl`/`preview`, but frontend does not provide a dedicated ebook reader/download flow tied to paid order state.

4. **Contact/newsletter are UI simulations**
   - Contact and newsletter forms show local success messages; no backend persistence or email integration route was found.

## 3. Missing / incomplete parts observed

1. **Authorization gap in book write APIs**
   - `backend/routes/bookRoutes.js` exposes create/update/delete without `protect`/`admin` middleware.

2. **No frontend integration for several backend capabilities**
   - No frontend calls were found for:
     - `GET /api/orders/my`
     - `GET /api/orders/:id`
     - `PUT /api/orders/:id/pay`
     - `GET /api/orders` (admin)
     - Book create/update/delete/upload APIs

3. **In-project messaging inconsistency**
   - Some UI text labels project as “frontend-only”, while backend is implemented and used for auth/books/wishlist/orders.

4. **Unused local sample dataset**
   - `src/data/books.js` exists but is not imported by current app code.

5. **Payment is not integrated with a real gateway**
   - Checkout collects payment method and sends basic `paymentResult`, but there is no actual gateway callback/verification flow.

## 4. Assumptions used while writing the report

1. The report describes the implemented system as a **full-stack mini project with partial feature completion**, rather than a production-ready platform.
2. “Admin module” is documented as **backend capability with missing frontend interface**, based on route/controller evidence.
3. Database design tables in the report are based on actual Mongoose schemas and route usage; no additional entities were invented.
4. Performance/scalability discussions are framed as non-functional expectations and future-scope guidance, not as currently achieved guarantees.
