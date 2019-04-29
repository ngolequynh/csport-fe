import actionTypes from "./actionTypes";
// define action

export interface TeamStatisticsComparisonInterface {
    teamName: string;
    teamImageLink: string;
    memberTotal: string;
    activeMemberTotal: string;
    activityTimeTotal: string;
    runningDistanceTotal: string;
    cyclingDistanceTotal: string;
    gymTimeTotal: string;
    meditationTimeTotal: string;
    climbingTimeTotal: string;
    swimmingTimeTotal: string;
    skatingTimeTotal: string;
    yogaTimeTotal: string;
    hikingTimeTotal: string;
    beginDate: string;
    endDate: string;
}

// this will be called when you start a request
export const teamComparisonFetchRequested = () => ({
    type: actionTypes.TEAM_COMPARISON_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const teamComparisonFetchFulfilled = (
    teamComparison: TeamStatisticsComparisonInterface[],
) => ({
    type: actionTypes.TEAM_COMPARISON_FETCH_FULFILLED,
    payload: teamComparison,
});
// this will be called when you got some errors
export const teamComparisonFetchRejected = (error: any) => ({
    type: actionTypes.TEAM_COMPARISON_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    teamComparisonFetchFulfilled,
    teamComparisonFetchRejected,
    teamComparisonFetchRequested,
};
