import type { DiagnosticAnswers, ProjectMatch } from '../types'

export interface RoadmapStep {
  title: string
  detail: string
}

export interface RoadmapDay extends RoadmapStep {
  day: number
}

export interface ProjectRoadmap {
  projectName: string
  stack: string
  before: RoadmapStep[]
  during: RoadmapStep[]
  after: RoadmapDay[]
}

export function buildProjectRoadmap(
  project: ProjectMatch | null,
  answers: DiagnosticAnswers | null
): ProjectRoadmap {
  const projectName = project?.name ?? 'Your first AI project'
  const stack = project?.stack ?? 'A beginner-friendly AI stack chosen in the workshop'
  const upgrades = project?.futureUpgrades ?? []

  return {
    projectName,
    stack,
    before: [
      {
        title: 'Know the project goal',
        detail: project
          ? project.description
          : 'Arrive knowing the problem you want the first version to solve.',
      },
      {
        title: 'Prepare required tools',
        detail: `Have a laptop ready. Suggested stack: ${stack}. A free GitHub account and a modern browser are enough for the first hour.`,
      },
    ],
    during: [
      {
        title: 'Project setup',
        detail: 'Scaffold the repo, connect the starter files, and confirm the environment runs.',
      },
      {
        title: 'AI integration',
        detail: 'Wire the first AI call so the product does something useful, not just a static UI.',
      },
      {
        title: 'Build the first working version',
        detail: project?.buildFirst ?? 'Leave with a demo you can click through and keep improving.',
      },
    ],
    after: [
      {
        day: 1,
        title: 'Improve the UI',
        detail: 'Tighten layout, empty states, and a one-line pitch so the demo looks resume-ready.',
      },
      {
        day: 2,
        title: upgrades[0] ? `Add AI functionality — ${upgrades[0]}` : 'Add AI functionality',
        detail: 'Deepen the core AI feature so it is more than a thin wrapper.',
      },
      {
        day: 3,
        title: upgrades[1] ? `Testing — ${upgrades[1]}` : 'Testing',
        detail: 'Cover happy path plus two failure cases. Note what the model gets wrong.',
      },
      {
        day: 4,
        title: 'Deployment',
        detail:
          answers?.time === 'One hour' || answers?.time === 'Weekend'
            ? 'Ship a hosted demo (Vercel / Streamlit / Render) so you have a live link.'
            : 'Deploy frontend and API separately with environment secrets documented.',
      },
      {
        day: 5,
        title: 'GitHub + documentation',
        detail: 'Pin the repo, write a 6-line README, and capture a screenshot for your resume.',
      },
    ],
  }
}
