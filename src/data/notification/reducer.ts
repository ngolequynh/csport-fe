import actionTypes from "./actionTypes";
import * as Redux from "redux";
export const INITIAL_STATE = {
    notifications: [],
    fecthStatus: "",
};

// reducer will decide which action will be called
export const reducer = (state = INITIAL_STATE, action: Redux.AnyAction) => {
    switch (action.type) {
        case actionTypes.COMPETITOR_NOTIFICATION_FETCH_REQUESTED:
            return {
                ...state,
                fecthStatus: "fetching ...",
            };
        case actionTypes.COMPETITOR_NOTIFICATION_FETCH_FULFILLED:
            return {
                ...state,
                fecthStatus: `fetched`,
                notifications: action.payload,
            };
        case actionTypes.COMPETITOR_NOTIFICATION_FETCH_REJECTED:
            return {
                ...state,
                fecthStatus: `error: ${action.payload}`,
            };
        default:
            return state;
    }
};

export default reducer;
