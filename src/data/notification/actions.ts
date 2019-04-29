import actionCreators from "./actionCreators";
import axios from "~/common/axiosConfigure";

// dto
export const fetchNotifications = (id: string) => async (dispatch: any) => {
    dispatch(actionCreators.competitorNotificationFetchRequested());
    try {
        const competitions = await axios
            .get(process.env.LOCAL_HOST_URL + `/competitionnotification/${id}`)
            .then(response => response.data);
        return dispatch(actionCreators.competitorNotificationFetchFulfilled(competitions));
    } catch (error) {
        dispatch(actionCreators.competitorNotificationFetchRejected(error));
    }
};

// competition notification
export const updateNotifications = (id: string) => async (dispatch: any) => {
    dispatch(actionCreators.competitorNotificationFetchRequested());
    try {
        const notifications = await axios
            .put(process.env.LOCAL_HOST_URL + `/competitionnotification/${id}`)
            .then(response => {
                return response.data;
            });
        return dispatch(actionCreators.competitorNotificationFetchFulfilled(notifications));
    } catch (error) {
        dispatch(actionCreators.competitorNotificationFetchRejected(error));
    }
};

export default {
    fetchNotifications,
    updateNotifications,
};
