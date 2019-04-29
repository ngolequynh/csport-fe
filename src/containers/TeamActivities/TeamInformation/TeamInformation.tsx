import * as React from "react";
import Typography from "@material-ui/core/Typography";
import "./TeamHeaderStyle.scss";
import ImageAvatarsTeamHeader from "~/containers/TeamActivities/TeamInformation/ImageAvatarsTeamHeader";
import ButtonAddUser from "~/containers/TeamActivities/TeamInformation/ButtonAddUser";
import { Grid, Paper, Theme } from "@material-ui/core";
import { connect } from "react-redux";
import { IRootState } from "~/data/types";
import { ITeamMember } from "~/data/team/teamHeader/types";
import { fetchMemberTeams } from "~/data/team/teamHeader/thunk";
import { RouteComponentProps } from "react-router";
import { order } from "~/data/reducerHelper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CloseIcon from "@material-ui/icons/Close";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchUserInTeam from "~/containers/TeamActivities/AddUserToTeam/SearchUserInTeam";
import TeamDetails from "~/containers/TeamActivities/TeamInformation/TeamDetails/TeamDetails";
import { CurrentUser } from "~/data/auth/actions";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import Forum from "~/containers/Chat/Forum";
import axios from "../../../common/axiosConfigure";
import { SnackbarType } from "~/containers/snackbar/SnackbarType";
import SportSnackbar from "~/containers/snackbar/SportSnackbar";

interface IOwnProps {
    theme: Theme;
    currentUser: CurrentUser;
}

interface IStateProps {
    teamMember: ITeamMember[];
}

interface IDispatchProps {
    fetchMemberTeams: typeof fetchMemberTeams;
}

interface IParams {
    teamId: string;
}

interface AddUserIntoTeamModalState {
    isOpen: boolean;
    value: number;
    isInTeam: boolean;
    isSnackbarOpen: boolean;
    snackbarType: SnackbarType;
    snackbarMsg: string;
}

interface IProps extends IOwnProps, IStateProps, IDispatchProps, RouteComponentProps<IParams> {}

interface TeamDetailsTabContainerProps {
    children: {};
}

function TabContainer(props: TeamDetailsTabContainerProps) {
    return <Typography component="div">{props.children}</Typography>;
}

class TeamInformation extends React.Component<IProps, AddUserIntoTeamModalState> {
    private child: any | null;
    constructor(props: IProps) {
        super(props);
        this.child = React.createRef();
    }
    componentDidMount(): void {
        this.props.fetchMemberTeams(this.props.match.params.teamId);
    }

    async componentDidUpdate(): Promise<void> {
        if (!this.state.isInTeam && this.props.currentUser) {
            const currentUserId = this.props.currentUser.accountId;
            await axios
                .get(
                    process.env.LOCAL_HOST_URL +
                        `/teams/isUserExistedInTeam/${
                            this.props.match.params.teamId
                        }?accountId=${currentUserId}`,
                )
                .then(response => {
                    if (response.data) {
                        this.setState({
                            isInTeam: response.data,
                        });
                    }
                });
        }
    }
    state = {
        isOpen: false,
        isInTeam: false,
        value: 0,
        isSnackbarOpen: false,
        snackbarType: SnackbarType.Success,
        snackbarMsg: "",
    };
    private handleJoinClick = async (): Promise<void> => {
        if (!this.state.isInTeam && this.props.currentUser) {
            const url: string = process.env.LOCAL_HOST_URL + `/teams/add`;
            const currentUserId = this.props.currentUser.accountId;
            await axios
                .post(url, {
                    teamId: this.props.match.params.teamId,
                    accountId: currentUserId,
                })
                .then(response => {
                    if (response.status === 200) {
                        this.state.snackbarMsg = "Join successfully";
                        this.state.snackbarType = SnackbarType.Success;
                    } else {
                        this.state.snackbarMsg = "Join Failed";
                        this.state.snackbarType = SnackbarType.Error;
                    }
                });
            this.state.isInTeam = true;
            this.state.isSnackbarOpen = true;
            this.child.fetchUsersOfTeam(this.props.match.params.teamId);
        }
    };
    private handleClickOpen = (): void => {
        this.setState({ isOpen: true });
    };

