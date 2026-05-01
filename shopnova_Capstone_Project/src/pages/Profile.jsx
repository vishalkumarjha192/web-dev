import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import Stars from '../components/Stars'

const STATUS_STYLES = {
  Delivered:  'badge-green',
  Processing: 'badge-blue',
  Shipped:    'badge-orange',
  Cancelled:  'bg-red-500/15 text-red-400',
}

export default function Profile() {
  const { user, updateUser, cart, wishlist, cartCount } = useShop()

  const [form, setForm]   = useState({ name: user.name, email: user.email, phone: user.phone })
  const [saved, setSaved] = useState(false)
  const [tab,   setTab]   = useState('orders')

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    updateUser(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const TABS = ['orders', 'settings']

  return (
    <div className="container-lg py-8 animate-fade-in">
      <h1 className="page-heading mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left column: profile card ─────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-5">

          {/* Avatar + info */}
          <div className="card p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-purple-600
                            flex items-center justify-center text-3xl font-extrabold text-white mx-auto mb-4">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <h2 className="font-bold text-lg text-slate-100">{user.name}</h2>
            <p className="text-sm text-slate-400 mt-1">{user.email}</p>
            <span className="badge badge-orange mt-3 inline-block">Premium Member</span>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                ['Orders',  user.orders.length],
                ['Wishlist', wishlist.length],
                ['Cart',    cartCount],
              ].map(([label, n]) => (
                <div key={label} className="bg-slate-800/60 rounded-xl py-3">
                  <p className="text-xl font-extrabold text-orange-400">{n}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Edit profile form */}
          <div className="card p-6">
            <h3 className="font-bold text-slate-200 mb-4">Edit Profile</h3>
            <div className="space-y-4">
              {[
                { k: 'name',  l: 'Full Name',  ph: 'Your name',  type: 'text'  },
                { k: 'email', l: 'Email',       ph: 'you@example.com', type: 'email' },
                { k: 'phone', l: 'Phone',       ph: '+91 XXXXX XXXXX', type: 'tel'   },
              ].map(({ k, l, ph, type }) => (
                <div key={k}>
                  <label className="form-label">{l}</label>
                  <input
                    type={type}
                    value={form[k]}
                    onChange={e => upd(k, e.target.value)}
                    placeholder={ph}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleSave}
              className={`w-full mt-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200
                ${saved
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
            >
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* ── Right column: tabs ────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {/* Tab switcher */}
          <div className="flex gap-1 border-b border-slate-800 mb-5">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors
                  ${tab === t
                    ? 'text-orange-400 border-orange-500'
                    : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}
              >
                {t === 'orders' ? `Orders (${user.orders.length})` : 'Settings'}
              </button>
            ))}
          </div>

          {/* Orders tab */}
          {tab === 'orders' && (
            <div className="space-y-4">
              {user.orders.length === 0 ? (
                <div className="empty-state gap-4 py-16">
                  <div className="text-5xl">📦</div>
                  <p className="text-slate-400">No orders yet</p>
                  <Link to="/products" className="btn-primary text-sm">Start Shopping</Link>
                </div>
              ) : (
                user.orders.map(order => (
                  <div key={order.id} className="card p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-bold text-slate-200">{order.id}</p>
                          <span className={`badge ${STATUS_STYLES[order.status] || 'badge-orange'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{order.date} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-orange-400">${order.total.toFixed(2)}</p>
                        <button className="text-xs text-slate-500 hover:text-orange-400 transition-colors mt-1">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Settings tab */}
          {tab === 'settings' && (
            <div className="card divide-y divide-slate-800">
              {[
                { icon: '📍', label: 'Manage Addresses',   sub: 'Add or edit delivery addresses' },
                { icon: '💳', label: 'Payment Methods',    sub: 'Add cards, UPI, net banking' },
                { icon: '🔔', label: 'Notifications',      sub: 'Email and push preferences' },
                { icon: '🔒', label: 'Privacy & Security', sub: 'Change password, 2FA' },
                { icon: '🌙', label: 'Dark Mode',          sub: 'Always on (default)' },
                { icon: '🗑️', label: 'Delete Account',     sub: 'Permanently remove your account', danger: true },
              ].map(({ icon, label, sub, danger }) => (
                <div key={label}
                  className="flex items-center justify-between px-5 py-4 hover:bg-slate-800/40
                             cursor-pointer transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className="text-xl w-7 shrink-0">{icon}</span>
                    <div>
                      <p className={`text-sm font-medium ${danger ? 'text-red-400' : 'text-slate-300 group-hover:text-slate-100'}`}>
                        {label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                    </div>
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-400 transition-colors">›</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
