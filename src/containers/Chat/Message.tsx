import * as React from "react";
import { ChatMessage } from "~/containers/Chat/Forum";
import Grid from "@material-ui/core/Grid/Grid";
import { CurrentUser } from "~/data/auth/actions";

interface MessageProps {
    message: ChatMessage;
    currentUserId: CurrentUser;
}

interface MessageState {
    isClick: boolean;
}
class Message extends React.Component<MessageProps, MessageState> {
    constructor(props: MessageProps) {
        super(props);
        this.state = {
            isClick: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    private handleClick(): void {
        if (this.state.isClick) {
            this.setState({
                isClick: false,
            });
        } else {
            this.setState({
                isClick: true,
            });
        }
    }
    render() {
        if (this.props.message.imageLink !== "" || this.props.message.fullName !== "") {
            const nameSplit = this.props.message.fullName.split(" ");
            const firstName = nameSplit[0];
            const moment = require("moment");
            const dateFormated = moment(this.props.message.createdDate).format("LLL");
            return (
                <Grid
                    container
                    className="message-container"
                    style={{
                        alignSelf:
                            this.props.message.senderId === this.props.currentUserId.accountId
                                ? "flex-end"
                                : "flex-start",
                        flexDirection:
                            this.props.message.senderId === this.props.currentUserId.accountId
                                ? "row-reverse"
                                : "row",
                    }}
                >
                    <Grid item xs={2} style={{ maxWidth: "50px" }}>
                        <img src={this.props.message.imageLink} alt="Avatar" />
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        style={{
                            paddingRight:
                                this.props.message.senderId === this.props.currentUserId.accountId
                                    ? "8px"
                                    : "0px",
                            flexBasis: "100%",
                        }}
                    >
                        <div
                            className="user-name"
                            style={{
                                float:
                                    this.props.message.senderId ===
                                    this.props.currentUserId.accountId
                                        ? "right"
                                        : "left",
                                marginLeft:
                                    this.props.message.senderId ===
                                    this.props.currentUserId.accountId
                                        ? "10px"
                                        : "0px",
                            }}
                        >
                            {firstName}
                        </div>
                        <br />
                        {this.state.isClick && (
                            <div
                                style={{
                                    textAlign:
                                        this.props.message.senderId ===
                                        this.props.currentUserId.accountId
                                            ? "right"
                                            : "left",
                                    marginLeft:
                                        this.props.message.senderId ===
                                        this.props.currentUserId.accountId
                                            ? "10px"
                                            : "0px",
                                    color: "#015c7f",
                                }}
                            >
                                <small>
                                    <i>{dateFormated}</i>
                                </small>
                            </div>
                        )}
                        <div
                            className="talk-bubble tri-right border round btm-left-in"
                            style={{
                                float:
                                    this.props.message.senderId ===
                                    this.props.currentUserId.accountId
                                        ? "right"
                                        : "left",
                            }}
                            onClick={this.handleClick}
                        >
                            <div className="talktext">
                                <p style={{ maxWidth: "12em", wordWrap: "break-word" }}>
                                    {this.props.message.content}
                                </p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            );
        }
        return <div />;
    }
}
export default Message;
