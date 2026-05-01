import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const STEPS = ['Shipping', 'Payment', 'Review']

const INITIAL_FORM = {
  name: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  card: '', expiry: '', cvv: '', nameOnCard: '',
}

function validate(step, form) {
  const errors = {}
  if (step === 1) {
    if (!form.name.trim())    errors.name    = 'Full name is required'
    if (!form.email.trim())   errors.email   = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email'
    if (!form.phone.trim())   errors.phone   = 'Phone number is required'
    if (!form.address.trim()) errors.address = 'Address is required'
    if (!form.city.trim())    errors.city    = 'City is required'
    if (!form.state.trim())   errors.state   = 'State is required'
    if (!form.zip.trim())     errors.zip     = 'PIN / ZIP is required'
  }
  if (step === 2) {
    if (!form.card.trim())       errors.card       = 'Card number is required'
    if (form.card.replace(/\s/g,'').length < 16) errors.card = 'Enter a valid 16-digit card number'
    if (!form.expiry.trim())     errors.expiry     = 'Expiry is required'
    if (!form.cvv.trim())        errors.cvv        = 'CVV is required'
    if (!form.nameOnCard.trim()) errors.nameOnCard = 'Name on card is required'
  }
  return errors
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, cartTotal, cartShipping, cartTax, cartGrandTotal, clearCart } = useShop()

  const [step,    setStep]    = useState(1)
  const [form,    setForm]    = useState(INITIAL_FORM)
  const [errors,  setErrors]  = useState({})
  const [ordered, setOrdered] = useState(false)
  const [orderId] = useState(() => `#SN-${Date.now().toString().slice(-6)}`)

  if (cart.length === 0 && !ordered) return (
    <div className="container-lg py-20 empty-state gap-4">
      <div className="text-7xl">🛒</div>
      <p className="text-xl font-bold text-slate-300">Your cart is empty</p>
      <Link to="/products" className="btn-primary">Shop Now →</Link>
    </div>
  )

  const upd = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  const next = () => {
    const errs = validate(step, form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep(s => s + 1)
  }

  const placeOrder = () => {
    clearCart()
    setOrdered(true)
  }

  // ── Order confirmed ──────────────────────────────────────────────────────────
  if (ordered) return (
    <div className="container-lg py-10 animate-fade-in">
      <div className="max-w-md mx-auto text-center">
        <div className="text-7xl mb-5">🎉</div>
        <h2 className="text-3xl font-extrabold text-green-400 mb-2">Order Placed!</h2>
        <p className="text-slate-400 mb-1">Thank you, <strong className="text-slate-200">{form.name}</strong>!</p>
        <p className="text-slate-500 text-sm mb-8">
          Your order will be delivered to <strong className="text-slate-300">{form.city}, {form.state}</strong> within 3–5 business days.
        </p>

        <div className="card p-6 text-left mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-slate-400">Order ID</p>
            <p className="font-mono font-bold text-orange-400">{orderId}</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-slate-400">Amount Paid</p>
            <p className="text-2xl font-extrabold text-orange-400">${cartGrandTotal}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-400">Confirmation sent to</p>
            <p className="text-sm text-slate-300">{form.email}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary px-8 py-3">Continue Shopping →</Link>
          <Link to="/profile" className="btn-secondary px-6 py-3">View Orders</Link>
        </div>
      </div>
    </div>
  )

  // ── Checkout form ────────────────────────────────────────────────────────────
  const Field = ({ k, label, placeholder, type = 'text', col = 'full' }) => (
    <div className={col === 'half' ? '' : 'md:col-span-2'}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        value={form[k]}
        onChange={e => upd(k, e.target.value)}
        placeholder={placeholder}
        className={`form-input ${errors[k] ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {errors[k] && <p className="text-xs text-red-400 mt-1">{errors[k]}</p>}
    </div>
  )

  return (
    <div className="container-lg py-8 animate-fade-in">
      <h1 className="page-heading mb-6">Checkout</h1>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
              ${step > i+1 ? 'bg-green-500 text-white'
                : step === i+1 ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
              {step > i+1 ? '✓' : i+1}
            </div>
            <span className={`text-sm font-medium ${step === i+1 ? 'text-slate-200' : 'text-slate-500'}`}>{s}</span>
            {i < STEPS.length - 1 && <span className="text-slate-700 mx-1">—</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form area */}
        <div className="lg:col-span-2">
          <div className="surface p-6">

            {/* Step 1 — Shipping */}
            {step === 1 && (
              <>
                <h3 className="font-bold text-slate-200 text-lg mb-5">📦 Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field k="name"    label="Full Name *"    placeholder="Chanda Verma"         />
                  <Field k="email"   label="Email *"        placeholder="chanda@krmu.edu.in"   />
                  <Field k="phone"   label="Phone *"        placeholder="+91 98765 43210"       />
                  <Field k="address" label="Street Address *" placeholder="123, Main Street"   />
                  <Field k="city"   label="City *"          placeholder="New Delhi"   col="half"/>
                  <Field k="state"  label="State *"         placeholder="Delhi"       col="half"/>
                  <Field k="zip"    label="PIN / ZIP Code *" placeholder="110001"     col="half"/>
                </div>
                <button onClick={next} className="btn-primary mt-6 px-8 py-3">
                  Next: Payment →
                </button>
              </>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <>
                <h3 className="font-bold text-slate-200 text-lg mb-2">💳 Payment Details</h3>
                <p className="text-xs text-slate-500 mb-5 flex items-center gap-1">
                  <span>🔒</span> Your payment info is encrypted and secure
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field k="nameOnCard" label="Name on Card *"  placeholder="Chanda Verma"       />
                  <Field k="card"       label="Card Number *"   placeholder="4242 4242 4242 4242" />
                  <Field k="expiry"     label="Expiry Date *"   placeholder="MM/YY"  col="half"  />
                  <Field k="cvv"        label="CVV *"           placeholder="123"    col="half"  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-secondary px-6 py-3">← Back</button>
                  <button onClick={next}             className="btn-primary   px-8 py-3">Review Order →</button>
                </div>
              </>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <>
                <h3 className="font-bold text-slate-200 text-lg mb-5">✅ Review Your Order</h3>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 items-center card p-3">
                      <img src={item.image} alt={item.title}
                        className="w-12 h-12 object-contain bg-white rounded-lg p-1 shrink-0"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-300 line-clamp-1 font-medium">{item.title}</p>
                        <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-orange-400 shrink-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery + payment summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="card p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">📦 Deliver To</p>
                    <p className="text-sm text-slate-200 font-semibold">{form.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{form.address}</p>
                    <p className="text-xs text-slate-400">{form.city}, {form.state} — {form.zip}</p>
                    <p className="text-xs text-slate-400">{form.phone}</p>
                  </div>
                  <div className="card p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">💳 Payment</p>
                    <p className="text-sm text-slate-200">{form.nameOnCard}</p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      •••• •••• •••• {form.card.replace(/\s/g,'').slice(-4) || '****'}
                    </p>
                    <p className="text-xs text-slate-400">Expires {form.expiry}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary px-6 py-3">← Back</button>
                  <button onClick={placeOrder}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold
                               py-3.5 rounded-xl text-base transition-colors active:scale-[0.98]">
                    ✓ Place Order — ${cartGrandTotal}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <div>
          <div className="surface p-5 sticky top-24">
            <h3 className="font-bold text-slate-200 mb-4">Order Summary</h3>
            {cart.slice(0, 3).map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 truncate mr-2">{item.title.split(' ').slice(0,4).join(' ')}… ×{item.qty}</span>
                <span className="text-slate-300 shrink-0">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            {cart.length > 3 && (
              <p className="text-xs text-slate-500 mb-2">+{cart.length - 3} more items</p>
            )}
            <div className="divider" />
            {[
              ['Subtotal', `$${cartTotal.toFixed(2)}`],
              ['Shipping', cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`],
              ['Tax',      `$${cartTax}`],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">{l}</span>
                <span className={v === 'FREE' ? 'text-green-400 font-semibold' : 'text-slate-300'}>{v}</span>
              </div>
            ))}
            <div className="divider" />
            <div className="flex justify-between items-center mt-1">
              <span className="font-bold text-slate-200">Total</span>
              <span className="text-2xl font-extrabold text-orange-400">${cartGrandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
