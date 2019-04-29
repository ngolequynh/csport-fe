import * as React from "react";
import Button from "@material-ui/core/Button";
import { TeamsDialog } from "./SimpleDialog";

interface TTeamStatisticsProps {
    teamId?: string;
    timeinterval?: string;
}

class TeamStatistics extends React.Component<TTeamStatisticsProps, {}> {
    state = {
        open: false,
    };

    private handleClickOpen = (): void => {
        this.setState({
            open: true,
        });
    };

    private handleClose = (): void => {
        this.setState({ open: false });
    };

    render(): React.ReactNode {
        const comparelogo = require("../../theme/images/binoculars.png");
        return (
            <div>
                <Button
                    onClick={this.handleClickOpen}
                    style={{
                        minWidth: "50px",
                        padding: "0px",
                    }}
                >
                    <img src={comparelogo} />
                </Button>

                <TeamsDialog
                    excludedTeamId={this.props.teamId}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default TeamStatistics;
