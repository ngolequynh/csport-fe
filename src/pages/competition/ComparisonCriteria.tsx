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
    criteriaValue: string | number;
    oppositeCriteriaValue: string | number;
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
            backgroundColor: "#ffffff",
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
        <Paper className={props.classes.paper} elevation={8}>
            <Grid container>
                <Grid item xs={5}>
                    <Typography variant={"display2"} className={props.classes.criteria}>
                        {props.criteriaValue}
                    </Typography>
                    <Typography variant={"subheading"} className={props.classes.criteria}>
                        {props.unit}
                    </Typography>
                </Grid>
                <Grid item xs={2} className={props.classes.divContainIcon}>
                    <img src={props.icon} alt="" className={props.classes.icon} />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant={"display2"} className={props.classes.criteria}>
                        {props.oppositeCriteriaValue}
                    </Typography>
                    <Typography variant={"subheading"} className={props.classes.criteria}>
                        {props.unit}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default withStyles(style)(ComparisonCriteria);
