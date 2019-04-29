import * as React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
interface ITimeIntervalProps {
    updateData: (index: string) => void;
}
interface ITimeIntervalState {
    anchorEl?: HTMLElement;
    interval?: string;
    selectedIndex?: number;
}
const option = ["All time", "Current year", "Last 30 days", "Last 7 days", "This week"];
class TimeInterval extends React.Component<ITimeIntervalProps, ITimeIntervalState> {
    state = {
        anchorEl: undefined,
        interval: "",
        selectedIndex: 1,
    };

    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private handleClose = (): void => {
        this.setState({ anchorEl: undefined });
    };
    private handleMenuItemClick = (index: number): void => {
        this.setState({ selectedIndex: index, anchorEl: undefined });
        this.props.updateData(index.toString());
    };

    render() {
        const anchorEl = this.state.anchorEl;
        const intervallogo = require("../../theme/images/wall-calendar.png");
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{
                        minWidth: "50px",
                        padding: "0px",
                    }}
                >
                    <img src={intervallogo} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {option.map((option, index) => (
                        <MenuItem
                            style={{ padding: "5px" }}
                            key={option}
                            onClick={() => this.handleMenuItemClick(index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default TimeInterval;
