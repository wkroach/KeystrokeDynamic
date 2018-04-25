import React from 'react';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
    input:{
      width:200,
    }
};

export class PasswordInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
        };
        this.handleClear = this.handleClear.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event){
        this.setState({
            value: event.target.value,
        });
    };

    handleClear(event){
        this.setState({
            value:"",
        });
    };

    render(){
        return (
            <FormControl>
                <InputLabel htmlFor="password">密码</InputLabel>
                <Input
                    id="password"
                    type={"password"}
                    style={styles.input}
                    value={this.state.value}
                    onChange={this.handleOnChange}
                    endAdornment={
                        <InputAdornment position={"end"}>
                            <IconButton
                                aria-label={"clear"}
                                onClick={this.handleClear}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
}
