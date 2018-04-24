import React from 'react';
import TextField from 'material-ui/TextField';

import {request} from './utils'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

export class UsernameInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        }
        this.handleOnChange = this.handleOnChange.bind(this);

    }

    handleOnChange(event){
        this.setState({
            value: event.target.value,
        })
    };

    render(){
        return (
            <TextField
                label={"用户名"}
                placeholder={"用户名"}
                value={this.state.value}
                onChange={this.handleOnChange}
            />
        );
    }
}