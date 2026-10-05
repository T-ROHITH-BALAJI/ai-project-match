import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { isAdminAuthed, isAdminPath, signInAdmin } from '../lib/adminAuth'

export function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdminAuthed()) {
    return <Navigate to={from && from !== '/admin/login' ? from : '/admin'} replace />
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = signInAdmin(adminId, password)
    if (!ok) {
      setError('Sign-in failed. Check the Admin ID and password from your local environment configuration.')
      return
    }
    const dest = from && isAdminPath(from) && from !== '/admin/login' ? from : '/admin'
    navigate(dest, { replace: true })
  }

  return (
    <div className="mx-auto max-w-md">
      <p className="eyebrow mb-2">Internal access</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Admin login</h1>
      <p className="text-sm text-ink-soft mb-6">
        Growth Plan, Dashboard, and the Communication Agent live behind this gate so students never
        see operations tools. Prototype sign-in only — not production authentication.
      </p>

      <form onSubmit={onSubmit} className="card p-5 sm:p-6 space-y-4">
        <label className="block">
          <span className="text-xs text-muted mb-1 block">Admin ID</span>
          <input
            type="text"
            autoComplete="username"
            required
            value={adminId}
            onChange={(e) => {
              setAdminId(e.target.value)
              setError('')
            }}
            className="w-full rounded-xl bg-white border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </label>
        <label className="block">
          <span className="text-xs text-muted mb-1 block">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            className="w-full rounded-xl bg-white border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </label>
        {error && (
          <p className="text-sm text-warm bg-warm-soft rounded-xl px-3 py-2" role="alert">
            {error}
          </p>
        )}
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  )
}
