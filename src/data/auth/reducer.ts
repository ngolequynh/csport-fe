import types from "./actionTypes";
import * as Redux from "redux";

const reducer = (state = {}, action: Redux.AnyAction) => {
    switch (action.type) {
        case types.GET_CURRENT_USER: {
            const newState = { ...state, currentUser: action.payload.currentUser };
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default reducer;
