import * as React from "react";
import { IUserProfile } from "~/data/userProfile/types";
const moment = require("moment");
import "./Profile.scss";

export const changeLabelColor = (status: string) => {
    switch (status) {
        case "single":
            return "#5cb85c";
        case "complicated":
            return "#7cc7ef";
        case "engaged":
            return "#cc761a";
        case "married":
            return "#605c5c";
        case "separated":
            return "#e858a2";
        case "divorced":
            return "#7f4ea3";
        case "widowed":
            return "#6f0d72";
        default:
            return "#ffffff";
    }
};

const userProfile = (props: IUserProfile) => {
    const labelStyle = {
        backgroundColor: changeLabelColor(props.status ? props.status.toLowerCase() : ""),
    };
    return (
        <div className="information">
            <table>
                <tbody>
                    <tr>
                        <td>Member Since</td>
                        <td>{moment(props.createdDate.replace("T", " ")).format("MMM Do YYYY")}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>
                            <span className="label" style={labelStyle}>
                                {props.status}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>Hobbies</td>
                        <td>{props.hobbies}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default userProfile;
