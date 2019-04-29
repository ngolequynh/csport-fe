import * as React from "react";
import { UserType } from "../../../data/searchUser/actionCreators";
import "./MemberSoftInfo.scss";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import axios from "~/common/axiosConfigure";

interface MemberShortInfoProps {
    refreshUsersList: () => void;
    teamId: string;
    turnOn: () => void;
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
                teamId: this.props.teamId,
                accountId: this.props.accountId,
            };
            axios({
                method: "POST",
                url: "/teams/add",
                data: inputData,
            }).then(() => {
                this.props.refreshUsersList();
                this.props.turnOn();
            });
        } catch (error) {
            console.log(error);
        }
    };

    render(): React.ReactNode {
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
                    <div className="au-member-add" onClick={this.handleClick}>
                        <AddIcon />
                    </div>
                )}
            </div>
        );
    }
}
