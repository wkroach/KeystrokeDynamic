import React from 'react';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

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
            <Input
                type={"password"}
                label={"密码"}
                placeholder={"密码"}
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

        );
    }
}
