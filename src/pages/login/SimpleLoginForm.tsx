import * as React from "react";
import "./LoginForm.scss";
import Grid from "@material-ui/core/Grid";
import FacebookLogin from "../../components/socialLogin/FacebookLogin";
import GoogleLogin from "../../components/socialLogin/GoogleLogin";

class SimpleLoginForm extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <Grid container className="gradient">
                <Grid
                    item
                    xs={10}
                    md={7}
                    lg={3}
                    sm={10}
                    className="login-form"
                    style={{ height: "100%", minHeight: "300px" }}
                >
                    <img
                        src={require("../../theme/images/logo.png")}
                        alt="logo Sport"
                        className="login-logo"
                    />
                    <h1 className="login-title">Together Stronger</h1>
                    <div className="login-round-button-row" style={{ marginTop: "30%" }}>
                        <FacebookLogin />
                    </div>
                    <div className="footer">
                        <h2 className="h2">Trường Đại học Sư phạm Đà Nẵng</h2>
                        <h3 className="h3">Tháng 4 2019</h3>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default SimpleLoginForm;
