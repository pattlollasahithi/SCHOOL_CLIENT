import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { FileText, Download, Calendar, ExternalLink, Search } from 'lucide-react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/notices`);
        setNotices(data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDF2F0] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-[#E85A1B] text-[10px] font-bold uppercase tracking-widest mb-4">
            Official Bulletin
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#7B0D1E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Notice Board
          </h1>
          <div className="w-20 h-1 bg-[#E85A1B] mx-auto rounded-full" />
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for notices, dates, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-pink-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#E85A1B]/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* Notices List */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-white/50 rounded-3xl animate-pulse border border-white" />
            ))
          ) : filteredNotices.length > 0 ? (
            filteredNotices.map((notice, i) => (
              <motion.div
                key={notice._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#E85A1B] flex items-center justify-center shrink-0 shadow-inner">
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={12} /> {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#7B0D1E] mb-2">{notice.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">{notice.description}</p>
                  </div>
                </div>

                {notice.file && (
                  <a 
                    href={notice.file} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7B0D1E] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#7B0D1E]/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Download size={14} /> Download PDF
                  </a>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-400 italic">No notices found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
