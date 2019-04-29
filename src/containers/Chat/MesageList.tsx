import * as React from "react";
import Message from "./Message";
import Grid from "@material-ui/core/Grid/Grid";
import "./Message.scss";
import { CurrentUser } from "~/data/auth/actions";

export interface ChatMessage {
    senderId: string;
    content: string;
    teamId: string;
    createdDate: Date;
    fullName: string;
    imageLink: string;
}

interface MessageListProps {
    receivedMessage: ChatMessage[];
    currentUserId: CurrentUser;
}

class MessageList extends React.Component<MessageListProps, {}> {
    render() {
        const messages = this.props.receivedMessage.map((message: ChatMessage, index) => {
            return (
                <Message key={index} message={message} currentUserId={this.props.currentUserId} />
            );
        });
        return (
            <Grid
                container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    overflow: "auto",
                    padding: "0 20px",
                    fontFamily: "Ubuntu-Italic, Lucida Sans, helvetica, sans",
                }}
            >
                {messages}
            </Grid>
        );
    }
}

export default MessageList;
