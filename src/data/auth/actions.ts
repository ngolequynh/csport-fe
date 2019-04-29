import axios from "~/common/axiosConfigure";
import actionCreators from "./actionCreators";

export const getCurrentUser = () => async (dispatch: any) => {
    try {
        const currentUser = await axios
            .get(`/login/getcurrentuser`)
            .then(response => response.data);
        return dispatch(actionCreators.getCurrentUser(currentUser));
    } catch {
        localStorage.clear();
        window.location.reload();
    }
};

export default {
    getCurrentUser,
};

export interface CurrentUser {
    email: string;
    accountId: string;
    imageLink: string;
    fullName: string;
}
