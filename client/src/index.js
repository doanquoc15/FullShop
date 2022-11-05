import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import RouterAll from './RouterAll';
import { store } from './redux/store';
import { getTotal } from './redux/cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(getTotal());

root.render(
    <Provider store={store} >
        <RouterAll />
    </Provider>
);

