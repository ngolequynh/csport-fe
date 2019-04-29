import * as React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import People from "@material-ui/icons/People";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import Poll from "@material-ui/icons/Poll";
import Badge from "@material-ui/core/Badge";
import Notification from "@material-ui/icons/Notifications";
import { ICompetitor } from "~/data/notification/actionCreators";
const styles = (theme: Theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

interface SimpleListProps {
    count: number;
    open: () => void;
    notifications: ICompetitor[];
    classes: {
        root: string;
    };
}
class SimpleList extends React.Component<RouteComponentProps<{}> & SimpleListProps, {}> {
    private handleSignOut = (): void => {
        localStorage.clear();
        this.props.history.replace("/");
    };
    render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List component="nav">
                    <Link style={{ textDecoration: "none" }} to="/list">
                        <ListItem button>
                            <DirectionsRun style={{ color: "#000" }} />
                            <ListItemText primary="Your activities" />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/team">
                        <ListItem button>
                            <People style={{ color: "#000" }} />
                            <ListItemText primary="Team" />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/competition">
                        <ListItem button>
                            <Poll style={{ color: "#000" }} />
                            <ListItemText primary="Competition" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={this.props.open}>
                        <Badge
                            badgeContent={this.props.count > 0 ? this.props.count : ""}
                            color={this.props.count > 0 ? "primary" : "default"}
                        >
                            <Notification />
                        </Badge>
                        <ListItemText primary="Notification" />
                    </ListItem>
                    <Divider />
                    <ListItem button href="#simple-list" onClick={this.handleSignOut}>
                        <ExitToApp />
                        <ListItemText primary="Sign out" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(SimpleList));
