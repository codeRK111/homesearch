import { Box, Button, Chip, CircularProgress, Grid } from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";

import { ADMIN_ROLE } from "../../utils/staticData";
import CheckBox from "../formik/checkbox.component";
import DividerHeading from "../dividerHeadinng/dividerHeading.component";
import React from "react";
import SearchCity from "../search/city.component";
import Select from "../formik/select.component";
import StaffManagement from "./staffManagement.component";
import TextField from "../formik/textField.component";

const AddAdminForm = ({ loading, onSubmit, initialValues }) => {
    const buttonProps = {};

    const submitForm = (values, props) => {
        console.log(props);
        const data = {
            ...values,

            propertyAccessCities:
                values.propertyAccessCities.length > 0
                    ? values.propertyAccessCities.map((c) => c.id)
                    : [],
            userAccessCities:
                values.userAccessCities.length > 0
                    ? values.userAccessCities.map((c) => c.id)
                    : [],
        };
        if (!data.password) {
            delete data.password;
        }
        onSubmit(data);
    };

    if (loading) {
        buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
    }
    return (
        <Box mt="1rem">
            <Formik
                initialValues={{
                    ...initialValues,
                    password: "",
                    builderAccessCities: initialValues.builderAccessCities
                        ? initialValues.builderAccessCities
                        : [],
                    builderActions: initialValues.builderActions
                        ? initialValues.builderActions
                        : [],
                    builderAccess: initialValues.builderAccess
                        ? initialValues.builderAccess
                        : [],
                }}
                onSubmit={submitForm}
                enableReinitialize
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DividerHeading>Basic Details</DividerHeading>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="Full name"
                                    name="name"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="Username"
                                    name="username"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="Password"
                                    name="password"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="Email"
                                    name="email"
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="User Number"
                                    name="number"
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Select
                                    formLabel="Gender"
                                    name="gender"
                                    options={[
                                        { value: "male", label: "Male" },
                                        {
                                            value: "female",
                                            label: "Female",
                                        },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    formLabel="Status"
                                    name="status"
                                    options={[
                                        { value: "active", label: "Active" },
                                        {
                                            value: "inactive",
                                            label: "Inactive",
                                        },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    formLabel="Type"
                                    name="type"
                                    options={[
                                        {
                                            value: ADMIN_ROLE.superAdmin,
                                            label: "Super Admin",
                                        },
                                        {
                                            value: ADMIN_ROLE.admin,
                                            label: "Admin",
                                        },
                                        {
                                            value: ADMIN_ROLE.staff,
                                            label: "Staff",
                                        },
                                        {
                                            value: ADMIN_ROLE.clientSupport,
                                            label: "Client Support",
                                        },
                                        {
                                            value: ADMIN_ROLE.digitalMarketing,
                                            label: "Digital Marketing",
                                        },
                                        {
                                            value: ADMIN_ROLE.BDM,
                                            label: "BDM",
                                        },
                                        {
                                            value: ADMIN_ROLE.GM,
                                            label: "GM",
                                        },
                                        {
                                            value: ADMIN_ROLE.leadStrategist,
                                            label: "Lead Strategist",
                                        },
                                        {
                                            value: ADMIN_ROLE.salesExecutive,
                                            label: "Sales Executive",
                                        },
                                        {
                                            value: ADMIN_ROLE.assistantSalesManager,
                                            label: "Assistant Sales Manager",
                                        },
                                        {
                                            value: ADMIN_ROLE.accountant,
                                            label: "accountant",
                                        },
                                        {
                                            value: ADMIN_ROLE.ownerAssistant,
                                            label: "Owner Assistant",
                                        },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="Leads Target"
                                    name="leadTarget"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    formLabel="Deals Target"
                                    name="dealTarget"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SearchCity
                                    setSelectedCity={setFieldValue}
                                    defaultValue={values.city}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <DividerHeading>
                                    Property Permissions
                                </DividerHeading>
                                <Box mt="2rem">
                                    <FieldArray
                                        name="propertyAccessCities"
                                        render={(arrayHelpers) => (
                                            <Grid container>
                                                <Grid item xs={12} md={2}>
                                                    <h5>Access Cities</h5>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <SearchCity
                                                        setSelectedCity={
                                                            arrayHelpers.push
                                                        }
                                                        showLabel={false}
                                                    />
                                                    <Box mt="1rem">
                                                        {values.propertyAccessCities.map(
                                                            (c, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    label={
                                                                        c.name
                                                                    }
                                                                    onDelete={() =>
                                                                        arrayHelpers.remove(
                                                                            i
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <h5>Access For</h5>
                                        </Grid>
                                        <Grid item xs={12} md={1}>
                                            <CheckBox
                                                name="propertyAccess"
                                                value="rent"
                                                formLabel="Rent"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1}>
                                            <CheckBox
                                                name="propertyAccess"
                                                value="sale"
                                                formLabel="Sale"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1}>
                                            <CheckBox
                                                name="propertyAccess"
                                                value="project"
                                                formLabel="Project"
                                                type="checkbox"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <h5>Action</h5>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="propertyActions"
                                                    value="create"
                                                    formLabel="Create"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="propertyActions"
                                                    value="view"
                                                    formLabel="View"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="propertyActions"
                                                    value="update"
                                                    formLabel="Update"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <CheckBox
                                                    name="propertyActions"
                                                    value="status"
                                                    formLabel="Change Status"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <DividerHeading>
                                    User Permissions
                                </DividerHeading>
                                <Box mt="2rem">
                                    <FieldArray
                                        name="userAccessCities"
                                        render={(arrayHelpers) => (
                                            <Grid container>
                                                <Grid item xs={12} md={2}>
                                                    <h5>Access Cities</h5>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <SearchCity
                                                        setSelectedCity={
                                                            arrayHelpers.push
                                                        }
                                                        showLabel={false}
                                                    />
                                                    <Box mt="1rem">
                                                        {values.userAccessCities.map(
                                                            (c, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    label={
                                                                        c.name
                                                                    }
                                                                    onDelete={() =>
                                                                        arrayHelpers.remove(
                                                                            i
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <h5>Access For</h5>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="userAccess"
                                                value="self-users"
                                                formLabel="Self created users"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="userAccess"
                                                value="other-staff-users"
                                                formLabel="Other staff created users"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="userAccess"
                                                value="site-users"
                                                formLabel="Site login users"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="userAccess"
                                                value="google-users"
                                                formLabel="Google users"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="userAccess"
                                                value="facebook-users"
                                                formLabel="Facebook users"
                                                type="checkbox"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <h5>Action</h5>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="userActions"
                                                    value="create"
                                                    formLabel="Create"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="userActions"
                                                    value="view"
                                                    formLabel="View"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="userActions"
                                                    value="update"
                                                    formLabel="Update"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <CheckBox
                                                    name="userActions"
                                                    value="status"
                                                    formLabel="Change Status"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <DividerHeading>
                                    Builder Permissions
                                </DividerHeading>
                                <Box mt="2rem">
                                    <FieldArray
                                        name="builderAccessCities"
                                        render={(arrayHelpers) => (
                                            <Grid container>
                                                <Grid item xs={12} md={2}>
                                                    <h5>Access Cities</h5>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <SearchCity
                                                        setSelectedCity={
                                                            arrayHelpers.push
                                                        }
                                                        showLabel={false}
                                                    />
                                                    <Box mt="1rem">
                                                        {values.builderAccessCities.map(
                                                            (c, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    label={
                                                                        c.name
                                                                    }
                                                                    onDelete={() =>
                                                                        arrayHelpers.remove(
                                                                            i
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <h5>Access For</h5>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="builderAccess"
                                                value="self-builders"
                                                formLabel="Self created builders"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="builderAccess"
                                                value="other-staff-builders"
                                                formLabel="Other staff created builders"
                                                type="checkbox"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <h5>Action</h5>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="builderActions"
                                                    value="create"
                                                    formLabel="Create"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="builderActions"
                                                    value="view"
                                                    formLabel="View"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="builderActions"
                                                    value="update"
                                                    formLabel="Update"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <CheckBox
                                                    name="builderActions"
                                                    value="status"
                                                    formLabel="Change Status"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <DividerHeading>
                                    Manage Expert Query Permissions
                                </DividerHeading>
                                <Box mt="2rem"></Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <h5>Access For</h5>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="expertQueryAccess"
                                                value="self-expert-queries"
                                                formLabel="Self created queries"
                                                type="checkbox"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <CheckBox
                                                name="expertQueryAccess"
                                                value="other-staff-expert-queries"
                                                formLabel="Other staff created queries"
                                                type="checkbox"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <h5>Action</h5>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="expertQueryActions"
                                                    value="create"
                                                    formLabel="Create"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="expertQueryActions"
                                                    value="view"
                                                    formLabel="View"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="expertQueryActions"
                                                    value="update"
                                                    formLabel="Update"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <CheckBox
                                                    name="expertQueryActions"
                                                    value="delete"
                                                    formLabel="Delete"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <DividerHeading>
                                    Manage Cities Permissions
                                </DividerHeading>
                                <Box mt="2rem"></Box>
                                <Box>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <h5>Action</h5>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="cityActions"
                                                    value="create"
                                                    formLabel="Create"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="cityActions"
                                                    value="view"
                                                    formLabel="View"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="cityActions"
                                                    value="update"
                                                    formLabel="Update"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <CheckBox
                                                    name="cityActions"
                                                    value="delete"
                                                    formLabel="Delete"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <DividerHeading>
                                    Manage Locations Permissions
                                </DividerHeading>
                                <Box mt="2rem"></Box>
                                <Box>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <h5>Action</h5>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="locationActions"
                                                    value="create"
                                                    formLabel="Create"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="locationActions"
                                                    value="view"
                                                    formLabel="View"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <CheckBox
                                                    name="locationActions"
                                                    value="update"
                                                    formLabel="Update"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <CheckBox
                                                    name="locationActions"
                                                    value="delete"
                                                    formLabel="Delete"
                                                    type="checkbox"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            {(values.type === "super-admin" ||
                                values.type === "admin") && (
                                <Box width="100%">
                                    <DividerHeading>
                                        Staff Access
                                    </DividerHeading>
                                    <StaffManagement id={values.id} />
                                </Box>
                            )}

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    {...buttonProps}
                                >
                                    Update Admin / Staff
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddAdminForm;
