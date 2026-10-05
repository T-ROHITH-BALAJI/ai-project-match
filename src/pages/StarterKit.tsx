import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { JourneyNav } from '../components/JourneyNav'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { starterKit } from '../data/starterKitContent'
import { generateResumePack } from '../lib/resumeGenerator'

type Modal = 'ebook' | 'tools' | 'checklist' | 'prompts' | null

export function StarterKit() {
  const navigate = useNavigate()
  const { session, markKitDownload } = useApp()
  const [modal, setModal] = useState<Modal>(null)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
    else if (!session.starterKitUnlocked) navigate('/attendance', { replace: true })
  }, [session, navigate])

  if (!session.starterKitUnlocked || !session.registration) return null

  function open(kind: Modal) {
    if (!kind) return
    const map = {
      ebook: 'ebook',
      tools: 'toolsGuide',
      checklist: 'checklist',
      prompts: 'promptPack',
    } as const
    if (kind in map) markKitDownload(map[kind as keyof typeof map])
    setModal(kind)
  }

  function downloadEbook() {
    markKitDownload('ebook')
    const text = starterKit.ebook.sections
      .map(
        (s) =>
          `# ${s.project}\nProblem: ${s.problem}\nDifficulty: ${s.difficulty}\nStack: ${s.stack}\n...`
      )
      .join('\n\n')
    const blob = new Blob([`${starterKit.ebook.title}\n\n${text}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '10-ai-projects-ebook.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const resume = generateResumePack(session.project, session.answers)

  return (
    <div>
      <JourneyNav />
      <div className="mb-6">
        <p className="text-3xl mb-2">🎉</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">Workshop Complete</h1>
        <p className="text-lg text-ink-soft mt-1">Your Free AI Builder Kit is Ready</p>
        <p className="text-xs text-muted mt-2">Prototype simulation · No real messages are sent</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <KitButton
          title="Download AI Project E-book"
          sub={starterKit.ebook.title}
          onClick={downloadEbook}
          done={session.kitDownloads.ebook}
        />
        <KitButton
          title="Explore AI Tools Guide"
          sub={starterKit.toolsGuide.title}
          onClick={() => open('tools')}
          done={session.kitDownloads.toolsGuide}
        />
        <KitButton
          title="View My Roadmap"
          sub="Personalized 5-day continuation plan"
          onClick={() => navigate('/roadmap')}
          done={false}
        />
        <KitButton
          title="Get Prompt Pack"
          sub={starterKit.promptPack.title}
          onClick={() => open('prompts')}
          done={session.kitDownloads.promptPack}
        />
      </div>

      <section className="card p-5 sm:p-6 mb-6">
        <p className="eyebrow mb-2">AI-powered</p>
        <h2 className="font-display text-xl font-semibold text-ink">Make My Project Resume-Ready</h2>
        <p className="text-sm text-ink-soft mt-2 max-w-2xl">
          Simulated AI turns your matched project into resume bullets, a LinkedIn blurb, and a GitHub
          README. Connect a live model later without changing this screen.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-paper p-3">
            <p className="text-xs text-muted uppercase">Your project</p>
            <p className="font-medium text-ink">{session.project?.name ?? 'Your first AI project'}</p>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <p className="text-xs text-muted uppercase">Tech stack</p>
            <p className="font-medium text-ink">{session.project?.stack ?? 'Workshop starter stack'}</p>
          </div>
        </div>
        <div className="mt-4 max-w-sm">
          <Button onClick={() => setResumeOpen(true)}>Make My Project Resume-Ready</Button>
        </div>

        {resumeOpen && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-line bg-paper p-4">
              <h3 className="text-xs uppercase text-muted mb-2">Resume bullets</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-ink-soft">
                {resume.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-paper p-4">
              <h3 className="text-xs uppercase text-muted mb-2">LinkedIn project description</h3>
              <p className="text-sm text-ink-soft whitespace-pre-wrap leading-relaxed">{resume.linkedin}</p>
            </div>
            <div className="rounded-xl border border-line bg-paper p-4">
              <h3 className="text-xs uppercase text-muted mb-2">GitHub README summary</h3>
              <pre className="text-xs text-ink-soft whitespace-pre-wrap font-mono leading-relaxed">
                {resume.readme}
              </pre>
            </div>
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={() => open('checklist')}
        className="text-sm text-brand underline mb-4"
      >
        Also open the project continuation checklist
      </button>

      <SharePanel
        variant="project"
        projectName={session.project?.name}
        title="Know another final-year engineering student?"
      />

      <Link to="/" className="block mt-4 max-w-xs">
        <Button variant="ghost">Back to landing</Button>
      </Link>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-ink/40"
          onClick={() => setModal(null)}
        >
          <div
            className="card max-h-[80dvh] w-full max-w-2xl overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="text-xs text-muted float-right" onClick={() => setModal(null)}>
              Close
            </button>
            {modal === 'tools' && (
              <>
                <h2 className="font-display text-lg font-bold text-ink mb-2">{starterKit.toolsGuide.title}</h2>
                <p className="text-sm text-ink-soft mb-4">{starterKit.toolsGuide.intro}</p>
                {starterKit.toolsGuide.categories.map((cat) => (
                  <div key={cat.useCase} className="mb-4">
                    <h3 className="text-sm font-semibold text-brand">{cat.useCase}</h3>
                    <p className="text-xs text-muted mt-0.5 mb-2">{cat.solves}</p>
                    <ul className="space-y-2">
                      {cat.tools.map((t) => (
                        <li key={t.name} className="text-sm text-ink-soft">
                          <strong className="text-ink">{t.name}</strong> — {t.problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            {modal === 'checklist' && (
              <>
                <h2 className="font-display text-lg font-bold text-ink mb-4">{starterKit.checklist.title}</h2>
                <ol className="space-y-3">
                  {starterKit.checklist.items.map((item, i) => (
                    <li key={item.step} className="text-sm">
                      <span className="text-brand font-medium">
                        {i + 1}. {item.step}
                      </span>
                      <p className="text-ink-soft mt-0.5">{item.detail}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {modal === 'prompts' && (
              <>
                <h2 className="font-display text-lg font-bold text-ink mb-4">{starterKit.promptPack.title}</h2>
                <ul className="space-y-3">
                  {starterKit.promptPack.prompts.map((p) => (
                    <li key={p.category} className="rounded-lg bg-paper p-3 text-sm">
                      <span className="text-xs uppercase text-muted">{p.category}</span>
                      <p className="text-ink-soft mt-1 font-mono text-xs leading-relaxed">{p.text}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {modal === 'ebook' && (
              <p className="text-sm text-ink-soft">E-book download started (demo text file).</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function KitButton({
  title,
  sub,
  onClick,
  done,
}: {
  title: string
  sub: string
  onClick: () => void
  done: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left card p-5 hover:border-brand/30 transition-colors min-h-[5.5rem]"
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <p className="font-semibold text-ink text-sm">{title}</p>
          <p className="text-xs text-muted mt-0.5">{sub}</p>
        </div>
        {done && <span className="text-xs text-good shrink-0">Opened</span>}
      </div>
    </button>
  )
}
