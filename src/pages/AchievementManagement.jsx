import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import achievementService from '@/services/achievementService';
import AchievementModal from '@/components/modals/AchievementModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';

const AchievementManagement = () => {
  const [achievements, setAchievements] = useState([]);
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchAchievements = async () => {
    try {
      const data = await achievementService.getAll();
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
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    if (imageFile) data.append('image', imageFile);

    try {
      if (editId) {
        await achievementService.update(editId, data);
        toast.success('Achievement updated!');
      } else {
        await achievementService.create(data);
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
    try {
      await achievementService.delete(deleteId);
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

      <AchievementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        isEditing={!!editId}
      />

      <DeleteConfirmModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        title="Delete Achievement?"
        description="This action cannot be undone. This achievement will be permanently removed."
      />
    </div>
  );
};

export default AchievementManagement;
