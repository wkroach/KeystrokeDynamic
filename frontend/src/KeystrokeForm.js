import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Done from '@material-ui/icons/Done'
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
        this.state={
            usernameValue:"",
            passwordValue:"",
            keystrokeKeyboardSequenceArray:[],
            keystrokeKeyboardSequence:"",
            keystroke:{},
            keystrokeArray:[],
            inputTimes:0,
        };
        this.handleAddKeystroke = this.handleAddKeystroke.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleAddKeystroke(){
        if(this.state.inputTimes < this.props.countTimes) {
            this.setState((prevState) => {
                console.log(this.state.keystrokeKeyboardSequence);
                console.log(this.state.keystrokeKeyboardSequenceArray);
                let keystrokeTmp = this.state.keystroke;
                var len = prevState.keystrokeKeyboardSequenceArray.length;

                if(this.state.keystrokeKeyboardSequence.length === 0){
                    alert("密码不能为空");
                    return {};
                }

                if(len !== 0
                    && this.state.keystrokeKeyboardSequence !== this.state.keystrokeKeyboardSequenceArray[len-1]){
                    alert("击键特征与已有击键特征冲突，请重新输入");
                    return {};
                }
                return {
                    keystrokeArray: prevState.keystrokeArray.concat([keystrokeTmp]),
                    inputTimes: prevState.inputTimes + 1,
                    keystrokeKeyboardSequenceArray: prevState.keystrokeKeyboardSequenceArray.concat([this.state.keystrokeKeyboardSequence]),
                };
            });
        }

    }

    handlePasswordChange(event){
        this.setState({
            passwordValue: event.target.value,
        });
    }

    handleUsernameChange(event){
        this.setState({
            usernameValue: event.target.value,
        });
    }

    handleKeyDown(event){
        const key = String(event.which);
        if(key == "12"){
            return;
        }
        if(key === "13"){
            if(this.props.type == "CreateAccount"){
                this.handleAddKeystroke();
                this.handleClear();
            }
            else if(this.props.type == "login"){
                this.sendLoginInfo();
            }
           return;
        }
        const time = new Date().getTime();
        this.setState((prevState) => {
            if (prevState.keystroke[key] == null) {
                prevState.keystroke[key] = new Array();
                prevState.keystroke[key].push({"time": time, "type": "d"})
                prevState.keystrokeKeyboardSequence += key;
            } else {
                if (prevState.keystroke[key][prevState.keystroke[key].length - 1].type !== "d") {
                    prevState.keystroke[key].push({"time": time, "type": "d"});
                    prevState.keystrokeKeyboardSequence += key;
                }
            }
            return {keystroke:prevState.keystroke, keystrokeKeyboardSequence:prevState.keystrokeKeyboardSequence};
        });
    }

    handleKeyUp(event){
        const key = String(event.which);
        const time = new Date().getTime();
        this.setState((prevState) => {
            if(prevState.keystroke[key] != null
                && prevState.keystroke[key][prevState.keystroke[key].length - 1].type !== "u"){
                prevState.keystroke[key].push({"time": time, "type": "u"});
                return {keystroke: prevState.keystroke};
            }
        });
    }

    handleClear(event){
        this.setState({
            passwordValue:"",
            keystroke:{},
            keystrokeKeyboardSequence:""
        });
    }

    sendLoginInfo(prevState){
        if(this.props.type === "login"){
                if(this.state.usernameValue === "" || this.state.passwordValue === ""){
                    alert("请输入用户名和密码");
                }else{
                    let username = this.state.usernameValue;
                    let password = this.state.passwordValue;
                    let keystroke = this.state.keystroke;
                    this.props.ajax(username, password, keystroke);
                    this.handleClear();
                }
            }else if(this.props.type === "CreateAccount"){
                if(this.props.countTimes - this.state.inputTimes > 0) {
                    console.log(this.props.countTimes);
                    console.log(this.state.inputTimes);
                    alert("请再输入至少" + (this.props.countTimes - this.state.inputTimes) + "次密码");
                }else{
                    this.props.ajax(this.state.usernameValue, prevState.passwordValue, this.state.keystrokeArray);
                }
            }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.onSend !== this.props.onSend){
           this.sendLoginInfo();
           return;
        }
        if(prevState.inputTimes == this.props.countTimes-1 && this.state.inputTimes == this.props.countTimes){
            this.sendLoginInfo(prevState);
            return;
        }
        //if(prevState.onClear !== this.props.onClear){
         //   this.handleClear();
        //}
    }

    render(){
        const countTimes = this.props.countTimes > 1
                            ?
                                <IconButton
                                    onClick={this.handleAddKeystroke}
                                >{
                                        this.state.inputTimes < this.props.countTimes ?
                                        this.props.countTimes-this.state.inputTimes :
                                            <Done/>
                                }
                                </IconButton>
                            : null;
        return (
                <div>
                    <UsernameInput
                        value={this.state.usernameValue}
                        onChange={this.handleUsernameChange}
                    /><br/>
                    <PasswordInput
                        value={this.state.passwordValue}
                        onChange={this.handlePasswordChange}
                        onKeyDown={this.handleKeyDown}
                        onKeyUp={this.handleKeyUp}
                        onClear={this.handleClear}
                    />
                    {countTimes}
                </div>
        );
    }
}

