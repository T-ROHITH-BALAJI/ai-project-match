import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { starterKit } from '../data/starterKitContent'

type Modal = 'ebook' | 'tools' | 'checklist' | 'prompts' | null

export function StarterKit() {
  const navigate = useNavigate()
  const { session, markKitDownload } = useApp()
  const [modal, setModal] = useState<Modal>(null)

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

  return (
    <div>
      <div className="text-center pt-2 pb-5">
        <div className="text-3xl mb-2">🎉</div>
        <h1 className="font-display text-2xl font-bold text-white">Workshop Complete!</h1>
        <p className="text-sm text-slate-400 mt-1">Your AI Builder Starter Kit is ready.</p>
        <p className="text-xs text-slate-500 mt-2">
          Also sent to {session.registration.email} (simulated)
        </p>
      </div>

      <div className="space-y-2">
        <KitButton title="Download AI Project E-book" sub={starterKit.ebook.title} onClick={downloadEbook} done={session.kitDownloads.ebook} />
        <KitButton
          title="Open AI Tools Guide"
          sub={starterKit.toolsGuide.title}
          onClick={() => open('tools')}
          done={session.kitDownloads.toolsGuide}
        />
        <KitButton
          title="Get Project Checklist"
          sub={starterKit.checklist.title}
          onClick={() => open('checklist')}
          done={session.kitDownloads.checklist}
        />
        <KitButton
          title="Get Prompt Pack"
          sub={starterKit.promptPack.title}
          onClick={() => open('prompts')}
          done={session.kitDownloads.promptPack}
        />
      </div>

      <SharePanel variant="project" projectName={session.project?.name} title="Share something useful with a friend" />

      <Link to="/" className="block mt-4">
        <Button variant="ghost">Start over (demo reset via dashboard)</Button>
      </Link>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70" onClick={() => setModal(null)}>
          <div
            className="glass max-h-[80dvh] w-full max-w-lg overflow-y-auto rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="text-xs text-slate-500 float-right" onClick={() => setModal(null)}>
              Close
            </button>
            {modal === 'tools' && (
              <>
                <h2 className="font-display text-lg font-bold text-white mb-4">{starterKit.toolsGuide.title}</h2>
                {starterKit.toolsGuide.categories.map((cat) => (
                  <div key={cat.useCase} className="mb-4">
                    <h3 className="text-sm font-semibold text-cyan-400">{cat.useCase}</h3>
                    <ul className="mt-2 space-y-2">
                      {cat.tools.map((t) => (
                        <li key={t.name} className="text-sm text-slate-400">
                          <strong className="text-slate-200">{t.name}</strong> — {t.problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            {modal === 'checklist' && (
              <>
                <h2 className="font-display text-lg font-bold text-white mb-4">{starterKit.checklist.title}</h2>
                <ol className="space-y-3">
                  {starterKit.checklist.items.map((item, i) => (
                    <li key={item.step} className="text-sm">
                      <span className="text-indigo-400 font-medium">
                        {i + 1}. {item.step}
                      </span>
                      <p className="text-slate-400 mt-0.5">{item.detail}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {modal === 'prompts' && (
              <>
                <h2 className="font-display text-lg font-bold text-white mb-4">{starterKit.promptPack.title}</h2>
                <ul className="space-y-3">
                  {starterKit.promptPack.prompts.map((p) => (
                    <li key={p.category} className="rounded-lg bg-slate-900/80 p-3 text-sm">
                      <span className="text-xs uppercase text-slate-500">{p.category}</span>
                      <p className="text-slate-300 mt-1 font-mono text-xs leading-relaxed">{p.text}</p>
                    </li>
                  ))}
                </ul>
              </>
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
      className="w-full text-left glass rounded-xl p-4 hover:border-indigo-500/40 transition-colors border border-slate-700/80"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-white text-sm">{title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
        </div>
        {done && <span className="text-xs text-emerald-400">Opened</span>}
      </div>
    </button>
  )
}
