import * as React from "react";
import * as Redux from "redux";
import User from "../../components/userExample/User";
import NewUser from "../../containers/NewUser";
import { connect } from "react-redux";
import { userActions } from "../../data/user/index";

interface UserType {
    id: string;
    name: string;
    username: string;
    email: string;
    website: string;
}

interface UserListState {
    user: {
        list: UserType[];
    };
}

interface UserListProps {
    userList: UserType[];
    fetchUser: Redux.ActionCreator<{}>;
}
class UserList extends React.Component<UserListProps, {}> {
    // fetch user from server
    componentDidMount(): void {
        this.props.fetchUser();
    }
    render(): React.ReactNode {
        let list = null;
        if (this.props.userList.length === 0) {
            list = <div>No data found</div>;
        } else {
            list = (
                <div style={{ display: "flex" }}>
                    {this.props.userList.map((user: UserType) => {
                        return (
                            <User
                                key={user.id}
                                name={user.name}
                                username={user.username}
                                email={user.email}
                                website={user.website}
                            />
                        );
                    })}
                </div>
            );
        }
        return (
            <div>
                {list}
                <NewUser />
            </div>
        );
    }
}

// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: UserListState) => {
    return {
        userList: state.user.list,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUser: () => {
            dispatch(userActions.fetchUser());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserList);
