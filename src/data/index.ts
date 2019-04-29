import { combineReducers } from "redux";
import user from "./user/reducer";
import teamMember from "./team/teamHeader/reducer";
const myReducer = combineReducers({
    user,
    teamMember,
});

export default myReducer;
