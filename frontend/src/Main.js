/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import {blue400} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: blue400,
  },
    head:{
      headerColor: blue400,
    }
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  handleKeyDown = (event)=>{
      alert(event.which);
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            title="Super Secret Password"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
              <TextField/><br></br>
            1-2-3-4-5
          </Dialog>
          <h1>Material-UI </h1>
            <h2>I love Rice</h2>
            <TextField
                hintText={"input password"}
                onKeyUp={this.handleKeyDown}
            /><br></br>
          <RaisedButton
            label="Super Secret Password"
            primary={true}
            onClick={this.handleTouchTap}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
