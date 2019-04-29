import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import { listUsersOfTeamActions } from "src/data/team/ListUsersOfTeam/index";
import MemberInfoDialog from "src/containers/TeamActivities/TeamInformation/TeamDetails/MemberInfoDialog";
import Grid from "@material-ui/core/Grid/Grid";
import { UserOfTeamInterface } from "src/data/team/ListUsersOfTeam/actionCreators";

interface ListUsersOfTeamState {
    listUsersOfTeam: {
        list: UserOfTeamInterface[];
    };
}

export interface TeamDetailsProps {
    listUsersOfTeam: UserOfTeamInterface[];
    fetchUsersOfTeam: Redux.ActionCreator<{}>;
    teamId: string;
    hostId: string;
    onRef: (ref: any) => any;
}

class TeamDetails extends React.Component<TeamDetailsProps, {}> {
    componentDidMount(): void {
        this.props.onRef(this);
        this.fetchUsersOfTeam();
    }

    componentWillUnmount(): void {
        this.props.onRef(undefined);
    }

    fetchUsersOfTeam = (): void => {
        this.props.fetchUsersOfTeam(this.props.teamId);
    };

    render(): React.ReactNode {
        let listUsers = null;

        if (this.props.listUsersOfTeam.length === 0) {
            listUsers = <div style={{ textAlign: "center" }}>No data found</div>;
        } else {
            listUsers = this.props.listUsersOfTeam.map((user: UserOfTeamInterface, index) => {
                return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        <MemberInfoDialog
                            fullScreen={true}
                            user={user}
                            teamId={this.props.teamId}
                            hostId={this.props.hostId}
                            refreshUsers={this.props.fetchUsersOfTeam}
                        />
                    </Grid>
                );
            });
        }

        return (
            <Grid container spacing={16} style={{ marginTop: "16px", maxHeight: "150px" }}>
                {listUsers}
            </Grid>
        );
    }
}
// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: ListUsersOfTeamState) => {
    return {
        listUsersOfTeam: state.listUsersOfTeam.list,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUsersOfTeam: (teamId: string) => {
            dispatch(listUsersOfTeamActions.fetchUsersOfTeam(teamId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamDetails);
