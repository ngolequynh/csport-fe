import types from "./actionTypes";

export interface CurrentUser {
    email: string;
    id: string;
    imageLink: string;
    fullName: string;
}

const getCurrentUser = (currentUser: CurrentUser) => ({
    type: types.GET_CURRENT_USER,
    payload: {
        currentUser,
    },
});

export default {
    getCurrentUser,
};
