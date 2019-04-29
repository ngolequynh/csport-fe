import actionTypes from "./constants";
import { ITeamMember } from "src/data/team/teamHeader/types";
import { IApiFailure } from "src/data/types";

// this will be called when you start a request
export const teamMemberFetchRequested = () => ({
    type: actionTypes.TEAMMEMBER_FETCH_REQUESTED as actionTypes.TEAMMEMBER_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const teamMemberFetchFulfilled = (payload: ITeamMember) => ({
    payload,
    type: actionTypes.TEAMMEMBER_FETCH_FULFILLED as actionTypes.TEAMMEMBER_FETCH_FULFILLED,
});
// this will be called when you got some errors
export const teamMemberFetchRejected = (error: IApiFailure) => ({
    type: actionTypes.TEAMMEMBER_FETCH_REJECTED as actionTypes.TEAMMEMBER_FETCH_REJECTED,
    payload: error,
    error: true,
});
