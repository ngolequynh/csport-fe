import axios from "~/common/axiosConfigure";
import actionCreators from "./actionCreators";

// merge all actions into a completed process
export const fetchCreatedTeams = (userId: string) => async (dispatch: any) => {
    dispatch(actionCreators.teamCreatedFetchRequested());
    try {
        const teams = await axios
            .get(`/teams/created?accountId=${userId}`)
            .then(response => response.data);
        return dispatch(actionCreators.teamCreatedFetchFulfilled(teams));
    } catch (error) {
        dispatch(actionCreators.teamCreatedFetchRejected(error));
    }
};

export const fetchJoinedTeams = (userId: string) => async (dispatch: any) => {
    dispatch(actionCreators.teamJoinedFetchRequested());
    try {
        const teams = await axios
            .get(`/teams/joined?accountId=${userId}`)
            .then(response => response.data);
        return dispatch(actionCreators.teamJoinedFetchFulfilled(teams));
    } catch (error) {
        dispatch(actionCreators.teamJoinedFetchRejected(error));
    }
};

export default {
    fetchCreatedTeams,
    fetchJoinedTeams,
};
