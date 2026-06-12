import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { toast } from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, X, FileText, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [pdfFile, setPdfFile] = useState(null);

  const fetchNotices = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/notices`);
      setNotices(data);
    } catch (err) {
      toast.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${adminInfo.token}`
      }
    };

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    if (pdfFile) data.append('file', pdfFile);

    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/api/notices/${editId}`, data, config);
        toast.success('Notice updated!');
      } else {
        await axios.post(`${API_BASE_URL}/api/notices`, data, config);
        toast.success('Notice added!');
      }
      setIsModalOpen(false);
      setFormData({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
      setPdfFile(null);
      setEditId(null);
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async () => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    try {
      await axios.delete(`${API_BASE_URL}/api/notices/${deleteId}`, {
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
      toast.success('Notice removed');
      setIsDeleting(false);
      fetchNotices();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input type="text" placeholder="Search notices..." className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#E85A1B]/20 transition-all text-sm" />
        </div>
        <button onClick={() => { setIsModalOpen(true); setEditId(null); }} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#7B0D1E] text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#7B0D1E]/20 text-sm">
          <Plus size={18} /> Add Notice
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50 border-b border-neutral-100">
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Notice Details</th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <tr key={i}><td colSpan="3" className="px-6 py-8 animate-pulse bg-neutral-50/20"></td></tr>
              ))
            ) : notices.map((notice) => (
              <tr key={notice._id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-orange-50 text-[#E85A1B]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#7B0D1E] mb-1">{notice.title}</h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 max-w-md">{notice.description}</p>
                      {notice.file && (
                        <a href={notice.file} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#E85A1B] mt-2 uppercase tracking-tight hover:underline">
                          <ExternalLink size={10} /> View Attached PDF
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-neutral-500 font-medium">
                  {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setEditId(notice._id); setFormData({ title: notice.title, description: notice.description, date: notice.date.split('T')[0] }); setIsModalOpen(true); }} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => { setDeleteId(notice._id); setIsDeleting(true); }} className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 p-8">
              <h2 className="text-2xl font-black text-[#7B0D1E] mb-8">{editId ? 'Edit Notice' : 'Add New Notice'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Description</label>
                  <textarea rows="3" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Date</label>
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase ml-1">PDF File</label>
                    <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="w-full text-xs file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-[#E85A1B] hover:file:bg-orange-100 cursor-pointer" />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-3 rounded-2xl font-bold text-neutral-500 border border-neutral-100">Cancel</button>
                  <button type="submit" className="flex-grow py-3 rounded-2xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}>{editId ? 'Update' : 'Publish'}</button>
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
              <h3 className="text-xl font-black text-[#7B0D1E] mb-2">Delete Notice?</h3>
              <p className="text-sm text-neutral-500 mb-8">This will permanently remove the notice and its attachment.</p>
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

export default NoticeManagement;
