import { Link, useNavigate } from 'react-router-dom'
import { useProducts, useCategories } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/LoadingSpinner'

const CAT_META = {
  "electronics":     { icon: '⚡', label: 'Electronics',      color: 'from-blue-600/20 to-blue-900/10',   border: 'border-blue-800/50' },
  "jewelery":        { icon: '💎', label: 'Jewellery',         color: 'from-purple-600/20 to-purple-900/10', border: 'border-purple-800/50' },
  "men's clothing":  { icon: '👔', label: "Men's Clothing",    color: 'from-sky-600/20 to-sky-900/10',     border: 'border-sky-800/50' },
  "women's clothing":{ icon: '👗', label: "Women's Clothing",  color: 'from-pink-600/20 to-pink-900/10',   border: 'border-pink-800/50' },
}

const STATS = [
  { n: '200+', l: 'Products' },
  { n: '4',    l: 'Categories' },
  { n: '4.8★', l: 'Avg Rating' },
  { n: '100%', l: 'Secure' },
]

export default function Home() {
  const { data: products, loading } = useProducts()
  const { data: categories }        = useCategories()

  const topRated  = products ? [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8) : []
  const featured  = products ? products.filter(p => p.rating.rate >= 4.5).slice(0, 4) : []

  return (
    <div className="animate-fade-in">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900
                          border-b border-slate-800">
        <div className="container-lg py-16 md:py-24 flex flex-col md:flex-row
                        items-center justify-between gap-10">
          {/* Text side */}
          <div className="flex-1 max-w-xl">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase
                             text-orange-400 mb-4 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Welcome to ShopNova
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-slate-50">
              Find Everything<br />
              <span className="text-gradient">You Love</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              Discover thousands of products across electronics, fashion, jewellery
              and more — powered by real product data.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/products" className="btn-primary text-sm px-6 py-3">
                Shop All Products →
              </Link>
              <Link to="/products?category=electronics" className="btn-secondary text-sm px-6 py-3">
                Browse Electronics
              </Link>
            </div>
          </div>

          {/* Stats side */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map(({ n, l }) => (
              <div key={l} className="card p-5 text-center min-w-[110px]">
                <p className="text-2xl font-extrabold text-orange-400 mb-1">{n}</p>
                <p className="text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-lg py-12 space-y-14">

        {/* ── Categories ────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-100">Shop by Category</h2>
            <Link to="/products" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(categories || Object.keys(CAT_META)).map(cat => {
              const meta = CAT_META[cat] || { icon: '🛍️', label: cat, color: '', border: 'border-slate-700' }
              const count = products ? products.filter(p => p.category === cat).length : '…'
              return (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className={`card card-hover bg-gradient-to-br ${meta.color} border ${meta.border}
                              p-5 text-center transition-all duration-200`}
                >
                  <div className="text-4xl mb-2">{meta.icon}</div>
                  <p className="font-semibold text-sm text-slate-200 capitalize">{meta.label || cat}</p>
                  <p className="text-xs text-slate-500 mt-1">{count} products</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Top Rated ────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-100">⭐ Top Rated Products</h2>
            <Link to="/products" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
              View all →
            </Link>
          </div>
          {loading
            ? <SkeletonGrid count={8} />
            : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topRated.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )
          }
        </section>

        {/* ── Promo Banner ─────────────────────────────────────────────── */}
        <section className="rounded-2xl overflow-hidden bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-slate-900/0
                            border border-orange-800/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-2">Limited Time</p>
            <h2 className="text-2xl font-extrabold text-slate-50 mb-2">Free Shipping on Orders Over $50</h2>
            <p className="text-slate-400 text-sm">Shop today and get fast, free delivery straight to your door.</p>
          </div>
          <Link to="/products" className="btn-primary px-8 py-3 shrink-0">
            Shop Now →
          </Link>
        </section>

        {/* ── Featured (4.5+) ───────────────────────────────────────────── */}
        {featured.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-100 mb-5">🔥 Customer Favourites</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* ── Feature highlights ───────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '🚚', title: 'Free Shipping',  body: 'On all orders over $50. Fast and reliable delivery.' },
            { icon: '↩️', title: '30-Day Returns', body: 'Not happy? Return it within 30 days, no questions asked.' },
            { icon: '🔒', title: 'Secure Payments',body: '256-bit SSL encryption. Your data is always protected.' },
          ].map(({ icon, title, body }) => (
            <div key={title} className="card p-6 flex gap-4 items-start">
              <span className="text-3xl shrink-0">{icon}</span>
              <div>
                <p className="font-semibold text-slate-200 mb-1">{title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}
