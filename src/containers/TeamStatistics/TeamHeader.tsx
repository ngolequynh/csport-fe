import * as React from "react";
import axios from "~/common/axiosConfigure";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ImageAvatarsTeamHeader from "./ImageAvatarsTeamHeader";

interface ITeamHeaderProps {
    teamId?: string;
}
interface ITeamHeaderState {
    name?: string;
    hostId?: string;
    imageLink?: string;
    fullName?: string;
}
class TeamHeader extends React.Component<ITeamHeaderProps, ITeamHeaderState> {
    constructor(props: ITeamHeaderProps) {
        super(props);
        this.state = {
            name: "",
            hostId: "",
            imageLink: "",
            fullName: "",
        };
    }

    componentDidMount(): void {
        const resultURL: string = `/teams/teamHeader/${this.props.teamId}`;

        axios.get(resultURL).then(response => {
            this.setState({
                name: response.data.name,
                hostId: response.data.hostId,
                imageLink: response.data.imageLink,
                fullName: response.data.fullName,
            });
        });
    }
    render(): React.ReactNode {
        let elements = <div />;
        if (this.state.name) {
            elements = (
                <Paper
                    className="totalPaper"
                    style={{
                        backgroundColor: "#ffffff",
                        boxShadow: "2px 2px 2px 1px rgba(1, 92, 127, 0.44)",
                    }}
                >
                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item xs>
                            <Typography
                                className="typoName"
                                variant="display1"
                                gutterBottom
                                style={{ textAlign: "center" }}
                            >
                                Team {this.state.name}
                            </Typography>
                            <Grid style={{ placeContent: "center" }}>
                                <div style={{ display: "flex", placeContent: "center" }}>
                                    {" "}
                                    <ImageAvatarsTeamHeader
                                        id="imageLink"
                                        src={this.state.imageLink}
                                    />
                                    <Typography
                                        className="typoHostName"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        variant="body1"
                                    >
                                        {this.state.fullName}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item />
                    </Grid>
                </Paper>
            );
        }
        return (
            <div
                style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "2px 2px 2px 1px rgba(1, 92, 127, 0.44)",
                    borderRadius: "3px",
                }}
            >
                {elements}
            </div>
        );
    }
}
export default TeamHeader;
