import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="container-lg py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-xl font-extrabold mb-2">
              <span className="text-orange-500">Shop</span>
              <span className="text-slate-100">Nova</span>
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              A full-featured e-commerce UI built with React, Vite, and Tailwind CSS.
              Capstone Project — K.R. Mangalam University.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3">Shop</p>
            {['All Products', 'Electronics', "Men's Clothing", "Women's Clothing", 'Jewellery'].map(l => (
              <Link key={l} to="/products" className="block text-sm text-slate-500 hover:text-orange-400 mb-1.5 transition-colors">
                {l}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3">Account</p>
            {[['My Profile', '/profile'], ['My Cart', '/cart'], ['Wishlist', '/wishlist']].map(([l, to]) => (
              <Link key={l} to={to} className="block text-sm text-slate-500 hover:text-orange-400 mb-1.5 transition-colors">
                {l}
              </Link>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3">Tech Stack</p>
            {['React 18 + Vite', 'React Router v6', 'Context API + useReducer', 'Tailwind CSS', 'Axios + FakeStore API', 'Lazy Loading'].map(t => (
              <p key={t} className="text-sm text-slate-500 mb-1.5">{t}</p>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">© 2026 ShopNova. Capstone Project — CSE (AI & ML), K.R. Mangalam University.</p>
          <div className="flex gap-3">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <span key={l} className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
