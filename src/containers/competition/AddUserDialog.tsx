import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import SearchUserInTeam from "~/containers/competition/SearchUserInTeam";
import Typography from "@material-ui/core/Typography";

interface AddUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

function AddUserDialog(props: AddUserDialogProps) {
    return (
        <Dialog className="ad-dialog" fullScreen={true} open={props.isOpen} disableEscapeKeyDown>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className="closeButton" color="inherit" aria-label="Menu">
                        <CloseIcon onClick={props.onClose} />
                    </IconButton>
                    <Typography variant="title" color="inherit" className="flex">
                        Invite people
                    </Typography>
                    <Button color="inherit" onClick={props.onClose}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <SearchUserInTeam />
        </Dialog>
    );
}
export default AddUserDialog;
