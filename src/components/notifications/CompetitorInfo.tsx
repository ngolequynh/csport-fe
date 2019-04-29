import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./CompetitorInfo.scss";
import { ICompetitor } from "~/data/notification/actionCreators";

interface IProps {
    competitor: ICompetitor;
}

const CompetitorInfo = (props: IProps) => {
    return (
        <div className="card">
            <Grid container>
                <Grid item xs={2} className="row">
                    <Avatar alt="Profile Picture" src={props.competitor.imageLink} />
                </Grid>
                <Grid item xs={10} style={{ alignSelf: "center" }}>
                    <Typography component="h2" style={{ marginLeft: "10px" }}>
                        <span>
                            <strong>{props.competitor.fullName} </strong>
                        </span>
                        finished a sport activity: {props.competitor.activityType}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default CompetitorInfo;
