import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {request} from './utils'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

export class UsernameInput extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            value:props.value,
        }
    }

    handleOnChange = (event) => {
        this.setState({
            value: event.target.value,
        })
    }

    render(){
        const html =
                   <TextField
                       floatingLabelText={"用户名"}
                        value={this.state.value}
                        onChange={this.handleOnChange}
                   />;
        return html;
    }
}