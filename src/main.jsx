import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import CandidateLogin from './pages/CandidateLogin'
import CandidateTest from './pages/CandidateTest'
import TestPrepare from './pages/TestPrepare'
import InterviewerDashboard from './pages/InterviewerDashboard'
import CandidateList from './pages/CandidateList'
import CandidateDetail from './pages/CandidateDetail'
import PositionManagement from './pages/PositionManagement'
import TestDesigner from './pages/TestDesigner'
import InviteCandidates from './pages/InviteCandidates'
import Analytics from './pages/Analytics'
import InterviewerSettings from './pages/InterviewerSettings'
import AdminDashboard from './pages/AdminDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Candidate */}
        <Route path="/login" element={<CandidateLogin />} />
        <Route path="/test/prepare" element={<TestPrepare />} />
        <Route path="/test" element={<CandidateTest />} />

        {/* Interviewer */}
        <Route path="/interviewer" element={<InterviewerDashboard />} />
        <Route path="/interviewer/candidates" element={<CandidateList />} />
        <Route path="/interviewer/candidate/:id" element={<CandidateDetail />} />
        <Route path="/interviewer/positions" element={<PositionManagement />} />
        <Route path="/interviewer/test-design" element={<TestDesigner />} />
        <Route path="/interviewer/position/:id/test-design" element={<TestDesigner />} />
        <Route path="/interviewer/positions/:id/invite" element={<InviteCandidates />} />
        <Route path="/interviewer/analytics" element={<Analytics />} />
        <Route path="/interviewer/settings" element={<InterviewerSettings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
