/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';

import store from './store';
import * as serviceWorker from './serviceWorker';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
