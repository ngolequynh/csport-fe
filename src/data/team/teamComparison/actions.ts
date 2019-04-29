import actionCreators from "./actionCreators";
import axios from "~/common/axiosConfigure";

// merge all actions into a completed process
export const fetchTeamComparison = (
    teamId: string,
    competitorId: string,
    timeInterval: string,
    timeZoneOffset: number,
) => async (dispatch: any) => {
    dispatch(actionCreators.teamComparisonFetchRequested);
    try {
        const teamComparisonList = await axios
            .get(
                process.env.LOCAL_HOST_URL +
                    `/teams/compare/${teamId}?competitor=${competitorId}&timeinterval=${timeInterval}&timezoneoffset=${timeZoneOffset}`,
            )
            .then(response => {
                const list = response.data;
                return list;
            });
        return dispatch(actionCreators.teamComparisonFetchFulfilled(teamComparisonList));
    } catch (error) {
        dispatch(actionCreators.teamComparisonFetchRejected(error));
    }
};

export default {
    fetchTeamComparison,
};
