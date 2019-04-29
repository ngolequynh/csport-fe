import * as React from "react";
import * as Redux from "redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import ActivitiesByUser from "src/containers/TeamActivities/TeamInformation/TeamDetails/ActivitiesByUser";
import Typography from "@material-ui/core/es/Typography/Typography";
import ImageAvatar from "src/containers/layouts/appbar/list/ImageAvatar";
import Grid from "@material-ui/core/es/Grid/Grid";
import DeleteUserDialog from "src/containers/TeamActivities/TeamInformation/TeamDetails/DeleteUserDialog";
import { UserOfTeamInterface } from "src/data/team/ListUsersOfTeam/actionCreators";

interface MemberInfoDialogProps {
    fullScreen: any;
    hostId: string;
    teamId: string;
    refreshUsers: Redux.ActionCreator<{}>;
    user: UserOfTeamInterface;
}
interface MemberInfoDialogState {
    openMemberActivities: boolean;
    openDeleteDialog: boolean;
}

const style = {
    backgroundColor: "#f5eeee73",
    width: "100%",
    justifyContent: "left",
};

class MemberInfoDialog extends React.Component<MemberInfoDialogProps, MemberInfoDialogState> {
    state = {
        openMemberActivities: false,
        openDeleteDialog: false,
    };

    private deleteOption = this.props.hostId === localStorage.getItem("userId");

    private handleClickOpen = (): void => {
        this.setState({ openMemberActivities: true });
    };

    private handleClose = (): void => {
        this.setState({ openMemberActivities: false });
    };

    render(): React.ReactNode {
        const { fullScreen } = this.props;
        return (
            <div>
                <Grid container spacing={8} style={{ backgroundColor: "#f5eeee73" }}>
                    <Grid item xs={this.deleteOption ? 9 : 12}>
                        <Button
                            onClick={this.handleClickOpen}
                            variant="outlined"
                            aria-label="delete"
                            style={style}
                        >
                            <Grid container spacing={16}>
                                <Grid item xs={3} style={{ margin: "auto" }}>
                                    <ImageAvatar src={this.props.user.imageLink} />
                                </Grid>
                                <Grid item xs={9} style={{ margin: "auto" }}>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        variant="body2"
                                        color="inherit"
                                    >
                                        {this.props.user.fullName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>

                    {this.deleteOption && (
                        <Grid item xs={3} style={{ margin: "auto" }}>
                            <DeleteUserDialog
                                accountId={this.props.user.accountId}
                                teamId={this.props.teamId}
                                refreshUsers={this.props.refreshUsers}
                            />
                        </Grid>
                    )}
                </Grid>

                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.openMemberActivities}
                    onClose={this.handleClose}
                    maxWidth="md"
                >
                    <DialogTitle style={{ backgroundColor: "#015c7f", textAlign: "center" }}>
                        <Typography variant="title" style={{ color: "#fff" }}>
                            List activities
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <ActivitiesByUser accountId={this.props.user.accountId} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default withMobileDialog<MemberInfoDialogProps>()(MemberInfoDialog);
