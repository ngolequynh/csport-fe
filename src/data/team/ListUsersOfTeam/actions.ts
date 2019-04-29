import actionCreators from "./actionCreators";
import axios from "~/common/axiosConfigure";

// merge all actions into a completed process
export const fetchUsersOfTeam = (teamId: string) => async (dispatch: any) => {
    dispatch(actionCreators.listUsersOfTeamFetchRequested);
    try {
        const usersOfTeam = await axios.get(`/teams/member/${teamId}?fullname`).then(response => {
            const list = response.data;
            return list;
        });
        return dispatch(actionCreators.listUsersOfTeamFetchFulfilled(usersOfTeam));
    } catch (error) {
        dispatch(actionCreators.listUsersOfTeamFetchRejected(error));
    }
};

export default {
    fetchUsersOfTeam,
};
