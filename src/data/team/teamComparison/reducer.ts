import * as Redux from "redux";
import actionTypes from "./actionTypes";
export const INITIAL_STATE = {
    list: [],
    fecthStatus: "",
};

// reducer will decide which action will be called
export const reducer = (state = INITIAL_STATE, action: Redux.AnyAction) => {
    switch (action.type) {
        case actionTypes.TEAM_COMPARISON_FETCH_REQUESTED:
            return {
                ...state,
                fecthStatus: "fetching ...",
            };
        case actionTypes.TEAM_COMPARISON_FETCH_FULFILLED:
            return {
                ...state,
                fecthStatus: `fetched`,
                list: action.payload,
            };
        case actionTypes.TEAM_COMPARISON_FETCH_REJECTED:
            return {
                ...state,
                fecthStatus: `error: ${action.payload}`,
            };
        default:
            return state;
    }
};

export default reducer;
