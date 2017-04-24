//import './favicon.ico';
import './index.html';
import 'babel-polyfill';
import 'normalize.css/normalize.css';
import './scss/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/app';

ReactDOM.render(<App name='World'/>, document.getElementById('root'));