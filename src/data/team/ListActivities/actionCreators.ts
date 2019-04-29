import actionTypes from "./actionTypes";
import RunActivityInterface from "~/containers/activity/ActivityInterface";
// define action
// this will be called when you start a request
export const activitiesFetchRequested = () => ({
    type: actionTypes.ACTIVITIES_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const activitiesFetchFulfilled = (activities: RunActivityInterface) => ({
    type: actionTypes.ACTIVITIES_FETCH_FULFILLED,
    payload: activities,
});
// this will be called when you got some errors
export const activitiesFetchRejected = (error: any) => ({
    type: actionTypes.ACTIVITIES_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    activitiesFetchFulfilled,
    activitiesFetchRejected,
    activitiesFetchRequested,
};
