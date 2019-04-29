import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import FloatingAddButton from "~/containers/AddTeam/FloatingAddButton";
import AddTeamForm from "~/containers/AddTeam/AddTeamForm";

interface IResponsiveDialogProps {
    handleDialogClosed: any;
    refreshTeams: any;
    fullScreen: any;
    userId: string;
}
interface IResponsiveDialogState {
    open: boolean;
}

class AddTeamDialog extends React.Component<IResponsiveDialogProps, IResponsiveDialogState> {
    state = {
        open: false,
    };

    private handleClickOpen = (): void => {
        this.setState({ open: true });
    };

    private handleClose = (): void => {
        this.setState({ open: false });
    };

    render(): React.ReactNode {
        const { fullScreen } = this.props;

        return (
            <div>
                <FloatingAddButton onClickAddTeamButton={this.handleClickOpen}>
                    Open responsive dialog
                </FloatingAddButton>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div
                        style={{
                            paddingTop: "24px",
                            margin: "auto",
                        }}
                    >
                        <img
                            src={require("../../theme/images/logo.png")}
                            height="150px"
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                    </div>

                    <DialogContent>
                        <AddTeamForm
                            handleCancelClick={this.handleClose}
                            refreshTeams={this.props.refreshTeams}
                            userId={this.props.userId}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default withMobileDialog<IResponsiveDialogProps>()(AddTeamDialog);
