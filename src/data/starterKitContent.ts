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
    ],
  },
  toolsGuide: {
    title: 'AI Tools Every Engineering Student Should Know',
    categories: [
      {
        useCase: 'Coding',
        tools: [
          { name: 'GitHub Copilot', problem: 'Speed up boilerplate and tests while you learn patterns.' },
          { name: 'Cursor', problem: 'Navigate unfamiliar codebases and refactor safely.' },
        ],
      },
      {
        useCase: 'Research',
        tools: [
          { name: 'Semantic Scholar', problem: 'Find papers without drowning in irrelevant hits.' },
          { name: 'Elicit', problem: 'Summarize literature for lit-review sections.' },
        ],
      },
      {
        useCase: 'Learning',
        tools: [
          { name: 'Kaggle Learn', problem: 'Structured micro-courses with notebooks.' },
          { name: 'DeepLearning.AI', problem: 'Short courses aligned to industry stacks.' },
        ],
      },
      {
        useCase: 'AI development',
        tools: [
          { name: 'Hugging Face', problem: 'Access models and datasets without training from scratch.' },
          { name: 'LangChain', problem: 'Compose LLM apps with memory, tools, and retrieval.' },
        ],
      },
      {
        useCase: 'Automation',
        tools: [
          { name: 'n8n', problem: 'Connect APIs when you outgrow one-off scripts.' },
          { name: 'Make', problem: 'Visual workflows for non-engineer teammates.' },
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
