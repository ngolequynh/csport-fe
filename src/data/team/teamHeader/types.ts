import { IStateMap } from "src/data/types";
import { ActionsUnion } from "src/common/action-helpers/actionsUnion";
import * as actions from "./actions";

export interface ITeamMember {
    id: number;
    name?: string;
    hostId: string;
    imageLink?: string;
    fullName?: string;
}

export type ITeamMemberState = IStateMap<ITeamMember>;

export type ITeamMemberAction = ActionsUnion<typeof actions>;
