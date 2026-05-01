import { useState, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount, wishlist } = useShop()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = useCallback((e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }, [query, navigate])

  const navLinks = [
    { to: '/',          label: 'Home' },
    { to: '/products',  label: 'Products' },
    { to: '/wishlist',  label: 'Wishlist' },
    { to: '/profile',   label: 'Profile' },
  ]

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path)

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="container-lg">
        <div className="flex items-center gap-4 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 font-extrabold text-xl shrink-0">
            <span className="text-orange-500">Shop</span>
            <span className="text-slate-100">Nova</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isActive(to)
                    ? 'bg-orange-500/15 text-orange-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products… (Enter)"
              className="form-input pl-9 py-2 text-sm"
            />
          </div>

          {/* Icon actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         border border-slate-700 hover:border-orange-500/50
                         text-slate-300 hover:text-white text-sm transition-all duration-150"
            >
              <span>♡</span>
              <span className="hidden sm:inline text-xs">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white
                                 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-orange-500 hover:bg-orange-600
                         text-white text-sm font-semibold transition-all duration-150"
            >
              <span>🛒</span>
              <span className="hidden sm:inline text-xs">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-orange-400
                                 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center
                                 border border-orange-500">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-lg border border-slate-700 text-slate-400"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium
                  ${isActive(to)
                    ? 'bg-orange-500/15 text-orange-400'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
