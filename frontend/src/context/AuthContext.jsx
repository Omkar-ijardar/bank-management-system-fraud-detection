import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const login = (userData, authToken) => {
    // Ensure role is preserved (defaults to CUSTOMER if not provided)
    const formattedUser = {
      ...userData,
      role: userData.role || 'CUSTOMER'
    };
    setUser(formattedUser);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(formattedUser));
    localStorage.setItem('token', authToken);
    return formattedUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const role = user?.role || 'CUSTOMER';
  const isAdmin = role === 'ADMIN';
  const isCustomer = role === 'CUSTOMER';

  return (
    <AuthContext.Provider value={{
      user,
      token,
      role,
      isAdmin,
      isCustomer,
      login,
      logout,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
