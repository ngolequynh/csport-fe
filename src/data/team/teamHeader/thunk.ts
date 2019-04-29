import * as actionCreators from "./actions";
import axios from "~/common/axiosConfigure";
import { Dispatch } from "redux";
import { ITeamMemberAction } from "src/data/team/teamHeader/types";

export const fetchMemberTeams = (id: string) => {
    return (dispatch: Dispatch<ITeamMemberAction>) => {
        dispatch(actionCreators.teamMemberFetchRequested());
        axios
            .get(`/teams/teamHeader/${id}`)
            .then(res => {
                dispatch(actionCreators.teamMemberFetchFulfilled(res.data));
            })
            .catch(error => {
                dispatch(actionCreators.teamMemberFetchRejected(error.response));
            });
    };
};
