import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = createStyles({
    row: {
        display: "flex",
        justifyContent: "left",
    },
    bigAvatar: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
});
// interface of props of ImageAvatarsTeamHeader
interface IImageAvatarsTeamHeader extends WithStyles<typeof styles> {
    src?: string;
    id?: string;
}
function ImageAvatarsTeamHeader(props: IImageAvatarsTeamHeader) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            <Avatar alt="avatar" src={props.src} className={classes.bigAvatar} />
        </div>
    );
}

export default withStyles(styles)(ImageAvatarsTeamHeader);
