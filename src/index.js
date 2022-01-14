import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk'
/** Own Bootstrap 4 Theme sass */
import "./Styles/mytheme.scss"
import reducers from "./reducers";
import {Provider} from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

