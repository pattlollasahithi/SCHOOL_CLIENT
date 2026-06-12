import { motion } from 'framer-motion';

const About = () => {
  const values = [
    { icon: '📖', title: 'Academic Excellence', description: 'Rigorous curriculum designed to build strong foundations and critical thinking.' },
    { icon: '❤️', title: 'Character Building', description: 'Fostering integrity, empathy, and responsibility in every student.' },
    { icon: '🌍', title: 'Global Perspective', description: 'Preparing students to be responsible and aware global citizens.' },
    { icon: '🎨', title: 'Creative Expression', description: 'Encouraging sports, atheletics and extracurricular activities alongside academics.' },
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
        {/* Decorative */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 50%, #E85A1B 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(to right, transparent, #E85A1B, transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase mb-3"
              style={{ color: '#F97316' }}
            >
              WHO WE ARE
            </p>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About Us
            </h1>
            <p
              className="mt-5 text-lg max-w-2xl mx-auto"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              Discover our history, mission, and the core values that drive Shrradha High School forward.
            </p>
          </motion.div>
        </div>
      </div>

      {/* History Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #E85A1B20, #7B0D1E15)', border: '2px solid #E85A1B30' }}
            />
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
              alt="Students in classroom"
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover"
              style={{ maxHeight: '420px' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: '#E85A1B' }}>
              OUR STORY
            </p>
            <h2
              className="text-3xl md:text-4xl font-black mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
            >
              A Legacy of Learning
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: '#5A3030' }}>
              Founded in 2014, Shrradha High School began with a humble vision of providing quality education to the local community in Sangareddy. Over the years, we have grown into a premier educational institution known for academic rigor and holistic development.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: '#5A3030' }}>
              Our campus features state-of-the-art laboratories, a comprehensive library, and extensive sports facilities. We are proud of our alumni who are making significant contributions across the globe in various fields of life and industry.
            </p>
            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #FEF3EC, #FDECD8)', border: '1px solid #E85A1B30' }}
            >
              <span className="text-3xl">🏅</span>
              <div>
                <div className="font-bold" style={{ color: '#7B0D1E' }}>Established in 2014</div>
                <div className="text-sm" style={{ color: '#8B5050' }}>Over a decade of educational excellence</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Principal's Message */}
      <div className="py-12" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#E85A1B] to-[#7B0D1E] rounded-2xl opacity-20 blur group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="https://res.cloudinary.com/ddsuglolg/image/upload/v1777005072/Screenshot_2026-04-24_095952_bqrjdh.png"
                  alt="Principal"
                  className="relative rounded-2xl shadow-xl w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}>
                Principal's Message
              </h2>
              <div className="w-20 h-1 rounded-full mb-8" style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }} />

              <div className="space-y-4 text-lg leading-relaxed italic" style={{ color: '#5A3030' }}>
                <p>
                  "Welcome to Shrradha High School. Our mission is to provide an environment where students can discover their true potential and develop into confident, compassionate individuals. We emphasize not just what to learn, but how to think."
                </p>
                <p>
                  "Through a blend of modern pedagogy and traditional values, we ensure that our students are well-prepared for the challenges of the future. I invite you to explore our campus and witness the joy of learning that defines Shrradha."
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-orange-100">
                <p className="font-bold text-xl" style={{ color: '#7B0D1E' }}>Joshi Paandu Ranga Rao</p>
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#E85A1B' }}>Principal, Shrradha High School</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
            >
              Mission & Vision
            </h2>
            <div
              className="w-20 h-1 mx-auto mt-4 rounded-full"
              style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                text: 'To provide a holistic educational environment that empowers students to reach their full potential academically, socially, and emotionally, preparing them to be responsible global citizens.',
              },
              {
                icon: '🌟',
                title: 'Our Vision',
                text: 'To be a center of excellence in education, recognized for instilling core values, fostering innovation, and building leaders who will shape a better tomorrow.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border-l-4 transition-all duration-300 hover:shadow-xl"
                style={{
                  background: 'white',
                  borderLeftColor: '#E85A1B',
                  boxShadow: '0 4px 20px rgba(123,13,30,0.06)',
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#7B0D1E' }}
                >
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#5A3030' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-12" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
            >
              Our Core Values
            </h2>
            <div
              className="w-20 h-1 mx-auto mt-4 rounded-full"
              style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group text-center p-7 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: 'white',
                  boxShadow: '0 4px 16px rgba(123,13,30,0.06)',
                  border: '1px solid rgba(232,90,27,0.1)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #FEF3EC, #FDECD8)' }}
                >
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: '#7B0D1E' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B5050' }}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
