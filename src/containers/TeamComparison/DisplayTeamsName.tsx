import Typography from "@material-ui/core/es/Typography/Typography";
import * as React from "react";

interface DisplayTeamNameProps {
    teamName: string;
    teamImage?: string;
}

function DisplayTeamsName(props: DisplayTeamNameProps): JSX.Element {
    return (
        <div>
            <Typography
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                }}
                variant="body1"
            >
                {props.teamName}
            </Typography>
        </div>
    );
}

export default DisplayTeamsName;
