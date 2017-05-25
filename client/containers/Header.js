import React from 'react'
import {Avatar, AppBar} from 'material-ui';
import {white} from 'material-ui/styles/colors';
import logo from '../images/logo.png';
import avatar from '../images/avatar.png';

class Header extends React.Component {
  render() {
    const styles = {
      appTitle: {
        cursor: 'pointer'
      },
      textColor: {
        color: white
      },
      appBarContainer: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center'
      },
      userName: {
        'padding-left': '15px',
        color: white
      },
    };

    return (
      <AppBar
        style={styles.appBarContainer}
        title={<span style={styles.appTitle}>Concert Playlist Builder</span>}
        titleStyle={styles.textColor}
        iconElementLeft={<img src={logo} alt="Logo" height="50" />}
      >
        <Avatar src={avatar} />
        <h3 style={styles.userName}>John Doe</h3>
      </AppBar>
    );
  }
}

export default Header;
