import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const admin = localStorage.getItem('adminInfo');
      const student = localStorage.getItem('userInfo');
      return admin ? JSON.parse(admin) : (student ? JSON.parse(student) : null);
    } catch (e) {
      console.error('Failed to parse user info from localStorage:', e);
      return null;
    }
  });

  const login = async (schoolId, password, role = 'admin') => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        schoolId,
        password,
        role
      });
      setUser(data);
      if (data.role === 'admin') {
        localStorage.setItem('adminInfo', JSON.stringify(data));
      } else {
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
