import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const App = () => (
  <MuiThemeProvider>
    <RaisedButton label="Hello World!" />
  </MuiThemeProvider>
);

export default App;
