import { today } from "~/common/util";
import ActivityInterface from "~/containers/activity/ActivityInterface";
import { ActivityType } from "~/containers/activity/ActivityType";
const moment = require("moment");

class Activity {
    private _activityId: string;
    private _title: string;
    private _imageLink?: string;
    private _accountId: string;
    private _activityDate: Date;
    private _duration: number;
    private _location: string;
    private _createdDate: Date;
    private _lastModifiedDate: Date;
    private _isActive: boolean;
    private _activityType: string;
    private _workoutType?: string;
    private _distance?: number;

    private defaultActivity: ActivityInterface = {
        activityId: "",
        activityDate: today(),
        distance: 0,
        duration: 0,
        location: "",
        title: "",
        activityType: ActivityType.Running,
        imageLink: "",
        isActive: true,
    };

    get imageLink(): string {
        return this._imageLink || "";
    }

    set imageLink(value: string) {
        this._imageLink = value;
    }

    constructor(activityInfo?: ActivityInterface) {
        const tempInfo = activityInfo ? activityInfo : this.defaultActivity;
        this.activityId = tempInfo.activityId;
        const date = new Date(
            moment(tempInfo.activityDate.replace("T", " ")).format("MMM DD YYYY hh:mm:ss a"),
        );
        this.activityId = tempInfo.activityId;
        this.activityDate = date;
        this.duration = tempInfo.duration;
        this.location = tempInfo.location;
        this.distance = tempInfo.distance;
        this.activityType = tempInfo.activityType;
        this.workoutType = tempInfo.workoutType || "";
        this.title = tempInfo.title;
        this.isActive = tempInfo.isActive;
    }

    get activityId(): string {
        return this._activityId;
    }

    set activityId(value: string) {
        this._activityId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get accountId(): string {
        return this._accountId;
    }

    set accountId(value: string) {
        this._accountId = value;
    }

    get activityDate(): Date {
        return this._activityDate;
    }

    set activityDate(value: Date) {
        this._activityDate = value;
    }

    get duration(): number {
        return this._duration;
    }

    set duration(value: number) {
        this._duration = value;
    }

    get location(): string {
        return this._location;
    }

    set location(value: string) {
        this._location = value;
    }

    get createdDate(): Date {
        return this._createdDate;
    }

    set createdDate(value: Date) {
        this._createdDate = value;
    }

    get lastModifiedDate(): Date {
        return this._lastModifiedDate;
    }

    set lastModifiedDate(value: Date) {
        this._lastModifiedDate = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    get activityType(): string {
        return this._activityType;
    }

    set activityType(value: string) {
        this._activityType = value;
    }

    get workoutType(): string {
        return this._workoutType === undefined ? "" : this._workoutType;
    }

    set workoutType(value: string) {
        this._workoutType = value;
    }

    get distance(): number {
        return this._distance === undefined ? 0 : this._distance;
    }

    set distance(value: number) {
        this._distance = value;
    }
}

export default Activity;
