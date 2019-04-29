import * as React from "react";
import { UserType } from "~/data/searchUser/actionCreators";
import "./MemberSoftInfo.scss";
import axios from "~/common/axiosConfigure";
import Button from "@material-ui/core/Button";
import * as Stomp from "stompjs";

const SockJS = require("sockjs-client");

interface MemberShortInfoProps {
    refreshUsersList: () => void;
    turnOn: () => void;
    userId: string;
}

interface MemberShortInfoState {
    isClick: boolean;
}

export default class MemberShortInfo extends React.Component<
    MemberShortInfoProps & UserType,
    MemberShortInfoState
> {
    state: MemberShortInfoState = {
        isClick: false,
    };
    private handleClick = (): void => {
        this.setState({
            isClick: true,
        });
        try {
            const inputData = {
                hostId: this.props.userId,
                inviteeId: this.props.accountId,
            };
            const socket = new SockJS(process.env.SOCIAL_LOGIN_LOCAL_HOST_URL + "/socket");
            const stompClient = Stomp.over(socket);
            stompClient.debug = () => {};
            stompClient.connect(
                {},
                () => {
                    stompClient.subscribe(`/topic/${this.props.accountId}`, () => {});
                },
            );
            axios({
                method: "POST",
                url: "/competition",
                data: inputData,
            }).then(() => {
                this.props.refreshUsersList();
                this.props.turnOn();
            });
        } catch (error) {}
    };

    render() {
        return (
            <div className="au-member-container">
                <div className="au-member-avatar-wraper">
                    <img
                        src={this.props.imageLink}
                        alt={this.props.fullName}
                        className="member-short-info-image"
                    />
                </div>
                <div className="au-member-info-wrapper">
                    <h4>{this.props.fullName}</h4>
                    <p>{this.props.email}</p>
                </div>
                {!this.state.isClick && (
                    <div className="au-invite" onClick={this.handleClick}>
                        <Button>Invite</Button>
                    </div>
                )}
            </div>
        );
    }
}
