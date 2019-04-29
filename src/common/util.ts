const moment = require("moment");
/** This function will return date - time format like: 2018-06-15T18:47 (yyyy-MM-ddTHH:mm) in current date */
export const today = (): string => {
    return moment().format("YYYY-MM-DDTHH:mm");
};

/** This function will return dateTime time format like: 2018-06-15T18:47 (yyyy-MM-ddTHH:mm) from a Date object */
export const getDateInString = (date: Date): string => {
    return moment(date).format("YYYY-MM-DDTHH:mm");
};

/**
 * This function will format a number to a 'two-digit number' string. e.g: 8->08; 10->10
 * @param num number to format
 */
export const padZero = (num: Number): string => {
    // Get two characters from the last element of the char array.
    return ("0" + num).slice(-2);
};

export const isAPositiveNumber = (str: string) => {
    const num = Number(str);
    return !isNaN(num) && num > 0;
};

export const parseToHourAndMinute = (str: string) => {
    const hour = Math.floor(Number(str) / 3600);
    const minute = Math.floor((Number(str) - hour * 3600) / 60);
    return hour + " : " + minute;
};
