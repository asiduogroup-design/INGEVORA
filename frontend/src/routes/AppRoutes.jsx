import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Software } from '../pages/Software/Software'
import { Electrical } from '../pages/Electrical/Electrical'
import { About } from '../pages/About/About'
import { AIUpdates } from '../pages/AI/AIUpdates'
import { Pricing } from '../pages/Pricing/Pricing'
import { Contact } from '../pages/Contact/Contact'
import { Login } from '../pages/Auth/Login'
import { Register } from '../pages/Auth/Register'
import { Profile } from '../pages/Profile/Profile'
import { ServiceRequest } from '../pages/ServiceRequest/ServiceRequest'
import { MyRequests } from '../pages/MyRequests/MyRequests'
import { PaymentSuccess } from '../pages/MyRequests/PaymentSuccess'
import { PaymentCancelled } from '../pages/MyRequests/PaymentCancelled'
import { NotFound } from '../pages/NotFound/NotFound'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/software" element={<Software />} />
      <Route path="/electrical" element={<Electrical />} />
      <Route path="/about" element={<About />} />
      <Route path="/ai-updates" element={<AIUpdates />} />
      <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/service-request" element={<ProtectedRoute><ServiceRequest /></ProtectedRoute>} />
      <Route path="/my-requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
      <Route path="/payments/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
      <Route path="/payments/cancel" element={<ProtectedRoute><PaymentCancelled /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
