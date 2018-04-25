import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {UsernameInput} from "./UsernameInput";
import {PasswordInput} from "./PasswordInput";
import {request} from "./utils";

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
    button:{
      margin: 12,
    }
};
const theme = createMuiTheme(
    {
        palette:{
            type: 'light',
        }
    }
);

export class KeystrokeForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const countTimes = this.props.countTimes > 1 ? <Icon>{this.props.countTimes}</Icon> : null;
        return (
                <div>
                    <UsernameInput
                        value={""}
                    /><br/>
                    <PasswordInput
                        value={""}
                    />
                    {countTimes}
                </div>
        );
    }
}

