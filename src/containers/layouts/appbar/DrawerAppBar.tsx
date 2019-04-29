import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SimpleList from "~/containers/layouts/appbar/list/SimpleList";
import LoginInformation from "~/containers/layouts/appbar/LoginInformation";
import { Theme, WithStyles } from "@material-ui/core/es/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from "@material-ui/core/es/Grid/Grid";
import Avatar from "~/containers/layouts/appbar/list/Avatar";
import { RouteComponentProps, withRouter } from "react-router";
import "./DrawAppBarStyle.scss";
import SearchBar from "../../searchBox/index";
import Badge from "@material-ui/core/Badge/Badge";
import * as Stomp from "stompjs";
import { competitorNotificationActions } from "~/data/notification";
import { ICompetitor } from "~/data/notification/actionCreators";
import { connect } from "react-redux";
import axios from "~/common/axiosConfigure";
import Notifications from "~/containers/Notifications/Notifications";

const drawerWidth = 250;
const SockJS = require("sockjs-client");
const classNames = require("classnames");

interface IDrawer2AppBarProps extends WithStyles<typeof styles> {
    loginInformation?: LoginInformation;
    theme?: Theme;
    notifications: ICompetitor[];
    fetchNotifications: (accountId: string) => void;
    currentUser: {
        accountId: string;
        fullName: string;
        imageLink: string;
    };
}

interface IDrawerAppBar2AppBarState {
    open: boolean;
    show: boolean;
    notify: boolean;
    count: number;
    notification: {
        notifications: ICompetitor[];
    };
    currentUser: {
        currentUser: {};
    };
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            minHeight: "100%",
            backgroundImage: "url(" + require("../../../theme/images/background.svg") + ")",
            backgroundSize: "cover",
        },
        appFrame: {
            height: "inherits",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            width: "100%",
        },
        appBar: {
            position: "fixed",
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        "appBarShift-left": {
            marginLeft: drawerWidth,
        },
        "appBarShift-right": {
            marginRight: drawerWidth,
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 20,
        },
        hide: {
            display: "none",
        },
        drawerPaper: {
            position: "fixed",
            width: drawerWidth,
        },
        drawerHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            // padding: theme.spacing.unit,
            margin: "24px auto",
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        "content-left": {
            // marginLeft: 0,
        },
        "content-right": {
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        "contentShift-left": {
            marginLeft: 0,
        },
        "contentShift-right": {
            marginRight: 0,
        },
        badge: {
            margin: `0 ${theme.spacing.unit * 2}px`,
            height: 10,
            width: 10,
            right: -14,
            top: 10,
        },
        badge2: {
            margin: `0 ${theme.spacing.unit * 2}px`,
            height: 10,
            width: 10,
            right: -14,
            top: 10,
            backgroundColor: "",
        },
    });
class DrawerAppBar extends React.Component<
    RouteComponentProps<{}> & IDrawer2AppBarProps,
    IDrawerAppBar2AppBarState
