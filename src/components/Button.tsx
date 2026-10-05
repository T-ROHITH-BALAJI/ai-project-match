import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand hover:bg-brand-dark text-white shadow-sm shadow-brand/20 active:scale-[0.99]',
  secondary: 'bg-white hover:bg-paper text-ink border border-line',
  ghost: 'bg-transparent hover:bg-paper-deep/70 text-ink-soft',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold leading-snug whitespace-normal transition-all disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
