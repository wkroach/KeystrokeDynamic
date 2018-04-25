import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {KeystrokeForm} from "./KeystrokeForm";
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

export class CreateAccountForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <KeystrokeForm/>
                <Button
                    color={"primary"}
                    style={styles.button}
                >
                    确定
                </Button>
                <Button
                    color="primary"
                    style={styles.button}
                    onClick={this.props.onClose}
                >
                    返回
                </Button><br/>
            </div>
        );
    }
}
