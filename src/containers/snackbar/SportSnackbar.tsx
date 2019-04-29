import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Theme, withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { SnackbarType } from "~/containers/snackbar/SnackbarType";

const styles = (theme: Theme) =>
    createStyles({
        success: {
            backgroundColor: green[600],
        },
        error: {
            backgroundColor: theme.palette.error.dark,
        },
    });

interface SportSnackbarProps extends WithStyles<typeof styles> {
    type: SnackbarType;
    message: string;
}

interface SportSnackbarState {
    open: boolean;
}

class SportSnackbar extends React.Component<SportSnackbarProps, SportSnackbarState> {
    constructor(props: SportSnackbarProps) {
        super(props);
        this.state = { open: true };
    }
    private handleClose = (): void => {
        this.setState({ open: false });
    };

    public render(): React.ReactNode {
        const { classes, type, message } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <SnackbarContent
                        aria-describedby="client-snackbar"
                        className={type === SnackbarType.Success ? classes.success : classes.error}
                        message={<span id="client-snackbar">{message}</span>}
                    />
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(styles)(SportSnackbar);
