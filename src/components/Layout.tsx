import { Link, useLocation } from 'react-router-dom'

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const isAnalytics = pathname.startsWith('/analytics')

  return (
    <div className="min-h-dvh flex flex-col gradient-hero">
      <header className="sticky top-0 z-50 glass border-b border-slate-800/80">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3 safe-top">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold font-display">
              AI
            </span>
            <span className="font-display font-semibold text-slate-100 group-hover:text-white">
              Project Match
            </span>
          </Link>
          <div className="flex gap-1.5">
            <Link
              to="/plan"
              className="text-xs font-medium px-2.5 py-1.5 rounded-full text-slate-400 hover:text-slate-200 bg-slate-800/60"
            >
              Plan
            </Link>
            <Link
              to="/analytics"
              className={`text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors ${
                isAnalytics
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-lg px-4 pb-8 pt-2">{children}</main>
      <footer className="py-4 text-center text-xs text-slate-500">
        NxtWave Growth Challenge · Demo prototype
      </footer>
    </div>
  )
}
