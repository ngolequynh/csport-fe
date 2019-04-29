import * as actions from "./actions";
import { ActionsUnion } from "~/common/action-helpers/actionsUnion";
import { IStateMap } from "~/data/types";

export interface IUserProfile {
    id: number;
    profileId: string;
    accountId: string;
    fullName: string;
    imageLink: string;
    createdDate: string;
    introduction: string;
    hobbies: string;
    status: string;
}

export type IUserProfileState = IStateMap<IUserProfile>;

export type IUserProfileAction = ActionsUnion<typeof actions>;
