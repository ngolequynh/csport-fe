import { IUserProfileState, IUserProfileAction, IUserProfile } from "./types";
import constants from "./constants";
import { statusConstants } from "../constants";
import * as helper from "../reducerHelper";

const initialState: Readonly<IUserProfileState> = {
    status: statusConstants.STATUS_NONE,
    entities: {},
    entitiesOrder: [],
    entitiesStatus: {},
    error: null,
};

const userProfileReducer = (
    state = initialState,
    action: IUserProfileAction,
): IUserProfileState => {
    switch (action.type) {
        case constants.USERPROFILE_GET_REQUEST:
            return helper.request(state);
        case constants.USERPROFILE_GET_SUCCESS:
            const newPayload: IUserProfile[] = [action.payload];
            return helper.getSuccess(state, helper.addIdToEntity(newPayload));
        case constants.USERPROFILE_GET_FAILURE:
            return helper.failure(state, action.error);
        default:
            return state;
    }
};

export default userProfileReducer;
