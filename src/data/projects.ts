import type { BuildGoal, BuildInterest, DiagnosticAnswers, ProjectMatch, TechComfort } from '../types'

const projects: Omit<ProjectMatch, 'whyMatch' | 'fitScore'>[] = [
  {
    id: 'resume-analyzer',
    name: 'AI Resume Analyzer',
    difficulty: 'Beginner+',
    careerValue: 'High for placement-focused students',
    stack: 'React + Python/FastAPI + LLM',
    description:
      'Build an AI system that analyzes a resume, identifies missing skills, and suggests improvements tailored to a target role.',
    buildFirst: 'Upload a PDF resume and get a structured skills gap report in the browser.',
    futureUpgrades: ['Job-description matching', 'ATS score', 'Cover letter drafts'],
    suggestedTools: ['OpenAI API', 'LangChain', 'pdf-parse'],
    domain: 'Generative AI',
  },
  {
    id: 'study-buddy',
    name: 'AI Study Buddy Chatbot',
    difficulty: 'Beginner',
    careerValue: 'Strong for learning & hackathon portfolios',
    stack: 'Next.js + Vercel AI SDK + OpenAI',
    description:
      'A conversational tutor that explains engineering concepts, quizzes you, and adapts to your syllabus topics.',
    buildFirst: 'Topic picker + chat UI with streaming responses.',
    futureUpgrades: ['Voice mode', 'Flashcard export', 'Progress tracking'],
    suggestedTools: ['Vercel AI SDK', 'OpenAI', 'Supabase'],
    domain: 'Generative AI',
  },
  {
    id: 'defect-detector',
    name: 'Visual Defect Detector',
    difficulty: 'Intermediate',
    careerValue: 'Great for manufacturing & IoT roles',
    stack: 'Python + OpenCV + TensorFlow Lite',
    description:
      'Use computer vision to flag defects on a conveyor belt or assembly line from webcam or sample images.',
    buildFirst: 'Classify good vs defective samples with a pre-trained model fine-tuned on your dataset.',
    futureUpgrades: ['Edge deployment on Raspberry Pi', 'Real-time alerts', 'Dashboard'],
    suggestedTools: ['Roboflow', 'OpenCV', 'TensorFlow'],
    domain: 'Computer Vision',
  },
  {
    id: 'attendance-cv',
    name: 'Smart Classroom Attendance',
    difficulty: 'Intermediate+',
    careerValue: 'Shows practical CV + privacy awareness',
    stack: 'Python + face_recognition + FastAPI',
    description: 'Recognize registered students from a classroom photo and log attendance automatically.',
    buildFirst: 'Enrollment flow + single-image recognition demo.',
    futureUpgrades: ['Liveness check', 'Admin dashboard', 'Export to CSV'],
    suggestedTools: ['face_recognition', 'FastAPI', 'React'],
    domain: 'Computer Vision',
  },
  {
    id: 'sentiment-reviews',
    name: 'Product Review Sentiment Engine',
    difficulty: 'Beginner+',
    careerValue: 'Useful for data & product analytics interviews',
    stack: 'Python + scikit-learn / Hugging Face + Streamlit',
    description: 'Analyze customer reviews to surface sentiment trends and recurring complaints.',
    buildFirst: 'Paste reviews → sentiment tags + word cloud of issues.',
    futureUpgrades: ['Multi-language', 'Topic clustering', 'Slack alerts'],
    suggestedTools: ['Hugging Face Transformers', 'Streamlit', 'Pandas'],
    domain: 'NLP',
  },
  {
    id: 'doc-qa',
    name: 'Campus Document Q&A',
    difficulty: 'Intermediate',
    careerValue: 'Strong final-year & startup demo',
    stack: 'React + LangChain + vector DB',
    description: 'Upload college handbooks or lab manuals and ask natural-language questions with cited answers.',
    buildFirst: 'PDF ingest + chat with source snippets.',
    futureUpgrades: ['Multi-doc collections', 'Auth', 'WhatsApp bot'],
    suggestedTools: ['LangChain', 'Chroma', 'OpenAI embeddings'],
    domain: 'NLP',
  },
  {
    id: 'energy-dashboard',
    name: 'Energy Usage Predictor',
    difficulty: 'Intermediate',
    careerValue: 'EEE / Civil sustainability narratives',
    stack: 'Python + Pandas + Prophet / scikit-learn',
    description: 'Forecast building or campus energy usage from historical meter data and weather features.',
    buildFirst: 'Upload CSV → forecast chart for next 7 days.',
    futureUpgrades: ['Anomaly detection', 'Cost optimizer', 'IoT ingest'],
    suggestedTools: ['Pandas', 'Prophet', 'Plotly'],
    domain: 'Data / Analytics',
  },
  {
    id: 'placement-tracker',
    name: 'Placement Pulse Dashboard',
    difficulty: 'Beginner+',
    careerValue: 'Direct placement prep showcase',
    stack: 'React + Chart.js + sample APIs',
    description: 'Aggregate practice test scores, application status, and skill gaps in one student dashboard.',
    buildFirst: 'Manual data entry + skill radar chart.',
    futureUpgrades: ['LinkedIn import', 'AI mock interviews', 'Peer benchmarks'],
    suggestedTools: ['Chart.js', 'Firebase', 'Notion API'],
    domain: 'Data / Analytics',
  },
  {
    id: 'ai-portfolio',
    name: 'AI-Powered Portfolio Site',
    difficulty: 'Beginner',
    careerValue: 'Resume-ready in one weekend',
    stack: 'React + Tailwind + OpenAI',
    description:
      'Personal site with an embedded AI assistant that answers recruiters’ questions about your projects.',
    buildFirst: 'Static portfolio + chat widget trained on your project blurbs.',
    futureUpgrades: ['Analytics', 'Blog generator', 'Custom domain'],
    suggestedTools: ['Vite', 'Tailwind', 'OpenAI Assistants'],
    domain: 'AI + Web',
  },
  {
    id: 'workflow-copilot',
    name: 'Student Workflow Automator',
    difficulty: 'Beginner+',
    careerValue: 'Automation skills stand out in interviews',
    stack: 'Python + n8n / Make + Google Sheets',
    description: 'Automate repetitive tasks: assignment reminders, form fills, and status updates across apps.',
    buildFirst: 'One zap: form submission → Slack/WhatsApp notification.',
    futureUpgrades: ['Multi-step flows', 'Error handling', 'Team sharing'],
    suggestedTools: ['n8n', 'Make', 'Google Apps Script'],
    domain: 'Automation',
  },
  {
    id: 'hackathon-mvp',
    name: '48-Hour Hackathon MVP',
    difficulty: 'Beginner',
    careerValue: 'Ship fast — perfect for hackathons',
    stack: 'Streamlit + OpenAI + free hosting',
    description: 'A minimal AI wrapper around one sharp idea you can demo end-to-end before the judging bell.',
    buildFirst: 'Single-screen demo with mocked data and one real AI call.',
    futureUpgrades: ['Auth', 'Payments', 'Mobile PWA'],
    suggestedTools: ['Streamlit', 'Replit', 'OpenAI'],
    domain: 'Not sure yet',
  },
]

