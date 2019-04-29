import * as React from "react";
import CardActivity from "./card-activity";
import { AxiosResponse } from "axios";
import axios from "~/common/axiosConfigure";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import ActivityModal from "src/containers/activity/ActivityModal";
import ActivityInterface from "./ActivityInterface";
import Activity from "~/containers/activity/Activity";
import { today } from "src/common/util";
import { connect } from "react-redux";
import { ConfirmDialog } from "~/pages/competition/ConfirmDialog";

interface TableDataTypes {
    data: ActivityInterface[] | null;
    selectedRunActivity: ActivityInterface;
    isConfirmOpen: boolean;
    idToDel: string | number;
    isDataFetched: boolean;
}

interface PropTypes {
    userId: string;
    currentUser: {
        accountId: string;
    };
}

class ActivityCardList extends React.Component<PropTypes, TableDataTypes> {
    private readonly editModalRef: React.RefObject<ActivityModal>;
    constructor(props: PropTypes) {
        super(props);
        // create ref object for modal
        this.editModalRef = React.createRef<ActivityModal>();

        this.state = {
            isConfirmOpen: false,
            idToDel: "",
            data: null,
            isDataFetched: false,
            selectedRunActivity: {
                activityId: "",
                activityDate: today(),
                distance: 0,
                duration: 0,
                location: "",
                title: "",
                activityType: "",
                isActive: true,
            },
        };
    }

    private handleClose = (): void => {
        this.setState({ isConfirmOpen: false });
    };

    public deleteData(id: string | number): void {
        this.setState({ idToDel: id, isConfirmOpen: true });
    }

    private handleConfirmDelete = () => {
        axios.put(`/activities/softdelete?activityId=${this.state.idToDel}`).then(() => {
            this.handleClose();
            this.updateData();
        });
    };

    public editData(activity: ActivityInterface): void {
        if (this.editModalRef.current !== null) {
            this.setState({
                selectedRunActivity: activity,
            });
            this.editModalRef.current.handleClickOpen();
        }
    }

    private generateText(content: string): JSX.Element {
        return (
            <Typography
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#015C7F",
                    fontSize: "larger",
                }}
                component="h1"
            >
                {content}
            </Typography>
        );
    }

    public updateData(): void {
        const userId = this.props.userId || this.props.currentUser.accountId;
        axios
            .get("/activities", {
                params: {
                    accountId: userId,
                },
            })
            .then((response: AxiosResponse<ActivityInterface[]>) => {
                this.setState({
                    data: response.data.map((activity: ActivityInterface) => {
                        // fix date error on IOS by replace space by T
                        activity.activityDate = activity.activityDate.replace(" ", "T");
                        return activity;
                    }),
                });
            });

        this.setState({
            isDataFetched: true,
        });
    }

    private showLoading(): JSX.Element {
        return (
            <div>
                <CircularProgress size={50} style={{ marginLeft: "48%" }} />
                {this.generateText("Loading your activities...")}
            </div>
        );
    }

    private checkLoading(): JSX.Element {
        if (this.state.data) {
            if (this.state.data.length === 0) {
                return <div>{this.generateText("NO ACTIVITIES FOUND")}</div>;
            }
            return <div />;
        }
        return this.showLoading();
    }

    render(): React.ReactNode {
        if (!this.state.isDataFetched) {
            if (this.props.currentUser) {
                this.updateData();
            }
            return this.showLoading();
        }

        return (
            <div>
                {this.checkLoading()}
                {!this.props.userId ? (
                    <div>
                        <div style={{ position: "fixed", bottom: 20, right: 30 }}>
                            <ActivityModal
                                label={"Add Activity"}
                                icon={"AddIcon"}
                                ref={this.editModalRef}
                                updateTableData={this.updateData.bind(this)}
                                userId={
                                    this.props.currentUser ? this.props.currentUser.accountId : ""
                                }
                            />
                        </div>
                        <ActivityModal
                            label={"Edit Activity"}
                            icon={"EditIcon"}
                            activity={new Activity(this.state.selectedRunActivity)}
                            ref={this.editModalRef}
                            updateTableData={this.updateData.bind(this)}
                            userId={this.props.currentUser ? this.props.currentUser.accountId : ""}
                        />
                        <Grid container>
                            {this.state.data &&
                                this.state.data.map((dataPerCard: ActivityInterface) => {
                                    return (
                                        <Grid
                                            item
                                            key={dataPerCard.activityId}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                        >
                                            <CardActivity
                                                key={dataPerCard.activityId}
                                                data={dataPerCard}
                                                delete={this.deleteData.bind(this)}
                                                edit={this.editData.bind(this)}
                                            />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </div>
                ) : (
                    <div>
                        <Grid container>
                            {this.state.data &&
                                this.state.data.map((dataPerCard: ActivityInterface) => {
                                    return (
                                        <Grid
                                            key={dataPerCard.activityId}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                        >
                                            <CardActivity
                                                data={dataPerCard}
                                                delete={() => {}}
                                                edit={() => {}}
                                            />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </div>
                )}
                <ConfirmDialog
                    open={this.state.isConfirmOpen}
                    close={this.handleClose}
                    imgLink={require("../../theme/images/surrender.jpg")}
                    title={"Do you want to delete this activity?"}
                    content={"You cannot undo after deleted"}
                    confirm={this.handleConfirmDelete}
                />
            </div>
        );
    }
}

// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser.currentUser,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ActivityCardList);
