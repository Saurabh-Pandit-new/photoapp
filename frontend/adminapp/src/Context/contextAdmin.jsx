import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [admin, setAdmin] = useState(null);

  return (
    <AdminContext.Provider value={{ token, setToken, admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
