import * as React from "react";
import * as Redux from "redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/es/styles/createStyles";
import LongMenu from "~/pages/team/LongMenu";
import Grid from "@material-ui/core/Grid/Grid";

interface ITeamCardProps {
    teamId: string | undefined;
    name: string;
    refreshTeams: Redux.ActionCreator<{}>;
    classes: {
        card: string;
        bullet: string;
        title: string;
        pos: string;
    };
}

interface ITeamCardStage {
    open: boolean;
}

const styles = () =>
    createStyles({
        card: {
            minWidth: 150,
        },
        bullet: {
            display: "inline-block",
            margin: "0",
        },
        title: {
            marginBottom: 16,
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

class JoinedTeamCard extends React.Component<ITeamCardProps, ITeamCardStage> {
    render(): React.ReactNode {
        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <Grid container style={{ width: "100%" }}>
                        <Grid item xs={10}>
                            <Typography
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: process.env.colorGreen,
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                }}
                                variant="headline"
                                component="h2"
                            >
                                {this.props.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LongMenu teamId={this.props.teamId} />
                        </Grid>
                    </Grid>
                    <CardContent style={{ paddingLeft: "0", paddingRight: "0", paddingTop: "0" }}>
                        <img
                            src={require("../../theme/images/runningTeam.jpg")}
                            alt="team image"
                            margin-left="auto"
                            margin-right="auto"
                            width="100%"
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(JoinedTeamCard);