const interestToProjectIds: Record<BuildInterest, string[]> = {
  'Generative AI': ['resume-analyzer', 'study-buddy', 'ai-portfolio'],
  'Computer Vision': ['defect-detector', 'attendance-cv'],
  NLP: ['sentiment-reviews', 'doc-qa'],
  'Data / Analytics': ['energy-dashboard', 'placement-tracker'],
  'AI + Web': ['ai-portfolio', 'study-buddy'],
  Automation: ['workflow-copilot', 'placement-tracker'],
  'Not sure yet': ['hackathon-mvp', 'study-buddy', 'ai-portfolio'],
}

const goalBoost: Partial<Record<BuildGoal, string[]>> = {
  'Placement preparation': ['resume-analyzer', 'placement-tracker'],
  Resume: ['ai-portfolio', 'resume-analyzer'],
  'Final-year project': ['doc-qa', 'defect-detector', 'energy-dashboard'],
  Hackathon: ['hackathon-mvp', 'study-buddy'],
  Learning: ['study-buddy', 'sentiment-reviews'],
  'Startup / product idea': ['doc-qa', 'workflow-copilot', 'ai-portfolio'],
}

function comfortAdjust(id: string, comfort: TechComfort): number {
  const hard = ['defect-detector', 'attendance-cv', 'doc-qa', 'energy-dashboard']
  const easy = ['hackathon-mvp', 'study-buddy', 'ai-portfolio', 'workflow-copilot']
  if (comfort === 'Beginner') return easy.includes(id) ? 2 : hard.includes(id) ? -2 : 0
  if (comfort === 'Advanced') return hard.includes(id) ? 2 : 0
  return 0
}

