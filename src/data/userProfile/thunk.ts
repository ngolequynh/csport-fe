import axios from "~/common/axiosConfigure";
import { Dispatch } from "redux";
import * as actions from "./actions";
import { IUserProfileAction } from "~/data/userProfile/types";

export const fetchUserProfile = (userId: string) => {
    return (dispatch: Dispatch<IUserProfileAction>) => {
        dispatch(actions.userProfileRequest());
        axios
            .get(`/profile/id/${userId}`)
            .then(res => {
                dispatch(actions.getUserProfileSuccess(res.data));
            })
            .catch(error => {
                dispatch(actions.getUserProfileFailure(error.response));
            });
    };
};
