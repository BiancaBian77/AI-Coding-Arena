import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import CandidateLogin from './pages/CandidateLogin'
import CandidateTest from './pages/CandidateTest'
import InterviewerDashboard from './pages/InterviewerDashboard'
import CandidateDetail from './pages/CandidateDetail'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Candidate */}
        <Route path="/login" element={<CandidateLogin />} />
        <Route path="/test" element={<CandidateTest />} />

        {/* Interviewer */}
        <Route path="/interviewer" element={<InterviewerDashboard />} />
        <Route path="/interviewer/candidate/:id" element={<CandidateDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
