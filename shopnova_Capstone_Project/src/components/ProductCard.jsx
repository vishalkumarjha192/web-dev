import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import Stars from './Stars'

// Badge color map by product tag
const BADGE_STYLES = {
  'Best Seller': 'bg-orange-500/20 text-orange-400',
  'New':         'bg-blue-500/20   text-blue-400',
  'Trending':    'bg-purple-500/20 text-purple-400',
  'Sale':        'bg-red-500/20    text-red-400',
}

// Category tag colours
const CAT_COLOURS = {
  "electronics":    'text-blue-400',
  "jewelery":       'text-purple-400',
  "men's clothing": 'text-sky-400',
  "women's clothing":'text-pink-400',
}

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist } = useShop()

  const [added,    setAdded]    = useState(false)
  const [imgError, setImgError] = useState(false)

  const inWish = isInWishlist(product.id)

  // Normalise FakeStore API shape
  const {
    id,
    title,
    price,
    image,
    category,
    rating,
  } = product

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div
      onClick={() => navigate(`/products/${id}`)}
      className="card card-hover cursor-pointer overflow-hidden group animate-fade-in"
    >
      {/* Image */}
      <div className="relative bg-white overflow-hidden">
        {imgError ? (
          <div className="h-48 flex items-center justify-center bg-slate-700 text-5xl">🛍️</div>
        ) : (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          title={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
                      text-lg transition-all duration-200 backdrop-blur-sm
                      ${inWish
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-slate-800/70 text-slate-400 border border-slate-700/50 hover:text-red-400'
                      }`}
        >
          {inWish ? '♥' : '♡'}
        </button>

        {/* Category badge */}
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full
                          bg-slate-900/80 backdrop-blur-sm border border-slate-700/50
                          ${CAT_COLOURS[category] || 'text-slate-400'}`}>
          {category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-200 line-clamp-2 min-h-[2.8rem] mb-2 leading-snug">
          {title}
        </h3>

        {rating && (
          <Stars rating={rating.rate} count={rating.count} />
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-orange-400">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200
                        ${added
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
