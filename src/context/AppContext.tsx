import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'
import { recommendProject } from '../data/projects'
import { getDisplayAnalytics, loadAnalytics, trackEvent } from '../lib/analytics'
import {
  type CampaignAttribution,
  resolveAttribution,
} from '../lib/campaignAttribution'
import { trackCampaign } from '../lib/campaignAnalytics'
import { SESSION_KEY, VISITOR_KEY, loadJson, saveJson } from '../lib/storage'
import type {
  AnalyticsState,
  DiagnosticAnswers,
  RegistrationData,
  UserSession,
} from '../types'

const defaultSession: UserSession = {
  answers: null,
  project: null,
  registration: null,
  registeredAt: null,
  attended: null,
  workshopDay: false,
  workshopCompleted: false,
  starterKitUnlocked: false,
  kitDownloads: {
    ebook: false,
    toolsGuide: false,
    checklist: false,
    promptPack: false,
  },
  referralSource: null,
  myReferralCode: null,
}

function makeReferralCode(name: string): string {
  const base =
    name
      .trim()
      .split(/\s+/)[0]
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'student'
  return `${base}-${Math.random().toString(36).slice(2, 6)}`
}

function createGuestReferralCode(): string {
  return `guest-${Math.random().toString(36).slice(2, 8)}`
}

interface AppContextValue {
  session: UserSession
  attribution: CampaignAttribution
  analytics: AnalyticsState
  displayAnalytics: AnalyticsState
  setAnswers: (answers: DiagnosticAnswers) => void
  register: (data: RegistrationData) => void
  setAttended: (attended: boolean) => void
  startWorkshopDay: () => void
  completeWorkshop: () => void
  markKitDownload: (key: keyof UserSession['kitDownloads']) => void
  refreshAnalytics: () => void
  resetDemo: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

function persistSession(session: UserSession): void {
  saveJson(SESSION_KEY, session)
}

/** Every visitor gets a stable ref code for sharing (upgraded to name-based after register). */
function hydrateSession(raw: UserSession): UserSession {
  const next: UserSession = {
    ...defaultSession,
    ...raw,
    kitDownloads: { ...defaultSession.kitDownloads, ...raw.kitDownloads },
    workshopDay: raw.workshopDay ?? raw.attended === true,
    workshopCompleted: raw.workshopCompleted ?? raw.starterKitUnlocked ?? false,
    project: raw.project
      ? { ...raw.project, fitScore: raw.project.fitScore ?? 86 }
      : null,
    myReferralCode: raw.myReferralCode ?? createGuestReferralCode(),
  }
  persistSession(next)
  return next
}

export function AppProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [session, setSession] = useState<UserSession>(() =>
    hydrateSession(loadJson(SESSION_KEY, defaultSession))
  )
  const [analytics, setAnalytics] = useState<AnalyticsState>(() => loadAnalytics())
  const [attribution, setAttribution] = useState<CampaignAttribution>(() =>
    resolveAttribution(window.location.search)
  )

  const displayAnalytics = useMemo(() => getDisplayAnalytics(analytics), [analytics])

  const refreshAnalytics = useCallback(() => {
    setAnalytics(loadAnalytics())
  }, [])

  useEffect(() => {
    const attr = resolveAttribution(location.search)
    setAttribution(attr)

    if (attr.referralCode && attr.referralCode !== session.referralSource) {
      trackEvent('referral_visit')
      setSession((s) => {
        const next = { ...s, referralSource: attr.referralCode }
        persistSession(next)
        return next
      })
      refreshAnalytics()
    }

    if (!sessionStorage.getItem(VISITOR_KEY)) {
      sessionStorage.setItem(VISITOR_KEY, '1')
      trackEvent('visitor')
      trackCampaign(attr.channel, attr.messageVariant, 'visitors')
      refreshAnalytics()
    }
  }, [location.search, refreshAnalytics, session.referralSource])

