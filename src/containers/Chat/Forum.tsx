import * as React from "react";
import MessageList from "./MesageList";
const SockJS = require("sockjs-client");
import * as Stomp from "stompjs";
import MessageBox from "~/containers/Chat/MessageBox";
import { connect } from "react-redux";
import axios from "~/common/axiosConfigure";
import Button from "@material-ui/core/Button/Button";
import { CurrentUser } from "~/data/auth/actions";

interface ChatProps {
    currentUserId: CurrentUser;
    teamId: string;
}

export interface ChatMessage {
    senderId: string;
    content: string;
    teamId: string;
    createdDate: Date;
    fullName: string;
    imageLink: string;
}

interface ChatState {
    list: ChatMessage[];
    oldestMessage: ChatMessage;
    isLoadingButtonOpen: boolean;
    isShowMore: boolean;
}

const styleShowUser = {
    border: "1px solid #015c7f",
    padding: "0 30px",
    display: "table",
    marginLeft: "auto",
    marginRight: "auto",
    textColor: "#015c7f",
};

class Forum extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            list: [],
            oldestMessage: {
                senderId: "",
                content: "",
                teamId: this.props.teamId,
                createdDate: new Date(),
                fullName: "",
                imageLink: "",
            },
            isLoadingButtonOpen: false,
            isShowMore: false,
        };
    }

    private socket = new SockJS(process.env.SOCIAL_LOGIN_LOCAL_HOST_URL + `/socket`);
    private stompClient = Stomp.over(this.socket);
    private messagesEnd: any;

    componentDidUpdate(): void {
        if (!this.state.isShowMore) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    private loadPreviousMessages = async (): Promise<void> => {
        const oldMessages: ChatMessage[] = await axios
            .get(process.env.LOCAL_HOST_URL + `/chat/loadChat?teamId=${this.props.teamId}`)
            .then(response => {
                const list = response.data;
                return list;
            });

        if (oldMessages.length > 0) {
            this.setState({
                list: oldMessages,
                oldestMessage: oldMessages[0],
            });
        }
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    };

    private loadHistory = async (): Promise<void> => {
        let historyMessages = [];
        if (!this.state.isLoadingButtonOpen) {
            historyMessages = await axios
                .post(process.env.LOCAL_HOST_URL + "/chat/history", this.state.oldestMessage)
                .then(response => {
                    const list = response.data;
                    return list;
                });
        }

        this.setState({
            isShowMore: true,
            list: [...historyMessages, ...this.state.list],
        });
        this.setState({
            oldestMessage: this.state.list[0],
        });
    };

    private handleLoadHistoryButtonClick = () => {
        this.loadHistory();
    };
    componentDidMount(): void {
        this.loadPreviousMessages();
        this.stompClient.connect(
            {},
            () => {
                this.stompClient.subscribe(`/chat/${this.props.teamId}`, payload => {
                    const newMsg = JSON.parse(payload.body);
                    const tempMsg: ChatMessage = {
                        senderId: newMsg.senderId,
                        content: newMsg.content,
                        teamId: newMsg.teamId,
                        createdDate: newMsg.createdDate,
                        fullName: newMsg.fullName,
                        imageLink: newMsg.imageLink,
                    };

                    const temp = this.state.list;
                    temp.push(tempMsg);
                    this.setState({ list: temp });
                });
            },
        );
    }
    private sendMessage = (msg: string): void => {
        this.setState({
            isShowMore: false,
        });
        const destination = `/app/chat.sendMessage.${this.props.teamId}`;
        const date = new Date();
        const messageContent = msg.trim();
        if (messageContent && this.stompClient && this.props.currentUserId) {
            const chatMsg = {
                content: msg,
                senderId: this.props.currentUserId.accountId,
                teamId: this.props.teamId,
                createdDate: date,
            };
            this.stompClient.send(destination, {}, JSON.stringify(chatMsg));
        }
        this.setState({ isShowMore: false });
    };

    render() {
        this.stompClient.debug = () => {};
        if (!this.props.currentUserId) {
            return <div />;
        }
        return (
            <div>
                <div>
                    <div
                        className="content"
                        style={{
                            overflow: "auto",
                            marginTop: "24px",
                            height: "50vh",
                        }}
                    >
                        <Button onClick={this.handleLoadHistoryButtonClick} style={styleShowUser}>
                            <span style={{ color: "#015c7f" }}>Show more</span>
                        </Button>
                        <MessageList
                            receivedMessage={this.state.list}
                            currentUserId={this.props.currentUserId}
                        />
                        <div
                            style={{ float: "left", clear: "both" }}
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                        />
                    </div>
                    <div
                        className="footer"
                        style={{
                            bottom: "10px",
                            overflow: "hidden",
                            width: "100%",
                        }}
                    >
                        <MessageBox sendMessage={this.sendMessage} />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        currentUserId: state.currentUser.currentUser,
    };
};
export default connect(
    mapStateToProps,
    null,
)(Forum);
