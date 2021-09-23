import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Loading from './component/loading/Loading';

import store from './state/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Loading />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

