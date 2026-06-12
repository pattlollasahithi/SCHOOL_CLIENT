import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'relative text-[#C94D14] font-bold transition duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[#E85A1B] after:rounded-full'
      : 'relative text-[#4A1020] hover:text-[#C94D14] font-medium transition duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E85A1B] after:rounded-full hover:after:w-full after:transition-all after:duration-300';

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-3 text-sm font-bold text-[#C94D14] rounded-xl border-l-4 border-[#E85A1B]'
      : 'block px-4 py-3 text-sm font-medium text-[#4A1020] hover:text-[#C94D14] rounded-xl transition duration-150';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 glass-nav`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <img
                className="h-13 w-auto transition-transform duration-300 group-hover:scale-105"
                src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png"
                alt="Shrradha High School Logo"
              />
              <div className="hidden sm:block">
                <span className="font-extrabold text-xl tracking-wide block" style={{ color: '#7B0D1E' }}>
                  SHRRADHA
                </span>
                <div className="text-xs font-semibold tracking-widest" style={{ color: '#E85A1B' }}>
                  HIGH SCHOOL
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/courses" className={navLinkClass}>Courses</NavLink>
            <NavLink to="/admissions" className={navLinkClass}>Admissions</NavLink>
            <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <Link
              to="/admissions"
              className="px-5 py-2 text-white text-sm font-bold rounded-full shadow transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition duration-150"
              style={{ color: '#7B0D1E' }}
            >
              {isOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(255,252,250,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTopColor: 'rgba(232,90,27,0.15)',
          }}
        >
          <div className="px-4 pt-3 pb-5 space-y-1">
            <NavLink to="/" end className={mobileLinkClass} onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/about" className={mobileLinkClass} onClick={toggleMenu}>About Us</NavLink>
            <NavLink to="/courses" className={mobileLinkClass} onClick={toggleMenu}>Courses</NavLink>
            <NavLink to="/admissions" className={mobileLinkClass} onClick={toggleMenu}>Admissions</NavLink>
            <NavLink to="/gallery" className={mobileLinkClass} onClick={toggleMenu}>Gallery</NavLink>
            <NavLink to="/contact" className={mobileLinkClass} onClick={toggleMenu}>Contact</NavLink>
            <div className="pt-2">
              <Link
                to="/admissions"
                onClick={toggleMenu}
                className="block w-full text-center px-4 py-3 text-white font-bold rounded-xl shadow transition duration-200"
                style={{ background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)' }}
              >
                Apply Now →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Subtle bottom accent line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(232,90,27,0.5), rgba(249,115,22,0.6), rgba(232,90,27,0.5), transparent)' }}
      />
    </nav>
  );
};

export default Navbar;
