export function FitScore({ score }: { score: number }) {
  const radius = 46
  const circ = 2 * Math.PI * radius
  const offset = circ * (1 - Math.min(100, Math.max(0, score)) / 100)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-[124px] w-[124px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#e8e2d6" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#164e63"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-ink leading-none">{score}%</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand">Project Fit</p>
    </div>
  )
}
