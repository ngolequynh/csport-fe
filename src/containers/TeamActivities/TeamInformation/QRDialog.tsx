import * as React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Button from "@material-ui/core/es/Button/Button";
const QRCode = require("qrcode.react");

interface QRDialogProps {
    teamId: string;
}
interface QRDialogState {
    isOpen: boolean;
    link: string;
}
class QRDialog extends React.Component<QRDialogProps, QRDialogState> {
    constructor(props: QRDialogProps) {
        super(props);
        this.state = {
            isOpen: false,
            link: `${process.env.FRONT_END_LOCAL_HOST_URL}/showTeamUsers/${this.props.teamId}`,
        };
    }
    render(): React.ReactNode {
        return (
            <div className="DivContainButton">
                <Button onClick={this.handleClick}>Scan QR</Button>
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div
                        style={{
                            width: "280px",
                            height: "280px",
                            backgroundColor: "#ffffff",
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        <QRCode value={this.state.link} size={230} style={{ margin: "auto" }} />
                    </div>
                </Dialog>
            </div>
        );
    }
    private handleClose = (): void => {
        this.setState({ isOpen: false });
    };
    private handleClick = (): void => {
        this.setState({ isOpen: true });
    };
}
export default QRDialog;
