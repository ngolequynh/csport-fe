import * as React from "react";
import "./LoginForm.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import FacebookLogin from "../../components/socialLogin/FacebookLogin";

interface LoginFormState {
    name: string;
}
class LoginForm extends React.Component<{}, LoginFormState> {
    state: LoginFormState = {
        name: "",
    };

    // handle state when input change
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: event.target.value,
        });
    };
    render(): React.ReactNode {
        return (
            <Grid container className="gradient">
                <Grid item xs={10} md={7} lg={3} sm={10} className="login-form">
                    <img
                        src={require("../../theme/images/logo.png")}
                        height="70px"
                        alt="logo Sport"
                        className="login-logo"
                    />
                    <h1 className="login-title">Login</h1>
                    <div className="login-label login-normal-label">Username</div>
                    <div>
                        <TextField
                            id="username"
                            label=""
                            placeholder="Type your username"
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                            className="login-text-field username-textfield"
                        />
                    </div>
                    <div className="login-label login-normal-label">Password</div>
                    <div>
                        <TextField
                            id="password"
                            label=""
                            placeholder="Type your password"
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                            type="password"
                            className="login-text-field"
                        />
                    </div>
                    <div className="forgot-password-text">
                        <a href="" className="login-label login-forgot-password-label">
                            Forgot password?
                        </a>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" className="login-form-btn">
                            LOGIN
                            <Icon style={{ marginLeft: "24px" }}>send</Icon>
                        </Button>
                    </div>
                    <div className="login-label" style={{ marginTop: "16px" }}>
                        Or login using
                    </div>
                    <div className="login-round-button-row">
                        <FacebookLogin />
                        <Button variant="fab" color="secondary" className="google-icon-button">
                            <i className="fab fa-google" />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default LoginForm;
