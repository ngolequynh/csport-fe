import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import axios from "~/common/axiosConfigure";
import createStyles from "@material-ui/core/es/styles/createStyles";
import "./ButtonCustom.scss";
import LongMenu from "~/pages/team/LongMenu";
import Grid from "@material-ui/core/Grid/Grid";
import * as Redux from "redux";

interface ITeamCardProps {
    teamId?: string;
    name: string;
    refreshTeams: Redux.ActionCreator<{}>;
    classes: {
        card: string;
        bullet: string;
        title: string;
        pos: string;
    };
    userId: string;
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
            margin: "0 2px",
            transform: "scale(0.8)",
        },
        title: {
            marginBottom: 16,
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

class CreatedTeamCard extends React.Component<ITeamCardProps, ITeamCardStage> {
    state = {
        open: false,
    };

    private handleClickOpen = (): void => {
        this.setState({ open: true });
    };

    private handleConfirmDelete = () => {
        const urlDeleteApi = `/teams/softdelete?teamId=${this.props.teamId}`;
        axios.put(urlDeleteApi).then(() => {
            this.props.refreshTeams(this.props.userId);
            this.handleClose();
        });
    };

    private handleClose = () => {
        this.setState({ open: false });
    };

    render(): React.ReactNode {
        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent
                        style={{
                            paddingLeft: "0",
                            paddingRight: "0",
                            paddingTop: "0",
                            paddingBottom: "0",
                        }}
                    >
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
                        <div>
                            <img
                                src={require("../../theme/images/runningTeam.jpg")}
                                alt="team Image"
                                margin-left="auto"
                                margin-right="auto"
                                width="100%"
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <button
                            className="myButton"
                            onClick={this.handleClickOpen}
                            style={{ margin: "auto" }}
                        >
                            Delete
                        </button>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Do you really want to delete your created team?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You will never see any information about your teammates'
                                    activities.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleConfirmDelete} color="secondary">
                                    Agree
                                </Button>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    No!
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(CreatedTeamCard);
