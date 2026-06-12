import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          return setError('Passwords do not match');
        }

        await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name,
          schoolId,
          password,
          role: role === 'staff' ? 'admin' : 'student'
        });

        setSuccess('Registration successful! You can now log in.');
        setIsRegistering(false);
        setPassword('');
        setConfirmPassword('');
      } else {
        const data = await login(
          schoolId,
          password,
          role === 'staff' ? 'admin' : 'student'
        );

        if (data.role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/student';
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err || 'An error occurred. Please try again.');
    }
  };

  const resetState = () => {
    setRole(null);
    setIsRegistering(false);
    setError('');
    setSuccess('');
    setSchoolId('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const inputClass = `
    appearance-none relative block w-full px-4 py-3 border rounded-xl
    placeholder-gray-400 text-gray-900 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#E85A1B] focus:border-[#E85A1B]
    transition duration-200 bg-white
  `;

  // Role Selection Screen
  if (!role) {
    return (
      <div
        className="min-h-[85vh] flex items-center justify-center py-12 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f9f9f9 100%)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-5"
          style={{ background: 'radial-gradient(circle, #E85A1B, transparent)', transform: 'translate(50%, -50%)' }}
        />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-5"
          style={{ background: 'radial-gradient(circle, #7B0D1E, transparent)', transform: 'translate(-50%, 50%)' }}
        />

        <div className="max-w-md w-full relative z-10">
          <div
            className="bg-white rounded-3xl p-10 shadow-2xl text-center"
            style={{ boxShadow: '0 20px 60px rgba(123,13,30,0.12)' }}
          >
            {/* Logo */}
            <div
              className="inline-block p-1 rounded-full mb-6"
              style={{ background: 'linear-gradient(135deg, #E85A1B, #F97316, #7B0D1E)' }}
            >
              <div className="bg-white rounded-full p-2">
                <img
                  className="h-16 w-auto"
                  src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png"
                  alt="School Logo"
                />
              </div>
            </div>

            <h2
              className="text-3xl font-black mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
            >
              School Portal
            </h2>
            <p className="text-sm mb-8" style={{ color: '#8B5050' }}>
              Please select your role to continue
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setRole('student')}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderColor: '#7B0D1E',
                  color: '#7B0D1E',
                  background: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #7B0D1E, #9C1A2E)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#7B0D1E';
                  e.currentTarget.style.borderColor = '#7B0D1E';
                }}
              >
                👨‍🎓 I am a Student
              </button>

              <button
                onClick={() => setRole('staff')}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(232,90,27,0.3)',
                }}
              >
                👨‍🏫 I am Staff / Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center py-12 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f9f9f9 100%)' }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #E85A1B, transparent)', transform: 'translate(50%, -50%)' }}
      />

      <div className="max-w-md w-full relative z-10">
        <div
          className="bg-white rounded-3xl p-10 shadow-2xl"
          style={{ boxShadow: '0 20px 60px rgba(123,13,30,0.12)' }}
        >
          {/* Back button */}
          <button
            onClick={resetState}
            className="text-sm font-medium mb-6 flex items-center gap-1 transition-colors duration-200"
            style={{ color: '#8B5050' }}
          >
            ← Back to Role Selection
          </button>

          {/* Logo */}
          <div className="text-center mb-6">
            <div
              className="inline-block p-1 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #E85A1B, #F97316, #7B0D1E)' }}
            >
              <div className="bg-white rounded-full p-2">
                <img
                  className="h-14 w-auto"
                  src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png"
                  alt="School Logo"
                />
              </div>
            </div>
            <h2
              className="text-2xl font-black capitalize"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B0D1E' }}
            >
              {role} {isRegistering ? 'Registration' : 'Login'}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#8B5050' }}>
              {isRegistering
                ? `Create your ${role} account`
                : `Enter your ${role === 'student' ? 'Student ID' : 'Staff ID'} to access your dashboard`}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl border-l-4 text-sm" style={{ background: '#FEF2F2', borderLeftColor: '#EF4444', color: '#B91C1C' }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl border-l-4 text-sm" style={{ background: '#F0FDF4', borderLeftColor: '#22C55E', color: '#15803D' }}>
              ✅ {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegistering && (
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>Full Name</label>
                <input
                  type="text" required
                  className={inputClass}
                  style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>
                {role === 'student' ? 'Student ID' : 'Staff ID'}
              </label>
              <input
                type="text" required
                className={inputClass}
                style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                placeholder={`Enter your ${role === 'student' ? 'Student ID' : 'Staff ID'}`}
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>Password</label>
              <input
                type="password" required
                className={inputClass}
                style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isRegistering && (
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4A1020' }}>Confirm Password</label>
                <input
                  type="password" required
                  className={inputClass}
                  style={{ borderColor: 'rgba(123,13,30,0.2)' }}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {!isRegistering && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: '#5A3030' }}>
                  <input type="checkbox" className="rounded" style={{ accentColor: '#E85A1B' }} />
                  Remember me
                </label>
                <a href="#" className="font-semibold transition-colors duration-200" style={{ color: '#E85A1B' }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #E85A1B 0%, #7B0D1E 100%)',
                boxShadow: '0 6px 20px rgba(232,90,27,0.3)',
              }}
            >
              {isRegistering ? 'Register' : 'Sign In →'}
            </button>

            <div className="text-center text-sm" style={{ color: '#8B5050' }}>
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setSuccess('');
                }}
                className="font-bold transition-colors duration-200"
                style={{ color: '#E85A1B' }}
              >
                {isRegistering ? 'Login here' : 'Register here'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
