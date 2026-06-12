import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import SplashScreen from '@/components/shared/SplashScreen';

import ScrollToTop from '@/components/shared/ScrollToTop';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import Admissions from '@/pages/Admissions';
import Contact from '@/pages/Contact';
import Gallery from '@/pages/Gallery';
import NoticeBoard from '@/pages/NoticeBoard';
import Login from '@/pages/Login';
import Chatbot from '@/components/shared/Chatbot';

import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import DashboardHome from '@/pages/DashboardHome';
import AchievementManagement from '@/pages/AchievementManagement';
import NoticeManagement from '@/pages/NoticeManagement';
import AnnouncementManagement from '@/pages/AnnouncementManagement';
import { Toaster } from 'react-hot-toast';

/* Layout wrapper for public pages (Navbar + Footer + ChatBot) */
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
    <Chatbot />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <SplashScreen />
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* ─── Admin Routes (must be BEFORE the catch-all) ─── */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="achievements" element={<AchievementManagement />} />
              <Route path="notices" element={<NoticeManagement />} />
              <Route path="announcements" element={<AnnouncementManagement />} />
              {/* Catch unknown dashboard sub-routes → redirect to dashboard home */}
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* ─── Public Routes (with Navbar/Footer layout) ─── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/admissions" element={<PublicLayout><Admissions /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/notices" element={<PublicLayout><NoticeBoard /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />

            {/* ─── 404 Catch-All ─── */}
            <Route path="*" element={
              <PublicLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-6xl font-black text-[#7B0D1E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>404</h1>
                  <p className="text-neutral-500 text-lg mb-8">The page you're looking for doesn't exist.</p>
                  <Link to="/" className="px-8 py-3 text-white font-bold rounded-full transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}>
                    Go Home
                  </Link>
                </div>
              </PublicLayout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
