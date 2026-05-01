// Full-page loading spinner (used in Suspense fallback)
export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-10 h-10 border-4 border-slate-700 border-t-orange-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  )
}

// Skeleton card (shown while products load)
export function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-slate-700 rounded w-1/3" />
        <div className="h-4 bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-700 rounded w-4/5" />
        <div className="h-3 bg-slate-700 rounded w-1/4 mt-1" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-6 bg-slate-700 rounded w-16" />
          <div className="h-7 bg-slate-700 rounded w-20" />
        </div>
      </div>
    </div>
  )
}

// Grid of skeleton cards
export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
