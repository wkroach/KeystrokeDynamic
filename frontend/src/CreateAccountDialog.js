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
import {CreateAccountForm} from "./CreateAccountForm";
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
                            countTimes={15}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                           color={"primary"}
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
