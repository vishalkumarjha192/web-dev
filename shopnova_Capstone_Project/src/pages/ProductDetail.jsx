import { useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProduct, useProducts } from '../hooks/useProducts'
import { useShop } from '../context/ShopContext'
import Stars from '../components/Stars'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ProductDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { data: product, loading, error } = useProduct(id)
  const { data: allProducts }             = useProducts()
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useShop()

  const [qty,      setQty]      = useState(1)
  const [added,    setAdded]    = useState(false)
  const [imgError, setImgError] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const inWish = product ? isInWishlist(product.id) : false
  const inCart = product ? isInCart(product.id) : false

  const related = useMemo(() => {
    if (!allProducts || !product) return []
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [allProducts, product])

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }, [product, qty, addToCart])

  const handleQty = (delta) => setQty(q => Math.max(1, Math.min(10, q + delta)))

  if (loading) return <LoadingSpinner message="Loading product…" />

  if (error || !product) return (
    <div className="container-lg py-20 empty-state gap-4">
      <div className="text-6xl">😕</div>
      <p className="text-xl font-bold text-slate-300">Product not found</p>
      <button onClick={() => navigate('/products')} className="btn-primary">
        ← Back to Products
      </button>
    </div>
  )

  const { title, price, image, category, description, rating } = product

  // Mock additional info for richer UI
  const specs = {
    "electronics":    { Brand: 'TechPro', Warranty: '1 Year', 'In Box': 'Unit, Manual, Cable' },
    "jewelery":       { Material: 'Sterling Silver / Gold', Style: 'Contemporary', Care: 'Wipe with soft cloth' },
    "men's clothing": { Fabric: 'Premium Cotton', Fit: 'Regular Fit', Care: 'Machine Wash Cold' },
    "women's clothing":{ Fabric: 'Polyester Blend', Fit: 'Slim Fit', Care: 'Hand Wash Preferred' },
  }
  const productSpecs = specs[category] || {}

  return (
    <div className="animate-fade-in">
      <div className="container-lg py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-orange-400 transition-colors">Products</Link>
          <span>›</span>
          <Link to={`/products?category=${encodeURIComponent(category)}`}
            className="hover:text-orange-400 transition-colors capitalize">{category}</Link>
          <span>›</span>
          <span className="text-slate-400 line-clamp-1 max-w-[200px]">{title}</span>
        </nav>

        {/* Main product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">

          {/* Image */}
          <div className="relative">
            <div className="card p-8 flex items-center justify-center bg-white aspect-square rounded-2xl overflow-hidden">
              {imgError ? (
                <div className="text-8xl text-slate-300">🛍️</div>
              ) : (
                <img
                  src={image}
                  alt={title}
                  onError={() => setImgError(true)}
                  className="max-h-80 object-contain transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>

            {/* Floating badge */}
            {rating.rate >= 4.5 && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold
                               px-3 py-1 rounded-full shadow-lg">
                ⭐ Top Rated
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">

            {/* Category */}
            <span className="inline-block self-start text-xs font-semibold uppercase tracking-widest
                             text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full capitalize">
              {category}
            </span>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-50 leading-tight">
              {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Stars rating={rating.rate} count={rating.count} size="md" />
              <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded">
                {rating.count} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 py-4 border-y border-slate-800">
              <span className="text-4xl font-extrabold text-orange-400">${price.toFixed(2)}</span>
              <div>
                <span className="text-xs text-green-400 font-semibold bg-green-500/10
                                 border border-green-500/20 px-2 py-0.5 rounded-full">✓ In Stock</span>
                <p className="text-xs text-slate-500 mt-1">Free shipping on orders over $50</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 font-medium">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                <button onClick={() => handleQty(-1)}
                  className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-300
                             text-lg font-bold flex items-center justify-center transition-colors">
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold text-slate-200 bg-slate-900">
                  {qty}
                </span>
                <button onClick={() => handleQty(+1)}
                  className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-300
                             text-lg font-bold flex items-center justify-center transition-colors">
                  +
                </button>
              </div>
              <span className="text-xs text-slate-500">Max 10 per order</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-200
                  ${added
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-[0.98]'
                  }`}
              >
                {added ? '✓ Added to Cart!' : `🛒 Add to Cart — $${(price * qty).toFixed(2)}`}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                title={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`px-4 py-3.5 rounded-xl border-2 font-bold text-lg transition-all duration-200
                  ${inWish
                    ? 'border-red-500 text-red-400 bg-red-500/10'
                    : 'border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-400'
                  }`}
              >
                {inWish ? '♥' : '♡'}
              </button>
            </div>

            {inCart && !added && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10
                              border border-green-500/20">
                <span className="text-sm text-green-400">✓ Already in your cart</span>
                <Link to="/cart" className="text-xs font-semibold text-green-400 underline hover:text-green-300">
                  View Cart →
                </Link>
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[['🚚','Free Shipping','Over $50'],['↩️','Easy Returns','30 days'],['🔒','Secure Pay','256-bit SSL']].map(([ic,t,s])=>(
                <div key={t} className="card p-3 text-center">
                  <div className="text-xl mb-1">{ic}</div>
                  <p className="text-xs font-semibold text-slate-300">{t}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mb-14">
          <div className="flex gap-1 border-b border-slate-800 mb-6">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px
                  ${activeTab === tab
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="card p-6 max-w-3xl">
              <p className="text-slate-300 leading-relaxed text-sm">{description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="card p-6 max-w-lg">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(productSpecs).map(([k, v]) => (
                    <tr key={k} className="border-b border-slate-700 last:border-0">
                      <td className="py-3 pr-6 text-slate-400 font-medium w-1/3">{k}</td>
                      <td className="py-3 text-slate-200">{v}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-6 text-slate-400 font-medium">Category</td>
                    <td className="py-3 text-slate-200 capitalize">{category}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-slate-400 font-medium">SKU</td>
                    <td className="py-3 text-slate-200">SN-{String(product.id).padStart(5,'0')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl space-y-4">
              <div className="card p-5 flex items-center gap-6">
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-orange-400">{rating.rate}</p>
                  <Stars rating={rating.rate} size="md" />
                  <p className="text-xs text-slate-500 mt-1">{rating.count} reviews</p>
                </div>
                <div className="flex-1">
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2
                    return (
                      <div key={star} className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs text-amber-400 w-4">{star}★</span>
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{width:`${pct}%`}} />
                        </div>
                        <span className="text-xs text-slate-500 w-8">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mock reviews */}
              {[
                { name:'Arjun S.', rating:5, text:'Excellent quality! Exactly as described. Fast shipping.', date:'Apr 2026' },
                { name:'Priya M.', rating:4, text:'Good product overall. Packaging could be better but the item itself is great.', date:'Mar 2026' },
                { name:'Rahul K.', rating:5, text:'Amazing value for money. Will definitely buy again!', date:'Feb 2026' },
              ].map((r,i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-purple-600
                                    flex items-center justify-center text-white text-sm font-bold">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{r.name}</p>
                      <Stars rating={r.rating} size="sm" />
                    </div>
                    <span className="ml-auto text-xs text-slate-500">{r.date}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{r.text}</p>
                  <span className="inline-block mt-2 text-xs text-green-400 bg-green-500/10
                                   border border-green-500/20 px-2 py-0.5 rounded-full">✓ Verified Purchase</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-100 mb-5">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
