import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import CompetitionCard from "~/pages/competition/CompetitionCard";
import { competitionActions } from "~/data/competition";
import Grid from "@material-ui/core/Grid/Grid";
import { InformationType } from "~/data/competition/actionCreators";
import FloatingAddButton from "~/containers/AddTeam/FloatingAddButton";
import AddUserDialog from "~/containers/competition/AddUserDialog";
import Typography from "@material-ui/core/Typography/Typography";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

interface CompetitionType {
    competitionId: string;
    host: InformationType;
    invitee: InformationType;
    inviteeId: string;
}

interface CompetitionState {
    competition: {
        listCompetitions: CompetitionType[] | null;
    };
    currentUser: {
        currentUser: {};
    };
}

interface ParticipantProps {
    listCompetitions: CompetitionType[];
    fetchCompetitions: Redux.ActionCreator<{}>;
    currentUser: {
        accountId: string;
    };
}

class CompetitionList extends React.Component<ParticipantProps, {}> {
    state = {
        isOpen: false,
    };

    private handleClickOpen = (): void => {
        this.setState({ isOpen: true });
    };

    private handleClose = (): void => {
        this.setState({ isOpen: false });
    };
    componentDidMount(): void {
        if (this.props.currentUser) {
            this.props.fetchCompetitions(this.props.currentUser.accountId);
        }
    }
    componentDidUpdate(nextProps: ParticipantProps): void {
        if (
            JSON.stringify(this.props.listCompetitions) !==
                JSON.stringify(nextProps.listCompetitions) ||
            this.props.currentUser !== nextProps.currentUser
        ) {
            this.props.fetchCompetitions(this.props.currentUser.accountId);
        }
    }
    render(): React.ReactNode {
        let listCompetition = null;
        if (!this.props.currentUser) {
            listCompetition = <div />;
        } else {
            if (this.props.listCompetitions === null) {
                return <CircularProgress size={50} style={{ marginLeft: "48%" }} />;
            }
            if (this.props.listCompetitions.length === 0) {
                listCompetition = (
                    <Typography
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#015C7F",
                            fontSize: "larger",
                        }}
                        component="h1"
                    >
                        NO COMPETITIONS FOUND! <br /> LET'S CREATE A NEW COMPETITION
                    </Typography>
                );
            } else {
                listCompetition = (
                    <Grid container spacing={40}>
                        {this.props.listCompetitions.map((competition: CompetitionType, index) => {
                            return (
                                <Grid item lg={12} key={index} style={{ width: "100%" }}>
                                    <CompetitionCard
                                        competitionId={competition.competitionId}
                                        host={competition.host}
                                        invitee={competition.invitee}
                                        refreshCompetitions={this.props.fetchCompetitions}
                                        userId={this.props.currentUser.accountId}
                                        inviteeId={competition.inviteeId}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                );
            }
        }

        return (
            <div>
                {listCompetition}
                <div>
                    <FloatingAddButton onClickAddTeamButton={this.handleClickOpen} />
                    <AddUserDialog isOpen={this.state.isOpen} onClose={this.handleClose} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: CompetitionState) => {
    return {
        listCompetitions: state.competition.listCompetitions,
        currentUser: state.currentUser.currentUser,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchCompetitions: (userId: string) => {
            dispatch(competitionActions.fetchCompetitions(userId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompetitionList);
