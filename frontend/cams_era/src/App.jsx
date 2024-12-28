// src/App.jsx
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Home from './components/common/Home';
import Layout from './components/common/Layout';
import UserProfile from './components/user/Userprofile';
// Importing Context Providers
import { UserProvider } from './contexts/UserContext'; 
import ProductList from './components/ecommerce/ProductList';
import ProductDetails from './components/ecommerce/ProductDetails';
import { ProductProvider } from './contexts/ProductContext';
import Cart from './components/ecommerce/Cart';
import { CartProvider } from './contexts/CartContext';
import Orders from './components/ecommerce/Orders';
import './index.css'; // Import Tailwind CSS here
import { ModalProvider } from './contexts/ModalContext';
import About from './components/common/About';
import ContactUs from './components/common/ContactUs';
import { WishlistProvider } from './contexts/WishlistContext';
import Wishlist from './components/ecommerce/Wishlist';
import HireBussinessPage from './components/common/HireBussinessPage';
import Photoregister from './components/common/Photoregister';
import { PhotographerProvider } from './contexts/PhotographerContext';
import PhotographerList from './components/hire/PhotographerList';
import PhotographerDetail from './components/hire/PhotographerDetails';
import PhotographerDashboard from './components/hire/PhotographerDashboard';
import { BookingProvider } from './contexts/BookingContext';
import PhotographerBookings from './components/hire/PhotographerBookings';
import Bookingdetails from './components/hire/Bookingdetails';
import UserBookings from './components/hire/UserBookings';
import FollowersList from './components/hire/FollowersList';
import FollowingList from './components/hire/FollowingList';
import { FollowProvider } from './contexts/FollowContext';

const App = () => {
    return (
        <ModalProvider>
        <PhotographerProvider>
            <FollowProvider>
        <UserProvider> {/* User Context Provider */}
            <BookingProvider>
        <ProductProvider>
        <WishlistProvider>
            <CartProvider>
                <Router>
                    <Layout>
                        <Routes>
                            {/* Home Route */}
                            <Route path="/" element={<Home />} />
                            
                            {/* User Registration Route */}
                            <Route path="/register" element={<Register />} />

                            {/* User Login Route */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contactus" element={<ContactUs />} />

                            {/* User Profile Route */}
                            <Route path="/shop/profile" element={<UserProfile />} />
                            <Route path="/shop/products" element={<ProductList />} />
                            <Route path="/shop/products/:id" element={<ProductDetails />} /> {/* Dynamic route for product details */}
                            <Route path="/shop/products/wishlist" element={<Wishlist />} />
                            <Route path="/shop/cart" element={<Cart />} />
                            <Route path="/shop/order" element={<Orders />} />

                            <Route path="/hire/bussiness" element={<HireBussinessPage/>}/>
                            <Route path="/hire/photoregister" element={<Photoregister/>}/>


                            <Route path="/hire/photographers" element={<PhotographerList />} />
                            <Route path="/hire/photographers/:id" element={<PhotographerDetail />} />
                            <Route path="/hire/photographerdashboard" element={<PhotographerDashboard />} />
                            <Route path="/hire/photographers/bookings" element={<PhotographerBookings />} />
                            <Route path="/hire/bookings/:bookingId" element={<Bookingdetails />} />

                            <Route path="/hire/users/bookings" element={<UserBookings />} />
                            <Route path="/hire/users/followers" element={<FollowersList />} />
                            <Route path="/hire/users/following" element={<FollowingList />} />
                        </Routes>
                    </Layout>
                </Router>
                </CartProvider>
                </WishlistProvider>
                </ProductProvider>
                </BookingProvider>
        </UserProvider>
        </FollowProvider>
        </PhotographerProvider>
        </ModalProvider>
    );
};

export default App;
