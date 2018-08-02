import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {KeystrokeForm} from "./KeystrokeForm";
import {CreateAccountDialog} from "./CreateAccountDialog";
import {request} from "./utils";

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 20,
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

export class Success extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={styles.container}>
                <p>
                    <h1>
                        登录成功
                    </h1>
                </p>
            </div>
        );
    }

}
