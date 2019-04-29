import axios from "~/common/axiosConfigure";
import actionCreators from "./actionCreators";

// merge all actions into a completed process
export const fetchCompetitions = (userId: string) => async (dispatch: any) => {
    dispatch(actionCreators.competitionFetchRequested());
    try {
        const competitions = await axios
            .get(`/competition?accountId=${userId}`)
            .then(response => response.data);
        return dispatch(actionCreators.competitionFetchFulfilled(competitions));
    } catch (error) {
        dispatch(actionCreators.competitionFetchRejected(error));
    }
};

export default {
    fetchCompetitions,
};
