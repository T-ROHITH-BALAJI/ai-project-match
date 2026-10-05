import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RequireAdmin } from './components/RequireAdmin'
import { AdminLogin } from './pages/AdminLogin'
import { AdminWorkspace } from './pages/AdminWorkspace'
import { Agent } from './pages/Agent'
import { Analytics } from './pages/Analytics'
import { Attendance } from './pages/Attendance'
import { Confirmation } from './pages/Confirmation'
import { Diagnostic } from './pages/Diagnostic'
import { Landing } from './pages/Landing'
import { Register } from './pages/Register'
import { Reminders } from './pages/Reminders'
import { Result } from './pages/Result'
import { Roadmap } from './pages/Roadmap'
import { Plan } from './pages/Plan'
import { StarterKit } from './pages/StarterKit'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/result" element={<Result />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/starter-kit" element={<StarterKit />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminWorkspace />
            </RequireAdmin>
          }
        />
        <Route
          path="/plan"
          element={
            <RequireAdmin>
              <Plan />
            </RequireAdmin>
          }
        />
        <Route
          path="/analytics"
          element={
            <RequireAdmin>
              <Analytics />
            </RequireAdmin>
          }
        />
        <Route
          path="/agent"
          element={
            <RequireAdmin>
              <Agent />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
