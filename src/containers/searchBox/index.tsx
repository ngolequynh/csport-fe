import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import { RouteComponentProps, withRouter } from "react-router";
import "./SearchBox.scss";

interface SearchBoxState {
    username: string;
}

class SearchBox extends React.Component<RouteComponentProps<{}>, SearchBoxState> {
    state: SearchBoxState = {
        username: "",
    };
    // handle state when input change
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            username: event.target.value,
        });
    };
    private handleClick = (): void => {
        if (this.state.username) {
            const searchKey = this.state.username;
            this.setState({
                username: "",
            });
            this.props.history.replace("/find/" + searchKey);
        }
    };
    private handleEnter = (event: React.KeyboardEvent): void => {
        if (event.key === "Enter") {
            this.handleClick();
        }
    };
    render(): React.ReactNode {
        return (
            <Grid container className="search-box-grid" alignItems="flex-end">
                <Grid item xs={9}>
                    <TextField
                        id="input-with-icon-grid"
                        label="Search..."
                        className="search-box"
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Search onClick={this.handleClick} />
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(SearchBox);
