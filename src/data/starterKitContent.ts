export const starterKit = {
  ebook: {
    title: '10 AI Projects Engineering Students Can Actually Build',
    sections: [
      {
        project: 'AI Resume Analyzer',
        problem: 'Students struggle to tailor resumes to job descriptions.',
        difficulty: 'Beginner+',
        stack: 'React + FastAPI + LLM',
        dataset: 'Sample resumes (PDF); optional job posts as text',
        ai: 'LLM extraction + gap analysis',
        start: 'Single-file upload → JSON skills report',
        resume: 'Demo in placement prep interviews',
        extensions: 'ATS scoring, multi-role templates',
      },
      {
        project: 'Campus Q&A Bot',
        problem: 'Handbooks are long and hard to search.',
        difficulty: 'Intermediate',
        stack: 'LangChain + vector DB + React',
        dataset: 'College PDFs / markdown docs',
        ai: 'RAG with citations',
        start: 'One document, five test questions',
        resume: 'Shows full-stack + responsible AI',
        extensions: 'Auth, WhatsApp interface',
      },
      {
        project: 'Visual Defect Detector',
        problem: 'Manual quality checks are slow.',
        difficulty: 'Intermediate',
        stack: 'Python + OpenCV + TFLite',
        dataset: 'Roboflow public defect sets',
        ai: 'Image classification',
        start: 'Good vs bad binary classifier',
        resume: 'Manufacturing / IoT talking point',
        extensions: 'Edge deploy on Pi',
      },
      {
        project: 'AI-Powered Portfolio Site',
        problem: 'Static portfolios do not answer recruiter questions.',
        difficulty: 'Beginner',
        stack: 'React + Tailwind + OpenAI',
        dataset: 'Your own project blurbs',
        ai: 'Constrained Q&A over your work',
        start: 'Chat widget on a one-page site',
        resume: 'Live link on the resume header',
        extensions: 'Analytics, custom domain',
      },
    ],
  },
  toolsGuide: {
    title: 'AI Tools Worth Knowing Right Now',
    intro:
      'Each group is organized by the job it does — not a dump of logos. Pick one tool per job for your project week.',
    categories: [
      {
        useCase: 'Coding',
        solves: 'Write, navigate, and repair code faster without skipping the learning.',
        tools: [
          { name: 'GitHub Copilot', problem: 'Speeds up boilerplate and tests while you still read the diff.' },
          { name: 'Cursor', problem: 'Helps you move through an unfamiliar repo and refactor with context.' },
        ],
      },
      {
        useCase: 'Research',
        solves: 'Find papers, docs, and prior art without a 40-tab rabbit hole.',
        tools: [
          { name: 'Semantic Scholar', problem: 'Surfaces relevant papers instead of generic web results.' },
          { name: 'Elicit', problem: 'Drafts literature notes you can verify against the source PDF.' },
        ],
      },
      {
        useCase: 'Development',
        solves: 'Host, ship, and iterate on a demo that someone else can click.',
        tools: [
          { name: 'Vercel / Netlify', problem: 'Gets a frontend URL in minutes for resume and WhatsApp shares.' },
          { name: 'Render / Railway', problem: 'Hosts a small API with env secrets when Streamlit is not enough.' },
        ],
      },
      {
        useCase: 'Design',
        solves: 'Make the first version look intentional so the AI work is not hidden by a rough UI.',
        tools: [
          { name: 'Figma', problem: 'Sketch a one-screen flow before you fight CSS.' },
          { name: 'v0 / Midjourney (sparingly)', problem: 'Explore layout or hero direction — then rebuild in your stack.' },
        ],
      },
      {
        useCase: 'Automation',
        solves: 'Connect tools so reminders, sheets, and follow-ups do not depend on you remembering.',
        tools: [
          { name: 'n8n', problem: 'Self-hostable workflows when you outgrow one-off scripts.' },
          { name: 'Make', problem: 'Visual flows teammates can read without opening your Python file.' },
        ],
      },
      {
        useCase: 'Productivity',
        solves: 'Keep the project moving in short, honest time boxes.',
        tools: [
          { name: 'Notion / Obsidian', problem: 'One place for decisions, prompts, and interview talking points.' },
          { name: 'Google Calendar', problem: 'Protects the 60-minute workshop and the five follow-up days.' },
        ],
      },
      {
        useCase: 'AI / LLM development',
        solves: 'Call models, retrieve context, and evaluate answers without training from scratch.',
        tools: [
          { name: 'OpenAI / Gemini APIs', problem: 'A first working completion or chat in the workshop hour.' },
          { name: 'Hugging Face', problem: 'Models and datasets when you need something more specific than a chat API.' },
          { name: 'LangChain / Vercel AI SDK', problem: 'Compose memory, tools, and streaming without a custom framework.' },
        ],
      },
    ],
  },
  checklist: {
    title: 'Project Continuation Checklist',
    items: [
      { step: 'What to build next', detail: 'Add one user-facing feature from your “future upgrades” list.' },
      { step: 'What to learn next', detail: 'Pick one gap (deploy, tests, or metrics) and block 2 hours on it.' },
      { step: 'Improve the project', detail: 'Add error handling, loading states, and a README screenshot.' },
      { step: 'Deploy it', detail: 'Frontend on Vercel/Netlify; API on Render/Railway with env secrets.' },
      { step: 'GitHub', detail: 'Pin repo, write a 3-line pitch in the README, tag release v0.1.' },
      { step: 'Resume', detail: 'Use action verbs + metric or demo link; tie to your branch/goal.' },
    ],
  },
  promptPack: {
    title: 'AI Project Prompt Pack',
    prompts: [
      { category: 'Planning', text: 'Break this AI project into 5 milestones for a [timeframe] schedule: [project idea]' },
      { category: 'Debugging', text: 'Here is my error and stack trace. Suggest the 3 most likely causes and fixes: ...' },
      { category: 'Research', text: 'List 5 open datasets/APIs suitable for [domain] with license notes.' },
      { category: 'Documentation', text: 'Write a README section: problem, approach, stack, how to run locally.' },
      { category: 'Testing', text: 'Generate edge-case test inputs for [feature] including failure modes.' },
      { category: 'Improvement', text: 'Suggest 3 measurable upgrades that would impress a placement interviewer.' },
    ],
  },
}