> {
    state = {
        open: false,
        show: false,
        notify: false,
        count: 0,
        notification: {
            notifications: [],
        },
        currentUser: {
            currentUser: {},
        },
    };

    private socket = new SockJS(process.env.SOCIAL_LOGIN_LOCAL_HOST_URL + "/socket");
    private stompClient = Stomp.over(this.socket);
    private isCancelled = false;
    private handleDrawerOpen = (): void => {
        this.setState({ open: true, notify: false });
        // this.loadData();
    };

    private handleDrawerClose = (): void => {
        this.setState({ open: false, notify: false });
    };

    private handleNotificationOpen = (): void => {
        this.setState({ show: true });
    };

    private handleNotificationClose = (): void => {
        const urlDeleteApi =
            process.env.LOCAL_HOST_URL +
            `/competitionnotification/update/${this.props.currentUser.accountId}`;
        axios.put(urlDeleteApi).then(() => {
            this.setState({ show: false, count: 0 });
            this.props.fetchNotifications(this.props.currentUser.accountId);
        });
    };

    componentDidMount(): void {
        this.loadData();
    }

    componentDidUpdate(nextProps: IDrawer2AppBarProps): void {
        this.stompClient.connect(
            {},
            () => {
                this.stompClient.subscribe(
                    `/notification/${this.props.currentUser.accountId}`,
                    payload => {
                        this.stompClient.subscribe(payload.body, () => {
                            !this.isCancelled &&
                                this.setState({
                                    count: this.state.count + 1,
                                    notify: true,
                                });
                            this.loadData();
                        });
                    },
                );
            },
        );
        if (JSON.stringify(this.props.notifications) !== JSON.stringify(nextProps.notifications)) {
            this.loadData();
        }
    }

    componentWillUnmount(): void {
        this.isCancelled = true;
    }

    private loadData = (): void => {
        if (this.props.currentUser) {
            this.props.fetchNotifications(this.props.currentUser.accountId);
            if (this.props.notifications.length > 0) {
                this.setState({
                    count: this.props.notifications.length,
                    notify: this.props.notifications.length > 0 ? true : false,
                });
                const competitionIdRaw: string[] = this.props.notifications.map(e => {
                    return e.competitionId;
                });
                const competitionId: string[] = competitionIdRaw.filter((value, index) => {
                    value;
                    return competitionIdRaw[index - 1] !== competitionIdRaw[index];
                });
                competitionId.map(e => {
                    this.stompClient.subscribe(`/topic/${e}`, () => {
                        !this.isCancelled &&
                            this.setState({
                                count: this.state.count + 1,
                                notify: true,
                            });
                        this.loadData();
                    });
                });
            }
        }
    };

    private redirectToProfile = (): void => {
        if (this.props.currentUser) {
            this.props.history.replace(`/profile/${this.props.currentUser.accountId}`);
        }
    };

    render(): React.ReactNode {
        const { classes, theme } = this.props;
        const { open, notify, count } = this.state;
        const userName = this.props.currentUser ? this.props.currentUser.fullName : "";
        const avatarUrl = this.props.currentUser ? this.props.currentUser.imageLink : "";
        const logoURL = require("~/theme/images/logo.png");
        this.stompClient.debug = () => {};
        const drawer = (
            <Drawer
                onClose={this.handleDrawerClose}
                onClick={this.handleDrawerClose}
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div
                    className={classes.drawerHeader}
                    id="user-info-title"
                    tabIndex={0}
                    role="button"
                    onClick={this.handleDrawerClose}
                    onKeyDown={this.handleDrawerClose}
                >
                    <Grid container>
                        <Grid item xs={4}>
                            <Avatar
                                onClick={this.redirectToProfile}
                                id="avatarUser"
                                src={avatarUrl}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography id="drawer-username" variant="body2" color="inherit" noWrap>
                                {userName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme && theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <SimpleList
                    count={count}
                    open={this.handleNotificationOpen}
                    notifications={this.props.notifications}
                />
            </Drawer>
        );
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        style={{ backgroundColor: "#015C7F" }}
                        className={classNames(classes.appBar, {
                            [classes["appBarShift-left"]]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <Badge
                                    badgeContent=""
                                    color={notify ? "error" : "default"}
                                    classes={{ badge: classes.badge }}
                                >
                                    <MenuIcon />
                                </Badge>
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                <img
                                    src={logoURL}
                                    style={{ paddingTop: "5px" }}
                                    height="60 px"
                                    alt="logo Sport"
                                />
                            </Typography>
                            <SearchBar />
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main
                        className={classNames(classes.content, classes[`content-left`], {
                            [classes.contentShift]: open,
                        })}
                        style={{ maxWidth: "97%" }}
                        id="content-area"
                    >
                        <div className={classes.drawerHeader} />
                        {this.props.children}
                    </main>
                </div>
                <Notifications
                    show={this.state.show}
                    close={this.handleNotificationClose}
                    notifications={this.props.notifications}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IDrawerAppBar2AppBarState) => {
    return {
        notifications: state.notification.notifications,
        currentUser: state.currentUser.currentUser,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchNotifications: (id: string) => {
            dispatch(competitorNotificationActions.fetchNotifications(id));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(withRouter(DrawerAppBar)));
