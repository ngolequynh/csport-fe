import * as React from "react";
import * as Redux from "redux";
import MemberShortInfo from "./MemberShortInfo";
import { searchUserActions } from "~/data/searchUser/index";
import { UserType } from "~/data/searchUser/actionCreators";
import { TextField } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { connect } from "react-redux";
import "./SearchUserInTeam.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import green from "@material-ui/core/colors/green";
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { competitionActions } from "~/data/competition";

interface UserListProps {
    userList: UserType[];
    fetchUserList: Redux.ActionCreator<{}>;
    currentUser: {
        accountId: string;
    };
    fetchCompetitions: Redux.ActionCreator<{}>;
}

interface SearchBoxState {
    fullName: string;
    isEmpty: boolean;
    notificationOpen: boolean;
}

const theme = createMuiTheme({
    overrides: {
        MuiSnackbarContent: {
            root: {
                backgroundColor: green[600],
            },
        },
    },
});

class SearchUserInTeam extends React.Component<UserListProps, {}> {
    state: SearchBoxState = {
        fullName: "",
        isEmpty: true,
        notificationOpen: false,
    };

    private notificationOpen = (): void => {
        this.setState({ notificationOpen: true });
    };

    private notificationClose = (): void => {
        this.setState({ notificationOpen: false });
    };

    private renderNotification = (): void => {
        this.notificationOpen();
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            fullName: event.target.value,
        });
    };
    private handleClick = (): void => {
        if (this.state.fullName) {
            const userId = this.props.currentUser ? this.props.currentUser.accountId : "1";
            this.props.fetchUserList(this.state.fullName, userId);
            this.props.fetchCompetitions(userId);
        }
        this.setState({ isEmpty: false });
    };
    private handleEnter = (event: React.KeyboardEvent): void => {
        if (event.key === "Enter") {
            this.handleClick();
        }
    };
    render(): React.ReactNode {
        let list = null;
        const userId = this.props.currentUser ? this.props.currentUser.accountId : "1";
        if (this.state.isEmpty) {
            list = <div />;
        } else {
            if (this.props.userList === undefined || this.props.userList.length === 0) {
                list = <div className="au-list-member">No result</div>;
            } else {
                list = (
                    <div className="au-list-member">
                        {this.props.userList.map((user: UserType) => {
                            return (
                                <div className="au-list-member-component" key={user.accountId}>
                                    <MemberShortInfo
                                        accountId={user.accountId}
                                        fullName={user.fullName}
                                        email={user.email}
                                        imageLink={user.imageLink}
                                        refreshUsersList={this.handleClick}
                                        turnOn={this.renderNotification}
                                        userId={userId}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }
        return (
            <div className="au-container">
                <div className="au-search-box">
                    <TextField
                        id="input-with-icon-grid"
                        label="Find people"
                        className="search-box"
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search onClick={this.handleClick} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                {list}
                <MuiThemeProvider theme={theme}>
                    <Snackbar
                        className="nofi"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        open={this.state.notificationOpen}
                        autoHideDuration={2000}
                        onClose={this.notificationClose}
                        message={
                            <span id="message-id">
                                <CheckCircleIcon id="checked-icon" />
                                Invite successfully!!
                            </span>
                        }
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: any) => {
    return {
        userList: state.searchUser.list.data,
        currentUser: state.currentUser.currentUser,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserList: (fullName: string, accountId: string) => {
            dispatch(searchUserActions.fetchUserListNotInCompetition(fullName, accountId));
        },
        fetchCompetitions: (userId: string) => {
            dispatch(competitionActions.fetchCompetitions(userId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchUserInTeam);
