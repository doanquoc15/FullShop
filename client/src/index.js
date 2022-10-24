import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Success from './pages/Success';
import NotFound from './pages/NotFound/NotFound';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import cartReducer, { getTotal } from './redux/cartSlice';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import userReducer from './redux/userSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  },
})

store.dispatch(getTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);

