import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const inputClass = `
  w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-[#E85A1B] focus:border-[#E85A1B]
  bg-white
`;

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    grade: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_BASE_URL}/api/admissions/submit`, formData);
      setSubmitted(true);
      setFormData({ studentName: '', parentName: '', email: '', phone: '', address: '', gender: '', grade: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again or contact the school directly.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: '01', text: 'Submit the online inquiry form' },
    { num: '02', text: 'Attend the campus tour and counseling session' },
    { num: '03', text: 'Submit required documents' },
    { num: '04', text: 'Interaction with the Principal' },
    { num: '05', text: 'Fee payment and enrollment confirmation' },
  ];

  const docs = [
    'Birth Certificate',
    'Previous School Transfer Certificate',
    'Recent Passport Size Photographs',
    'Aadhar Card / ID Proof',
    'Previous Year Marksheets',
  ];

  return (
    <div style={{ background: '#ffffff' }}>

      {/* Page Header */}
      <div
        className="py-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3D0610 0%, #7B0D1E 50%, #9C1A2E 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 30%, #E85A1B 0%, transparent 50%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#F97316' }}>
              JOIN OUR FAMILY
            </p>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admissions
            </h1>
            <p className="mt-5 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
              We are currently accepting applications for the 2026–27 academic year. Apply today!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* Process Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-7 shadow-lg"
              style={{
                border: '1px solid rgba(232,90,27,0.1)',
                boxShadow: '0 4px 20px rgba(123,13,30,0.08)',
              }}
            >
              <h3
                className="text-xl font-black mb-6"
                style={{ color: '#7B0D1E', fontFamily: "'Playfair Display', serif" }}
              >
                Admission Process
              </h3>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="text-xs font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #E85A1B, #7B0D1E)', color: 'white' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm pt-1.5 leading-relaxed" style={{ color: '#5A3030' }}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Documents Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-7 shadow-lg"
              style={{
                border: '1px solid rgba(232,90,27,0.1)',
                boxShadow: '0 4px 20px rgba(123,13,30,0.08)',
              }}
            >
              <h3
                className="text-xl font-black mb-6"
                style={{ color: '#7B0D1E', fontFamily: "'Playfair Display', serif" }}
              >
                Required Documents
              </h3>
              <ul className="space-y-3">
                {docs.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#5A3030' }}>
                    <span style={{ color: '#E85A1B' }}>✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact quick info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(135deg, #7B0D1E, #E85A1B)',
              }}
            >
              <h4 className="font-bold text-white mb-2">Have Questions?</h4>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Our admissions team is happy to help you.
              </p>
              <p className="text-sm font-bold text-white">📞 8500413355</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>pattlollasahithi@gmail.com</p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-2xl p-10 shadow-xl"
            style={{
              border: '1px solid rgba(232,90,27,0.1)',
              boxShadow: '0 10px 40px rgba(123,13,30,0.1)',
            }}
          >
            <h2
              className="text-2xl font-black mb-7"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
            >
              Admission Inquiry Form
            </h2>

            {submitted && (
              <div
                className="mb-6 p-4 rounded-xl border-l-4 text-sm"
                style={{ background: '#F0FDF4', borderLeftColor: '#22C55E', color: '#15803D' }}
              >
                ✅ Thank you for your inquiry! Our admissions team will contact you shortly.
              </div>
            )}

            {error && (
              <div
                className="mb-6 p-4 rounded-xl border-l-4 text-sm"
                style={{ background: '#FEF2F2', borderLeftColor: '#EF4444', color: '#B91C1C' }}
              >
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                    Student's Full Name <span style={{ color: '#E85A1B' }}>*</span>
                  </label>
                  <input
                    type="text" required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className={inputClass}
                    style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                    placeholder="Student Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                    Parent's Full Name <span style={{ color: '#E85A1B' }}>*</span>
                  </label>
                  <input
                    type="text" required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className={inputClass}
                    style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                    placeholder="Parent Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                    Phone Number <span style={{ color: '#E85A1B' }}>*</span>
                  </label>
                  <input
                    type="tel" required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                    style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                    Applying for Grade <span style={{ color: '#E85A1B' }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className={inputClass}
                    style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                  >
                    <option value="">Select Grade</option>
                    {['Nursery', 'LKG', 'UKG', ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`)].map((g) => (
                      <option key={g} value={g.toLowerCase().replace(' ', '')}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                    Gender <span style={{ color: '#E85A1B' }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className={inputClass}
                    style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                  Home Address <span style={{ color: '#E85A1B' }}>*</span>
                </label>
                <textarea
                  rows="2" required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`${inputClass} resize-none`}
                  style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>Additional Message / Queries (Optional)</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                  placeholder="Any specific questions or information you'd like to share..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: loading ? '#C9A090' : 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(232,90,27,0.35)',
                }}
              >
                {loading ? 'Submitting...' : 'Submit Inquiry →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;
