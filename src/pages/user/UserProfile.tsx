import * as React from "react";
import axios from "~/common/axiosConfigure";
import { Paper, Typography, Avatar } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/es";

interface IUserProfile {
    id: number;
    fullName: string;
    imageLink: string;
    createdDate: string;
}
const styles: StyleRules = {
    root: {
        width: "100%",
        height: "100%",
        background: "#c9cdd3",
        margin: "auto",
        textAlign: "center",
        alignContent: "center",
    },
    userName: {
        paddingTop: "200px",
        font: "bold 35px Helvetica,Arial,sans-serif",
    },
    date: {
        maxWidth: "none",
        fontSize: "17px",
        padding: "10px 20px 0",
        fontFamily: "Palatino Linotype",
    },
    imgDiv: {
        position: "absolute",
        width: "100%",
        margin: "22px 0 22px",
    },
    img: {
        border: "solid 2px #fff",
        width: "150px",
        height: "150px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        objectFit: "cover",
    },
};
class UserProfile extends React.Component<any, IUserProfile> {
    classes = this.props.classes;
    constructor(props: any) {
        super(props);
        this.state = {
            id: 0,
            fullName: "",
            imageLink: "",
            createdDate: "",
        };
    }
    componentDidMount(): void {
        axios.get("").then(response => {
            this.setState(response.data);
        });
    }
    render(): React.ReactNode {
        if (this.state) {
            return (
                <Paper className={this.classes.root}>
                    <div className={this.classes.imgDiv}>
                        <Avatar
                            alt="Cannot display image"
                            src={this.state.imageLink}
                            className={this.classes.img}
                        />
                    </div>
                    <div>
                        <Typography className={this.classes.userName}>
                            {this.state.fullName}
                        </Typography>
                        <Typography className={this.classes.date}>
                            Member since{" "}
                            {new Date(this.state.createdDate as string).toLocaleDateString()}
                        </Typography>
                    </div>
                </Paper>
            );
        }
        return <Typography>There was an error. Try again!</Typography>;
    }
}
export default withStyles(styles)(UserProfile);
