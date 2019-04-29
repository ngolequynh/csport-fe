import constants from "./constants";
import { IUserProfile } from "~/data/userProfile/types";
import { IApiFailure } from "~/data/types";

export const userProfileRequest = () => ({
    type: constants.USERPROFILE_GET_REQUEST as constants.USERPROFILE_GET_REQUEST,
});

export const getUserProfileSuccess = (payload: IUserProfile) => ({
    payload,
    type: constants.USERPROFILE_GET_SUCCESS as constants.USERPROFILE_GET_SUCCESS,
});

export const getUserProfileFailure = (payload: IApiFailure) => ({
    type: constants.USERPROFILE_GET_FAILURE as constants.USERPROFILE_GET_FAILURE,
    error: payload,
});
