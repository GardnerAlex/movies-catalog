import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
// import regeneratorRuntime from 'regenerator-runtime';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App/App';
// import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
