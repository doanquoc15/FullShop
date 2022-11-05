import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Home from './pages/home/Home'
import { useSelector } from 'react-redux'
import Login from './pages/login/Login'
import App from './App';
import { ToastContainer } from 'react-toastify'

const RouterAll = () => {
    const isLoading = useSelector(state => state.user.isLoading)
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/login" element = {isLoading ? <Navigate to="/" replace /> : <Login />}/>
                <Route path="/" element={<App />} >
                    <Route index element={<Home />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/user/:userId" element={<User />} />
                    <Route path="/newUser" element={<NewUser />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/newproduct" element={<NewProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouterAll;