import actionCreators from "./actionCreators";
import axios from "~/common/axiosConfigure";

// merge all action into a completed process
export const fetchUser = () => async (dispatch: any) => {
    dispatch(actionCreators.userFetchRequested);
    try {
        const users = await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                const list = response.data.splice(0, 3);
                return list;
            });
        return dispatch(actionCreators.userFetchFulfilled(users));
    } catch (error) {
        dispatch(actionCreators.userFetchRejected(error));
    }
};

export default {
    fetchUser,
};
