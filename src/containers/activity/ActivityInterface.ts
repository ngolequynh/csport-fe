interface ActivityInterface {
    activityId: string;
    title: string;
    location: string;
    distance: number;
    duration: number;
    activityDate: string;
    activityType: string;
    workoutType?: string;
    isActive: boolean;
    imageLink?: string;
}

export default ActivityInterface;
