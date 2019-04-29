import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "~/common/axiosConfigure";

interface NewUserState {
    name: string;
    userName: string;
    email: string;
    website: string;
}
class NewUser extends React.Component<{}, NewUserState> {
    state: NewUserState = {
        name: "",
        userName: "",
        email: "",
        website: "",
    };
    // handle add button click
    private clickHandle = (): void => {
        const data = {
            name: this.state.name,
            userName: this.state.userName,
            email: this.state.email,
            website: this.state.website,
        };
        // send a post method to "url" to post data to server
        axios.post("https://jsonplaceholder.typicode.com/users", data).then(response => {
            // post response data to your server
            console.log(response);
        });
    };

    // handle state change when typing on input field
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>, property: String): void => {
        switch (property) {
            case "name":
                this.setState({ name: event.target.value });
                break;
            case "userName":
                this.setState({ userName: event.target.value });
                break;
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "website":
                this.setState({ website: event.target.value });
                break;
            default:
                break;
        }
    };
    render(): React.ReactNode {
        return (
            <Card style={{ width: "30%", margin: "16px auto" }}>
                <CardContent title="Add new user" />
                <CardContent>
                    <TextField
                        label="Name"
                        value={this.state.name}
                        onChange={event => {
                            this.handleChange(event, "name");
                        }}
                    />
                    <TextField
                        label="User name"
                        value={this.state.userName}
                        onChange={event => {
                            this.handleChange(event, "userName");
                        }}
                    />
                    <TextField
                        label="Email"
                        value={this.state.email}
                        onChange={event => {
                            this.handleChange(event, "email");
                        }}
                    />
                    <TextField
                        label="Website"
                        value={this.state.website}
                        onChange={event => {
                            this.handleChange(event, "website");
                        }}
                    />
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={this.clickHandle}>
                        Add
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default NewUser;
