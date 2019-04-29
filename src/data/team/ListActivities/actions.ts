import actionCreators from "./actionCreators";
import axios from "~/common/axiosConfigure";

// merge all actions into a completed process
export const fetchActivities = (id: string) => async (dispatch: any) => {
    dispatch(actionCreators.activitiesFetchFulfilled);
    try {
        const activities = await axios.get(`/activities?accountId=${id}`).then(response => {
            const list = response.data;
            return list;
        });
        return dispatch(actionCreators.activitiesFetchFulfilled(activities));
    } catch (error) {
        dispatch(actionCreators.activitiesFetchRejected(error));
    }
};

export default {
    fetchActivities,
};
