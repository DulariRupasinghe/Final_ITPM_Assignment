import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Registration from './components/registration/Registration';
import Program from './components/program/Program';
import Details from './components/program/Details';
import Payment from './components/payment/Payment';
import Login from './components/auth/Login';
import StudentProfile from './components/student/StudentProfile';
import Contact from './components/contact/Contact';
import StudentLife from './components/studentlife/StudentLife';
import Admission from './components/admission/Admission';
import Dashboard from './pages/Dashboard';
import AdminConsole from './components/dashboard/Dashboard';
import QRScanner from './pages/QRScanner';
import AttendancePage from './pages/AttendancePage';
import CreateSession from './pages/CreateSession';
import Feedback from './pages/Feedback';
import FeedbackView from './pages/FeedbackView';
import Reports from './pages/Reports';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/programs" element={<Program />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/admissions" element={<Admission />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-console" element={<AdminConsole />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/attendance/:sessionId" element={<AttendancePage />} />
          <Route path="/create-session" element={<CreateSession />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback-view" element={<FeedbackView />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;