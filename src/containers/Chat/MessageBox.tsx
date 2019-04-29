import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

interface MessageBoxProps {
    sendMessage: (msg: string) => void;
}

interface MessageBoxState {
    message: any;
}

class MessageBox extends React.Component<MessageBoxProps, MessageBoxState> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.state = {
            message: "",
        };
    }
    onChange(e: any) {
        this.setState({
            message: e.target.value,
        });
    }
    onKeyup(e: any) {
        if (e.keyCode === 13 && e.target.value.trim() !== "") {
            this.setState({
                message: "",
            });
            this.props.sendMessage(this.state.message);
        }
    }
    onClick(mes: string): void {
        this.props.sendMessage(mes);
        this.setState({
            message: "",
        });
    }
    render() {
        const sendLogo = require("../../theme/images/sendLogo.png");
        return (
            <Grid container>
                <Grid item xs={10}>
                    <TextField
                        style={{ width: "99%" }}
                        className="textarea"
                        placeholder="Type a message"
                        onChange={this.onChange}
                        onKeyUp={this.onKeyup}
                        value={this.state.message}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        onClick={() => this.onClick(this.state.message)}
                        style={{ justifyContent: "right" }}
                    >
                        <img src={sendLogo} style={{ width: "30px" }} />
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default MessageBox;
