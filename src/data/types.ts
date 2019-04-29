import { statusConstants } from "~/data/constants";
import { IUserProfileState } from "~/data/userProfile/types";
import { ITeamMemberState } from "~/data/team/teamHeader/types";
import { CurrentUser } from "./auth/actions";

export interface ISubCurrentUser {
    currentUser: CurrentUser;
}

export interface IRootState {
    userProfile: IUserProfileState;
    teamMember: ITeamMemberState;
    currentUser: ISubCurrentUser;
}

export interface IAction {
    type: string;
}

export interface ISuccessAction<P> extends IAction {
    payload: P;
}

export interface ISubError {
    object: string | null;
    field: string | null;
    rejectedValue: string | null;
    message: string | null;
}

export interface IApiFailure {
    status: string | null;
    timestamp: string;
    message: string | null;
    debugMessage: string | null;
    subErrors: null | {
        [index: string]: ISubError[];
    };
}

export interface IFailureAction extends IAction {
    error: IApiFailure;
}

export interface IEntitiesStatus {
    [index: number]: statusConstants;
}

export interface IStateMap<T> {
    status: statusConstants;
    entities: {
        [index: number]: T;
    };
    entitiesStatus: IEntitiesStatus;
    entitiesOrder: number[];
    error: IApiFailure | null;
}
