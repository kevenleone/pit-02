import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="bottom-left" />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
);
