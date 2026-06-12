import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import NoticeBoard from './pages/NoticeBoard';
import ChatBot from './components/ChatBot';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DashboardHome from './pages/DashboardHome';
import AchievementManagement from './pages/AchievementManagement';
import NoticeManagement from './pages/NoticeManagement';
import AnnouncementManagement from './pages/AnnouncementManagement';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <SplashScreen />
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/notices" element={<NoticeBoard />} />
                  </Routes>
                </main>
                <Footer />
                <ChatBot />
              </>
            } />

            {/* Admin Routes */}
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
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
