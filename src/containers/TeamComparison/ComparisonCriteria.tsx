import * as React from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper/Paper";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Typography from "@material-ui/core/es/Typography/Typography";
import createStyles from "@material-ui/core/es/styles/createStyles";

interface ComparisonCriteriaProps {
    classes: {
        paper: string;
        root: string;
        criteriaTitle: string;
        icon: string;
        divContainIcon: string;
        criteria: string;
    };
    criteriaValue: string;
    oppositeCriteriaValue: string;
    criteriaTitle: string;
    unit: string;
    icon: string;
}
const style = () => {
    return createStyles({
        paper: {
            backgroundColor: "#ffffff82",
            padding: "10",
        },

        root: {
            color: "#1976d2",
            textAlign: "center",
            fontSize: "15px",
        },

        criteriaTitle: {
            backgroundColor: "white",
            padding: "8px",
        },

        icon: {
            verticalAlign: "center",
            width: "60px",
        },

        divContainIcon: {
            textAlign: "center",
            margin: "auto",
        },

        criteria: {
            color: "#1976d2",
            textAlign: "center",
            wordWrap: "break-word",
        },
    });
};
function ComparisonCriteria(props: ComparisonCriteriaProps): JSX.Element {
    return (
        <div>
            <div className={props.classes.criteriaTitle}>
                <Typography variant={"title"} className={props.classes.root}>
                    {props.criteriaTitle.toUpperCase()}
                </Typography>
            </div>
            <Paper className={props.classes.paper} elevation={8}>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography variant={"headline"} className={props.classes.criteria}>
                            {props.criteriaValue}
                        </Typography>
                        <Typography variant={"caption"} className={props.classes.criteria}>
                            {props.unit}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={props.classes.divContainIcon}>
                        <img src={props.icon} alt="" className={props.classes.icon} />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant={"headline"} className={props.classes.criteria}>
                            {props.oppositeCriteriaValue}
                        </Typography>
                        <Typography variant={"caption"} className={props.classes.criteria}>
                            {props.unit}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default withStyles(style)(ComparisonCriteria);
