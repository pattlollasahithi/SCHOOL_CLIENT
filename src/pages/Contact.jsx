import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { motion } from 'framer-motion';

const inputClass = `
  w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200
  focus:outline-none focus:ring-2
  bg-white
`;
const inputStyle = {
  borderColor: 'rgba(123,13,30,0.2)',
  color: '#1A0A00',
};
const inputFocusStyle = `focus:ring-[#E85A1B] focus:border-[#E85A1B]`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/contact/submit`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            backgroundImage: 'radial-gradient(circle at 30% 50%, #E85A1B 0%, transparent 50%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#F97316' }}>
              GET IN TOUCH
            </p>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Us
            </h1>
            <p className="mt-5 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
              We'd love to hear from you. Reach out with any questions or concerns.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Contact Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
          style={{ boxShadow: '0 20px 60px rgba(123,13,30,0.12)' }}
        >

          {/* Info Panel */}
          <div
            className="p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #3D0610 0%, #7B0D1E 60%, #9C1A2E 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 80% 20%, #E85A1B 0%, transparent 50%)',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Get In Touch
              </h2>
              <p className="text-sm mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Whether you are a prospective parent, a current student, or an alumnus — our administration is here to help you.
              </p>

              <div className="space-y-7">
                {[
                  { icon: '📍', title: 'Address', content: 'Reddy colony, P.R.Pally,\nSangareddy' },
                  { icon: '🕒', title: 'Working Hours', content: 'Open until 4:30 pm' },
                  { icon: '📞', title: 'Phone', content: 'Landline: 80455-400118\nCell: 8500413355, 9908413355' },
                  { icon: '✉️', title: 'Email', content: 'pattlollasahithi@gmail.com' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: 'rgba(232,90,27,0.2)', border: '1px solid rgba(232,90,27,0.3)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-sm whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="p-10">
            <h2 className="text-2xl font-black mb-7" style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}>
              Send a Message
            </h2>

            {submitted && (
              <div
                className="mb-6 p-4 rounded-xl border-l-4 text-sm"
                style={{ background: '#F0FDF4', borderLeftColor: '#22C55E', color: '#15803D' }}
              >
                ✅ Thank you! Your message has been sent successfully.
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Subject', key: 'subject', type: 'text', placeholder: 'Admission Inquiry' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    required={key !== 'email'}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className={`${inputClass} ${inputFocusStyle}`}
                    style={inputStyle}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} ${inputFocusStyle} resize-none`}
                  style={inputStyle}
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{
                  background: loading ? '#C9A090' : 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(232,90,27,0.35)',
                }}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden p-6 md:p-8"
          style={{ boxShadow: '0 10px 40px rgba(123,13,30,0.08)' }}
        >
          <h2
            className="text-2xl font-black text-center mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
          >
            📍 Find Us Here
          </h2>
          <div className="w-full h-80 rounded-2xl overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Shraddha%20High%20School%20Sangareddy&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://maps.app.goo.gl/LusWsYHzgmLarvy58"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7B0D1E 0%, #E85A1B 100%)',
                boxShadow: '0 6px 20px rgba(123,13,30,0.25)',
              }}
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
