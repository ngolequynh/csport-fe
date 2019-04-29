import actionTypes from "./actionTypes";
// define action

export interface UserOfTeamInterface {
    fullName: string;
    accountId: string;
    imageLink: string;
}
// this will be called when you start a request
export const listUsersOfTeamFetchRequested = () => ({
    type: actionTypes.LIST_USERS_OF_TEAM_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const listUsersOfTeamFetchFulfilled = (usersOfTeam: UserOfTeamInterface) => {
    return {
        type: actionTypes.LIST_USERS_OF_TEAM_FETCH_FULFILLED,
        payload: usersOfTeam,
    };
};
// this will be called when you got some errors
export const listUsersOfTeamFetchRejected = (error: any) => ({
    type: actionTypes.LIST_USERS_OF_TEAM_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    listUsersOfTeamFetchFulfilled,
    listUsersOfTeamFetchRejected,
    listUsersOfTeamFetchRequested,
};
