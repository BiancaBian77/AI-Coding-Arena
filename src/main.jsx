import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import CandidateLogin from './pages/CandidateLogin'
import CandidateTest from './pages/CandidateTest'
import InterviewerDashboard from './pages/InterviewerDashboard'
import CandidateDetail from './pages/CandidateDetail'
import AdminDashboard from './pages/AdminDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Candidate */}
        <Route path="/login" element={<CandidateLogin />} />
        <Route path="/test" element={<CandidateTest />} />

        {/* Interviewer */}
        <Route path="/interviewer" element={<InterviewerDashboard />} />
        <Route path="/interviewer/candidate/:id" element={<CandidateDetail />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