function timeAdjust(id: string, time: DiagnosticAnswers['time']): number {
  const quick = ['hackathon-mvp', 'study-buddy', 'ai-portfolio', 'workflow-copilot']
  const long = ['defect-detector', 'energy-dashboard', 'doc-qa']
  if (time === 'One hour' || time === 'Weekend') return quick.includes(id) ? 2 : long.includes(id) ? -1 : 0
  if (time === 'Several weeks') return long.includes(id) ? 2 : 0
  return 0
}

export function recommendProject(answers: DiagnosticAnswers): ProjectMatch {
  const candidates = interestToProjectIds[answers.interest]
  const scores = new Map<string, number>()

  for (const id of candidates) {
    scores.set(id, (scores.get(id) ?? 0) + 3)
  }
  for (const id of goalBoost[answers.goal] ?? []) {
    if (scores.has(id)) scores.set(id, (scores.get(id) ?? 0) + 2)
  }
  for (const [id] of scores) {
    scores.set(id, (scores.get(id) ?? 0) + comfortAdjust(id, answers.comfort) + timeAdjust(id, answers.time))
  }

  let bestId = candidates[0]
  let bestScore = -Infinity
  for (const [id, score] of scores) {
    if (score > bestScore) {
      bestScore = score
      bestId = id
    }
  }

  const project = projects.find((p) => p.id === bestId) ?? projects[0]
  return {
    ...project,
    fitScore: toFitScore(bestScore),
    whyMatch: buildWhyMatch(answers, project),
  }
}

/** Map internal ranking (typical 1–9) onto a student-facing 72–97% fit. */
function toFitScore(rawScore: number): number {
  const clamped = Math.max(0, Math.min(9, rawScore))
  return Math.round(72 + (clamped / 9) * 25)
}

function buildWhyMatch(
  answers: DiagnosticAnswers,
  project: Omit<ProjectMatch, 'whyMatch' | 'fitScore'>
): string {
  const parts = [
    `${project.name} fits your interest in ${answers.interest.toLowerCase()} and your ${answers.branch} background.`,
    answers.goal === 'Placement preparation' || answers.goal === 'Resume'
      ? 'It produces a tangible demo you can walk through in interviews.'
      : answers.goal === 'Final-year project'
        ? 'The scope can grow into a full semester project with clear milestones.'
        : answers.goal === 'Hackathon'
          ? 'You can ship a working MVP within a hackathon window.'
          : 'It balances learning depth with something you can actually finish.',
    answers.comfort === 'Beginner'
      ? 'We kept the stack approachable so you are not fighting tooling on day one.'
      : answers.comfort === 'Advanced'
        ? 'There is room to go deep on model quality and deployment.'
        : 'The workshop meets you at intermediate pace with stretch goals.',
    answers.time === 'One hour'
      ? 'The 60-minute workshop targets exactly the first slice listed below.'
      : `With ${answers.time.toLowerCase()} available, the upgrade path below is realistic.`,
  ]
  return parts.join(' ')
}

export function getProjectById(id: string): ProjectMatch | undefined {
  const base = projects.find((p) => p.id === id)
  if (!base) return undefined
  return { ...base, whyMatch: '', fitScore: 80 }
}

export { projects }
