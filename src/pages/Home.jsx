import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

/* ─── Shared glass style objects ─────────────────── */
const glassLight = {
  background: 'rgba(255, 248, 243, 0.82)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255, 255, 255, 0.38)',
  boxShadow: '0 8px 32px rgba(61, 6, 16, 0.14)',
};

const glassDark = {
  background: 'rgba(48, 4, 12, 0.66)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  border: '1px solid rgba(232, 90, 27, 0.16)',
};

/* ─── Accent bar under heading ───────────────────── */
const AccentBar = () => (
  <div className="w-16 h-0.5 mx-auto mt-4 rounded-full"
    style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
  />
);

/* ─── Gradient button ────────────────────────────── */
const GradBtn = ({ to, children, className = '' }) => (
  <Link
    to={to}
    className={`inline-block text-white font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)', boxShadow: '0 6px 20px rgba(232,90,27,0.28)' }}
  >
    {children}
  </Link>
);

const Home = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, annRes] = await Promise.all([
          axios.get('http://localhost:5000/api/achievements'),
          axios.get('http://localhost:5000/api/announcements')
        ]);
        setAchievements(achRes.data);
        setAnnouncements(annRes.data);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { number: '1000+', label: 'Students Enrolled', icon: '👨‍🎓' },
    { number: '20+', label: 'Expert Teachers', icon: '👩‍🏫' },
    { number: '10+', label: 'Years of Excellence', icon: '🏆' },
    { number: '95%', label: 'Board Pass Rate', icon: '📊' },
  ];

  const features = [
    { icon: '🎓', title: 'Academic Excellence', description: 'Consistently top-ranking academics and exceptional board results year after year.' },
    { icon: '🏫', title: 'Modern Infrastructure', description: 'Computer labs and smart classrooms for interactive learning.' },
    { icon: '⚽', title: 'Holistic Growth', description: 'Strong emphasis on sports,atheletics and extracurricular activities.' },
  ];

  return (
    <div className="w-full">

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, rgba(90, 9, 22, 0.38) 0%, rgba(123, 13, 30, 0.30) 50%, rgba(80, 18, 5, 0.36) 100%), url('https://res.cloudinary.com/ddsuglolg/image/upload/v1776838512/Screenshot_2026-04-22_114423_ucsmmn.png') center / cover`,
        }}
      >
        {/* Dark glass overlay for hero area */}
        <div className="absolute inset-0" style={{ background: 'rgba(45, 4, 11, 0.54)', backdropFilter: 'blur(1px)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>

            {/* Logo ring */}
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="mb-7">
              <div className="inline-block p-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(232,90,27,0.9), rgba(249,115,22,0.8), rgba(123,13,30,0.9))' }}>
                <div className="rounded-full p-2" style={{ background: 'rgba(255,255,255,0.92)' }}>
                  <img className="h-24 w-auto" src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png" alt="Logo" />
                </div>
              </div>
            </motion.div>

            {/* Est. badge */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-block mb-5 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: 'rgba(232,90,27,0.18)', border: '1px solid rgba(232,90,27,0.35)', color: '#F97316' }}
            >
              ✦ Est. 2014 · Sangareddy ✦
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 text-white" style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.1', textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}>
              Welcome to{' '}

              Shrradha

              <br />High School
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto font-light" style={{ color: 'rgba(255,255,255,0.78)', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              Where the primary focus is on profound learning — nurturing minds and shaping the leaders of tomorrow through excellence in education.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
              <Link to="/admissions" className="px-8 py-3.5 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 text-base"
                style={{ background: 'linear-gradient(135deg, #E85A1B, #C94D14)', boxShadow: '0 6px 24px rgba(232,90,27,0.38)' }}
              >
                Apply Now →
              </Link>
              <Link to="/about" className="px-8 py-3.5 font-bold rounded-full transition-all duration-300 hover:-translate-y-1 text-base"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.42)', color: 'white', backdropFilter: 'blur(10px)' }}
              >
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 -mt-14">
            {stats.map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={glassLight}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black mb-1"
                  style={{ background: 'linear-gradient(135deg, #7B0D1E, #E85A1B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {stat.number}
                </div>
                <div className="text-xs font-semibold" style={{ color: '#6B2737' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <div className="inline-block px-8 py-4 rounded-2xl mb-2" style={{ background: 'rgba(255,248,243,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
              <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}>
                Why Choose Shrradha?
              </h2>
            </div>
            <AccentBar />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}
                className="group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-default"
                style={glassLight}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(232,90,27,0.12), rgba(249,115,22,0.08))' }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#7B0D1E' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A3030' }}>{f.description}</p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ACHIEVEMENTS ══════════ */}
      <section className="py-16 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <div className="inline-block px-8 py-4 rounded-2xl mb-2" style={{ background: 'white', boxShadow: '0 4px 20px rgba(123,13,30,0.06)' }}>
              <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}>
                Our Achievements
              </h2>
            </div>
            <AccentBar />
          </motion.div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto ${loading ? 'animate-pulse' : ''}`}>
            {achievements.length > 0 ? achievements.map((ach, i) => (
              <motion.div key={ach._id}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                onClick={() => setSelectedPhoto({ ...ach, photo: ach.image })}
                className="relative p-7 rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={glassLight}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500" style={{ background: '#7B0D1E' }} />
                <div className="text-3xl mb-5">🏆</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#3D0610' }}>{ach.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#5A3030' }}>{ach.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-8 rounded-full" style={{ background: '#E85A1B' }} />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#E85A1B' }}>Excellence</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#E85A1B] group-hover:underline">View Photo →</span>
                </div>
              </motion.div>
            )) : !loading && (
              <div className="col-span-full text-center py-10 bg-white/50 rounded-3xl border border-dashed border-neutral-200">
                <p className="text-neutral-400 text-sm italic">New achievements coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ PHOTO MODAL ══════════ */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-md transition-all"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto h-full overflow-hidden bg-neutral-100">
                  <img
                    src={selectedPhoto.photo}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-3xl mb-4">{selectedPhoto.icon}</span>
                  <h3 className="text-2xl md:text-3xl font-black mb-4" style={{ color: '#7B0D1E', fontFamily: "'Playfair Display', serif" }}>
                    {selectedPhoto.title}
                  </h3>
                  <div className="w-12 h-1 rounded-full mb-6" style={{ background: selectedPhoto.color }} />
                  <p className="text-base text-neutral-600 leading-relaxed italic mb-8">
                    "{selectedPhoto.description}"
                  </p>
                  <p className="text-sm text-neutral-500">
                    Congratulations to all our students and staff members for this remarkable achievement. We continue to strive for greatness together.
                  </p>
                  <div className="mt-10">
                    <button
                      className="px-8 py-3 rounded-full text-white font-bold text-sm transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #7B0D1E, #E85A1B)' }}
                      onClick={() => setSelectedPhoto(null)}
                    >
                      Close Gallery
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ ANNOUNCEMENTS ══════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <div className="inline-block px-8 py-4 rounded-2xl mb-2" style={{ background: 'rgba(255,248,243,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
              <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}>
                Announcements & Notices
              </h2>
            </div>
            <AccentBar />
          </motion.div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${loading ? 'animate-pulse' : ''}`}>
            {announcements.length > 0 ? announcements.map((ann, i) => (
              <motion.div key={ann._id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                className="rounded-2xl p-6 border-l-4 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ ...glassLight, borderLeftColor: '#E85A1B' }}
              >
                <span className="text-xs font-bold mb-3 block tracking-wider uppercase" style={{ color: '#E85A1B' }}>
                  📅 {new Date(ann.date).toLocaleDateString()}
                </span>
                <h3 className="text-base font-bold mb-3" style={{ color: '#7B0D1E' }}>{ann.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A3030' }}>{ann.message}</p>
              </motion.div>
            )) : !loading && (
              <div className="col-span-full text-center py-10 bg-white/50 rounded-3xl">
                <p className="text-neutral-400 text-sm">No recent announcements.</p>
              </div>
            )}
          </div>

          <motion.div className="text-center mt-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          >
            <Link to="/notices"
              className="inline-block px-7 py-3 font-bold rounded-full text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: 'rgba(123,13,30,0.7)', color: '#7B0D1E', background: 'rgba(255,248,243,0.70)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            >
              View All Notices
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="py-16 mx-4 sm:mx-6 lg:mx-auto max-w-5xl mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center py-14 px-8 rounded-3xl relative overflow-hidden"
          style={glassDark}
        >
          {/* Accent glow */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #E85A1B 0%, transparent 55%), radial-gradient(circle at 70% 50%, #F97316 0%, transparent 55%)' }}
          />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Begin Your Journey with Us
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.68)' }}>
              Admissions are open for the 2026–27 academic year. Secure your child's future today.
            </p>
            <GradBtn to="/admissions" className="px-8 py-3 text-sm">
              Apply for Admission →
            </GradBtn>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
