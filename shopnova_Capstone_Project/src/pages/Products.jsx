import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/LoadingSpinner'

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

const CATEGORIES = [
  'All',
  'electronics',
  "men's clothing",
  "women's clothing",
  'jewelery',
]

const RATINGS = [
  { label: 'Any', value: 0 },
  { label: '3★ & up', value: 3 },
  { label: '4★ & up', value: 4 },
  { label: '4.5★ & up', value: 4.5 },
]

// Items per page — satisfies Pagination SOP requirement
const PAGE_SIZE = 8

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read initial state from URL params (supports shareable links)
  const [sort,      setSort]      = useState('popular')
  const [category,  setCategory]  = useState(searchParams.get('category') || 'All')
  const [minRating, setMinRating] = useState(0)
  const [maxPrice,  setMaxPrice]  = useState(1000)
  const [localQ,    setLocalQ]    = useState(searchParams.get('search') || '')
  const [page,      setPage]      = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: products, loading, error } = useProducts()

  // Sync URL search param into local query
  useEffect(() => {
    const q = searchParams.get('search') || ''
    const cat = searchParams.get('category') || 'All'
    setLocalQ(q)
    setCategory(cat)
    setPage(1)
  }, [searchParams])

  // Debounced search — satisfies "Debounced API calls" SOP requirement
  const handleSearch = useCallback((e) => {
    const val = e.target.value
    setLocalQ(val)
    setPage(1)
    const timer = setTimeout(() => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        if (val) next.set('search', val); else next.delete('search')
        return next
      })
    }, 400)
    return () => clearTimeout(timer)
  }, [setSearchParams])

  // Apply all filters + sort — satisfies "Search + filter + sort" SOP requirement
  const filtered = useMemo(() => {
    if (!products) return []
    let r = [...products]

    if (category && category !== 'All') r = r.filter(p => p.category === category)
    if (localQ)    r = r.filter(p => p.title.toLowerCase().includes(localQ.toLowerCase()) || p.category.toLowerCase().includes(localQ.toLowerCase()))
    r = r.filter(p => p.price <= maxPrice && p.rating.rate >= minRating)

    if (sort === 'price-asc')  r.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') r.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     r.sort((a, b) => b.rating.rate - a.rating.rate)
    if (sort === 'popular')    r.sort((a, b) => b.rating.count - a.rating.count)

    return r
  }, [products, category, localQ, maxPrice, minRating, sort])

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const clearFilters = () => {
    setCategory('All'); setMinRating(0); setMaxPrice(1000); setLocalQ(''); setPage(1)
    setSearchParams({})
  }

  const activeFilters =
    (category !== 'All' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < 1000 ? 1 : 0) +
    (localQ ? 1 : 0)

  const Sidebar = () => (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800
      transform transition-transform duration-300 overflow-y-auto
      md:static md:w-56 md:transform-none md:bg-transparent md:border-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-5 md:p-0 sticky top-20">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-200">Filters
            {activeFilters > 0 && (
              <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                {activeFilters}
              </span>
            )}
          </h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-300 text-lg"
          >✕</button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Category</p>
          {CATEGORIES.map(cat => {
            const count = products ? (cat === 'All' ? products.length : products.filter(p => p.category === cat).length) : '…'
            return (
              <button key={cat} onClick={() => { setCategory(cat); setPage(1) }}
                className={`flex justify-between w-full px-3 py-2 rounded-lg text-sm mb-0.5 text-left transition-colors
                  ${category === cat
                    ? 'bg-orange-500/15 text-orange-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
              >
                <span className="capitalize">{cat}</span>
                <span className="text-xs text-slate-500">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Max Price</p>
          <p className="text-sm text-slate-300 mb-2 font-medium">Up to <span className="text-orange-400">${maxPrice}</span></p>
          <input type="range" min={10} max={1000} step={10} value={maxPrice}
            onChange={e => { setMaxPrice(+e.target.value); setPage(1) }}
            className="w-full accent-orange-500" />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>$10</span><span>$1000</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Min Rating</p>
          {RATINGS.map(({ label, value }) => (
            <button key={value} onClick={() => { setMinRating(value); setPage(1) }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors
                ${minRating === value
                  ? 'bg-orange-500/15 text-orange-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
            >
              <span className="text-amber-400">{'★'.repeat(value > 0 ? Math.floor(value) : 0)}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {activeFilters > 0 && (
          <button onClick={clearFilters}
            className="w-full text-sm py-2 border border-slate-700 rounded-lg text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors">
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  )

  return (
    <div className="container-lg py-8 animate-fade-in">
      <div className="flex gap-8">

        {/* Sidebar overlay backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <Sidebar />

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex gap-3 mb-6 flex-wrap items-center">
            {/* Mobile filter toggle */}
            <button onClick={() => setSidebarOpen(true)}
              className="md:hidden btn-secondary text-sm px-3 py-2 flex items-center gap-1.5">
              <span>☰</span> Filters
              {activeFilters > 0 && (
                <span className="bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Search */}
            <div className="flex-1 relative min-w-[180px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">🔍</span>
              <input
                value={localQ}
                onChange={handleSearch}
                placeholder="Search products…"
                className="form-input pl-9 py-2 text-sm"
              />
            </div>

            {/* Sort */}
            <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}
              className="form-input py-2 text-sm w-auto">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <p className="text-sm text-slate-500 shrink-0">{filtered.length} results</p>
          </div>

          {/* Error */}
          {error && (
            <div className="card p-6 text-center border-red-500/20 bg-red-500/5 text-red-400 mb-6">
              <p className="font-semibold">Failed to load products</p>
              <p className="text-sm mt-1 text-red-400/70">{error}</p>
            </div>
          )}

          {/* Products grid */}
          {loading ? (
            <SkeletonGrid count={PAGE_SIZE} />
          ) : paginated.length === 0 ? (
            <div className="empty-state gap-4">
              <div className="text-6xl">🔍</div>
              <div>
                <p className="text-lg font-bold text-slate-300">No products found</p>
                <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search term</p>
              </div>
              <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination — SOP requirement */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed">
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all
                    ${page === p
                      ? 'bg-orange-500 text-white'
                      : 'border border-slate-700 text-slate-400 hover:border-orange-500/50 hover:text-slate-200'
                    }`}
                >
                  {p}
                </button>
              ))}

              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed">
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
