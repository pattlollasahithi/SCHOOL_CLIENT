import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Primary Education',
      subtitle: 'Grades 1–5',
      description: 'Building strong foundations in literacy, numeracy, and environmental awareness through interactive, activity-based learning.',
      icon: '📚',
      highlights: ['Core Literacy & Numeracy', 'Environmental Studies', 'Activity-Based Learning'],
    },
    {
      id: 2,
      title: 'Middle School',
      subtitle: 'Grades 6–8',
      description: 'Developing critical thinking and analytical skills with an introduction to advanced sciences, mathematics, and languages.',
      icon: '🔬',
      highlights: ['Advanced Sciences', 'Mathematics', 'Language Skills'],
    },
    {
      id: 3,
      title: 'High School',
      subtitle: 'Grades 9–10',
      description: 'Board exam preparation with a comprehensive curriculum covering Science, Mathematics, Social Studies, and English.',
      icon: '🎓',
      highlights: ['Board Exam Prep', 'Comprehensive Curriculum', 'Expert Guidance'],
    },
    {
      id: 6,
      title: 'Extracurricular Programs',
      subtitle: 'All Grades',
      description: 'Sports, Arts, Music, Coding Club, and Robotics to ensure holistic development beyond the classroom.',
      icon: '🎨',
      highlights: ['Sports & Athletics', 'Arts & Music', 'Coding & Robotics'],
    },
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
            backgroundImage: 'radial-gradient(circle at 20% 50%, #E85A1B 0%, transparent 50%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#F97316' }}>
              WHAT WE OFFER
            </p>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Academic Programs
            </h1>
            <p className="mt-5 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
              A diverse range of programs designed to nurture every student at every stage of their educational journey.
            </p>
            <div
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                boxShadow: '0 4px 20px rgba(123,13,30,0.08)',
                border: '1px solid rgba(232,90,27,0.1)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
              />

              <div className="p-8">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #FEF3EC, #FDECD8)' }}
                >
                  {course.icon}
                </div>

                {/* Title */}
                <div className="mb-1">
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: '#E85A1B' }}
                  >
                    {course.subtitle}
                  </span>
                </div>
                <h3 className="text-xl font-black mb-3" style={{ color: '#7B0D1E' }}>
                  {course.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B5050' }}>
                  {course.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {course.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#5A3030' }}>
                      <span style={{ color: '#E85A1B' }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-1 text-sm font-bold transition-colors duration-200"
                  style={{ color: '#E85A1B' }}
                >
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center py-14 px-8 rounded-3xl shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #7B0D1E 0%, #9C1A2E 50%, #E85A1B 100%)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Interested in Joining?
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Our admissions team is ready to guide you through the enrollment process.
          </p>
          <Link
            to="/admissions"
            className="inline-block px-8 py-3 font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'white', color: '#7B0D1E' }}
          >
            Apply for Admission →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
