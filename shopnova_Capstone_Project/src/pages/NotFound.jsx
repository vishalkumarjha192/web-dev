import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="container-lg py-24 empty-state animate-fade-in">
      <div className="text-8xl mb-4 select-none">404</div>
      <h1 className="text-2xl font-extrabold text-slate-100 mb-2">Page Not Found</h1>
      <p className="text-slate-500 max-w-sm mb-8 text-center">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="btn-secondary">
          ← Go Back
        </button>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}
