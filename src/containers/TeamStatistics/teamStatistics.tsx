import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import "./teamStatistics.scss";
import TeamHeader from "./TeamHeader";
import ButtonCompareVer2 from "~/containers/TeamStatistics/ButtonCompareVer2";
import ShowTimeInterval from "~/containers/TeamStatistics/TimeInterval";
import axios from "~/common/axiosConfigure";
import Typography from "@material-ui/core/Typography/Typography";
export interface ITeamSta {
    memberTotal: string;
    activeMemberTotal: string;
    activityTimeTotal: string;
    runningDistanceTotal: string;
    cyclingDistanceTotal: string;
    gymTimeTotal: string;
    beginDate: string;
    endDate: string;
    hikingTimeTotal: string;
    yogaTimeTotal: string;
    meditationTimeTotal: string;
    climbingTimeTotal: string;
    swimmingTimeTotal: string;
    skatingTimeTotal: string;
}

interface ITeamStaState {
    teamSta: ITeamSta | null;
    interval?: string;
    timeZoneOffset?: number;
}

interface ITeamStaProps {
    teamId?: string;
}

interface IProps extends RouteComponentProps<ITeamStaProps> {}

class TeamSta extends React.Component<IProps, ITeamStaState> {
    constructor(props: IProps) {
        super(props);
        const date = new Date();
        this.state = {
            teamSta: null,
            interval: "",
            timeZoneOffset: date.getTimezoneOffset(),
        };
        this.updateData("0");
    }

    componentDidMount(): void {
        const url: string =
            process.env.LOCAL_HOST_URL +
            `/teams/statistic/${this.props.match.params.teamId}?timeinterval=0&timezoneoffset=${
                this.state.timeZoneOffset
            }`;
        axios.get(url).then(response => {
            this.setState({ teamSta: response.data });
        });
    }

