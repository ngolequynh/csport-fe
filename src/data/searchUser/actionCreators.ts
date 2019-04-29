import actionTypes from "./actionTypes";
// define action

export interface UserType {
    accountId: string;
    fullName: string;
    email: string;
    imageLink: string;
}
// this will be called when you start a request
export const searchUserFetchRequested = () => ({
    type: actionTypes.SEARCH_USER_FETCH_REQUESTED,
});
// this will be call when you get the data back
export const searchUserFetchFulfilled = (searchUsers: UserType) => ({
    type: actionTypes.SEARCH_USER_FETCH_FULFILLED,
    payload: searchUsers,
});
// this will be call when you got some error
export const searchUserFetchRejected = (error: any) => ({
    type: actionTypes.SEARCH_USER_FETCH_REJECTED,
    payload: error,
    error: true,
});

export const searchUserNotInCompetitionFetchRequested = () => ({
    type: actionTypes.SEARCH_USER_NOT_IN_COMPETITION_FETCH_REQUESTED,
});

export const searchUserNotInCompetitionFetchFulfilled = (searchUsers: UserType) => ({
    type: actionTypes.SEARCH_USER_NOT_IN_COMPETITION_FETCH_FULFILLED,
    payload: searchUsers,
});

export const searchUserNotInCompetitionFetchRejected = (error: any) => ({
    type: actionTypes.SEARCH_USER_NOT_IN_COMPETITION_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    searchUserFetchRequested,
    searchUserFetchFulfilled,
    searchUserFetchRejected,
    searchUserNotInCompetitionFetchRequested,
    searchUserNotInCompetitionFetchFulfilled,
    searchUserNotInCompetitionFetchRejected,
};
