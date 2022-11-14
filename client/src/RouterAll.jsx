import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Success from './pages/Success';
import NotFound from './pages/NotFound/NotFound';
import { ToastContainer } from 'react-toastify'
import EditUser from './pages/EditUser';
import { useSelector } from 'react-redux';
const RouterAll = () => {
    const user = useSelector((state) => state.user.currentUser.user);
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/login" element ={user ? <Navigate to="/"  /> : <Login />}/>
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
                <Route path='/success' element={<Success />} />
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='/products/:category' element={<ProductList />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/profile/:id' element={<EditUser />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterAll;