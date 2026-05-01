// Stars — reusable rating display component
// Props: rating (number 0-5), count (optional review count), size (sm/md/lg)

export default function Stars({ rating = 0, count, size = 'sm' }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className={`${sizes[size]} text-amber-400 tracking-tight leading-none`}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        <span className="text-slate-600">{'☆'.repeat(empty)}</span>
      </span>

      {rating > 0 && (
        <span className="text-xs text-slate-400 font-medium">{rating.toFixed(1)}</span>
      )}

      {count !== undefined && (
        <span className="text-xs text-slate-500">({count.toLocaleString()})</span>
      )}
    </div>
  )
}
