import actionTypes from "./actionTypes";
import * as Redux from "redux";
export const INITIAL_STATE = {
    list: [],
    fecthStatus: "",
};

// reducer will decide which action will be call
export const reducer = (state = INITIAL_STATE, action: Redux.AnyAction) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_REQUESTED:
            return {
                ...state,
                fecthStatus: "fetching ...",
            };
        case actionTypes.USER_FETCH_FULFILLED:
            return {
                ...state,
                fecthStatus: `fetched`,
                list: action.payload,
            };
        case actionTypes.USER_FETCH_REJECTED:
            return {
                ...state,
                fecthStatus: `error: ${action.payload}`,
            };
        default:
            return state;
    }
};

export default reducer;
