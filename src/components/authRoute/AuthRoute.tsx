import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../data/auth";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router";

interface AuthRouteProps {
    component: any;
    needAuth: boolean;
    needGuest: boolean;
    exact: boolean;
    path: string;
    getCurrentUser: () => void;
}

export class AuthRoute extends React.Component<AuthRouteProps & RouteComponentProps<{}>, {}> {
    async componentWillMount(): Promise<void> {
        if (localStorage.getItem("accessToken") !== null) {
            await this.props.getCurrentUser();
        }
    }
    // set access token into local storage
    private setAccessToken = (accessToken: String): void => {
        const token = accessToken.substring(7, accessToken.length);
        localStorage.setItem("token", token);
    };
    // refresh page after login
    private closeAndRefresh = (): void => {
        opener.location.reload(); // reload your login page
        window.close(); // close pop up window
    };
    // set access token into local storage
    private fetchNewAccessToken = async (): Promise<void> => {
        if (localStorage.getItem("token") !== null) {
            const instance = axios.create({
                baseURL: process.env.LOCAL_HOST_URL + "",
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            await instance.get("/login/fetchnewaccesstoken").then(response => {
                let token = response.headers.mgmsports_authorization;
                token = token.substring(7, token.length);
                localStorage.setItem("accessToken", token);
                return response;
            });
        }
    };
    render(): React.ReactNode {
        const { component: Component, ...rest } = this.props;
        let error;
        if (this.props.location.pathname === "/social-success") {
            this.setAccessToken(this.props.location.search);
            this.fetchNewAccessToken().then(() => {
                this.closeAndRefresh();
            });
        }
        if (localStorage.getItem("accessToken") === null) {
            error = true;
        } else {
            error = false;
        }
        if (error && this.props.needAuth) {
            localStorage.removeItem("token");
            return <Route {...rest} render={() => <Redirect to="/" />} />;
        }
        if (!error && this.props.needGuest) {
            return <Route {...rest} render={() => <Redirect to={"/list"} />} />;
        }
        return <Route {...rest} render={props => <Component {...props} />} />;
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCurrentUser: () => {
            dispatch(authActions.getCurrentUser());
        },
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(withRouter(AuthRoute));
