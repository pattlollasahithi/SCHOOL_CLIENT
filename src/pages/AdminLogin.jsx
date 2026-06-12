import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(schoolId, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF2F0] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-pink-100">
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-2xl bg-orange-50 mb-4 text-[#E85A1B]">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-[#7B0D1E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Portal
            </h1>
            <p className="text-neutral-500 mt-2 text-sm uppercase tracking-widest font-bold">
              Shrradha High School
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B0D1E] uppercase tracking-wider ml-1">Admin ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-[#E85A1B]/20 focus:border-[#E85A1B] transition-all outline-none text-sm"
                  placeholder="Enter your School ID"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7B0D1E] uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-[#E85A1B]/20 focus:border-[#E85A1B] transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-[#E85A1B] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7B0D1E] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#7B0D1E]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
              style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-neutral-400 text-xs mt-8">
          &copy; 2026 SHRRADHA HIGH SCHOOL · Authorized Personnel Only
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
