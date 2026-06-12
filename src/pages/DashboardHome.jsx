import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Trophy, Bell, Megaphone, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    achievements: 0,
    notices: 0,
    announcements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ach, not, ann] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/achievements`),
          axios.get(`${API_BASE_URL}/api/notices`),
          axios.get(`${API_BASE_URL}/api/announcements`),
        ]);
        setStats({
          achievements: ach.data.length,
          notices: not.data.length,
          announcements: ann.data.length,
        });
      } catch (err) {
        console.error('Stats fetch failed');
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Achievements', value: stats.achievements, icon: Trophy, color: 'bg-orange-500', light: 'bg-orange-50' },
    { title: 'Active Notices', value: stats.notices, icon: Bell, color: 'bg-blue-500', light: 'bg-blue-50' },
    { title: 'Announcements', value: stats.announcements, icon: Megaphone, color: 'bg-pink-500', light: 'bg-pink-50' },
    { title: 'Registered Students', value: '1,240', icon: Users, color: 'bg-emerald-500', light: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#7B0D1E]" style={{ fontFamily: "'Playfair Display', serif" }}>Dashboard Overview</h1>
          <p className="text-neutral-500 text-sm mt-1">Welcome back to the SHRRADHA Admin Portal.</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-xl border border-neutral-100 text-xs font-bold text-neutral-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={card.title}
            className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className={`w-12 h-12 rounded-2xl ${card.light} flex items-center justify-center mb-6`}>
              <card.icon className={card.color.replace('bg-', 'text-')} size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-neutral-400 text-xs font-bold uppercase tracking-widest">{card.title}</h3>
              <p className="text-3xl font-black text-[#7B0D1E]">{card.value}</p>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-bold text-emerald-500 gap-1 uppercase tracking-tighter">
              <ArrowUpRight size={12} /> 12% increase this month
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${card.color} opacity-[0.03] group-hover:scale-150 transition-transform duration-700`} />
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-10 border border-neutral-100 shadow-sm text-center relative overflow-hidden">
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-[#7B0D1E] mb-4">Quick Management</h2>
          <p className="text-neutral-500 text-sm mb-8">Use the sidebar to manage school content. You can add new achievements, post official notices with PDF attachments, or broadcast announcements to the entire school.</p>
          <div className="flex flex-wrap justify-center gap-3">
             <button className="px-6 py-2.5 rounded-xl bg-orange-50 text-[#E85A1B] text-xs font-bold uppercase tracking-widest hover:bg-orange-100 transition-colors">Post News</button>
             <button className="px-6 py-2.5 rounded-xl bg-pink-50 text-[#7B0D1E] text-xs font-bold uppercase tracking-widest hover:bg-pink-100 transition-colors">Broadcast Alert</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full -ml-32 -mb-32 opacity-50" />
      </div>
    </div>
  );
};

export default DashboardHome;
