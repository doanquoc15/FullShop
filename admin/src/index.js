import React from 'react';
import ReactDOM from 'react-dom';
import RouterAll from './RouterAll'
import { Provider } from "react-redux";
import { store } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
    <Provider store={store}>
        <RouterAll />
    </Provider>,
    document.getElementById("root")
);