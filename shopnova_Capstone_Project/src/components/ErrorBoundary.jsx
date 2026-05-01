import { Component } from 'react'
import { Link } from 'react-router-dom'

// Class component — required for React Error Boundaries
// Satisfies "Error boundary implementation" SOP requirement
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary caught]', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
          <div className="text-6xl">⚠️</div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Something went wrong</h2>
            <p className="text-slate-400 text-sm max-w-md">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20
                              rounded-lg px-4 py-3 max-w-lg text-left overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={this.handleReset} className="btn-primary">
              Try Again
            </button>
            <Link to="/" onClick={this.handleReset} className="btn-secondary">
              Go Home
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
