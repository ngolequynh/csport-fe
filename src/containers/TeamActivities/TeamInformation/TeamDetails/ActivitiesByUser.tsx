import * as React from "react";
import Activity from "src/containers/activity/card-activity";
import RunActivityInterface from "src/containers/activity/ActivityInterface";
import Grid from "@material-ui/core/es/Grid/Grid";
import axios from "~/common/axiosConfigure";

interface ActivitiesByUserProps {
    accountId: string;
}

interface ActivitiesByUserState {
    listActivities: RunActivityInterface[];
}

class ActivitiesByUser extends React.Component<ActivitiesByUserProps, ActivitiesByUserState> {
    state = {
        listActivities: [],
    };
    async componentDidMount(): Promise<void> {
        const activities = await axios
            .get(`/activities?accountId=${this.props.accountId}`)
            .then(response => {
                const list = response.data;
                return list;
            });

        this.setState({
            listActivities: activities,
        });
    }

    render(): React.ReactNode {
        let listActivities = null;
        if (this.state.listActivities.length === 0) {
            listActivities = <div>No data found</div>;
        } else {
            listActivities = (
                <Grid container spacing={8}>
                    {this.state.listActivities.map((activity: RunActivityInterface) => {
                        return (
                            <Grid item xs={12} lg={6} key={activity.activityId}>
                                <Activity
                                    key={activity.activityId}
                                    data={activity}
                                    delete={() => {}}
                                    edit={() => {}}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            );
        }
        return <div>{listActivities}</div>;
    }
}
export default ActivitiesByUser;
