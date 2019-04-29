import * as React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { default as AuthRoute } from "./components/authRoute/AuthRoute";
import UserExample from "./pages/userExample/User";
import Login from "./pages/login/SimpleLoginForm";
import DrawerAppBar from "~/containers/layouts/appbar/DrawerAppBar";
import FindUser from "./pages/searchUser/index";
import Profile from "./containers/UserProfile/UserProfile";
import UserProfile from "~/pages/user/UserProfile";
import TeamList from "~/pages/team/TeamList";
import ActivityCardList from "~/containers/activity/list-card-activity";
import CompetitionList from "~/pages/competition/CompetitionList";
import TeamInformation from "~/containers/TeamActivities/TeamInformation/TeamInformation";
import TeamComparison from "~/containers/TeamComparison/TeamComparison";
import TeamSta from "~/containers/TeamStatistics/teamStatistics";
import Forum from "~/containers/Chat/Forum";

export function AppRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoute needGuest needAuth={false} exact path="/" component={Login} />
                <AuthRoute
                    needGuest
                    needAuth={false}
                    exact
                    path="/social-success?token"
                    component={<div />}
                />
                <DrawerAppBar>
                    <Switch>
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/user"
                            component={UserExample}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/find/:username"
                            component={FindUser}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/list"
                            component={ActivityCardList}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/profile/:id"
                            component={Profile}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/userProfile"
                            component={UserProfile}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/team"
                            component={TeamList}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/showTeamUsers/:teamId"
                            component={TeamInformation}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/competition"
                            component={CompetitionList}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/teams/:teamId/:competitorId"
                            component={TeamComparison}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/teamSta/:teamId"
                            component={TeamSta}
                        />
                        <AuthRoute
                            needAuth
                            needGuest={false}
                            exact
                            path="/chat/:teamId"
                            component={Forum}
                        />
                        // This must be at the end of switch in case of wrong path
                        <AuthRoute needAuth needGuest exact path="*" component={Login} />
                    </Switch>
                </DrawerAppBar>
            </Switch>
        </BrowserRouter>
    );
}
