import React, { createContext, useContext, useEffect, useState } from 'react';
import usersData from '../db/users.json';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const raw = localStorage.getItem('isAuthenticated');
      return raw === 'true';
    } catch (e) {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false'); } catch(e) {}
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch(e) {}
  }, [user]);

  const login = (username, password) => {
    if (!username || !password) return false;

    const foundUser = usersData.find(
      u => u.email === username && u.password === password
    );
    
    if (!foundUser) {
      return false;
    }
    
    setIsAuthenticated(true);
    setUser({
      id: foundUser.id,
      username: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    });
    return true;
  };

  const updateProfile = (updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      try { localStorage.setItem('user', JSON.stringify(next)); } catch(e) {}
      return next;
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
