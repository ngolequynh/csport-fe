type FuntionType = (...args: any[]) => any;
type ActionsCreatorsMapObject = { [actionCreators: string]: FuntionType };

export type ActionsUnion<A extends ActionsCreatorsMapObject> = ReturnType<A[keyof A]>;
