import React from 'react';
import TextField from 'material-ui/TextField';

import {request} from './utils'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
    input:{
      width:200,
    }
};

export class UsernameInput extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <TextField
                label={"用户名"}
                style={styles.input}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}