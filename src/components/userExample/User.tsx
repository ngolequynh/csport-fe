import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { UserInterface } from "../../data/user/actionCreators";

// return an user card with username, email and website
const User = (props: UserInterface) => (
    <Card style={{ width: "30%", margin: "16px auto" }}>
        <CardContent>{props.username}</CardContent>
        <CardContent>
            <p>Email: {props.email}</p>
            <br />
            Website: {props.website}
        </CardContent>
    </Card>
);

export default User;
