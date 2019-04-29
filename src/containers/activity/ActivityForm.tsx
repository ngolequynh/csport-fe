import * as React from "react";
import { FormikErrors, FormikProps, withFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "~/common/axiosConfigure";
import Activity from "./Activity";
import { getHourMin, getSeconds } from "./ActivityFormHelper";
import { activityError } from "./ActivityError";
import { getDateInString, isAPositiveNumber } from "~/common/util";
import { SnackbarType } from "~/containers/snackbar/SnackbarType";
import AutocompleteTextField from "./../../components/textField/autocomplete-text-field";
import {
    getActivityTypeIcon,
    isGymActivity,
    isActivityTypeHasDistance,
    isClimbingActivity,
} from "./ActivityType";
import Timer from "~/containers/activity/timer/Timer";
import "./modalStyle.css";

export enum TextFieldId {
    Activity = "activityId",
    DateTime = "dateTimeId",
    Distance = "distanceId",
    Duration = "durationId",
    Location = "locationId",
    ActivityType = "activityTypeId",
    WorkoutType = "workoutTypeId",
    Photo = "photoId",
}

// Shape of form values
interface ActivityFormValues {
    activityId: string;
    dateTimeId: string;
    distanceId: string;
    workoutTypeId: string;
    durationId: string;
    locationId: string;
    activityTypeId: string;
    activityOptions: string[];
    photoId: string;
    userId: string;
}

interface ExtProps {
    handleCancel(openSnack: boolean, snackType: SnackbarType, msg: string): void;
    handleClose(): void;
    formType: "AddNew" | "Edit";
}

const InnerForm = (
    props: FormikProps<ExtProps & ActivityFormValues>,
): React.ReactElement<ActivityFormProps> => {
    const {
        touched,
        errors,
        isSubmitting,
        handleChange,
        values,
        handleSubmit,
        setFieldValue,
    } = props;
    const AutoCompleteProps = {
        TextFieldProps: {
            id: TextFieldId.Location,
            label: "Location",
            error: touched.locationId && errors.locationId,
            helperText: errors.locationId,
            onChange: handleChange,
            InputLabelProps: {
                shrink: true,
            },
            fullWidth: true,
        },
        inputProps: {
            onChange: handleChange,
            value: values.locationId,
            setClickedValue: setFieldValue,
        },
    };

    const showOptions: JSX.Element[] = values.activityOptions.map((element: string, index) => {
        return (
            <MenuItem key={index} value={element}>
                <img className={"option-icon"} src={getActivityTypeIcon(element)} />
                {element}
            </MenuItem>
        );
    });
    const showDependentField = () => {
        let field: any = null;
        const type = values.activityTypeId;
        if (isGymActivity(type)) {
            field = (
                <TextField
                    id={TextFieldId.WorkoutType}
                    label={"Workout Type"}
                    type={"text"}
                    defaultValue={values.workoutTypeId}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            );
        } else if (isActivityTypeHasDistance(type)) {
            values.distanceId = values.distanceId === "0" ? "" : values.distanceId;
            field = (
                <TextField
                    id={TextFieldId.Distance}
                    label={"Distance"}
                    type={"number"}
                    InputProps={{
                        inputProps: {
                            step: "0.001",
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                {isClimbingActivity(values.activityTypeId) ? "m" : "Km"}
                            </InputAdornment>
                        ),
                    }}
                    defaultValue={values.distanceId}
                    error={touched.distanceId && errors.distanceId !== undefined}
                    helperText={errors.distanceId}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            );
        }
        return field;
    };

    return (
        <form className={"modal-form"} onSubmit={handleSubmit} encType={"multipart/form-data"}>
            <Hidden xlDown>
                <TextField
                    id={TextFieldId.Activity}
                    label={"ID"}
                    value={values.activityId}
                    onChange={handleChange}
                    fullWidth
                    disabled
                />
            </Hidden>
            <p
                className={
                    errors.activityTypeId && touched.activityTypeId
                        ? "custom-label-error"
                        : "custom-label"
                }
            >
                Activity Type
            </p>
            <Select
                name={TextFieldId.ActivityType}
                onChange={handleChange}
                value={values.activityTypeId}
                disabled={values.formType === "Edit"}
                fullWidth
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {showOptions}
            </Select>
            {errors.activityTypeId && touched.activityTypeId ? (
                <p className={"error-type"}>{errors.activityTypeId}</p>
            ) : null}
            <TextField
                id={TextFieldId.DateTime}
                label={"Date and Time"}
                type={"datetime-local"}
                defaultValue={values.dateTimeId}
                error={touched.dateTimeId && errors.dateTimeId !== undefined}
                helperText={errors.dateTimeId}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
            />
            {showDependentField()}
            <Timer
                id={TextFieldId.Duration}
                setFieldValue={setFieldValue}
                label={"Duration"}
                defaultValue={values.durationId}
                error={touched.durationId && errors.durationId !== undefined}
                helperText={errors.durationId}
            />
            <AutocompleteTextField {...AutoCompleteProps} />
            <TextField
                id={TextFieldId.Photo}
                type={"file"}
                label={"Photo"}
                error={touched.photoId && errors.photoId !== undefined}
                helperText={errors.photoId}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
            />
            <div>
                <Button type={"submit"} disabled={isSubmitting} color="primary">
                    Submit
                </Button>
                <Button onClick={values.handleClose} color="primary">
                    Cancel
                </Button>
            </div>
        </form>
    );
};

// The type of props ActivityForm receives
interface ActivityFormProps {
    activity?: Activity;
    handleCancel(openSnack: boolean, snackType: SnackbarType, msg: string): void;
    handleClose(): void;
    formType: "AddNew" | "Edit";
    activityOptions: string[];
    userId: string;
}

const responseMsg = {
    addSuccess: "Add new activity successful",
    addFail: "Add activity fail!",
    updateSuccess: "Update activity successful",
    updateFail: "Update activity fail!",
};

function isImageTypeValid(type: string): boolean {
    const ftype = type.toLowerCase();
    return ftype.includes("jpg") || ftype.includes("png") || ftype.includes("jpeg");
}
// Wrap our form with the using withFormik HoC
const ActivityForm = withFormik<ActivityFormProps, ExtProps & ActivityFormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        const activity = props.activity === undefined ? new Activity() : props.activity;
        // This function will make sure that the system is working well for some activities that don't have the distance.
        const getDistance = (): string => {
            let distance = "";
            if (activity.distance) {
                distance = activity.distance.toString();
            }
            return distance;
        };
        return {
            activityId: activity.activityId || "0",
            dateTimeId: getDateInString(activity.activityDate) || "",
            distanceId: getDistance(),
            workoutTypeId: activity.workoutType || "",
            durationId: getHourMin(activity.duration) || "",
            locationId: activity.location || "",
            handleCancel: props.handleCancel,
            handleClose: props.handleClose,
            formType: props.formType,
            activityTypeId: activity.activityType || "",
            activityOptions: props.activityOptions || [],
            photoId: "",
            isSnackOpen: false,
            snackType: SnackbarType.Success,
            snackMsg: "",
            userId: props.userId,
        };
    },

    validate: (values: ActivityFormValues) => {
        const errors: FormikErrors<ActivityFormValues> = {};
        // Validate activity type
        if (!values.activityTypeId) {
            errors.activityTypeId = activityError.activityTypeEmptyError;
        }
        // Validate duration
        if (!isAPositiveNumber(values.durationId)) {
            errors.durationId = activityError.durationEmptyError;
        }
        // Validate date time
        if (!values.dateTimeId) {
            errors.dateTimeId = activityError.dateTimeEmptyError;
        }
        // Validate distance if the activity is running or cycling
        if (
            (!values.distanceId || values.distanceId === "0") &&
            values.activityTypeId &&
            isActivityTypeHasDistance(values.activityTypeId)
        ) {
            errors.distanceId = activityError.distanceEmptyError;
        } else {
            const distance = Number(values.distanceId);
            if (distance < 0) {
                errors.distanceId = activityError.distanceNegativeError;
            }
        }
        // Validate the image if it's not null
        const fileList = (document.getElementById(TextFieldId.Photo) as HTMLInputElement).files;
        if (fileList && fileList.length > 0) {
            const file: File = fileList[0];
            if (file.size > 5242880 /* = 5MB */) {
                errors.photoId = activityError.imageSizeError;
            }
            if (!isImageTypeValid(file.type)) {
                errors.photoId = activityError.imageFileTypeError;
            }
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        const activity = {
            activityId: values.activityId,
            accountId: values.userId,
            title: values.activityTypeId + " Activity",
            activityType: values.activityTypeId,
            location: values.locationId,
            distance: values.distanceId,
            workoutType: values.workoutTypeId,
            duration: "" + getSeconds(values.durationId),
            activityDate: values.dateTimeId.replace("T", " ") + ":00",
        };
        const data = new FormData();
        const blobStr = new Blob([JSON.stringify(activity)], { type: "application/json" });
        data.append("activity", blobStr);
        // Get the file from form
        const fileList = (document.getElementById(TextFieldId.Photo) as HTMLInputElement).files;
        if (fileList && fileList.length > 0) {
            data.append("activityImage", fileList[0]);
        }
        const method = values.formType === "AddNew" ? "POST" : "PUT";
        // Send a request
        axios({
            method,
            data,
            url: "/activities",
        })
            .then(response => {
                if (response.status === 201 || response.status === 200) {
                    const msg =
                        values.formType === "AddNew"
                            ? responseMsg.addSuccess
                            : responseMsg.updateSuccess;
                    values.handleCancel(true, SnackbarType.Success, msg);
                }
            })
            .catch(() => {
                const msg =
                    values.formType === "AddNew" ? responseMsg.addFail : responseMsg.updateFail;
                values.handleCancel(true, SnackbarType.Error, msg);
            });
        setSubmitting(true);
    },
})(InnerForm);

export default ActivityForm;
