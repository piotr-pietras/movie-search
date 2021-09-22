import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loading from './component/loading/Loading';
import store from './state/store'
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <Loading />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