  const setAnswers = useCallback(
    (answers: DiagnosticAnswers) => {
      const project = recommendProject(answers)
      setSession((s) => {
        const next: UserSession = { ...s, answers, project }
        persistSession(next)
        return next
      })
      trackEvent('diagnostic_complete')
      trackEvent('project_recommendation')
      refreshAnalytics()
    },
    [refreshAnalytics]
  )

  const register = useCallback(
    (data: RegistrationData) => {
      const code = makeReferralCode(data.name)
      setSession((s) => {
        const next: UserSession = {
          ...s,
          registration: data,
          registeredAt: new Date().toISOString(),
          myReferralCode: code,
        }
        persistSession(next)
        return next
      })
      trackEvent('registration')
      trackCampaign(attribution.channel, attribution.messageVariant, 'registrations')
      if (session.referralSource) {
        trackEvent('referral_registration')
      }
      refreshAnalytics()
    },
    [refreshAnalytics, session.referralSource, attribution]
  )

  const setAttended = useCallback(
    (attended: boolean) => {
      setSession((s) => {
        const next: UserSession = {
          ...s,
          attended,
          workshopCompleted: attended ? s.workshopCompleted : false,
          starterKitUnlocked: attended ? s.starterKitUnlocked : false,
        }
        persistSession(next)
        return next
      })
      if (attended) {
        trackEvent('attendance_confirmed')
      }
      refreshAnalytics()
    },
    [refreshAnalytics]
  )

  const startWorkshopDay = useCallback(() => {
    const alreadyCounted = session.attended === true
    setSession((s) => {
      const next: UserSession = { ...s, workshopDay: true, attended: true }
      persistSession(next)
      return next
    })
    if (!alreadyCounted) {
      trackEvent('attendance_confirmed')
      refreshAnalytics()
    }
  }, [refreshAnalytics, session.attended])

  const completeWorkshop = useCallback(() => {
    setSession((s) => {
      const next: UserSession = {
        ...s,
        workshopDay: true,
        attended: true,
        workshopCompleted: true,
        starterKitUnlocked: true,
      }
      persistSession(next)
      return next
    })
    if (!session.attended) {
      trackEvent('attendance_confirmed')
    }
    if (!session.starterKitUnlocked) {
      trackEvent('starter_kit_view')
    }
    refreshAnalytics()
  }, [refreshAnalytics, session.attended, session.starterKitUnlocked])

  const markKitDownload = useCallback(
    (key: keyof UserSession['kitDownloads']) => {
      setSession((s) => {
        const next: UserSession = {
          ...s,
          kitDownloads: { ...s.kitDownloads, [key]: true },
        }
        persistSession(next)
        return next
      })
      const map = {
        ebook: 'ebook_download',
        toolsGuide: 'tools_guide_open',
        checklist: 'checklist_open',
        promptPack: 'prompt_pack_open',
      } as const
      trackEvent(map[key])
      refreshAnalytics()
    },
    [refreshAnalytics]
  )

  const resetDemo = useCallback(() => {
    saveJson(SESSION_KEY, defaultSession)
    setSession(defaultSession)
    sessionStorage.removeItem(VISITOR_KEY)
  }, [])

  const value = useMemo(
    () => ({
      session,
      attribution,
      analytics,
      displayAnalytics,
      setAnswers,
      register,
      setAttended,
      startWorkshopDay,
      completeWorkshop,
      markKitDownload,
      refreshAnalytics,
      resetDemo,
    }),
    [
      session,
      attribution,
      analytics,
      displayAnalytics,
      setAnswers,
      register,
      startWorkshopDay,
      completeWorkshop,
      setAttended,
      markKitDownload,
      refreshAnalytics,
      resetDemo,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function startDiagnosticTracking(): void {
  trackEvent('diagnostic_start')
  const attr = resolveAttribution(window.location.search)
  trackCampaign(attr.channel, attr.messageVariant, 'diagnosticStarts')
}

export function startRegistrationTracking(): void {
  trackEvent('registration_start')
}
