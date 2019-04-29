import * as Redux from "redux";
import actionTypes from "./actionTypes";

export const INITIAL_STATE = {
    listCreated: [],
    listJoined: [],
    fecthStatus: "",
};

// reducer will decide which action will be called
export const reducer = (state = INITIAL_STATE, action: Redux.AnyAction) => {
    switch (action.type) {
        case (actionTypes.TEAM_CREATED_FETCH_REQUESTED, actionTypes.TEAM_JOINED_FETCH_REQUESTED):
            return {
                ...state,
                fecthStatus: "fetching ...",
            };
        case actionTypes.TEAM_CREATED_FETCH_FULFILLED:
            return {
                ...state,
                fecthStatus: `fetched`,
                listCreated: action.payload,
            };
        case actionTypes.TEAM_JOINED_FETCH_FULFILLED:
            return {
                ...state,
                fecthStatus: `fetched`,
                listJoined: action.payload,
            };
        case (actionTypes.TEAM_CREATED_FETCH_REJECTED, actionTypes.TEAM_JOINED_FETCH_REJECTED):
            return {
                ...state,
                fecthStatus: `error: ${action.payload}`,
            };
        default:
            return state;
    }
};

export default reducer;
