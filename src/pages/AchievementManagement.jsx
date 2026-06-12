import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Upload,
  Calendar,
  Image as ImageIcon,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementManagement = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/achievements`);
      setAchievements(data);
    } catch (err) {
      toast.error('Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
    setImageFile(null);
    setImagePreview('');
    setEditId(null);
  };

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
    if (imageFile) data.append('image', imageFile);

    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/api/achievements/${editId}`, data, config);
        toast.success('Achievement updated!');
      } else {
        await axios.post(`${API_BASE_URL}/api/achievements`, data, config);
        toast.success('Achievement added!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchAchievements();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async () => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` }
    };
    try {
      await axios.delete(`${API_BASE_URL}/api/achievements/${deleteId}`, config);
      toast.success('Deleted successfully');
      setDeleteId(null);
      setIsDeleting(false);
      fetchAchievements();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openEditModal = (ach) => {
    setEditId(ach._id);
    setFormData({
      title: ach.title,
      description: ach.description,
      date: ach.date.split('T')[0]
    });
    setImagePreview(ach.image);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search achievements..."
            className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#E85A1B]/20 transition-all text-sm"
          />
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#7B0D1E] text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#7B0D1E]/20 text-sm"
        >
          <Plus size={18} /> Add Achievement
        </button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-3xl animate-pulse" />
          ))
        ) : achievements.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="text-neutral-300 mb-4 flex justify-center">
              <Trophy size={64} />
            </div>
            <p className="text-neutral-400 font-medium">No achievements found. Add some to get started!</p>
          </div>
        ) : (
          achievements.map((ach) => (
            <motion.div
              layout
              key={ach._id}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="aspect-video relative overflow-hidden bg-neutral-100">
                <img src={ach.image} alt={ach.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(ach)}
                    className="p-2 rounded-full bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg backdrop-blur-md"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => { setDeleteId(ach._id); setIsDeleting(true); }}
                    className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-lg backdrop-blur-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase">
                    {new Date(ach.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-[#7B0D1E] mb-2 truncate">{ach.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">{ach.description}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="text-2xl font-black text-[#7B0D1E] flex items-center gap-2">
                  <Trophy className="text-[#E85A1B]" />
                  {editId ? 'Edit Achievement' : 'Add Achievement'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors">
                  <X size={20} className="text-neutral-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Title</label>
                      <input
                        type="text" required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#E85A1B]/20 transition-all text-sm"
                        placeholder="e.g. 100% Board Results"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Date</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="date" required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#E85A1B]/20 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Cover Image</label>
                    <div
                      className={`relative aspect-[4/3] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 overflow-hidden group cursor-pointer ${imagePreview ? 'border-solid border-[#E85A1B]/20' : 'border-neutral-200 hover:border-[#E85A1B]/40 hover:bg-neutral-50'
                        }`}
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Upload size={24} />
                          </div>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={32} className="text-neutral-300" />
                          <span className="text-xs font-medium text-neutral-400">Click to upload photo</span>
                        </>
                      )}
                      <input id="image-upload" type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    required rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#E85A1B]/20 transition-all text-sm resize-none"
                    placeholder="Describe the achievement in detail..."
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-3 px-6 rounded-2xl font-bold text-neutral-500 border border-neutral-100 hover:bg-neutral-50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-grow py-3 px-6 rounded-2xl font-bold text-white shadow-lg transition-all text-sm"
                    style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}
                  >
                    {editId ? 'Update Achievement' : 'Save Achievement'}
                  </button>
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
              <h3 className="text-xl font-black text-[#7B0D1E] mb-2">Are you sure?</h3>
              <p className="text-sm text-neutral-500 mb-8 leading-relaxed">This action cannot be undone. This achievement will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleting(false)} className="flex-grow py-3 rounded-2xl font-bold text-neutral-500 border border-neutral-100 hover:bg-neutral-50 transition-all text-sm">Cancel</button>
                <button onClick={handleDelete} className="flex-grow py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all text-sm">Yes, Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementManagement;
