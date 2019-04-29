import actionTypes from "./actionTypes";
import * as Redux from "redux";

export const INITIAL_STATE = {
    list: [],
    fetchStatus: "",
};
// reducer will decide which action will be call
export const reducer = (state = INITIAL_STATE, action: Redux.AnyAction) => {
    switch (action.type) {
        case actionTypes.SEARCH_USER_FETCH_REQUESTED:
            return {
                ...state,
                fetchStatus: "fetching ...",
            };
        case actionTypes.SEARCH_USER_FETCH_FULFILLED:
            return {
                ...state,
                fetchStatus: `fetched`,
                list: action.payload,
            };
        case actionTypes.SEARCH_USER_FETCH_REJECTED:
            return {
                ...state,
                fetchStatus: `error: ${action.payload}`,
            };
        case actionTypes.SEARCH_USER_NOT_IN_COMPETITION_FETCH_REQUESTED:
            return {
                ...state,
                fetchStatus: "user not in competition fetching ...",
            };
        case actionTypes.SEARCH_USER_NOT_IN_COMPETITION_FETCH_FULFILLED:
            return {
                ...state,
                fetchStatus: "user not in competition fetched",
                list: action.payload,
            };
        case actionTypes.SEARCH_USER_NOT_IN_COMPETITION_FETCH_REJECTED:
            return {
                ...state,
                fetchStatus: `error: ${action.payload}`,
            };
        default:
            return state;
    }
};

export default reducer;
