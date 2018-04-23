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

import {request} from './utils'
import {UsernameInput} from "./UsernameInput";

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


function ajax() {
   let url = "http://127.0.0.1:8000/authenticate/add_account/";
   let f = (json)=>{alert("username: " + json["username"] + "\n" + "password: " + json["password"]);};
   request(url, {}, f, f, f, f);
    //request2(url, {});
    //f("debug");
}


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
  
  handleCreateAccount = () => {
      ajax();
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
          <h1>Material-UI</h1>
            <h2>example project</h2>
            <UsernameInput/>
            <TextField
                hintText={"input password"}
            /><br></br>
          <RaisedButton
            label="Super Secret Password"
            primary={true}
            onClick={this.handleTouchTap}
          /><br></br>
            <RaisedButton
                label={"create account"}
                primary={false}
                secondary={true}
                onClick={this.handleCreateAccount}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
