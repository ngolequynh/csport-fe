import actionTypes from "./constants";
import { statusConstants } from "src/data/constants";
import { ITeamMember, ITeamMemberAction, ITeamMemberState } from "src/data/team/teamHeader/types";
import * as helper from "../../reducerHelper";

export const initialState: Readonly<ITeamMemberState> = {
    status: statusConstants.STATUS_NONE,
    entities: {},
    entitiesOrder: [],
    entitiesStatus: {},
    error: null,
};

// reducer will decide which action will be call
export const reducer = (state = initialState, action: ITeamMemberAction) => {
    switch (action.type) {
        case actionTypes.TEAMMEMBER_FETCH_REQUESTED:
            return helper.request(state);
        case actionTypes.TEAMMEMBER_FETCH_FULFILLED:
            const newPayload: ITeamMember[] = [action.payload];
            return helper.getSuccess(state, helper.addIdToEntity(newPayload));
        case actionTypes.TEAMMEMBER_FETCH_REJECTED:
            return helper.failure(state, action.payload);
        default:
            return state;
    }
};

export default reducer;
