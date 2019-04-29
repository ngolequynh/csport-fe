import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid, Icon } from "@material-ui/core";
import Activity from "~/containers/activity/Activity";
import ActivityForm from "~/containers/activity/ActivityForm";
import axios from "~/common/axiosConfigure";
import "./modalStyle.css";
import { SnackbarType } from "~/containers/snackbar/SnackbarType";
import SportSnackbar from "~/containers/snackbar/SportSnackbar";

interface ActivityModalProps {
    label: string;
    icon: "AddIcon" | "EditIcon";
    activity?: Activity;
    updateTableData: () => void;
    userId: string;
}

interface ActivityModalState {
    isOpen: boolean;
    activityTypes: string[];
    isSnackbarOpen: boolean;
    snackbarType: SnackbarType;
    snackbarMsg: string;
}

class ActivityModal extends React.Component<ActivityModalProps, ActivityModalState> {
    constructor(props: ActivityModalProps) {
        super(props);
        this.state = {
            isOpen: false,
            activityTypes: [],
            isSnackbarOpen: false,
            snackbarType: SnackbarType.Success,
            snackbarMsg: "",
        };
    }
    componentDidMount(): void {
        const url = "/activities/activitytypes";
        axios.get(url).then(response => {
            this.setState({ activityTypes: response.data });
        });
    }
    render(): React.ReactNode {
        const { isSnackbarOpen, snackbarType, snackbarMsg, isOpen } = this.state;
        return (
            <div>
                {this.props.icon === "AddIcon" && (
                    <Grid>
                        <Button variant="fab" onClick={this.handleClickOpen}>
                            <Icon style={{ color: "#4267b2", fontSize: 70, margin: -6 }}>
                                add_circle
                            </Icon>
                        </Button>
                    </Grid>
                )}
                <Dialog open={isOpen} disableEscapeKeyDown>
                    <DialogTitle className={"bottom-line text-center"}>
                        {this.props.label}
                    </DialogTitle>
                    <DialogContent>{this.renderFormContent()}</DialogContent>
                </Dialog>
                {isSnackbarOpen ? (
                    <SportSnackbar type={snackbarType} message={snackbarMsg} />
                ) : null}
            </div>
        );
    }

    public handleClickOpen = (): void => {
        this.setState({ isOpen: true });
    };

    /**
     * After adding or updating request to server success, the modal will close and update the card list
     * @param openSnack - the status of the snack. Open or not
     * @param snackType - snack type (Error or success)
     * @param msg - the message of the snack
     */
    public handleCancel = (openSnack: boolean, snackType: SnackbarType, msg: string): void => {
        this.setState({
            isSnackbarOpen: openSnack,
            snackbarType: snackType,
            snackbarMsg: msg,
        });
        this.handleClose();
        this.props.updateTableData();
    };

    /**
     * This funtion use for closing the modal when a user clicks the cancle button
     */
    public handleClose = (): void => {
        this.setState({ isOpen: false });
    };

    private renderFormContent = (): React.ReactNode => {
        if (this.props.icon === "AddIcon") {
            return (
                <ActivityForm
                    handleCancel={this.handleCancel}
                    handleClose={this.handleClose}
                    formType={"AddNew"}
                    activity={new Activity()}
                    activityOptions={this.state.activityTypes}
                    userId={this.props.userId}
                />
            );
        }

        const activity = !this.props.activity ? new Activity() : this.props.activity;
        return (
            <ActivityForm
                handleCancel={this.handleCancel}
                handleClose={this.handleClose}
                formType={"Edit"}
                activity={activity}
                activityOptions={this.state.activityTypes}
                userId={this.props.userId}
            />
        );
    };
}

export default ActivityModal;
