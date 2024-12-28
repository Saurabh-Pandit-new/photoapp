// src/components/Dashboard.js

import React, { useContext } from 'react';
import { AdminContext } from '../../Context/contextAdmin';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Dashboard = () => {
  const { admin } = useContext(AdminContext);

  return (
    <div>
      <h2>Welcome, {admin ? admin.username : 'Admin'}!</h2>
      <p>Here you can manage the admin functionalities.</p>
      
      <Link to="/add-product">
        <button>Add New Product</button> {/* Button to navigate to AddProduct */}
      </Link>
    </div>
  );
};

export default Dashboard;
