import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, X, Megaphone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchAnnouncements = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/announcements');
      setAnnouncements(data);
    } catch (err) {
      toast.error('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` }
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/announcements/${editId}`, formData, config);
        toast.success('Announcement updated!');
      } else {
        await axios.post('http://localhost:5000/api/announcements', formData, config);
        toast.success('Announcement posted!');
      }
      setIsModalOpen(false);
      setFormData({ title: '', message: '', date: new Date().toISOString().split('T')[0] });
      setEditId(null);
      fetchAnnouncements();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async () => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${deleteId}`, {
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
      toast.success('Deleted');
      setIsDeleting(false);
      fetchAnnouncements();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input type="text" placeholder="Search announcements..." className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm" />
        </div>
        <button onClick={() => { setIsModalOpen(true); setEditId(null); }} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#7B0D1E] text-white rounded-2xl font-bold shadow-lg shadow-[#7B0D1E]/20 text-sm">
          <Plus size={18} /> New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse" />)
        ) : announcements.map((ann) => (
          <motion.div layout key={ann._id} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-start justify-between gap-6 group">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#7B0D1E] flex items-center justify-center shrink-0">
                <Megaphone size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-[#7B0D1E]">{ann.title}</h3>
                  <span className="text-[10px] font-black bg-neutral-100 px-2 py-0.5 rounded text-neutral-500 uppercase">
                    {new Date(ann.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed">{ann.message}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditId(ann._id); setFormData({ title: ann.title, message: ann.message, date: ann.date.split('T')[0] }); setIsModalOpen(true); }} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 size={18} /></button>
              <button onClick={() => { setDeleteId(ann._id); setIsDeleting(true); }} className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={18} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 p-8">
              <h2 className="text-2xl font-black text-[#7B0D1E] mb-8">{editId ? 'Edit Announcement' : 'New Announcement'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Headline</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm" placeholder="e.g. School Reopening" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Message</label>
                  <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm resize-none" placeholder="Write your announcement here..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Publish Date</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-3 rounded-2xl font-bold text-neutral-500 border border-neutral-100">Cancel</button>
                  <button type="submit" className="flex-grow py-3 rounded-2xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}>Post Now</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Delete Confirmation */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleting(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white max-w-sm w-full p-8 rounded-3xl relative z-10 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
                <Trash2 size={28} />
              </div>
              <h3 className="text-xl font-black text-[#7B0D1E] mb-2">Delete Announcement?</h3>
              <p className="text-sm text-neutral-500 mb-8">Are you sure you want to remove this announcement? This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleting(false)} className="flex-grow py-3 rounded-2xl font-bold text-neutral-500 border border-neutral-100">Cancel</button>
                <button onClick={handleDelete} className="flex-grow py-3 rounded-2xl font-bold text-white bg-red-500 shadow-lg">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementManagement;
