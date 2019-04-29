import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grow from "@material-ui/core/es/Grow/Grow";
import ComparisonCriteria from "~/containers/TeamComparison/ComparisonCriteria";
import DisplayTeamsName from "~/containers/TeamComparison/DisplayTeamsName";
import { TeamStatisticsComparisonInterface } from "~/data/team/teamComparison/actionCreators";
import * as Redux from "redux";
import { Theme } from "@material-ui/core";
import createStyles from "@material-ui/core/es/styles/createStyles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/es/Tab/Tab";
import { teamComparisonActions } from "~/data/team/teamComparison";
import { parseToHourAndMinute } from "~/common/util";
import { RouteComponentProps } from "react-router";
interface MemberInfoDialogProps extends RouteComponentProps<any> {
    fullScreen: any;
    classes: {
        root: string;
        dialogTitle: string;
        dialogContent: string;
        compareButton: string;
        backgroundDialogContent: string;
    };
    teamId: string;
    competitorId: string;
    teamStatistics: TeamStatisticsComparisonInterface[];
    fetchTeamComparison: Redux.ActionCreator<{}>;
}

interface TeamComparisonListState {
    teamComparison: {
        list: TeamStatisticsComparisonInterface[];
    };
}
interface OwnTeamComparisonListState {
    open: boolean;
    value: string;
    timeZoneOffset: number;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: "100%",
            backgroundColor: theme.palette.background.paper,
        },
        dialogTitle: {
            backgroundColor: "#195485",
            backgroundSize: "cover",
            textAlign: "center",
        },

        dialogContent: {
            padding: "0",
            background: "#a5cfdfcf",
        },

        compareButton: {
            backgroundColor: "#f5eeee73",
            justifyContent: "left",
        },

        backgroundDialogContent: {
            background: "#a5cfdfcf",
            backgroundSize: "cover",
            paddingTop: "16px",
        },
    });

class TeamComparisonListDialog extends React.Component<
    MemberInfoDialogProps,
    OwnTeamComparisonListState
