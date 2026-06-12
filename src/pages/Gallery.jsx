import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: 'https://res.cloudinary.com/ddsuglolg/image/upload/v1776838512/Screenshot_2026-04-22_114423_ucsmmn.png',
      alt: 'Campus View',
      title: 'Main Campus Building',
      category: 'Campus',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
      alt: 'Classroom',
      title: 'Interactive Classrooms',
      category: 'Academics',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
      alt: 'Library',
      title: 'Comprehensive Library',
      category: 'Facilities',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      alt: 'Students',
      title: 'Student Activities',
      category: 'Students',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      alt: 'Technology Labs',
      title: 'Computer Labs',
      category: 'Facilities',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      alt: 'Sports Field',
      title: 'Sports Facilities',
      category: 'Sports',
    },
  ];

  return (
    <div className="w-full">

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
            backgroundImage: 'radial-gradient(circle at 80% 20%, #E85A1B 0%, transparent 50%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#F97316' }}>
              VISUAL TOUR
            </p>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Campus Gallery
            </h1>
            <p className="mt-5 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Take a visual tour of our beautiful campus and vibrant student life.
            </p>
            <div
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Category tag */}
              <div className="absolute top-3 left-3 z-20">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: '#7B0D1E',
                  }}
                >
                  {image.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{
                  background: 'linear-gradient(to top, rgba(61,6,16,0.92) 0%, rgba(123,13,30,0.5) 50%, transparent 100%)',
                }}
              >
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  <div
                    className="h-0.5 w-0 group-hover:w-12 transition-all duration-500 mt-2 rounded-full"
                    style={{ background: '#F97316', transitionDelay: '100ms' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14 p-8 rounded-2xl"
          style={{
            background: 'white',
            border: '1px solid rgba(232,90,27,0.12)',
            boxShadow: '0 4px 20px rgba(123,13,30,0.06)',
          }}
        >
          <p className="text-lg font-semibold mb-2" style={{ color: '#7B0D1E' }}>
            📸 More photos coming soon!
          </p>
          <p className="text-sm" style={{ color: '#8B5050' }}>
            Follow us on Instagram{' '}
            <a
              href="https://www.instagram.com/shraddhahighschool/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline"
              style={{ color: '#E85A1B' }}
            >
              @shraddhahighschool
            </a>{' '}
            for the latest campus updates and event photos.
          </p>
        </motion.div>
      </div>
    </div>
  );
};


export default Gallery;
