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
    }


    render(){
        return (
            <FormControl>
                <InputLabel htmlFor="password">密码</InputLabel>
                <Input
                    id="password"
                    type={"password"}
                    style={styles.input}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onKeyDown={this.props.onKeyDown}
                    onKeyUp={this.props.onKeyUp}
                    endAdornment={
                        <InputAdornment position={"end"}>
                            <IconButton
                                aria-label={"clear"}
                                onClick={this.props.onClear}
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
