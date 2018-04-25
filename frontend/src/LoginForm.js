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

export class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen(){
        this.setState({
            open:true,
        });
    }

    handleClose(){
        this.setState({
            open:false,
        });
    }

    render(){
        return (
            <div style={styles.container}>
                <h1> Welcome to Easy Keystroke</h1>
                    <h2> by wkroach</h2>
                <KeystrokeForm
                    countTimes={1}
                />
                <Button
                        variant={"raised"}
                        color={"primary"}
                        style={styles.button}
                    >
                    登陆
                </Button>
                <Button
                    variant={"raised"}
                    color="primary"
                    style={styles.button}
                    onClick={this.handleOpen}
                >
                    注册
                </Button><br/>

                <CreateAccountDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}
