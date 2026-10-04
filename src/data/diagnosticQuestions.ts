import type { Branch, BuildGoal, BuildInterest, TechComfort, TimeCommitment } from '../types'

export const diagnosticQuestions = [
  {
    id: 'branch' as const,
    question: 'What is your engineering branch?',
    options: [
      'CSE',
      'AI / Data Science',
      'ECE',
      'EEE',
      'Mechanical',
      'Civil',
      'Other',
    ] satisfies Branch[],
  },
  {
    id: 'comfort' as const,
    question: 'How comfortable are you with technology?',
    options: ['Beginner', 'Intermediate', 'Advanced'] satisfies TechComfort[],
  },
  {
    id: 'interest' as const,
    question: 'What would you most like to build?',
    options: [
      'Generative AI',
      'Computer Vision',
      'NLP',
      'Data / Analytics',
      'AI + Web',
      'Automation',
      'Not sure yet',
    ] satisfies BuildInterest[],
  },
  {
    id: 'goal' as const,
    question: 'Why do you want to build an AI project?',
    options: [
      'Placement preparation',
      'Resume',
      'Final-year project',
      'Hackathon',
      'Learning',
      'Startup / product idea',
    ] satisfies BuildGoal[],
  },
  {
    id: 'time' as const,
    question: 'How much time can you realistically spend?',
    options: ['One hour', 'Weekend', 'One week', 'Several weeks'] satisfies TimeCommitment[],
  },
]
