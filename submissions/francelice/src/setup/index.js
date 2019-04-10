import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import store from './store';

//Set up store


export const render = (store) => {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app-container'));
}

render(store);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
