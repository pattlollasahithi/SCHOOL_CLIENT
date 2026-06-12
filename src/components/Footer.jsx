import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden pt-14 pb-8" style={{ background: 'rgba(40,4,10,0.72)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderTop: '1px solid rgba(232,90,27,0.18)' }}>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E85A1B, #F97316, #E85A1B, transparent)' }}
      />

      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E85A1B 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F97316 0%, transparent 40%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-full p-1" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
                <img className="h-11 w-auto" src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png" alt="Shrradha High School Logo" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wide block text-white">SHRRADHA</span>
                <span className="text-xs tracking-widest font-semibold" style={{ color: '#F97316' }}>HIGH SCHOOL</span>
              </div>
            </div>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
              Empowering students with knowledge, character, and skills for a brighter future since 2014.
            </p>
            <a
              href="https://www.instagram.com/shraddhahighschool/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(232,90,27,0.15)', color: '#F97316', border: '1px solid rgba(232,90,27,0.28)' }}
            >
              <FaInstagram size={16} /> Follow us on Instagram
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-5 pb-2 inline-block text-white" style={{ borderBottom: '2px solid rgba(232,90,27,0.6)' }}>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/admissions', label: 'Admissions' },
                { to: '/courses', label: 'Academic Programs' },
                { to: '/gallery', label: 'Campus Gallery' },
                { to: '/contact', label: 'Contact Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1"
                    style={{ color: 'rgba(255,255,255,0.58)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F97316')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.58)')}
                  >
                    <span style={{ color: 'rgba(232,90,27,0.7)' }}>›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-5 pb-2 inline-block text-white" style={{ borderBottom: '2px solid rgba(232,90,27,0.6)' }}>
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { icon: '📍', text: 'Reddy colony, P.R.Pally, Sangareddy' },
                { icon: '🕒', text: 'Open until 4:30 pm' },
                { icon: '📞', text: 'Landline: 80455-400118\nCell: 8500413355, 9908413355' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <span className="whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.58)' }}>{item.text}</span>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <span style={{ color: '#F97316' }}>pattlollasahithi@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: '1px solid rgba(232,90,27,0.18)', color: 'rgba(255,255,255,0.35)' }}
        >
          <p>© {new Date().getFullYear()} Shrradha High School. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition duration-150">Privacy Policy</a>
            <a href="#" className="hover:text-white transition duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
