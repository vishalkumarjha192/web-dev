import { createContext, useContext, useReducer, useMemo } from 'react'

// ─── Context ─────────────────────────────────────────────────────────────────
const ShopContext = createContext(null)

// Custom hook — throws if used outside provider
export const useShop = () => {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  cart: [],        // [{ id, title, price, image, category, qty }]
  wishlist: [],    // [{ id, title, price, image, category }]
  user: {
    name: 'Vishal Kumar Jha',
    email: '2501730124@krmu.edu.in',
    phone: '+91 9871474XXX',
    avatar: 'CV',
    orders: [
      { id: '#SN-2024-0891', date: 'Apr 28, 2026', items: 3, total: 289.97, status: 'Delivered' },
      { id: '#SN-2024-0756', date: 'Apr 12, 2026', items: 1, total: 149.99, status: 'Delivered' },
      { id: '#SN-2024-0612', date: 'Mar 30, 2026', items: 2, total: 99.98,  status: 'Delivered' },
    ],
  },
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function shopReducer(state, action) {
  switch (action.type) {

    // Cart actions
    case 'ADD_TO_CART': {
      const exists = state.cart.find(i => i.id === action.payload.id)
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + (action.qty ?? 1) }
              : i
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: action.qty ?? 1 }],
      }
    }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) }

    case 'UPDATE_QTY':
      if (action.qty < 1) {
        return { ...state, cart: state.cart.filter(i => i.id !== action.id) }
      }
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      }

    case 'CLEAR_CART':
      return { ...state, cart: [] }

    // Wishlist actions
    case 'TOGGLE_WISHLIST': {
      const inWish = state.wishlist.some(i => i.id === action.payload.id)
      return {
        ...state,
        wishlist: inWish
          ? state.wishlist.filter(i => i.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      }
    }

    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(i => i.id !== action.id) }

    // User actions
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } }

    default:
      return state
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState)

  // Derived values (memoised)
  const cartCount   = useMemo(() => state.cart.reduce((s, i) => s + i.qty, 0), [state.cart])
  const cartTotal   = useMemo(() => state.cart.reduce((s, i) => s + i.price * i.qty, 0), [state.cart])
  const cartShipping = cartTotal > 50 ? 0 : 9.99
  const cartTax      = +(cartTotal * 0.08).toFixed(2)
  const cartGrandTotal = +(cartTotal + cartShipping + cartTax).toFixed(2)

  // Action helpers
  const addToCart        = (product, qty = 1)  => dispatch({ type: 'ADD_TO_CART',      payload: product, qty })
  const removeFromCart   = (id)                => dispatch({ type: 'REMOVE_FROM_CART', id })
  const updateQty        = (id, qty)           => dispatch({ type: 'UPDATE_QTY',       id, qty })
  const clearCart        = ()                  => dispatch({ type: 'CLEAR_CART' })
  const toggleWishlist   = (product)           => dispatch({ type: 'TOGGLE_WISHLIST',  payload: product })
  const removeFromWishlist = (id)              => dispatch({ type: 'REMOVE_FROM_WISHLIST', id })
  const updateUser       = (data)              => dispatch({ type: 'UPDATE_USER',       payload: data })
  const isInWishlist     = (id)                => state.wishlist.some(i => i.id === id)
  const isInCart         = (id)                => state.cart.some(i => i.id === id)

  const value = {
    // State
    cart:       state.cart,
    wishlist:   state.wishlist,
    user:       state.user,
    // Derived
    cartCount,
    cartTotal,
    cartShipping,
    cartTax,
    cartGrandTotal,
    // Actions
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    updateUser,
    isInWishlist,
    isInCart,
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
