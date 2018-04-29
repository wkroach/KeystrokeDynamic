import React from 'react';
import ReactDOM from 'react-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//import Main from './Main';
import {LoginForm} from "./LoginForm";

class App2 extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to App2</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App2.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

//injectTapEventPlugin();
//ReactDOM.render(<App2/>, document.getElementById('App2'));
//ReactDOM.render(<Main/>, document.getElementById('App2'));
//ReactDOM.render(<KeystrokeForm button1="登陆" button2="注册"/>, document.getElementById('App2'));
ReactDOM.render(<LoginForm/>, document.getElementById('App2'));
//ReactDOM.render(<CreateAccountForm/>, document.getElementById('App2'));

