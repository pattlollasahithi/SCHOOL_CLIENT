import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Image as ImageIcon, Upload, Trophy } from 'lucide-react';

const AchievementModal = ({ isOpen, onClose, onSubmit, formData, setFormData, imagePreview, handleImageChange, isEditing }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden"
        >
          <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#7B0D1E] flex items-center gap-2">
              <Trophy className="text-[#E85A1B]" />
              {isEditing ? 'Edit Achievement' : 'Add Achievement'}
            </h2>
            <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors">
              <X size={20} className="text-neutral-500" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
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
                  className={`relative aspect-[4/3] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 overflow-hidden group cursor-pointer ${imagePreview ? 'border-solid border-[#E85A1B]/20' : 'border-neutral-200 hover:border-[#E85A1B]/40 hover:bg-neutral-50'}`}
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
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
                onClick={onClose}
                className="flex-grow py-3 px-6 rounded-2xl font-bold text-neutral-500 border border-neutral-100 hover:bg-neutral-50 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-grow py-3 px-6 rounded-2xl font-bold text-white shadow-lg transition-all text-sm"
                style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}
              >
                {isEditing ? 'Update Achievement' : 'Save Achievement'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AchievementModal;
