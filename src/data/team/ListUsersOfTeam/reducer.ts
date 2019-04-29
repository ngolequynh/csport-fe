import actionTypes from "./actionTypes";
import * as Redux from "redux";
export const INITIAL_STATE = {
    list: [],
    fecthStatus: "",
};

// reducer will decide which action will be called
export const reducer = (state = INITIAL_STATE, action: Redux.AnyAction) => {
    switch (action.type) {
        case actionTypes.LIST_USERS_OF_TEAM_FETCH_REQUESTED:
            return {
                ...state,
                fecthStatus: "fetching ...",
            };
        case actionTypes.LIST_USERS_OF_TEAM_FETCH_FULFILLED:
            return {
                ...state,
                fecthStatus: `fetched`,
                list: action.payload,
            };
        case actionTypes.LIST_USERS_OF_TEAM_FETCH_REJECTED:
            return {
                ...state,
                fecthStatus: `error: ${action.payload}`,
            };
        default:
            return state;
    }
};

export default reducer;
