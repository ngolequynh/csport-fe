import * as React from "react";
import { connect } from "react-redux";
import { IUserProfile } from "~/data/userProfile/types";
import { fetchUserProfile } from "~/data/userProfile/thunk";
import { IRootState } from "~/data/types";
import { order } from "~/data/reducerHelper";
import Profile from "~/components/Profile/Profile";
import { RouteComponentProps } from "react-router";
import { CurrentUser } from "~/data/auth/actions";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import "~/components/Profile/Profile.scss";
import SwipeableViews from "react-swipeable-views";
import Statistic from "~/components/Profile/Statistic";
import Icon from "@material-ui/core/Icon/Icon";
import EditProfileDialog from "~/containers/UserProfile/EditProfileDialog";

interface IOwnProps {}

interface IStateProps {
    userProfile: IUserProfile[];
    currentUser: CurrentUser;
}

interface IDispatchProps {
    fetchUserProfile: typeof fetchUserProfile;
}

interface IParams {
    id: string;
}
function TabContainer(props: any) {
    return (
        <Typography component="div" style={{ paddingTop: "24px" }}>
            {props.children}
        </Typography>
    );
}
interface IProps extends IOwnProps, IStateProps, IDispatchProps, RouteComponentProps<IParams> {}

class UserProfile extends React.Component<IProps, {}> {
    state = {
        value: 0,
    };
    handleChange = (event: React.ChangeEvent<{}>, value: number): void => {
        if (event) {
            this.setState({ value });
        }
    };
    modalRef: React.RefObject<EditProfileDialog> = React.createRef<EditProfileDialog>();
    handleClickEdit = (): void => {
        if (this.modalRef.current) {
            this.modalRef.current.handleClickOpen();
        }
    };
    handleChangeIndex = (index: number): void => {
        this.setState({ value: index });
    };
    componentDidMount() {
        this.props.fetchUserProfile(this.props.match.params.id);
    }
    render() {
        let elements = <div>Nothing in here!</div>;
        const currentUserId = this.props.currentUser ? this.props.currentUser.accountId : "1";
        if (this.props.userProfile.length > 0) {
            const profile = this.props.userProfile[0];
            elements = (
                <div className="scale">
                    <div className="body">
                        <div className="panel-heading-no-title">
                            {profile.accountId === currentUserId && (
                                <div className="icon-edit" onClick={this.handleClickEdit}>
                                    <Icon>edit</Icon>
                                </div>
                            )}
                        </div>
                        <div className="panel-body">
                            <div className="avatar">
                                <img alt="example image" src={profile.imageLink} />
                            </div>
                            <h2 className="name">{profile.fullName}</h2>
                            <p className="description">{profile.introduction}</p>
                        </div>
                    </div>
                    <EditProfileDialog profile={profile} ref={this.modalRef} />
                    <div className="root">
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth
                            >
                                <Tab label="Profile" style={{ width: "50%", maxWidth: "none" }} />
                                <Tab label="Statistic" style={{ width: "50%", maxWidth: "none" }} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer>
                                <div>
                                    <Profile
                                        id={profile.id}
                                        accountId={profile.accountId}
                                        profileId={profile.profileId}
                                        imageLink={profile.imageLink}
                                        fullName={profile.fullName}
                                        introduction={profile.introduction}
                                        createdDate={profile.createdDate}
                                        status={profile.status}
                                        hobbies={profile.hobbies}
                                    />
                                </div>
                            </TabContainer>
                            <TabContainer>
                                <div>
                                    <Statistic userId={this.props.match.params.id} />
                                </div>
                            </TabContainer>
                        </SwipeableViews>
                    </div>
                </div>
            );
        }
        return <div>{elements}</div>;
    }
}
const mapStateToProps = (state: IRootState): IStateProps => ({
    userProfile: order(state.userProfile.entitiesOrder, state.userProfile.entities),
    currentUser: state.currentUser.currentUser,
});

const mapDispatchToProps = {
    fetchUserProfile,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserProfile);
