import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import createStyles from "@material-ui/core/es/styles/createStyles";

interface ImageAvatarProps extends WithStyles<typeof styles> {
    src?: string;
    id?: string;
}
const styles = () =>
    createStyles({
        row: {
            display: "flex",
            justifyContent: "center",
        },
        bigAvatar: {
            width: "60",
            height: "60",
            margin: "10",
        },
    });

function ImageAvatars(props: ImageAvatarProps) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            <Avatar alt="avatar" src={props.src} className={classes.bigAvatar} />
        </div>
    );
}

export default withStyles(styles)(ImageAvatars);
