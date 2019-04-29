import * as React from "react";
import * as Redux from "redux";
import UserShortInfo from "../../components/userShortInfo/UserShortInfo";
import { connect } from "react-redux";
import { searchUserActions } from "../../data/searchUser/index";
import { UserType } from "../../data/searchUser/actionCreators";
import Grid from "@material-ui/core/Grid";
import "./SearchUser.scss";

interface UserListProps {
    userList: UserType[];
    fetchUserList: Redux.ActionCreator<{}>;
    match: any;
}

class SearchUser extends React.Component<UserListProps, {}> {
    // fetch user from server
    componentDidMount(): void {
        this.props.fetchUserList(this.props.match.params.username);
    }

    componentWillReceiveProps(nextProps: UserListProps): void {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.props.fetchUserList(nextProps.match.params.username);
        }
    }

    render(): React.ReactNode {
        let list = null;
        if (this.props.userList === undefined || this.props.userList.length === 0) {
            list = <div className="find-user-error">No person found!!!</div>;
        } else {
            list = (
                <div className="find-user-div">
                    {this.props.userList.map((user: UserType) => {
                        return (
                            <Grid item xs={12} className="find-user-component" key={user.accountId}>
                                <UserShortInfo
                                    accountId={user.accountId}
                                    fullName={user.fullName}
                                    email={user.email}
                                    imageLink={user.imageLink}
                                />
                            </Grid>
                        );
                    })}
                </div>
            );
        }
        return (
            <Grid container spacing={16} className="find-user-grid">
                {list}
            </Grid>
        );
    }
}

// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: any) => {
    return {
        userList: state.searchUser.list.data,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserList: (username: string) => {
            dispatch(searchUserActions.fetchUserList(username));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchUser);
