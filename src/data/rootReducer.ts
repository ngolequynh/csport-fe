import { combineReducers } from "redux";
import user from "./user/reducer";
import notification from "./notification/reducer";
import teamMember from "./team/teamHeader/reducer";
import team from "./team/reducer";
import listUsersOfTeam from "./team/ListUsersOfTeam/reducer";
import listActivities from "./team/ListActivities/reducer";
import searchUser from "./searchUser/reducer";
import teamComparison from "./team/teamComparison/reducer";
import userProfile from "./userProfile/reducers";
import currentUser from "./auth/reducer";
import competition from "./competition/reducer";

const myReducer = combineReducers({
    user,
    teamMember,
    team,
    searchUser,
    userProfile,
    currentUser,
    listUsersOfTeam,
    listActivities,
    teamComparison,
    notification,
    competition,
});

export default myReducer;
