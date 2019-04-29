import * as React from "react";
import { StyleRules, WithStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia, Grid, Menu, MenuItem, IconButton } from "@material-ui/core";
import ActivityInterface from "./ActivityInterface";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { padZero } from "~/common/util";
import DistanceTimeTracker from "~/components/tracker/DistanceTimeTracker";
import {
    ActivityType,
    getActivityTypeIcon,
    isActivityTypeHasDistance,
    isClimbingActivity,
    isGymActivity,
} from "./ActivityType";
const moment = require("moment");

interface IOptionMenuProp {
    delete: () => void;
    edit: () => void;
    run: () => void;
    activityType: ActivityType;
}

interface IOptionMenuState {
    isOpen: boolean;
    anchorEl: HTMLElement | undefined;
}

class OptionMenu extends React.Component<IOptionMenuProp, IOptionMenuState> {
    private handleClickDelete = (): void => {
        this.handleClose();
        this.props.delete();
    };

    private handleClickRun = (): void => {
        this.handleClose();
        this.props.run();
    };

    private handleClickEdit = (): void => {
        this.handleClose();
        this.props.edit();
    };

    private handleClose = (): void => {
        this.setState({
            isOpen: false,
        });
    };

    private handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState({
            isOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    constructor(props: IOptionMenuProp) {
        super(props);
        this.state = {
            isOpen: false,
            anchorEl: undefined,
        };
    }

    render(): React.ReactNode {
        return (
            <div>
                <IconButton onClick={this.handleOpen}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    anchorEl={this.state.anchorEl}
                >
                    {this.props.activityType === ActivityType.Running ? (
                        <MenuItem key="run" onClick={this.handleClickRun}>
                            Run
                        </MenuItem>
                    ) : null}
                    <MenuItem key="edit" onClick={this.handleClickEdit}>
                        Edit
                    </MenuItem>
                    <MenuItem key="delete" onClick={this.handleClickDelete}>
                        Delete
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

const styles: StyleRules = {
    card: {
        minWidth: 275,
        margin: 18,
        background: "rgba(229, 225, 221, 0.7)",
        width: "100%",
        borderRadius: 15,
        backgroundSize: "contain",
    },
    content: {
        flex: "1 0 auto",
    },
    title: {
        marginBottom: 10,
    },
    numbers: {
        textAlign: "left",
    },
};

interface ISimpleCardProp extends WithStyles<typeof styles> {
    data: ActivityInterface;
    delete: (id: string) => void;
    edit: (activity: ActivityInterface) => void;
}

function SimpleCard(props: ISimpleCardProp): JSX.Element {
    const classes = props.classes;
    const { distance, duration, workoutType, activityType, imageLink } = props.data;

    const durationHour = Math.floor(duration / 3600);
    const durationMin = Math.floor((duration - durationHour * 3600) / 60);

    const showDependentElement = (): JSX.Element => {
        let element: JSX.Element = <div />;
        if (isActivityTypeHasDistance(activityType)) {
            element = (
                <Grid item xs={6}>
                    <Typography component="p" variant="title">
                        {distance.toFixed(2)} {isClimbingActivity(activityType) ? "m" : "km"}
                    </Typography>
                    <Typography component="p" variant="caption">
                        Distance
                    </Typography>
                </Grid>
            );
        } else if (isGymActivity(activityType)) {
            element = (
                <Grid item xs={6}>
                    <Typography component="p" variant="title">
                        {workoutType}
                    </Typography>
                    <Typography component="p" variant="caption">
                        Workout Type
                    </Typography>
                </Grid>
            );
        }
        return element;
    };
    const ref = React.createRef<DistanceTimeTracker>();
    return (
        <Grid container spacing={16}>
            <DistanceTimeTracker activity={props.data} ref={ref} />
            <Card className={classes.card}>
                <CardMedia
                    style={{ height: 200, overflow: "hidden", backgroundSize: "contain" }}
                    image={imageLink || require("../../theme/images/default_activity_image.jpg")}
                />

                <CardContent>
                    <div>
                        <div className={classes.title}>
                            {props.edit.name === "bound editData" && (
                                <div style={{ float: "right" }}>
                                    <OptionMenu
                                        activityType={activityType as ActivityType}
                                        edit={() => props.edit(props.data)}
                                        delete={() => props.delete(props.data.activityId)}
                                        run={() => {
                                            if (ref.current) ref.current.handleOpenDialog();
                                        }}
                                    />
                                </div>
                            )}
                            <Typography
                                variant="display1"
                                color="default"
                                style={{ fontSize: "1.8rem" }}
                            >
                                {props.data.title}
                            </Typography>
                            <Typography component="p" variant="caption">
                                {moment(props.data.activityDate.replace("T", " ")).format(
                                    "MMMM Do YYYY hh:mm a",
                                )}
                            </Typography>
                        </div>
                    </div>
                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item xs sm lg md zeroMinWidth>
                            <Typography noWrap>{props.data.location}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.numbers} spacing={16}>
                        <Grid item xs={6}>
                            <Typography component="p" variant="title">
                                {padZero(durationHour)}h : {padZero(durationMin)}m
                            </Typography>
                            <Typography component="p" variant="caption">
                                Duration
                            </Typography>
                        </Grid>
                        {showDependentElement()}
                    </Grid>
                    <div>
                        <img
                            src={getActivityTypeIcon(activityType)}
                            style={{
                                float: "right",
                                marginRight: -24,
                                marginBottom: -2,
                                width: "20%",
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(SimpleCard);
