const SESSION_KEY = 'ai-project-match-session'
const ANALYTICS_KEY = 'ai-project-match-analytics'
const VISITOR_KEY = 'ai-project-match-visitor-counted'

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export { SESSION_KEY, ANALYTICS_KEY, VISITOR_KEY }
