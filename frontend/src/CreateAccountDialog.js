import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
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

export class CreateAccountDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            send:false,
        }
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }

    handleCreateAccount(){
        this.setState((prevState)=>{
            return {send: !prevState.send};
        });
    }

    ajax(username, password, keystrokeArray){
        //real
        // let url = "http://127.0.0.1:8000/authenticate/react_add_account/";
        //test
        let url = "http://127.0.0.1:8000/authenticate/test_frontend_add_account/";
        let options = {body: JSON.stringify({username: username, password: password, keystrokeArray: keystrokeArray})};
        let successFun = (json)=>{
                alert("注册成功");
                let str = "击键按键顺序: " + json[0]['keystroke_str'] + "\n";
                for(let i = 0; i < json.length;++i) {
                    str += "击键时间特征向量: " + json[i]['time_vector_str']+"\n";
                }
                alert(str);
                console.log(json)
        };
        let error404Fun = (json)=>{alert("注册失败, 用户名已被使用"); console.log(json)};
        let otherFun = (json)=>{alert("未知错误"); console.log(json)};
        request(url, options,successFun,error404Fun,otherFun,otherFun);
    }

    render(){
        return (
            <div style={styles.container}>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <DialogTitle>
                        注册
                    </DialogTitle>

                    <DialogContent>
                        <KeystrokeForm
                            countTimes={5}
                            onSend={this.state.send}
                            type={"CreateAccount"}
                            ajax={this.ajax}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                           color={"primary"}
                           onClick={this.handleCreateAccount}
                        >
                           确定
                        </Button>
                        <Button
                            color={"primary"}
                            onClick={this.props.onClose}
                        >
                            返回
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
