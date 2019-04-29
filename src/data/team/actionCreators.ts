import actionTypes from "./actionTypes";
// define action

export interface TeamInterface {
    name: string;
}
// this will be called when you start a request
export const teamCreatedFetchRequested = () => ({
    type: actionTypes.TEAM_CREATED_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const teamCreatedFetchFulfilled = (teams: TeamInterface) => ({
    type: actionTypes.TEAM_CREATED_FETCH_FULFILLED,
    payload: teams,
});
// this will be called when you got some errors
export const teamCreatedFetchRejected = (error: any) => ({
    type: actionTypes.TEAM_CREATED_FETCH_REJECTED,
    payload: error,
    error: true,
});

export const teamJoinedFetchRequested = () => ({
    type: actionTypes.TEAM_JOINED_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const teamJoinedFetchFulfilled = (teams: TeamInterface) => ({
    type: actionTypes.TEAM_JOINED_FETCH_FULFILLED,
    payload: teams,
});
// this will be called when you got some errors
export const teamJoinedFetchRejected = (error: any) => ({
    type: actionTypes.TEAM_JOINED_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    teamJoinedFetchFulfilled,
    teamCreatedFetchFulfilled,
    teamCreatedFetchRequested,
    teamJoinedFetchRejected,
    teamJoinedFetchRequested,
    teamCreatedFetchRejected,
};
