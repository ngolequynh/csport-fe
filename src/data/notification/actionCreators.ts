import actionTypes from "./actionTypes";
// define action

export interface ICompetitor {
    competitionNotificationId: string;
    accountId: string;
    imageLink: string;
    fullName: string;
    activityType: string;
    competitionId: string;
}

// this will be called when you start a request
export const competitorNotificationFetchRequested = () => ({
    type: actionTypes.COMPETITOR_NOTIFICATION_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const competitorNotificationFetchFulfilled = (competitors: ICompetitor) => ({
    type: actionTypes.COMPETITOR_NOTIFICATION_FETCH_FULFILLED,
    payload: competitors,
});
// this will be called when you got some errors
export const competitorNotificationFetchRejected = (error: any) => ({
    type: actionTypes.COMPETITOR_NOTIFICATION_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    competitorNotificationFetchRequested,
    competitorNotificationFetchFulfilled,
    competitorNotificationFetchRejected,
};
