import React from 'react';
import ReactDOM from 'react-dom';
import 'roboto-fontface';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import './styles/index.css';

// needed for Mui
injectTapEventPlugin();

// load the app
ReactDOM.render(<App />, document.getElementById('root'));
