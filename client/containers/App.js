import React from 'react'
import styled from 'styled-components'
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {white} from 'material-ui/styles/colors';
import Header from './Header';

// Needed for onTouchTap (http://stackoverflow.com/a/34015469/988941)
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const Div = styled.div`
  text-align: center;
  padding-top: 200;
  color: white;
`;

class App extends React.Component {
  constructor(properties, context) {
    super(properties, context);

    this.muiTheme = getMuiTheme({
      palette: {
        alternateTextColor: white
      },
      appBar: {
        height: 65,
        color: '#84bd00',
        showMenuIconButton: false
      },
    });

    this.state = {
      open: false
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div>
          <Header />
          <Div>
            <h1>Upcoming Concerts</h1>
          </Div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App




/* TODO: make controller view to fetch this data!
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import 'whatwg-fetch';
/*
const App = () => (
  <MuiThemeProvider>
    <RaisedButton label="Hello World!" />
  </MuiThemeProvider>
);

export default App;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      concerts: []
    };
  }

  componentDidMount() {
    let that = this;
    fetch('/api/songkick/search/events', {}).then(function(response) {
      response.json().then(function(data) {
        const concerts = data;
        that.setState({ concerts });
      });
    }, function(error) {
      // handle network error
    })
  }

  render() {
    return (
      <div>
        <h1>Concerts in Minneapolis</h1>
        <ul>
          {this.state.concerts.map(concert =>
            <li key={concert.id}>{concert.displayName}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
*/
