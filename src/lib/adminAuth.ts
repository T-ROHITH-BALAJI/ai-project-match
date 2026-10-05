const ADMIN_SESSION_KEY = 'nxtwave-admin-auth'

function expectedId(): string {
  return (import.meta.env.VITE_ADMIN_ID as string | undefined)?.trim() || 'nxtwave-ops'
}

function expectedPassword(): string {
  return (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || 'builder-internal'
}

export function isAdminAuthed(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function signInAdmin(id: string, password: string): boolean {
  const ok = id.trim() === expectedId() && password === expectedPassword()
  if (ok) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  }
  return ok
}

export function signOutAdmin(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

export const ADMIN_PATHS = ['/admin', '/plan', '/analytics', '/agent'] as const

export function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}
