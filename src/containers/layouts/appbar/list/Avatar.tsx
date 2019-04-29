import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = {
    row: {
        display: "flex",
        justifyContent: "center",
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10,
    },
};

interface ImageAvatar {
    onClick: () => void;
    src: string;
    id?: string;
    classes: {
        row: string;
        bigAvatar: string;
    };
    style?: any;
}

function ImageAvatars(props: ImageAvatar) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            <Avatar
                onClick={() => props.onClick()}
                alt="avatar"
                src={props.src}
                className={classes.bigAvatar}
            />
        </div>
    );
}

export default withStyles(styles)(ImageAvatars);
