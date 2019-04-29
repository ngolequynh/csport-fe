import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import { teamActions } from "../../data/team/index";
import CreatedTeamCard from "~/pages/team/CreatedTeamCard";
import Grid from "@material-ui/core/Grid/Grid";
import AddTeamDialog from "~/containers/AddTeam/AddTeamDialog";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import JoinedTeamCard from "~/pages/team/JoinedTeamCard";
import Typography from "@material-ui/core/Typography";

interface TeamType {
    teamId: string;
    name: string;
}

interface TeamListState {
    team: {
        listCreated: TeamType[];
        listJoined: TeamType[];
    };
    currentUser: {
        currentUser: {};
    };
}

interface TeamListProps {
    teamListCreated: TeamType[];
    teamListJoined: TeamType[];
    fetchCreatedTeams: Redux.ActionCreator<{}>;
    fetchJoinedTeams: Redux.ActionCreator<{}>;
    currentUser: {
        accountId: string;
    };
}

class TeamList extends React.Component<TeamListProps, {}> {
    // fetch user from server
    componentDidMount(): void {
        if (this.props.currentUser) {
            this.props.fetchCreatedTeams(this.props.currentUser.accountId);
            this.props.fetchJoinedTeams(this.props.currentUser.accountId);
        }
    }
    componentDidUpdate(nextProps: TeamListProps): void {
        if (
            JSON.stringify(this.props.teamListCreated) !==
                JSON.stringify(nextProps.teamListCreated) ||
            JSON.stringify(this.props.teamListJoined) !==
                JSON.stringify(nextProps.teamListJoined) ||
            this.props.currentUser !== nextProps.currentUser
        ) {
            this.props.fetchCreatedTeams(this.props.currentUser.accountId);
            this.props.fetchJoinedTeams(this.props.currentUser.accountId);
        }
    }
    render(): React.ReactNode {
        let list = null;
        if (!this.props.currentUser) {
            return <div />;
        }
        list = (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#015C7F",
                            }}
                            component="h1"
                        >
                            CREATED TEAMS
                        </Typography>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                marginLeft: "20px",
                            }}
                            component="h4"
                        >
                            {this.props.teamListCreated.length} team(s) created.
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            {this.props.teamListCreated.map((team: TeamType, index) => {
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        lg={2}
                                        md={4}
                                        sm={6}
                                        xs={12}
                                        style={{ padding: "10px" }}
                                    >
                                        <CreatedTeamCard
                                            name={team.name}
                                            teamId={team.teamId}
                                            refreshTeams={this.props.fetchCreatedTeams}
                                            userId={this.props.currentUser.accountId}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#015C7F",
                            }}
                            component="h1"
                        >
                            JOINED TEAMS
                        </Typography>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                marginLeft: "20px",
                            }}
                            component="h4"
                        >
                            {this.props.teamListJoined.length} team(s) joined.
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {
                            <Grid container>
                                {this.props.teamListJoined.map((team: TeamType, index) => {
                                    return (
                                        <Grid
                                            key={index}
                                            item
                                            lg={2}
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            style={{ padding: "10px" }}
                                        >
                                            <JoinedTeamCard
                                                name={team.name}
                                                teamId={team.teamId}
                                                refreshTeams={this.props.fetchJoinedTeams}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );

        return (
            <div>
                {list}
                <AddTeamDialog
                    refreshTeams={this.props.fetchCreatedTeams}
                    userId={this.props.currentUser.accountId}
                    handleDialogClosed={""}
                    fullScreen
                />
            </div>
        );
    }
}

// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: TeamListState) => {
    return {
        teamListCreated: state.team.listCreated,
        teamListJoined: state.team.listJoined,
        currentUser: state.currentUser.currentUser,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchCreatedTeams: (userId: string) => {
            dispatch(teamActions.fetchCreatedTeams(userId));
        },
        fetchJoinedTeams: (userId: string) => {
            dispatch(teamActions.fetchJoinedTeams(userId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamList);
