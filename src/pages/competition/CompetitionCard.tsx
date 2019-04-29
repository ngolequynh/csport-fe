import * as React from "react";
import axios from "~/common/axiosConfigure";
import Grid from "@material-ui/core/es/Grid/Grid";
import Grow from "@material-ui/core/es/Grow/Grow";
import ComparisonCriteria from "~/pages/competition/ComparisonCriteria";
import DisplayName from "~/pages/competition/DisplayName";
import createStyles from "@material-ui/core/es/styles/createStyles";
import { Theme, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { InformationType } from "~/data/competition/actionCreators";
import Paper from "@material-ui/core/Paper/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import { createMuiTheme } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "~/pages/team/ButtonCustom.scss";
import "~/containers/competition/SearchUserInTeam.scss";
import { ConfirmDialog } from "~/pages/competition/ConfirmDialog";
import * as Stomp from "stompjs";

const SockJS = require("sockjs-client");

const styles = (theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: "#ffffff82",
            padding: "10",
        },
        root: {
            flexGrow: 1,
            width: "100%",
            backgroundColor: theme.palette.background.paper,
        },
        dialogTitle: {
            backgroundImage: "url(../../theme/images/comparisonheader.png)",
            backgroundSize: "cover",
            textAlign: "center",
        },

        dialogContent: {
            padding: "0",
        },

        compareButton: {
            backgroundColor: "#f5eeee73",
            justifyContent: "left",
        },

        backgroundDialogContent: {
            backgroundImage: "url(../../theme/images/teamcomparison.png)",
            backgroundSize: "cover",
            paddingTop: "16px",
        },
    });

interface CompetitionCardProps extends WithStyles<typeof styles> {
    competitionId: string;
    host: InformationType;
    invitee: InformationType;
    inviteeId: string;
    refreshCompetitions: any;
    userId: string;
}

const theme = createMuiTheme({
    overrides: {
        MuiSnackbarContent: {
            root: {
                backgroundColor: "#43a047",
            },
        },
    },
});

class CompetitionCard extends React.Component<CompetitionCardProps> {
    state = {
        open: false,
        notificationOpen: false,
    };
    private handleClickOpen = (): void => {
        this.setState({ open: true });
    };

    private notificationOpen = (): void => {
        this.setState({ notificationOpen: true });
    };

    private notificationClose = (): void => {
        this.setState({ notificationOpen: false });
    };
    private handleConfirmDelete = () => {
        const removeURL = `/competition/remove?competitionId=${this.props.competitionId}`;
        axios.put(removeURL).then(() => {
            this.props.refreshCompetitions(this.props.userId);
            this.handleClose();
            this.notificationOpen();

            const socket = new SockJS(process.env.SOCIAL_LOGIN_LOCAL_HOST_URL + "/socket");
            const stompClient = Stomp.over(socket);
            stompClient.debug = () => {};
            stompClient.connect(
                {},
                () => {
                    stompClient.subscribe("/topic/" + this.props.inviteeId, () => {});
                    stompClient.unsubscribe(this.props.inviteeId);
                },
            );
        });
    };

    private handleClose = () => {
        this.setState({ open: false });
    };
    private toHourMin(second: number): string {
        const hour = Math.floor(second / 3600);
        const minute = Math.floor((second % 3600) / 60);
        return hour + ":" + minute;
    }
    render(): React.ReactNode {
        return (
            <div>
                <Paper
                    className={this.props.classes.paper}
                    elevation={8}
                    style={{ position: "relative", width: "100%" }}
                >
                    <div>
                        <Grid container style={{ float: "left", paddingTop: "10px" }}>
                            <Grid item xs={5}>
                                <DisplayName
                                    name={this.props.host.profileDto.fullName}
                                    image={this.props.host.profileDto.imageLink}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={2}
                                style={{ display: "flex", justifyContent: "center", paddingTop: 0 }}
                            >
                                <img
                                    width="80%"
                                    height="50%"
                                    src={require("../../theme/images/versus.png")}
                                    alt=""
                                    style={{ verticalAlign: "center", paddingTop: "24px" }}
                                />
                            </Grid>

                            <Grid item xs={5}>
                                <DisplayName
                                    name={this.props.invitee.profileDto.fullName}
                                    image={this.props.invitee.profileDto.imageLink}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    {/* Remove competition Icon*/}
                    <div
                        style={{
                            zIndex: "auto",
                            position: "absolute",
                            float: "right",
                            top: "0",
                            right: "0",
                        }}
                    >
                        <IconButton className="closeButton" color="inherit">
                            <CloseIcon onClick={this.handleClickOpen} />
                        </IconButton>
                    </div>
                    <div className={this.props.classes.dialogContent}>
                        <Grid container spacing={16}>
                            {(this.props.host.statisticDto.runningDisTotal !== 0.0 ||
                                this.props.invitee.statisticDto.runningDisTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="km"
                                            criteriaValue={
                                                this.props.host.statisticDto.runningDisTotal
                                            }
                                            oppositeCriteriaValue={
                                                this.props.invitee.statisticDto.runningDisTotal
                                            }
                                            icon={require("../../theme/images/run.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.cyclingDisTotal !== 0.0 ||
                                this.props.invitee.statisticDto.cyclingDisTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="km"
                                            criteriaValue={
                                                this.props.host.statisticDto.cyclingDisTotal
                                            }
                                            oppositeCriteriaValue={
                                                this.props.invitee.statisticDto.cyclingDisTotal
                                            }
                                            icon={require("../../theme/images/cycling.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.gymTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.gymTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.gymTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.gymTimeTotal,
                                            )}
                                            icon={require("../../theme/images/gym.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.swimmingTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.swimmingTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.swimmingTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.swimmingTimeTotal,
                                            )}
                                            icon={require("../../theme/images/swimming.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.yogaTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.yogaTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.yogaTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.yogaTimeTotal,
                                            )}
                                            icon={require("../../theme/images/yoga.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.skatingTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.skatingTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.skatingTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.skatingTimeTotal,
                                            )}
                                            icon={require("../../theme/images/skating.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.hikingTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.hikingTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.hikingTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.hikingTimeTotal,
                                            )}
                                            icon={require("../../theme/images/hiking.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.meditationTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.meditationTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.meditationTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.meditationTimeTotal,
                                            )}
                                            icon={require("../../theme/images/meditation.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                            {(this.props.host.statisticDto.climbingTimeTotal !== 0.0 ||
                                this.props.invitee.statisticDto.climbingTimeTotal !== 0.0) && (
                                <Grow in={true} timeout={2500}>
                                    <Grid item xs={12}>
                                        <ComparisonCriteria
                                            unit="hour(s) : minute(s)"
                                            criteriaValue={this.toHourMin(
                                                this.props.host.statisticDto.climbingTimeTotal,
                                            )}
                                            oppositeCriteriaValue={this.toHourMin(
                                                this.props.invitee.statisticDto.climbingTimeTotal,
                                            )}
                                            icon={require("../../theme/images/climbing.png")}
                                        />
                                    </Grid>
                                </Grow>
                            )}
                        </Grid>
                    </div>
                </Paper>
                <ConfirmDialog
                    open={this.state.open}
                    close={this.handleClose}
                    imgLink={require("../../theme/images/surrender.jpg")}
                    title={"Do you really want to surrender?"}
                    content={"You will be called a loser..."}
                    confirm={this.handleConfirmDelete}
                />
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
                                Remove successfully!!
                            </span>
                        }
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(CompetitionCard);
