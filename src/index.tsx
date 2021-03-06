import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { store } from './redux/store';

import 'reset-css';
import './index.scss';

const render = (Component: JSX.Element, id: string) => ReactDOM.render(Component, document.getElementById(id))

const Component = (
    <Provider store={store}>
      <App />
    </Provider>
);


document.addEventListener('DOMContentLoaded', () => render(Component, 'root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
