import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { RouteComponentProps, withRouter } from "react-router";

const ITEM_HEIGHT = 48;

interface ILongMenuState {
    anchorEl?: HTMLElement;
}

interface ILongMenuProps {
    teamId?: string;
}

class LongMenu extends React.Component<ILongMenuProps & RouteComponentProps<{}>, ILongMenuState> {
    state = {
        anchorEl: undefined,
    };

    // this handleClick handles when opening long menu
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState({ anchorEl: event.currentTarget });
    };

    // this handleClose handles when escaping from long menu
    private handleClose = (): void => {
        this.setState({ anchorEl: undefined });
    };

    // this handleClickDe routes to individual team detail
    private handleClickDe = (): void => {
        this.props.history.replace(`/showTeamUsers/${this.props.teamId}`);
    };

    // this handleClickSta routes to individual team statistics
    private handleClickSta = (): void => {
        this.props.history.replace(`/teamSta/${this.props.teamId}`);
    };

    render() {
        const anchorEl = this.state.anchorEl;

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleClickDe}>Team details</MenuItem>
                    <MenuItem onClick={this.handleClickSta}>Team statistics</MenuItem> ))}
                </Menu>
            </div>
        );
    }
}

export default withRouter(LongMenu);
