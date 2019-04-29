/* It's so easy to use "required" in TextField but I want to try Formik so that my
            program can adapt in the future */

import * as React from "react";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { withFormik, FormikProps, Form } from "formik";
import TextField from "@material-ui/core/es/TextField/TextField";
import "./AddTeamForm.scss";
import axios from "~/common/axiosConfigure";
// Shape of form values
interface FormValues {
    teamName: string;
    userId: string;
}

interface OtherProps {
    handleCancelClick: () => void;
    refreshTeams: (userId: string) => void;
}

// You may see / user InjectedFormikProps<OtherProps, FormValues> instead of what comes below. They are the same--InjectedFormikProps was artifact of when Formik only exported an HOC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { values, touched, errors, isSubmitting, handleChange } = props;
    /* <Form/> is a helper component that helps to save time. It helps to prevent typing out <form onSubmit={props.handleSubmit}/> */
    return (
        <Form className="container" autoComplete="off">
            {touched.teamName && errors.teamName && <div>{errors.teamName}</div>}
            <TextField
                fullWidth
                name={"teamName"}
                label="Type a name here!"
                defaultValue={values.teamName}
                className="textField"
                margin="normal"
                onChange={handleChange}
            />
            <div style={{ textAlign: "center" }}>
                <Button type="submit" disabled={isSubmitting} color="primary">
                    OK
                </Button>
                <Button onClick={props.handleCancelClick} color="primary" autoFocus>
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

interface MyFormProps {
    initialTeamName?: string;
    handleCancelClick: () => void;
    refreshTeams: (userId: string) => void;
    userId: string;
}

// Wrap our form with the using withFormik HoC
const AddTeamForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            teamName: props.initialTeamName || "",
            userId: props.userId,
        };
    },
    validationSchema: Yup.object().shape({
        teamName: Yup.string().required("Required! ^^"),
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        const data = {
            hostId: values.userId,
            name: values.teamName,
        };
        axios
            .post("/teams/", data)
            .then(() => {
                props.refreshTeams(values.userId);
                props.handleCancelClick();
            })
            .catch(() => {
                setSubmitting(false);
            });
    },
})(InnerForm);

export default AddTeamForm;
