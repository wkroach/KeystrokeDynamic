import React from 'react';
import { browserHistory, hashHistory } from 'react-router'
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

export function checkLogin(){
    let url = "http://127.0.0.1:8000/authenticate/test_frontend_login/";
        //let options = {body: JSON.stringify({username: username, password: password, keystroke: keystroke})};
    let options = {};
    let successFun = (json)=>{
        alert("登陆成功");
    };
    let error = (json)=>{
        alert("登陆失败");
        console.log(json);
        const path = "/login";
        hashHistory.push(path);
    };
    //request(url, options,successFun, error, error, error);
}

export class LoginForm extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state={
            open:false,
            send:false,
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleLogin(){
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
        let url = "http://127.0.0.1:8000/authenticate/react_login/";
        let options = {body: JSON.stringify({username: username, password: password, keystroke: keystroke})};
        let successFun = (json)=>{
            alert("登陆成功");
            const path = '/success';
            hashHistory.push(path);
        };
        let error404Fun = (json)=>{alert("登陆失败, 用户名与密码不匹配"); console.log(json)};
        let errorFun = (json)=>{
            alert("登录失败，击键特征不符");
            console.log(json);
        };
        let otherFun = (json)=>{alert("未知错误"); console.log(json)};
        request(url, options,successFun,error404Fun,errorFun,otherFun);
    }

    render(){
        return (
            <div style={styles.container}>
                <h1> Welcome to Easy Keystroke</h1>
                    <h2> by wkroach</h2>
                <KeystrokeForm
                    countTimes={1}
                    onSend={this.state.send}
                    type={"login"}
                    ajax={this.ajax}
                />
                <Button
                        variant={"raised"}
                        color={"primary"}
                        style={styles.button}
                        onClick={this.handleLogin}
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
