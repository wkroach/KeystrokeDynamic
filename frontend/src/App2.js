import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, hashHistory} from 'react-router'
import {LoginForm, checkLogin} from "./LoginForm";
import {Success} from "./Success";

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

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App2}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/success" component={Success} onEnter={checkLogin}/>
    </Router>
), document.getElementById('App2'));

//ReactDOM.render(<App2/>, document.getElementById('App2'));
//ReactDOM.render(<Main/>, document.getElementById('App2'));
//ReactDOM.render(<KeystrokeForm button1="登陆" button2="注册"/>, document.getElementById('App2'));
//ReactDOM.render(<LoginForm/>, document.getElementById('App2'));
//ReactDOM.render(<Success/>, document.getElementById('App2'));


