import * as React from "react";
import ActivityInterface from "~/containers/activity/ActivityInterface";
import "./TrackerStyle.scss";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Button, Fade, Snackbar } from "../../../node_modules/@material-ui/core";
import Icon from "@material-ui/core/Icon";
import axios from "~/common/axiosConfigure";
import { today } from "~/common/util";
import { ConfirmDialog } from "~/pages/competition/ConfirmDialog";
const KalmanFilter = require("kalmanjs").default;

interface IDistanceTimeTrackerProps {
    activity: ActivityInterface;
}

interface IDistanceTimeTrackerState {
    isRunning: boolean;
    time: number;
    distance: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    handleClick: () => void;
    isDialogOpen: boolean;
    isSnackbarOpen: boolean;
    snackMessage: string;
    isConfirmOpen: boolean;
}

class DistanceTimeTracker extends React.Component<
    IDistanceTimeTrackerProps,
    IDistanceTimeTrackerState
> {
    private timer: number;
    private locator: number;
    private kalmanLongitudeFilter = new KalmanFilter({ R: 0.01, Q: 3 });
    private kalmanLatitudeFilter = new KalmanFilter({ R: 0.01, Q: 3 });
    constructor(props: IDistanceTimeTrackerProps) {
        super(props);
        // avoid bug when use them as callback
        this.startRunning = this.startRunning.bind(this);
        this.stopRunning = this.stopRunning.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.handleSnackOpen = this.handleSnackOpen.bind(this);
        this.handleOpenConfirm = this.handleOpenConfirm.bind(this);
        this.handleRejectRunResult = this.handleRejectRunResult.bind(this);
        this.handleAcceptRunResult = this.handleAcceptRunResult.bind(this);
        this.handleIgnoreConfirm = this.handleIgnoreConfirm.bind(this);

        // set inital state
        this.state = {
            isRunning: false,
            time: 0,
            distance: 0,
            currentLocation: {
                latitude: 0,
                longitude: 0,
            },
            snackMessage: "",
            isSnackbarOpen: false,
            handleClick: this.startRunning,
            isDialogOpen: false,
            isConfirmOpen: false,
        };
    }

    componentWillUnmount() {
        this.stopRunning();
    }

    private handleCloseDialog(): void {
        this.stopRunning();

        // prepare data to update activity
        const data = this.props.activity;
        data.duration = this.state.time;
        data.activityDate = today().replace("T", " ") + ":00";
        data.distance = parseFloat(this.state.distance.toFixed(2));
        delete data.imageLink;
        const formData = new FormData();
        const blobStr = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("activity", blobStr);
        // send data
        axios.put("/activities", formData).then(() => {
            this.handleSnackOpen("Update activity successfully!");
            window.location = window.location;
        });

        this.setState({
            isDialogOpen: false,
            isConfirmOpen: false,
            distance: 0,
            time: 0,
        });
        window.location = window.location;
    }

    public handleOpenDialog(): void {
        this.setState({
            isDialogOpen: true,
        });
    }
    private updateDistance(newLocation: Position): void {
        const { currentLocation, distance } = this.state;
        const newCorrectRate = Math.max(
            0,
            (newLocation.coords.accuracy - 20) / newLocation.coords.accuracy,
        );
        this.kalmanLatitudeFilter.Q = newCorrectRate;
        this.kalmanLongitudeFilter.Q = newCorrectRate;
        const newFilteredLocation = {
            latitude: this.kalmanLatitudeFilter.filter(newLocation.coords.latitude),
            longitude: this.kalmanLongitudeFilter.filter(newLocation.coords.longitude),
        };
        this.setState({
            distance: currentLocation.latitude
                ? distance +
                  this.calculateLocation(
                      currentLocation.latitude,
                      currentLocation.longitude,
                      newFilteredLocation.latitude,
                      newFilteredLocation.longitude,
                  )
                : 0,
            currentLocation: newFilteredLocation,
        });
    }

    private handleSnackClose(): void {
        this.setState({
            isSnackbarOpen: false,
        });
    }

    private handleSnackOpen(message: string): void {
        this.setState({
            isSnackbarOpen: true,
            snackMessage: message,
        });
        setTimeout(this.handleSnackClose, 2000);
    }

    private handleAcceptRunResult() {
        this.handleCloseDialog();
    }

    private handleRejectRunResult() {
        this.stopRunning();
        this.setState({
            time: 0,
            distance: 0,
            isDialogOpen: false,
            isConfirmOpen: false,
        });
    }

    private handleIgnoreConfirm() {
        this.setState({
            isConfirmOpen: false,
        });
    }

    private handleOpenConfirm() {
        this.setState({
            isConfirmOpen: true,
        });
    }

    // function calculate the distance from latitude and longitude
    private calculateLocation(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const radlat1 = (Math.PI * lat1) / 180;
        const radlat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radtheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.853159616;
        return dist;
    }

    // function add 1 second to the time
    private count() {
        const { time } = this.state;
        this.setState({
            time: time + 1,
        });
    }

    // function for start running
    private startRunning(): void {
        this.setState({
            isRunning: true,
            handleClick: this.stopRunning,
        });
        if (navigator.geolocation) {
            this.locator = navigator.geolocation.watchPosition(
                (location: Position) => this.updateDistance(location),
                () => {
                    console.log("error in getting location");
                },
                {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                },
            );
            this.timer = window.setInterval(() => {
                this.count();
            }, 1000);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    // function for stop running
    private stopRunning(): void {
        // you have to be running before stop running
        if (!this.state.isRunning) return;

        // show notification that the run is being paused
        this.handleSnackOpen(
            `You are taking a rest. Tap "Run" to continue, tap close Dialog to save your run`,
        );

        // stop running
        this.setState({
            isRunning: false,
            handleClick: this.startRunning,
        });

        // clear asynchronous task
        window.clearInterval(this.timer);
        navigator.geolocation.clearWatch(this.locator);
    }

    // function to add leading number 0 to number
    private format(number: number): string {
        return number < 10 ? "0" + number.toString() : number.toString();
    }

    public render(): React.ReactNode {
        const { distance, time } = this.state;
        const second = time % 60;
        const minute = (time - second) / 60;
        const hour = Math.floor(time / 3600);
        return (
            <div>
                <Snackbar
                    open={this.state.isSnackbarOpen}
                    onClose={this.handleSnackClose}
                    TransitionComponent={Fade}
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                />
                <Dialog
                    fullScreen={true}
                    open={this.state.isDialogOpen}
                    onClose={this.stopRunning}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent className="dialog">
                        <ConfirmDialog
                            open={this.state.isConfirmOpen}
                            close={this.handleRejectRunResult}
                            imgLink={require("../../theme/images/save-run.png")}
                            title={"You decided to finish run!"}
                            content={"Do you want to save the result?\nTap outside to continue."}
                            confirm={this.handleAcceptRunResult}
                            ignore={this.handleIgnoreConfirm}
                        />
                        <Snackbar
                            open={this.state.isSnackbarOpen}
                            onClose={this.handleSnackClose}
                            TransitionComponent={Fade}
                            ContentProps={{
                                "aria-describedby": "message-id",
                            }}
                            message={<span id="message-id">{this.state.snackMessage}</span>}
                        />
                        <div>
                            <Button onClick={this.handleOpenConfirm} className="buttonClose">
                                <Icon>clear</Icon>
                            </Button>
                            <main
                                className={`tracker-container ${this.state.isRunning &&
                                    "tracker-container-running"}`}
                            >
                                <div className="distance counter">
                                    <div className="loading-container">
                                        <div className="loading" />
                                        <div id="loading-text">{distance.toFixed(2)} KM</div>
                                    </div>
                                </div>
                                <div className="progress" />
                                <div className="counter">{this.format(hour)}</div>
                                <div className="counter">:</div>
                                <div className="counter">{this.format(minute)}</div>
                                <div className="counter">:</div>
                                <div className="counter">{this.format(second)}</div>
                                <button className="button" onClick={this.state.handleClick}>
                                    Toggle
                                </button>
                            </main>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default DistanceTimeTracker;