> {
    constructor(props: MemberInfoDialogProps) {
        super(props);
        const date = new Date();
        this.state = {
            open: true,
            value: "0",
            timeZoneOffset: date.getTimezoneOffset(),
        };
    }

    componentDidMount(): void {
        this.props.fetchTeamComparison(
            this.props.match.params.teamId,
            this.props.match.params.competitorId,
            this.state.value,
            this.state.timeZoneOffset,
        );
    }

    private handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        if (event) {
            this.setState(
                {
                    value,
                },
                () => {
                    this.props.fetchTeamComparison(
                        this.props.match.params.teamId,
                        this.props.match.params.competitorId,
                        this.state.value,
                        this.state.timeZoneOffset,
                    );
                },
            );
        }
    };

    private handleClose = (): void => {
        this.setState({ open: false });
    };

    private goBack = () => {
        this.props.history.goBack();
    };

    render(): React.ReactNode {
        const { fullScreen } = this.props;
        let teamComparisonContent = null;
        if (this.props.teamStatistics && this.props.teamStatistics.length >= 2) {
            teamComparisonContent = (
                <div className={this.props.classes.backgroundDialogContent}>
                    <Grid container spacing={16}>
                        <Grow in={true} timeout={2500}>
                            <Grid item xs={12}>
                                <ComparisonCriteria
                                    criteriaTitle="Total members"
                                    unit="members"
                                    criteriaValue={this.props.teamStatistics[0].memberTotal}
                                    oppositeCriteriaValue={this.props.teamStatistics[1].memberTotal}
                                    icon={require("../../theme/images/people.png")}
                                />
                            </Grid>
                        </Grow>
                        <Grow in={true} timeout={2500}>
                            <Grid item xs={12}>
                                <ComparisonCriteria
                                    criteriaTitle="Active members"
                                    unit="active members"
                                    criteriaValue={this.props.teamStatistics[0].activeMemberTotal}
                                    oppositeCriteriaValue={
                                        this.props.teamStatistics[1].activeMemberTotal
                                    }
                                    icon={require("../../theme/images/active.png")}
                                />
                            </Grid>
                        </Grow>
                        {(this.props.teamStatistics[0].runningDistanceTotal !== "0.0" ||
                            this.props.teamStatistics[1].runningDistanceTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Running"
                                        unit="km"
                                        criteriaValue={
                                            this.props.teamStatistics[0].runningDistanceTotal
                                        }
                                        oppositeCriteriaValue={
                                            this.props.teamStatistics[1].runningDistanceTotal
                                        }
                                        icon={require("../../theme/images/run.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].cyclingDistanceTotal !== "0.0" ||
                            this.props.teamStatistics[1].cyclingDistanceTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Cycling"
                                        unit="km"
                                        criteriaValue={
                                            this.props.teamStatistics[0].cyclingDistanceTotal
                                        }
                                        oppositeCriteriaValue={
                                            this.props.teamStatistics[1].cyclingDistanceTotal
                                        }
                                        icon={require("../../theme/images/cycling.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].gymTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].gymTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Gymming"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].gymTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].gymTimeTotal,
                                        )}
                                        icon={require("../../theme/images/gym.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].climbingTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].climbingTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Climbing"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].climbingTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].climbingTimeTotal,
                                        )}
                                        icon={require("../../theme/images/climbing.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].meditationTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].meditationTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Mediation"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].meditationTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].meditationTimeTotal,
                                        )}
                                        icon={require("../../theme/images/meditation.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].skatingTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].skatingTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Skating"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].skatingTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].skatingTimeTotal,
                                        )}
                                        icon={require("../../theme/images/skating.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].swimmingTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].swimmingTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Swimming"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].swimmingTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].swimmingTimeTotal,
                                        )}
                                        icon={require("../../theme/images/swimming.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                        {(this.props.teamStatistics[0].yogaTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].yogaTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Yoga"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].yogaTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].yogaTimeTotal,
                                        )}
                                        icon={require("../../theme/images/yoga.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}

                        {(this.props.teamStatistics[0].hikingTimeTotal !== "0.0" ||
                            this.props.teamStatistics[1].hikingTimeTotal !== "0.0") && (
                            <Grow in={true} timeout={2500}>
                                <Grid item xs={12}>
                                    <ComparisonCriteria
                                        criteriaTitle="Hiking"
                                        unit="hour : min"
                                        criteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[0].hikingTimeTotal,
                                        )}
                                        oppositeCriteriaValue={parseToHourAndMinute(
                                            this.props.teamStatistics[1].hikingTimeTotal,
                                        )}
                                        icon={require("../../theme/images/hiking.png")}
                                    />
                                </Grid>
                            </Grow>
                        )}
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth={"sm"}
                >
                    {this.props.teamStatistics &&
                        this.props.teamStatistics.length && (
                            <DialogTitle className={this.props.classes.dialogTitle}>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={5}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <DisplayTeamsName
                                            teamName={this.props.teamStatistics[0].teamName}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <img
                                            width="40"
                                            src={require("../../theme/images/versus.png")}
                                            alt=""
                                            style={{ verticalAlign: "center", paddingTop: "24px" }}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={5}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <DisplayTeamsName
                                            teamName={this.props.teamStatistics[1].teamName}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogTitle>
                        )}
                    <DialogContent className={this.props.classes.dialogContent}>
                        <div className={this.props.classes.root}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={this.state.value}
                                    onChange={(event, value) => this.handleChange(event, value)}
                                    scrollable
                                    scrollButtons="on"
                                    indicatorColor="primary"
                                    textColor="primary"
                                >
                                    <Tab label="All time" />
                                    <Tab label="Current year" />
                                    <Tab label="Last 30 days" />
                                    <Tab label="Last 7 days" />
                                    <Tab label="This week" />
                                </Tabs>
                            </AppBar>
                            {teamComparisonContent}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.goBack} color="primary" autoFocus>
                            Return
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
const mapStateToProps = (state: TeamComparisonListState) => {
    return {
        teamStatistics: state.teamComparison.list,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchTeamComparison: (
            teamId: string,
            competitorId: string,
            timeInterval: string,
            timeZoneOffset: number,
        ) => {
            dispatch(
                teamComparisonActions.fetchTeamComparison(
                    teamId,
                    competitorId,
                    timeInterval,
                    timeZoneOffset,
                ),
            );
        },
    };
};

export default withMobileDialog()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(withStyles(styles)(TeamComparisonListDialog) as any),
);
