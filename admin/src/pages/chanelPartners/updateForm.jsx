import * as Yup from "yup";

import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { createCP, updateCPDetails } from "../../utils/asyncCP";

import React from "react";
import Select from "../../components/formik/selectDefault.component";
import TextField from "../../components/formik/textField.component";
import { useHistory } from "react-router-dom";

const UpdateForm = ({ user, action = "add" }) => {
    const history = useHistory();
    const validationSchema = Yup.object({
        name: Yup.string().required("name required"),
        email: Yup.string().required("email required"),
        password: Yup.string().required("password required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords don't match!")
            .required("confirm password Required"),
        number: Yup.string()
            .length(10, "10 digits required")
            .matches(/^\d{10}$/, "Invalid Number"),
    });

    const onSubmit = async (
        values,
        { setSubmitting, resetForm, setFieldError }
    ) => {
        try {
            setFieldError("submitError", "");
            setSubmitting(true);
            if (action === "add") {
                await createCP(values);
            } else {
                await updateCPDetails(user.id, values);
            }
            resetForm();
            setSubmitting(false);
            history.push("/chanel-partners");
        } catch (error) {
            setSubmitting(false);
            setFieldError("submitError", error.message);
        }
    };
    return (
        <Formik
            initialValues={{
                name: user?.name ? user.name : "",
                email: user?.email ? user.email : "",
                number: user?.number ? user.number : "",
                status: user?.status ? user.status : "active",
                password: "",
                confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, isSubmitting }) => (
                <Form>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12} md={7}>
                            <TextField
                                formLabel="Name"
                                name="name"
                                error={errors["name"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                formLabel="Email"
                                name="email"
                                error={errors["email"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                formLabel="Phone Number"
                                name="number"
                                error={errors["number"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                formLabel="Password"
                                name="password"
                                error={errors["password"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                formLabel="Confirm Password"
                                name="confirmPassword"
                                error={errors["confirmPassword"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Select
                                formLabel="Status"
                                name="status"
                                variant="filled"
                                options={[
                                    {
                                        value: "active",
                                        label: "Active",
                                    },
                                    {
                                        value: "inactive",
                                        label: "Inactive",
                                    },
                                ]}
                                error={errors["status"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {errors.submitError && (
                                <Typography color="error" gutterBottom>
                                    {errors.submitError}
                                </Typography>
                            )}
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                type="submit"
                                disabled={isSubmitting}
                                endIcon={
                                    isSubmitting ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : (
                                        <></>
                                    )
                                }
                            >
                                {action === "add" ? "Add CP" : "Update CP"}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateForm;
