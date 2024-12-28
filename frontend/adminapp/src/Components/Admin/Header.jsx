import React, { useContext } from 'react';
import { AdminContext } from '../../Context/contextAdmin';

const Header = () => {
  const { setToken, setAdmin } = useContext(AdminContext);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <header>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
