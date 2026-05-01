import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useShop()

  const moveAllToCart = () => {
    wishlist.forEach(p => addToCart(p))
  }

  if (wishlist.length === 0) return (
    <div className="container-lg py-20 empty-state animate-fade-in">
      <div className="text-7xl mb-5">♡</div>
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Your wishlist is empty</h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        Save products you love by clicking the ♡ icon on any product card.
      </p>
      <Link to="/products" className="btn-primary px-8 py-3">
        Explore Products →
      </Link>
    </div>
  )

  return (
    <div className="container-lg py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="page-heading">♥ My Wishlist</h1>
          <p className="text-slate-500 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={moveAllToCart}
            className="btn-primary text-sm"
          >
            🛒 Add All to Cart
          </button>
          <Link to="/products" className="btn-secondary text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
