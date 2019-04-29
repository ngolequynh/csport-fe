import actionTypes from "./actionTypes";
// define action
export interface InformationType {
    statisticDto: StatisticType;
    profileDto: ProfileType;
}
export interface StatisticType {
    runningDisTotal: number;
    cyclingDisTotal: number;
    gymTimeTotal: number;
    climbingTimeTotal: number;
    hikingTimeTotal: number;
    meditationTimeTotal: number;
    skatingTimeTotal: number;
    swimmingTimeTotal: number;
    yogaTimeTotal: number;
}
export interface ProfileType {
    fullName: string;
    imageLink: string;
}
export interface CompetitionInterface {
    competitionId: string;
    host: InformationType;
    invitee: InformationType;
}
// this will be called when you start a request
export const competitionFetchRequested = () => ({
    type: actionTypes.COMPETITION_FETCH_REQUESTED,
});
// this will be called when you get the data back
export const competitionFetchFulfilled = (competitions: CompetitionInterface) => ({
    type: actionTypes.COMPETITION_FETCH_FULFILLED,
    payload: competitions,
});
// this will be called when you got some errors
export const competitionFetchRejected = (error: any) => ({
    type: actionTypes.COMPETITION_FETCH_REJECTED,
    payload: error,
    error: true,
});

export default {
    competitionFetchFulfilled,
    competitionFetchRequested,
    competitionFetchRejected,
};
