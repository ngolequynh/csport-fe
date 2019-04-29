import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "~/common/axiosConfigure";
import createStyles from "@material-ui/core/es/styles/createStyles";
import withStyles from "@material-ui/core/es/styles/withStyles";

interface IDeleteUserDialogProps {
    accountId: string;
    teamId: string;
    refreshUsers: any;
    classes: any;
    disabled?: boolean;
}

interface IDeleteUserDialogStage {
    open: boolean;
}

const styles = () =>
    createStyles({
        bullet: {
            display: "inline-block",
            margin: "0 2px",
            transform: "scale(0.8)",
        },
        title: {
            marginBottom: "16",
            fontSize: "14",
        },
        pos: {
            marginBottom: "12",
        },
    });

class DeleteUserDialog extends React.Component<IDeleteUserDialogProps, IDeleteUserDialogStage> {
    state = {
        open: false,
    };

    private handleClickOpen = (): void => {
        this.setState({ open: true });
    };

    private handleConfirmDelete = (): void => {
        const data = {
            accountId: this.props.accountId,
            teamId: this.props.teamId,
        };
        axios.put(`/teams/remove`, data).then(() => {
            this.props.refreshUsers(this.props.teamId);
            this.handleClose();
        });
    };

    private handleClose = (): void => {
        this.setState({ open: false });
    };

    render(): React.ReactNode {
        return (
            <div>
                <Button
                    onClick={this.handleClickOpen}
                    size="small"
                    color="secondary"
                    disabled={this.props.accountId === localStorage.getItem("userId")}
                >
                    <DeleteIcon style={{ left: "0" }} />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div>
                        <img
                            src="https://media.giphy.com/media/yoJC2Olx0ekMy2nX7W/giphy.gif"
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "100%",
                            }}
                        />
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"You want to delete your beloved member ever?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will never see any information about your friend's activities. It's
                            really sad, isn't it?
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
            </div>
        );
    }
}
export default withStyles(styles)(DeleteUserDialog);
