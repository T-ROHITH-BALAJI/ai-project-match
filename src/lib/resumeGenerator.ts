import type { DiagnosticAnswers, ProjectMatch } from '../types'

export interface ResumePack {
  bullets: string[]
  linkedin: string
  readme: string
}

/** Simulated AI output — swap for a live model later without changing the page API. */
export function generateResumePack(
  project: ProjectMatch | null,
  answers: DiagnosticAnswers | null
): ResumePack {
  const name = project?.name ?? 'First AI project'
  const stack = project?.stack ?? 'React, Python, LLM API'
  const domain = project?.domain ?? answers?.interest ?? 'AI + Web'
  const goal = answers?.goal ?? 'Resume'
  const buildFirst = project?.buildFirst ?? 'a working end-to-end demo in one sitting'

  const bullets = [
    `Built ${name}, an ${domain.toLowerCase()} project using ${stack}, delivering ${buildFirst.toLowerCase()}`,
    `Designed a problem-to-demo path for ${goal.toLowerCase()}: scoped a 60-minute MVP, then iterated on UX, evaluation, and deployment.`,
    `Documented stack, prompts, and failure cases so recruiters can reproduce the demo from the README and live link.`,
  ]

  const linkedin = `${name} — ${domain} project for ${goal.toLowerCase()}.

I used ${stack} to go from a blank repo to a working first version, then spent a week tightening the UI, adding a stronger AI path, and deploying a shareable demo.

Built during NxtWave’s “Build Your First AI Project in 60 Minutes” workshop, then continued independently.`

  const readme = `# ${name}

${project?.description ?? 'A first AI project scoped to ship in one focused session and grow afterward.'}

## Stack
${stack}

## What it does
- ${buildFirst}
${(project?.futureUpgrades ?? []).map((u) => `- Roadmap: ${u}`).join('\n')}

## Why it exists
Matched to a ${answers?.comfort ?? 'beginner'} builder targeting ${goal.toLowerCase()} with ${answers?.time?.toLowerCase() ?? 'a weekend'} to invest.

## Run locally
1. Clone this repo
2. Install dependencies
3. Add API keys in \`.env\`
4. Start the dev server and try the happy path in the README demo script
`

  return { bullets, linkedin, readme }
}
