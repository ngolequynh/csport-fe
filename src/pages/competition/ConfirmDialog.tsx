import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface ConfirmDialogProps {
    open: boolean;
    close(): void;
    imgLink: string;
    title: string;
    content: string;
    confirm(): void;
    ignore?: () => void;
}

export const ConfirmDialog = (props: ConfirmDialogProps): JSX.Element => {
    return (
        <Dialog
            open={props.open}
            onClose={props.ignore || props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <img src={props.imgLink} alt="logo Sport" style={{ width: "100%" }} width="100%" />
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.confirm} color="secondary">
                    Agree
                </Button>
                <Button onClick={props.close} color="primary" autoFocus>
                    No!
                </Button>
            </DialogActions>
        </Dialog>
    );
};
