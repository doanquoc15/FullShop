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
    const isAdmin = useSelector(state => state.user.currentUser.isAdmin)
    return (
        <BrowserRouter>
            <ToastContainer />
            {
                isAdmin ? (<Routes>
                    <Route path="/login" element={<Login />} />
                    <Routes path="/" element={isAdmin ? <Home /> : <Login />} >
                        <Route index element={<Home />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/user/:userId" element={<User />} />
                        <Route path="/newUser" element={<NewUser />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:productId" element={<Product />} />
                        <Route path="/newproduct" element={<NewProduct />} />
                    </Routes>
                </Routes>) : <Login />
            }

        </BrowserRouter>
    );
};

export default RouterAll;