    private updateData(index: string): void {
        const tempInterval = index;
        const url: string = `/teams/statistic/${
            this.props.match.params.teamId
        }?timeinterval=${tempInterval}&timezoneoffset=${this.state.timeZoneOffset}`;
        axios.get(url).then(response => {
            this.setState({
                teamSta: response.data,
                interval: tempInterval,
            });
        });
    }
    private IsTeamActive(teamStaC: ITeamSta): boolean {
        if (
            teamStaC.runningDistanceTotal === "0.0" &&
            teamStaC.gymTimeTotal === "0.0" &&
            teamStaC.cyclingDistanceTotal === "0.0" &&
            teamStaC.hikingTimeTotal === "0.0" &&
            teamStaC.yogaTimeTotal === "0.0" &&
            teamStaC.meditationTimeTotal === "0.0" &&
            teamStaC.climbingTimeTotal === "0.0" &&
            teamStaC.swimmingTimeTotal === "0.0" &&
            teamStaC.skatingTimeTotal === "0.0"
        ) {
            return false;
        }
        return true;
    }
    private toHourMinute(initial: string): string {
        const hour = Math.floor(Number(initial) / 3600);
        const minute = Math.floor((Number(initial) - hour * 3600) / 60);
        if (minute === 0) {
            return hour + " h";
        }
        if (hour === 0) {
            return "0 h " + minute + " m";
        }
        return hour + " h " + minute + " m";
    }
    render(): React.ReactNode {
        const logoToStaALURL = require("../../theme/images/statistics.png");
        const distanceLogo = require("../../theme/images/distanceLogo.png");
        const runningLogo = require("../../theme/images/runningLogo.png");
        const liftingLogo = require("../../theme/images/liftingLogo.png");
        if (this.state.teamSta == null) {
            return <div />;
        }
        return (
            <div>
                <Grid item>
                    <TeamHeader teamId={this.props.match.params.teamId} />
                </Grid>
                <div className="root" style={{ marginTop: "20px" }}>
                    <Grid container style={{ flexDirection: "row-reverse" }}>
                        <Grid item style={{ padding: "0px" }}>
                            <ButtonCompareVer2
                                teamId={this.props.match.params.teamId}
                                timeinterval={this.state.interval}
                            />
                        </Grid>
                        <Grid item style={{ padding: "0px" }}>
                            <ShowTimeInterval updateData={this.updateData.bind(this)} />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        className="grid"
                        style={{
                            marginBottom: "10px",
                            marginTop: "10px",
                            backgroundImage: `url(${logoToStaALURL})`,
                            backgroundPositionX: 0,
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "145px",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderRadius: "3px",
                            boxShadow: "2px 2px 2px 1px rgba(1, 92, 127, 0.44)",
                        }}
                    >
                        <Grid item xs={4} />
                        <Grid item xs={7} style={{ display: "block", justifyContent: "center" }}>
                            <Paper
                                style={{
                                    background: "none",
                                    border: "none",
                                    boxShadow: "none",
                                    display: "flex",
                                    marginTop: "10px",
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            backgroundColor: "#5cb5e5",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            marginRight: "3px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="headline"
                                        component="h4"
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {this.state.teamSta.memberTotal}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        style={{
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        Total members
                                    </Typography>
                                </div>
                            </Paper>
                            <Paper
                                style={{
                                    background: "none",
                                    border: "none",
                                    boxShadow: "none",
                                    display: "flex",
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            backgroundColor: "#65ca64",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            marginRight: "3px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="headline"
                                        component="h4"
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {this.state.teamSta.activeMemberTotal}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        style={{
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        Active members
                                    </Typography>
                                </div>
                            </Paper>
                            <Paper
                                style={{
                                    background: "none",
                                    border: "none",
                                    boxShadow: "none",
                                    display: "flex",
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            backgroundColor: "#f18429",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            marginRight: "3px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="headline"
                                        component="h4"
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {this.toHourMinute(this.state.teamSta.activityTimeTotal)}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        style={{
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        Total active time
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>

                    <Grid
                        container
                        style={{
                            boxShadow: "2px 2px 2px 1px rgba(1, 92, 127, 0.44)",
                            backgroundColor: "#ffffff",
                            borderRadius: "5px",
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            style={{
                                justifyContent: "Center",
                                display: "flex",
                                backgroundColor: "#2e7996",
                            }}
                        >
                            <Paper
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "#2e7996",
                                    border: "none",
                                }}
                            >
                                <span style={{ color: "#ffffff" }}>Record in details</span>
                            </Paper>
                        </Grid>
                        {!(this.state.teamSta.runningDistanceTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img className="typeImg" src={runningLogo} />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.state.teamSta.runningDistanceTotal}
                                    </h5>
                                    <div className="unit">km</div>
                                </div>
                                <div className="typeTitle">Running</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.gymTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={liftingLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.gymTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Gym</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.cyclingDistanceTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.state.teamSta.cyclingDistanceTotal}
                                    </h5>
                                    <div style={{ textAlign: "center" }}>km</div>
                                </div>
                                <div className="typeTitle">Cycling</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.meditationTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.meditationTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Meditation</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.climbingTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.climbingTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Climbing</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.skatingTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.skatingTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Skating</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.swimmingTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.swimmingTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Swimming</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.yogaTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.yogaTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Yoga</div>
                            </Grid>
                        )}
                        {!(this.state.teamSta.hikingTimeTotal === "0.0") && (
                            <Grid item xs={6} sm={6} className="typeGrid">
                                <div className="circleFig">
                                    <div className="typeImgDiv">
                                        <img src={distanceLogo} className="typeImg" />
                                    </div>
                                    <h5 style={{ margin: "auto" }}>
                                        {this.toHourMinute(this.state.teamSta.hikingTimeTotal)}
                                    </h5>
                                    <div style={{ textAlign: "center" }} />
                                </div>
                                <div className="typeTitle">Hiking</div>
                            </Grid>
                        )}
                        {!this.IsTeamActive(this.state.teamSta) && (
                            <Grid
                                item
                                xs={12}
                                style={{
                                    justifyContent: "Center",
                                    display: "flex",
                                }}
                            >
                                <Paper style={{ textAlign: "center", backgroundColor: "#ffffff" }}>
                                    <span style={{ color: "#2e7996" }}>
                                        This team is not active during a given time interval
                                    </span>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default TeamSta;
