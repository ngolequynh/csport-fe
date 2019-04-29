import actionTypes from "./actionTypes";
// define action

export interface UserInterface {
    name: string;
    username: string;
    email: string;
    website: string;
}
// this will be called when you start a request
export const userFetchRequested = () => ({
    type: actionTypes.USER_FETCH_REQUESTED,
});
// this will be call when you get the data back
export const userFetchFulfilled = (users: UserInterface) => ({
    type: actionTypes.USER_FETCH_FULFILLED,
    payload: users,
});
// this will be call when you got some error
export const userFetchRejected = (error: any) => ({
    type: actionTypes.USER_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    userFetchFulfilled,
    userFetchRejected,
    userFetchRequested,
};
