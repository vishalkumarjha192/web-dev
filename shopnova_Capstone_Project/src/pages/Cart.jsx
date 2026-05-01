import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function Cart() {
  const navigate = useNavigate()
  const {
    cart, removeFromCart, updateQty,
    cartTotal, cartShipping, cartTax, cartGrandTotal,
  } = useShop()

  if (cart.length === 0) return (
    <div className="container-lg py-10 animate-fade-in">
      <div className="empty-state gap-4">
        <div className="text-8xl">🛒</div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Your cart is empty</h2>
          <p className="text-slate-500">Add some products and they'll appear here</p>
        </div>
        <Link to="/products" className="btn-primary px-8 py-3">
          Start Shopping →
        </Link>
      </div>
    </div>
  )

  return (
    <div className="container-lg py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="page-heading">
          Shopping Cart
          <span className="text-sm font-normal text-slate-500 ml-2">
            ({cart.reduce((s,i) => s+i.qty, 0)} items)
          </span>
        </h1>
        <Link to="/products" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
          ← Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id}
              className="card p-4 flex gap-4 items-start hover:border-slate-600 transition-colors">

              {/* Image */}
              <Link to={`/products/${item.id}`}
                className="w-20 h-20 shrink-0 bg-white rounded-lg overflow-hidden flex items-center justify-center p-2">
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-contain" />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 capitalize mb-1">{item.category}</p>
                <Link to={`/products/${item.id}`}
                  className="text-sm font-semibold text-slate-200 hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </Link>
                <p className="text-xs text-green-400 mt-1">✓ In Stock</p>

                {/* Qty controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 bg-slate-800 hover:bg-slate-700 text-slate-300
                                 font-bold flex items-center justify-center transition-colors text-sm">
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-slate-200 bg-slate-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 bg-slate-800 hover:bg-slate-700 text-slate-300
                                 font-bold flex items-center justify-center transition-colors text-sm">
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-400 hover:text-red-300 border border-red-500/30
                               hover:border-red-500/60 px-3 py-1.5 rounded-lg transition-all">
                    🗑 Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-orange-400">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="surface p-6 sticky top-24">
            <h3 className="font-bold text-slate-200 text-lg mb-5">Order Summary</h3>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Subtotal ({cart.reduce((s,i) => s+i.qty, 0)} items)
                </span>
                <span className="text-slate-200">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Shipping</span>
                {cartShipping === 0
                  ? <span className="text-green-400 font-semibold">FREE</span>
                  : <span className="text-slate-200">${cartShipping.toFixed(2)}</span>
                }
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tax (8%)</span>
                <span className="text-slate-200">${cartTax}</span>
              </div>
            </div>

            {cartShipping > 0 && (
              <div className="mb-5 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-xs">
                <p className="text-orange-400">
                  🚚 Add <strong>${(50 - cartTotal).toFixed(2)}</strong> more for free shipping!
                </p>
                <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${Math.min((cartTotal / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="divider" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-slate-200">Total</span>
              <span className="text-2xl font-extrabold text-orange-400">${cartGrandTotal}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full py-3.5 text-base">
              Proceed to Checkout →
            </button>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-600">
              <span>🔒 Secure checkout</span>
              <span>·</span>
              <span>↩️ Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
