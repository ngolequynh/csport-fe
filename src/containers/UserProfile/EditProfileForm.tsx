import * as React from "react";
import TextField from "@material-ui/core/TextField";
import { withFormik, FormikProps, FormikErrors } from "formik";
import { IUserProfile } from "~/data/userProfile/types";
import axios from "~/common/axiosConfigure";
import { profileError } from "~/containers/UserProfile/ProfileError";
import { ListItemText, IconButton } from "@material-ui/core/es";
import { SnackbarType } from "~/containers/snackbar/SnackbarType";
import Icon from "@material-ui/core/Icon";
import { StyleRules, withStyles, WithStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { List, ListItem, Divider, Select, MenuItem, ListItemIcon } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

enum TextFieldId {
    ImageLink = "imageLink",
    FullName = "fullName",
    Introduction = "introduction",
    Hobbies = "hobbies",
    Status = "status",
}

interface FormValues {
    userId: string;
    accountId: string;
    profileId: string;
    imageLink: string;
    fullName: string;
    introduction: string;
    hobbies: string;
    status: string;
    statusOptions: string[];
}

interface OtherProps {
    handleCancel(openSnack: boolean, snackType: SnackbarType, msg: string): void;
    handleClose(): void;
}

class Profile implements IUserProfile {
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

const styles: StyleRules = {
    formHeader: {
        width: "100%",
        textAlign: "center",
        margin: "15px 0px",
    },
    formTitle: {
        fontSize: "20px",
        display: "inline",
        height: "48px",
        textAlign: "center",
    },
    back: {
        float: "left",
        display: "inline",
        color: "#d80202",
        width: 18,
        height: 18,
    },
    done: {
        float: "right",
        display: "inline",
        color: "#008c46",
        width: 18,
        height: 18,
    },
    imageContainer: {
        width: "100%",
        height: 270,
        marginBottom: 30,
        marginTop: 10,
    },
    image: {
        height: 250,
        width: 250,
        position: "relative",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        objectFit: "cover",
    },
    avatar: {
        height: 250,
        width: 250,
        borderStyle: "solid",
        borderColor: "#3f51b5",
        borderRadius: "50%",
        objectFit: "cover",
    },
    editAvatar: {
        zIndex: 1,
        bottom: 10,
        right: 10,
        display: "float",
        position: "absolute",
    },
    chooseFile: {
        display: "none",
    },
};

interface OptionDialogProps {
    upload: () => void;
    reset: () => void;
}
interface OptionDialogState {
    isOpen: boolean;
    anchorEl: HTMLElement | undefined;
}
class OptionDialog extends React.Component<OptionDialogProps, OptionDialogState> {
    private handleClickUpload = (): void => {
        this.handleClose();
        this.props.upload();
    };

    private handleClickReset = (): void => {
        this.handleClose();
        this.props.reset();
    };

    private handleClose = (): void => {
        this.setState({
            isOpen: false,
        });
    };

    private handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState({
            isOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    constructor(props: OptionDialogProps) {
        super(props);
        this.state = {
            isOpen: false,
            anchorEl: undefined,
        };
    }

    render(): React.ReactNode {
        return (
            <div>
                <Avatar style={{ backgroundColor: "#3f51b5" }}>
                    <Icon onClick={this.handleOpen}>camera_alt</Icon>
                </Avatar>
                <Dialog open={this.state.isOpen} onClose={this.handleClose}>
                    <List>
                        <ListItem key="upload" onClick={this.handleClickUpload}>
                            <ListItemIcon style={{ color: "#3f51b5" }}>
                                <Icon>cloud_upload</Icon>
                            </ListItemIcon>
                            <ListItemText>Upload image</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem key="reset" onClick={this.handleClickReset}>
                            <ListItemIcon style={{ color: "#3f51b5" }}>
                                <Icon>cancel</Icon>
                            </ListItemIcon>
                            <ListItemText>Reset image</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

const InnerForm = (
    props: OtherProps & FormikProps<FormValues> & { classes: Record<string, string> },
) => {
    const { touched, errors, isSubmitting, handleChange, values, handleSubmit, classes } = props;
    // show status options menu
    const showStatusOptions: JSX.Element[] = values.statusOptions.map((element: string, index) => {
        return (
            <MenuItem key={index} value={element}>
                {element}
            </MenuItem>
        );
    });
    const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files && (event.currentTarget.files[0] as Blob);
        const reader = new FileReader();
        const imageElement = document.getElementById(
            "img" + TextFieldId.ImageLink,
        ) as HTMLImageElement;
        reader.onloadend = () => {
            if (imageElement) {
                imageElement.src = reader.result;
            }
        };
        if (file) reader.readAsDataURL(file);
    };

    const resetImage = () => {
        const imageElement = document.getElementById(
            "img" + TextFieldId.ImageLink,
        ) as HTMLImageElement;
        const url: string = `${process.env.LOCAL_HOST_URL}/profile/resetImage/${values.accountId}`;
        axios.get(url).then(response => {
            imageElement.src = response.data;
            values.imageLink = response.data;
        });
    };

    const openFileBrowser = () => {
        const imageElement = document.getElementById(TextFieldId.ImageLink) as HTMLImageElement;
        imageElement.click();
    };
    return (
        <div>
            <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
                <div className={classes.formHeader}>
                    <IconButton className={classes.back} onClick={props.handleClose}>
                        <Icon>clear</Icon>
                    </IconButton>
                    <h2 className={classes.formTitle}>EDIT PROFILE</h2>
                    <IconButton className={classes.done} type={"submit"} disabled={isSubmitting}>
                        <Icon>done</Icon>
                    </IconButton>
                </div>
                <div className={classes.imageContainer}>
                    <div className={classes.image}>
                        <img
                            className={classes.avatar}
                            id={"img" + TextFieldId.ImageLink}
                            src={values.imageLink}
                        />
                        <div className={classes.editAvatar}>
                            <OptionDialog upload={openFileBrowser} reset={resetImage} />
                        </div>
                    </div>
                </div>
                <TextField
                    id={TextFieldId.FullName}
                    label={"Fullname"}
                    defaultValue={values.fullName}
                    error={touched.fullName && errors.fullName}
                    helperText={errors.fullName}
                    onChange={handleChange}
                    fullWidth
                />
                <input
                    className={classes.chooseFile}
                    id={TextFieldId.ImageLink}
                    type={"file"}
                    name="file"
                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    onChange={changeImage}
                />

                <TextField
                    id={TextFieldId.Introduction}
                    label={"Introduction"}
                    defaultValue={values.introduction}
                    helperText={errors.introduction}
                    error={touched.introduction && errors.introduction}
                    onChange={handleChange}
                    fullWidth
                    multiline={true}
                    rowsMax={3}
                />
                <TextField
                    id={TextFieldId.Hobbies}
                    label={"Hobbies"}
                    defaultValue={values.hobbies}
                    helperText={errors.hobbies}
                    error={touched.hobbies && errors.hobbies}
                    onChange={handleChange}
                    fullWidth
                    multiline={true}
                    rowsMax={3}
                />
                <p>Status</p>
                <Select
                    name={TextFieldId.Status}
                    onChange={handleChange}
                    value={values.status}
                    fullWidth
                >
                    {showStatusOptions}
                </Select>
            </form>
        </div>
    );
};

interface EditProfileFormProps extends WithStyles<typeof styles> {
    profile: Profile;
    handleCancel(openSnack: boolean, snackType: SnackbarType, msg: string): void;
    handleClose(): void;
    statusOptions: string[];
}
const responseMsg = {
    updateSuccess: "Update user profile successfully",
    updateFail: "Update user profile failed!",
};
function isValidImageType(type: string): boolean {
    const ftype = type.toLowerCase();
    return ftype.includes("jpg") || ftype.includes("png") || ftype.includes("jpeg");
}
// Wrap our form with the using withFormik HoC
const EditProfileForm = withFormik<EditProfileFormProps, OtherProps & FormValues>({
    mapPropsToValues: props => {
        const profile = props.profile;
        return {
            userId: profile.accountId,
            profileId: profile.profileId,
            accountId: profile.accountId,
            imageLink: profile.imageLink,
            fullName: profile.fullName,
            introduction: profile.introduction,
            hobbies: profile.hobbies,
            status: profile.status || "None",
            statusOptions: props.statusOptions || [],
            handleCancel: props.handleCancel,
            handleClose: props.handleClose,
            isSnackOpen: false,
            snackType: SnackbarType.Success,
            snackMsg: "",
        };
    },

    validate: (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        // Validate fullname type
        if (!values.fullName) {
            errors.fullName = profileError.fullNameEmptyError;
        }

        // Validate introduction
        if (values.introduction && values.introduction.length > 255) {
            errors.introduction = profileError.introductionError;
        }

        // Validate hobbies
        if (values.hobbies && values.hobbies.length > 255) {
            errors.introduction = profileError.hobbiesError;
        }

        // Validate the image
        const fileList = (document.getElementById(TextFieldId.ImageLink) as HTMLInputElement).files;
        if (fileList && fileList.length > 0) {
            const file: File = fileList[0];
            if (file.size > 5242880 /* = 5MB */) {
                errors.imageLink = profileError.imageSizeError;
            }
            if (!isValidImageType(file.type)) {
                errors.imageLink = profileError.imageTypeError;
            }
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        const profile = {
            accountId: values.userId,
            profileId: values.profileId,
            fullName: values.fullName,
            imageLink: values.imageLink,
            introduction: values.introduction,
            hobbies: values.hobbies,
            status: values.status,
        };
        const data = new FormData();
        const blobStr = new Blob([JSON.stringify(profile)], { type: "application/json" });
        data.append("profile", blobStr);
        // Get the file from form
        const fileList = (document.getElementById(TextFieldId.ImageLink) as HTMLInputElement).files;
        if (fileList && fileList.length > 0) {
            data.append("profileImage", fileList[0]);
        }
        axios
            .put(process.env.LOCAL_HOST_URL + "/profile", data)
            .then(response => {
                if (response.status === 200) {
                    values.handleCancel(true, SnackbarType.Success, responseMsg.updateSuccess);
                    window.location = window.location;
                }
            })
            .catch(() => {
                values.handleCancel(true, SnackbarType.Error, responseMsg.updateFail);
            });
        setSubmitting(false);
    },
})(InnerForm);
export default withStyles(styles)(EditProfileForm);
