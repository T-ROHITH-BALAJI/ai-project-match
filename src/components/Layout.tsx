import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAdminAuthed, isAdminPath, signOutAdmin } from '../lib/adminAuth'

const adminNav = [
  { to: '/admin', label: 'Workspace' },
  { to: '/plan', label: 'Growth Plan' },
  { to: '/analytics', label: 'Dashboard' },
  { to: '/agent', label: 'Agent' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    setAuthed(isAdminAuthed())
  }, [pathname])

  const inAdmin = isAdminPath(pathname)
  const showAdminChrome = inAdmin && authed && pathname !== '/admin/login'

  function logout() {
    signOutAdmin()
    setAuthed(false)
    navigate('/')
  }

  return (
    <div className="min-h-dvh flex flex-col gradient-hero">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-card/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
          <Link to="/" className="flex items-center gap-2.5 group min-w-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold font-display text-white">
              AI
            </span>
            <span className="font-display font-semibold text-ink group-hover:text-brand text-sm sm:text-base truncate">
              NxtWave AI Builder
            </span>
          </Link>

          {showAdminChrome ? (
            <nav className="flex flex-wrap items-center justify-end gap-1.5">
              {adminNav.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors ${
                    pathname === link.to
                      ? 'bg-brand text-white'
                      : 'text-ink-soft hover:text-ink bg-paper'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={logout}
                className="text-xs font-medium px-2.5 py-1.5 rounded-full text-muted hover:text-ink"
              >
                Sign out
              </button>
            </nav>
          ) : (
            <Link
              to={authed ? '/admin' : '/admin/login'}
              className="text-xs text-muted hover:text-ink-soft px-1 py-1"
            >
              Admin
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8 pb-12 pt-6">
        {children}
      </main>
      <footer className="py-5 text-center text-xs text-muted">
        NxtWave AI Builder · Demo prototype
      </footer>
    </div>
  )
}
