import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import CompetitorList from "~/containers/Notifications/CompetitorList";
import { ICompetitor } from "~/data/notification/actionCreators";

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

interface INotificationProps {
    show: boolean;
    close: () => void;
    notifications: ICompetitor[];
}

class Notifications extends React.Component<INotificationProps, {}> {
    shouldComponentUpdate(nextProps: INotificationProps) {
        return this.props.show !== nextProps.show;
    }
    render(): React.ReactNode {
        let content = (
            <div style={{ justifyContent: "center", display: "flex", minWidth: "200px" }}>
                No Notifications Yet
            </div>
        );
        if (this.props.notifications.length > 0) {
            content = <CompetitorList notification={this.props.notifications} />;
        }
        return (
            <div>
                <Dialog
                    open={this.props.show}
                    keepMounted
                    TransitionComponent={Transition}
                    onClose={this.props.close}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Notifications"}</DialogTitle>
                    {content}
                    <DialogActions>
                        <Button onClick={this.props.close} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Notifications;
