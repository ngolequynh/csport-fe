import * as React from "react";
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import createStyles from "@material-ui/core/styles/createStyles";
import QRDialog from "~/containers/TeamActivities/TeamInformation/QRDialog";

const styles = (theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing.unit,
            color: "#c8e0e4",
            background: "#015c7f",
        },
    });
// interface of props of ButtonSizes
interface IButtonSizes extends WithStyles<typeof styles> {
    teamId: string;
    onClick: () => void;
}
function ButtonSizes(props: IButtonSizes) {
    const { classes } = props;
    return (
        <div>
            <div>
                <QRDialog teamId={props.teamId} />
                <Button
                    onClick={props.onClick}
                    variant="fab"
                    mini
                    color="default"
                    aria-label="add"
                    className={classes.button}
                >
                    <AddIcon />
                </Button>
            </div>
        </div>
    );
}
export default withStyles(styles)(ButtonSizes);
