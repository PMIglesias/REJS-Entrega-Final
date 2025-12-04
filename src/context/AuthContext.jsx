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
    
    // Buscar en los datos de usuarios por email
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

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
