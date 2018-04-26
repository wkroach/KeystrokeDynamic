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
            send:false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClick(){
        this.setState((prevState) => {
                return {send: !prevState.send};
            });
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

    ajax(username, password, keystroke){
        let url = "http://127.0.0.1:8000/authenticate/test_frontend_login/";
        var options = {body: JSON.stringify({username: username, password: password, keystroke: keystroke})};
        let f = (json)=>{console.log(json);};
        request(url, options,f,f,f,f);
    }

    render(){
        return (
            <div style={styles.container}>
                <h1> Welcome to Easy Keystroke</h1>
                    <h2> by wkroach</h2>
                <KeystrokeForm
                    countTimes={1}
                    onSend={this.state.send}
                    ajax={this.ajax}
                />
                <Button
                        variant={"raised"}
                        color={"primary"}
                        style={styles.button}
                        onClick={this.handleClick}
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
