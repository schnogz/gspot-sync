import React from 'react';
import ReactDOM from 'react-dom';
import 'roboto-fontface';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import './styles/index.css';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);
