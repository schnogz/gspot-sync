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
*/
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
