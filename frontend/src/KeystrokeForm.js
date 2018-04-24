import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
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
const theme = createMuiTheme();

export class KeystrokeForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
                <MuiThemeProvider theme={theme}>
                <div style={styles.container}>
                    <UsernameInput
                        value={""}
                    /><br/>
                    <PasswordInput
                        value={""}
                    /><br/>
                    <Button
                        variant={"raised"}
                        color={"primary"}
                    >
                        登陆
                    </Button>
                    <Button
                        variant={"raised"}
                        color="primary"
                    >
                        注册
                    </Button><br/>
                </div>
                </MuiThemeProvider>
        );
    }
}

