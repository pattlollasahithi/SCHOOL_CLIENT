import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, 
  Bell, 
  Megaphone, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Achievements', path: '/admin/dashboard/achievements', icon: Trophy },
    { name: 'Notices', path: '/admin/dashboard/notices', icon: Bell },
    { name: 'Announcements', path: '/admin/dashboard/announcements', icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-neutral-100 flex flex-col z-50 h-screen sticky top-0"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-neutral-100 overflow-hidden">
            <img 
              src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png" 
              alt="Shrradha Logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden whitespace-nowrap">
              <h2 className="font-black text-[#7B0D1E] text-sm tracking-tight leading-none">SHRRADHA</h2>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-grow mt-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-orange-50 text-[#E85A1B] font-bold shadow-sm border border-orange-100' 
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#E85A1B]' : 'group-hover:scale-110 transition-transform'} />
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm">
                    {item.name}
                  </motion.span>
                )}
                {isActive && isSidebarOpen && (
                  <motion.div layoutId="nav-dot" className="ml-auto">
                    <ChevronRight size={14} />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-neutral-100 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <Menu size={20} className="text-neutral-600" />
            </button>
            <h2 className="text-lg font-bold text-neutral-800">
              {navItems.find(i => i.path === location.pathname)?.name || 'Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#7B0D1E]">{user?.name}</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white shadow-sm overflow-hidden">
              <img src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name} alt="avatar" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-grow overflow-y-auto p-8 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
