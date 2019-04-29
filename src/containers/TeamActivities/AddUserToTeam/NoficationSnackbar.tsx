import * as React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

class SimpleSnackbar extends React.Component {
    state = {
        open: false,
    };

    private handleClick = (): void => {
        this.setState({ open: true });
    };

    private handleClose = (): void => {
        this.setState({ open: false });
    };

    render(): React.ReactNode {
        return (
            <div>
                <Button onClick={this.handleClick}>Open simple snackbar</Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.open}
                    autoHideDuration={1000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    message={<span id="message-id">Note archived</span>}
                    action={[<Button color="primary" size="small" onClick={this.handleClose} />]}
                />
            </div>
        );
    }
}

export default SimpleSnackbar;
