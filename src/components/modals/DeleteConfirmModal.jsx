import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = "Are you sure?", description = "This action cannot be undone." }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white max-w-sm w-full p-8 rounded-3xl relative z-10 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
              <Trash2 size={28} />
            </div>
            <h3 className="text-xl font-black text-[#7B0D1E] mb-2">{title}</h3>
            <p className="text-sm text-neutral-500 mb-8 leading-relaxed">{description}</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-grow py-3 rounded-2xl font-bold text-neutral-500 border border-neutral-100 hover:bg-neutral-50 transition-all text-sm">Cancel</button>
              <button onClick={onConfirm} className="flex-grow py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all text-sm">Yes, Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
