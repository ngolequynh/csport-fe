import * as React from "react";
import Grid from "@material-ui/core/Grid";
import "./UserShortInfo.scss";
import { UserType } from "../../data/searchUser/actionCreators";
import { Link } from "react-router-dom";

export default class UserShortInfo extends React.Component<UserType, {}> {
    render() {
        return (
            <Grid container>
                <Link className="link" to={`/profile/${this.props.accountId}`}>
                    <div className="user-short-info-container">
                        <div className="user-short-info-avatar-wrapper">
                            <img
                                src={this.props.imageLink}
                                alt=" "
                                className="user-short-info-image"
                            />
                        </div>
                        <div className="user-short-info-info-wrapper">
                            <h4>{this.props.fullName}</h4>
                            <p>{this.props.email}</p>
                        </div>
                    </div>
                </Link>
            </Grid>
        );
    }
}
