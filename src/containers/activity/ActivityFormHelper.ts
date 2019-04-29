import { padZero } from "~/common/util";

/** This function will return a string format 'HourMinute' from a number (seconds).
 * E.g: 3600s->0100 (means 1h 00m)
 * */
export const getHourMin = (seconds: number): string => {
    if (seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - hours * 3600) / 60);
        return "" + padZero(hours) + "" + padZero(mins);
    }
    return "";
};

/** This function will return the seconds from a string 'HourMinute'.
 * E.g: 0136 (means 1h 36m) ->  5760s
 * */
export const getSeconds = (hourMin: string): number => {
    const hours = hourMin.slice(0, 2);
    const mins = hourMin.slice(-2);
    return Number(hours) * 3600 + Number(mins) * 60;
};
