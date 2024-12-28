import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AdminContext } from './Context/contextAdmin';
import Header from './Components/Admin/Header';
import Footer from './components/Admin/Footer';
import Login from './components/Admin/AdminLogin';
import Register from './components/Admin/AdminRegister';
import Dashboard from './Components/Admin/AdminDashboard';
import AddProduct from './Components/Admin/AddProduct';

const App = () => {
  const { token } = useContext(AdminContext);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="add-product" element={<AddProduct />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
