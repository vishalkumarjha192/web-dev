# 🛍️ ShopNova — E-Commerce Platform

A fully-featured e-commerce frontend built as a **Capstone Project** for the  
B.Tech CSE (AI & ML) programme at **K.R. Mangalam University**.

---

## 📦 Tech Stack

| Layer            | Technology                              |
|------------------|-----------------------------------------|
| Framework        | React 18 + Vite                         |
| Routing          | React Router v6                         |
| State Management | Context API + `useReducer`              |
| Styling          | Tailwind CSS v3                         |
| HTTP Client      | Axios                                   |
| API              | [FakeStore API](https://fakestoreapi.com) (real product data) |
| Deployment       | Vercel / Netlify ready                  |

---

## ✅ SOP Requirements Met

| Requirement                        | Implementation                                  |
|------------------------------------|-------------------------------------------------|
| React (Vite) + ES6+                | `src/main.jsx`, all components                  |
| React Router                       | `App.jsx` — 7 routes                            |
| Context API (State Management)     | `src/context/ShopContext.jsx` + `useReducer`    |
| API Integration (Axios)            | `src/hooks/useProducts.js` → FakeStore API      |
| CRUD Operations                    | Cart: add / update qty / remove / clear         |
| Lazy Loading                       | All pages via `React.lazy` + `Suspense`         |
| Pagination                         | Products page — 8 items/page with page controls |
| Search + Filter + Sort             | Products page sidebar + toolbar                 |
| Debounced API Calls                | Search input in `Products.jsx`                  |
| Error Boundary                     | `src/components/ErrorBoundary.jsx`              |
| Error Handling                     | `useFetch` hook + per-page error states         |
| Performance (memoisation)          | `useMemo` in Products page filter logic         |
| Deployment-ready                   | Vercel/Netlify config via `vite.config.js`      |

---

## 🗂️ Project Structure

```
shopnova/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Routes (lazy-loaded)
    ├── index.css             # Tailwind + global styles
    ├── context/
    │   └── ShopContext.jsx   # Global state (cart, wishlist, user)
    ├── hooks/
    │   └── useProducts.js    # Axios data-fetching hooks
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   ├── Stars.jsx
    │   ├── LoadingSpinner.jsx
    │   └── ErrorBoundary.jsx
    └── pages/
        ├── Home.jsx
        ├── Products.jsx      # Filter + Sort + Pagination
        ├── ProductDetail.jsx # Detail + tabs + related
        ├── Cart.jsx
        ├── Checkout.jsx      # 3-step form
        ├── Wishlist.jsx
        ├── Profile.jsx
        └── NotFound.jsx
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) — zero config needed!

---

## 📄 Pages

| Route            | Page           | Features                                     |
|------------------|----------------|----------------------------------------------|
| `/`              | Home           | Hero, categories, top-rated, promo           |
| `/products`      | Products       | Filter, sort, search, debounce, pagination   |
| `/products/:id`  | Product Detail | Qty selector, wishlist, tabs, related        |
| `/cart`          | Cart           | CRUD qty, order summary, shipping calc       |
| `/checkout`      | Checkout       | 3-step form, order confirmation              |
| `/wishlist`      | Wishlist       | Saved items, move all to cart                |
| `/profile`       | Profile        | Edit info, order history, settings           |

---

## 👥 Team

Capstone Project — CSE (AI & ML), K.R. Mangalam University, 2026

# 👨‍💻 Author

**Vishal Kumar Jha**
GitHub: https://github.com/vishalkumarjha192

