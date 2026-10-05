export type Branch =
  | 'CSE'
  | 'AI / Data Science'
  | 'ECE'
  | 'EEE'
  | 'Mechanical'
  | 'Civil'
  | 'Other'

export type TechComfort = 'Beginner' | 'Intermediate' | 'Advanced'

export type BuildInterest =
  | 'Generative AI'
  | 'Computer Vision'
  | 'NLP'
  | 'Data / Analytics'
  | 'AI + Web'
  | 'Automation'
  | 'Not sure yet'

export type BuildGoal =
  | 'Placement preparation'
  | 'Resume'
  | 'Final-year project'
  | 'Hackathon'
  | 'Learning'
  | 'Startup / product idea'

export type TimeCommitment = 'One hour' | 'Weekend' | 'One week' | 'Several weeks'

export interface DiagnosticAnswers {
  branch: Branch
  comfort: TechComfort
  interest: BuildInterest
  goal: BuildGoal
  time: TimeCommitment
}

export interface ProjectMatch {
  id: string
  name: string
  difficulty: string
  careerValue: string
  stack: string
  description: string
  whyMatch: string
  buildFirst: string
  futureUpgrades: string[]
  suggestedTools: string[]
  domain: BuildInterest
  fitScore: number
}

export interface RegistrationData {
  name: string
  email: string
  phone: string
  college: string
  branch: string
  graduationYear: string
}

export interface UserSession {
  answers: DiagnosticAnswers | null
  project: ProjectMatch | null
  registration: RegistrationData | null
  registeredAt: string | null
  attended: boolean | null
  workshopDay: boolean
  workshopCompleted: boolean
  starterKitUnlocked: boolean
  kitDownloads: {
    ebook: boolean
    toolsGuide: boolean
    checklist: boolean
    promptPack: boolean
  }
  /** Friend's ref code on first visit (first-touch attribution). */
  referralSource: string | null
  /** This user's code for sharing after registration. */
  myReferralCode: string | null
}

export type AnalyticsEvent =
  | 'visitor'
  | 'diagnostic_start'
  | 'diagnostic_complete'
  | 'project_recommendation'
  | 'registration_start'
  | 'registration'
  | 'share_click'
  | 'referral_visit'
  | 'referral_registration'
  | 'attendance_confirmed'
  | 'starter_kit_view'
  | 'ebook_download'
  | 'tools_guide_open'
  | 'checklist_open'
  | 'prompt_pack_open'

export interface AnalyticsState {
  visitors: number
  diagnosticStarts: number
  diagnosticCompletions: number
  projectRecommendations: number
  registrationStarts: number
  registrations: number
  shareClicks: number
  referralVisits: number
  referralRegistrations: number
  attended: number
  starterKitViews: number
  ebookDownloads: number
  toolsGuideOpens: number
  checklistOpens: number
  promptPackOpens: number
  /** Demo seed blended with live counts for presentation */
  demoMode: boolean
}
