import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/app';
import Header from './components/header'
import Repositorio from './components/repositorio'


ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Repositorio />
  </React.StrictMode>,
  document.getElementById('root')
);
