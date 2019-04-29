import * as React from "react";
import { IUserProfile } from "~/data/userProfile/types";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import axios from "~/common/axiosConfigure";
import EditProfileForm from "~/containers/UserProfile/EditProfileForm";
import { SnackbarType } from "~/containers/snackbar/SnackbarType";
import SportSnackbar from "~/containers/snackbar/SportSnackbar";

interface EditProfileDialogProps {
    profile: IUserProfile;
}

interface EditProfileDialogState {
    isOpen: boolean;
    status: string[];
    isSnackbarOpen: boolean;
    snackbarType: SnackbarType;
    snackbarMsg: string;
}

class EditProfileDialog extends React.Component<EditProfileDialogProps, EditProfileDialogState> {
    constructor(props: EditProfileDialogProps) {
        super(props);
        this.state = {
            isOpen: false,
            status: [],
            isSnackbarOpen: false,
            snackbarType: SnackbarType.Success,
            snackbarMsg: "",
        };
    }

    componentDidMount() {
        const url: string = process.env.LOCAL_HOST_URL + "/profile/status";
        axios.get(url).then(response => {
            this.setState({ status: response.data });
        });
    }
    public render(): React.ReactNode {
        const { isSnackbarOpen, snackbarType, snackbarMsg, isOpen } = this.state;
        return (
            <div>
                <Dialog open={isOpen} disableEscapeKeyDown>
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

    public handleCancel = (openSnack: boolean, snackType: SnackbarType, msg: string): void => {
        this.setState({
            isSnackbarOpen: openSnack,
            snackbarType: snackType,
            snackbarMsg: msg,
        });
        this.handleClose();
    };

    public handleClose = (): void => {
        this.setState({ isOpen: false });
    };

    private renderFormContent(): React.ReactNode {
        return (
            <EditProfileForm
                handleCancel={this.handleCancel}
                handleClose={this.handleClose}
                profile={this.props.profile}
                statusOptions={this.state.status}
            />
        );
    }
}

export default EditProfileDialog;
