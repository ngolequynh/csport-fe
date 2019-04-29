import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import createStyles from "@material-ui/core/styles/createStyles";
import axios from "~/common/axiosConfigure";
import { Link } from "react-router-dom";
import TeamHeader from "./TeamHeader";

const styles = createStyles({
    avatar: {
        backgroundColor: "#1E88E5",
        color: "#1E88E5",
    },
});

interface ITeam {
    teamId?: string;
}

interface ISimpleDialogProps extends WithStyles<typeof styles> {
    excludedTeamId?: string;
    open: boolean;
    onClose?(): void;
}

interface ISimpleDialogState {
    list: ITeam[];
}

class SimpleDialog extends React.Component<ISimpleDialogProps, ISimpleDialogState> {
    constructor(props: ISimpleDialogProps) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount(): void {
        const url: string = `/teams/${this.props.excludedTeamId}/otherteamsid`;

        axios.get(url).then(response => {
            this.setState({ list: response.data });
        });
    }

    render(): React.ReactNode {
        const { open } = this.props;
        let elements = <div />;
        if (this.state.list.length > 0) {
            elements = (
                <Dialog
                    onClose={this.props.onClose}
                    open={open}
                    aria-labelledby="simple-dialog-title"
                >
                    <DialogTitle id="simple-dialog-title">Choose team to compare</DialogTitle>
                    <List>
                        {this.state.list.map(team => (
                            <Link
                                to={`/teams/${this.props.excludedTeamId}/${team.teamId}`}
                                style={{
                                    textDecoration: "none",
                                    backgroundColor: "none",
                                }}
                                key={team.teamId}
                            >
                                <div
                                    style={{
                                        margin: "10px",
                                        backgroundColor: "#86c6d3a1",
                                    }}
                                >
                                    <TeamHeader teamId={team.teamId} />
                                </div>
                            </Link>
                        ))}
                    </List>
                </Dialog>
            );
        }
        return elements;
    }
}

export const TeamsDialog = withStyles(styles)(SimpleDialog);
