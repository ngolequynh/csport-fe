export enum ActivityType {
    // Types that have distance
    Running = "Running",
    Cycling = "Cycling",
    Hiking = "Hiking",
    Swimming = "Swimming",
    Climbing = "Climbing",
    Skating = "Skating",
    // Types without distance
    Meditation = "Meditation",
    Gym = "Gym",
    Yoga = "Yoga",
}

export const getActivityTypeIcon = (type: string) => {
    let path = "";
    switch (type) {
        case ActivityType.Running:
            path = require("../../theme/images/run.png");
            break;
        case ActivityType.Cycling:
            path = require("../../theme/images/cycling.png");
            break;
        case ActivityType.Hiking:
            path = require("../../theme/images/hiking.png");
            break;
        case ActivityType.Swimming:
            path = require("../../theme/images/swimming.png");
            break;
        case ActivityType.Climbing:
            path = require("../../theme/images/climbing.png");
            break;
        case ActivityType.Skating:
            path = require("../../theme/images/skating.png");
            break;
        case ActivityType.Meditation:
            path = require("../../theme/images/meditation.png");
            break;
        case ActivityType.Gym:
            path = require("../../theme/images/gym.png");
            break;
        case ActivityType.Yoga:
            path = require("../../theme/images/yoga.png");
            break;
        default:
            path = require("../../theme/images/skating.png");
            break;
    }
    return path;
};

export const isActivityTypeHasDistance = (type: string): boolean => {
    let hasDistance = false;
    switch (type) {
        case ActivityType.Running:
        case ActivityType.Cycling:
        case ActivityType.Climbing:
        case ActivityType.Swimming:
        case ActivityType.Skating:
        case ActivityType.Hiking:
            hasDistance = true;
            break;
        default:
            break;
    }

    return hasDistance;
};

export const isGymActivity = (type: string): boolean => {
    return type === ActivityType.Gym;
};

export const isClimbingActivity = (type: string): boolean => {
    return type === ActivityType.Climbing;
};
