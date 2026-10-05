import { useEffect, useState } from 'react'
import { applyTheme, readTheme, type Theme } from '../lib/theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  function choose(next: Theme) {
    setTheme(next)
    applyTheme(next)
  }

  return (
    <div
      className="inline-flex items-center rounded-lg border border-line bg-paper p-0.5"
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => choose('light')}
        aria-pressed={theme === 'light'}
        className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
          theme === 'light' ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'
        }`}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => choose('dark')}
        aria-pressed={theme === 'dark'}
        className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
          theme === 'dark' ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'
        }`}
      >
        Dark
      </button>
    </div>
  )
}
