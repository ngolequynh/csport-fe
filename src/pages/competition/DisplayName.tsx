import * as React from "react";
import Typography from "@material-ui/core/es/Typography/Typography";
import ImageAvatar from "~/containers/layouts/appbar/list/Avatar";

interface DisplayNameProps {
    name?: string;
    image: string;
}

function DisplayName(props: DisplayNameProps): JSX.Element {
    return (
        <div>
            <ImageAvatar onClick={() => {}} src={props.image} style={{ margin: "auto" }} />
            <Typography
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#0000ff",
                    textAlign: "center",
                }}
                variant="body2"
            >
                {props.name}
            </Typography>
        </div>
    );
}

export default DisplayName;
