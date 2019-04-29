import actionCreators from "./actionCreators";
import axios from "~/common/axiosConfigure";

// merge all action into a completed process
export const fetchUserList = (username: string) => async (dispatch: any) => {
    dispatch(actionCreators.searchUserFetchRequested);
    try {
        await axios.get(`/profile/${username}`).then((response: any) => {
            return dispatch(actionCreators.searchUserFetchFulfilled(response));
        });
        // return dispatch(actionCreators.searchUserFetchFulfilled(users));
    } catch (error) {
        dispatch(actionCreators.searchUserFetchRejected(error));
    }
};

export const fetchUserListNotInTeam = (fullName: string, teamId: string) => async (
    dispatch: any,
) => {
    dispatch(actionCreators.searchUserFetchRequested);
    try {
        await axios.get(`/teams/notmember/${teamId}?fullname=${fullName}`).then((response: any) => {
            return dispatch(actionCreators.searchUserFetchFulfilled(response));
        });
    } catch (error) {
        dispatch(actionCreators.searchUserFetchRejected(error));
    }
};

export const fetchUserListNotInCompetition = (fullName: string, accountId: string) => async (
    dispatch: any,
) => {
    dispatch(actionCreators.searchUserNotInCompetitionFetchRequested());
    try {
        await axios.get(`/profile/${accountId}/${fullName}`).then((response: any) => {
            return dispatch(actionCreators.searchUserNotInCompetitionFetchFulfilled(response));
        });
    } catch (error) {
        dispatch(actionCreators.searchUserNotInCompetitionFetchRejected(error));
    }
};

export default {
    fetchUserList,
    fetchUserListNotInTeam,
    fetchUserListNotInCompetition,
};