    private handleClose = (): void => {
        this.setState({ isOpen: false });
        this.child.fetchUsersOfTeam(this.props.match.params.teamId);
    };

    private handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        if (event) {
            this.setState({ value });
        }
    };

    private handleChangeIndex = (index: number) => {
        this.setState({ value: index });
    };

    componentWillMount(): void {
        if (this.props.currentUser) {
            const currentUserId = this.props.currentUser.accountId;
            axios
                .get(
                    process.env.LOCAL_HOST_URL +
                        `/teams/isUserExistedInTeam/${
                            this.props.match.params.teamId
                        }?accountId=${currentUserId}`,
                )
                .then(response => {
                    this.setState({
                        isInTeam: response.data,
                    });
                });
        }
    }

    render(): React.ReactNode {
        let elements = <div />;
        if (this.props.teamMember.length > 0 && this.props.currentUser) {
            const userId = this.props.currentUser.accountId;
            const teamMember = this.props.teamMember[0];
            let button = null;
            if (this.state.isInTeam) {
                if (teamMember.hostId === userId) {
                    button = (
                        <ButtonAddUser
                            onClick={this.handleClickOpen}
                            teamId={this.props.match.params.teamId}
                        />
                    );
                }
            } else {
                button = <Button onClick={this.handleJoinClick}>JOIN</Button>;
            }
            elements = (
                <div className="teamInfoBody">
                    <Paper className="totalPaper">
                        <Grid container wrap="nowrap" spacing={16}>
                            <Grid item xs>
                                <Typography className="typoName" variant="display1" gutterBottom>
                                    Team {teamMember.name}
                                </Typography>
                                <Grid>
                                    <div style={{ display: "flex" }}>
                                        <ImageAvatarsTeamHeader
                                            id="imageLink"
                                            src={teamMember.imageLink}
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
                                            {teamMember.fullName}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item>{button}</Grid>
                        </Grid>
                    </Paper>

                    <div>
                        {this.state.isInTeam ? (
                            <div>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        fullWidth
                                    >
                                        <Tab label="Forum" />
                                        <Tab label="Team Members" />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    index={this.state.value}
                                    onChangeIndex={this.handleChangeIndex}
                                >
                                    <TabContainer>
                                        <Forum teamId={this.props.match.params.teamId} />
                                    </TabContainer>

                                    <TabContainer>
                                        <TeamDetails
                                            onRef={(ref: any) => (this.child = ref)}
                                            hostId={teamMember.hostId}
                                            teamId={this.props.match.params.teamId}
                                        />
                                    </TabContainer>
                                </SwipeableViews>
                            </div>
                        ) : (
                            <div>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        fullWidth
                                        centered
                                    >
                                        <Tab label="Team Members" disabled />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    index={this.state.value}
                                    onChangeIndex={this.handleChangeIndex}
                                >
                                    <TabContainer>
                                        <TeamDetails
                                            onRef={(ref: any) => (this.child = ref)}
                                            hostId={teamMember.hostId}
                                            teamId={this.props.match.params.teamId}
                                        />
                                    </TabContainer>
                                </SwipeableViews>
                            </div>
                        )}
                    </div>

                    <Dialog
                        className="ad-dialog"
                        fullScreen={true}
                        open={this.state.isOpen}
                        disableEscapeKeyDown
                    >
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    className="closeButton"
                                    color="inherit"
                                    aria-label="Menu"
                                >
                                    <CloseIcon onClick={this.handleClose} />
                                </IconButton>
                                <Typography variant="title" color="inherit" className="flex">
                                    Find people
                                </Typography>
                                <Button color="inherit" onClick={this.handleClose}>
                                    Cancel
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <SearchUserInTeam teamId={this.props.match.params.teamId} />
                    </Dialog>
                    {this.state.isSnackbarOpen ? (
                        <SportSnackbar
                            type={this.state.snackbarType}
                            message={this.state.snackbarMsg}
                        />
                    ) : null}
                </div>
            );
        }
        return <div>{elements}</div>;
    }
}
// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: IRootState) => {
    return {
        teamMember: order(state.teamMember.entitiesOrder, state.teamMember.entities),
        currentUser: state.currentUser.currentUser,
    };
};

// map the action of redux to component prop
const mapDispatchToProps = {
    fetchMemberTeams,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamInformation);
