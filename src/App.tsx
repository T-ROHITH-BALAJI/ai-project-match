import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Analytics } from './pages/Analytics'
import { Attendance } from './pages/Attendance'
import { Confirmation } from './pages/Confirmation'
import { Diagnostic } from './pages/Diagnostic'
import { Landing } from './pages/Landing'
import { Register } from './pages/Register'
import { Reminders } from './pages/Reminders'
import { Result } from './pages/Result'
import { Plan } from './pages/Plan'
import { StarterKit } from './pages/StarterKit'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/result" element={<Result />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/starter-kit" element={<StarterKit />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
