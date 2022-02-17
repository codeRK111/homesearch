import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { memo } from "react";
import {
    getEmbedId,
    renderImage,
    renderLunchingDateLabel,
    renderPrice,
} from "../../../utils/render.utils";
import { removeProjectPhoto, updateProject } from "../../../utils/asyncProject";

import AddProjectLoader from "../../../components/addProjectLoader";
import { Alert } from "@material-ui/lab";
import FMonthPicker from "../../../components/formik/monthAndYearPicker.component";
import FSelect from "../../../components/formik/select.component";
import FTextField from "../../../components/formik/textField.component";
import SearchPlace from "../../../components/searchPlace";
import UploadPhoto from "../../../components/uploadPhotos";
import axios from "axios";
import { useCancelAxios } from "../../../hooks/useCancel";
import useGlobalStyles from "../../../common.style";
import { useHistory } from "react-router-dom";
import useStyles from "../../addProject/addProject.style";
import { validateNumber } from "../../../utils/validation.utils";

// import CheckBox from '../../../components/formik/checkbox.component';

const statusMenuItems = [
    {
        value: "upcoming",
        label: "Upcoming",
    },
    {
        value: "ongoing",
        label: "Ongoing",
    },
    {
        value: "completed",
        label: "Completed",
    },
];

const EditProjectInfo = memo(
    ({ resources, projectType, projectData, fetchProject }) => {
        const classes = useStyles();
        const history = useHistory();
        const gClasses = useGlobalStyles();
        const cancelToken = React.useRef(undefined);
        const cancelTokenRemoveImage = React.useRef(undefined);
        const cancelTokenImage = React.useRef(undefined);
        const [addProjectLoading, setAddProjectLoading] = React.useState(false);
        const [virtualTour, setVirtualTour] = React.useState("");
        const [showSuccess, setShowSuccess] = React.useState(false);
        const [removeImageLoading, setRemoveImageLoading] = React.useState({
            id: null,
            loading: false,
            error: null,
        });
        const [uploadPhotosLoading, setUploadPhotosLoading] =
            React.useState(false);
        const [addProjectError, setAddProjectError] = React.useState(null);
        const [photos, setPhotos] = React.useState([]);
        useCancelAxios(cancelToken.current);
        useCancelAxios(cancelTokenImage.current);
        const validate = (values) => {
            const error = {};
            if (!values.title) {
                error.title = "Enter project name";
            }
            if (!values.builder) {
                error.builder = "Enter builder name";
            }
            if (!values.description) {
                error.description = "Enter Description";
            }
            if (!values.usp) {
                error.usp = "Enter USP";
            }
            if (!values.city) {
                error.city = "Select City";
            }
            if (!values.location) {
                error.location = "Select Location";
            }
            if (!values.thumbnailImage) {
                error.thumbnailImage = "Select Thumbnail Image";
            }
            if (!values.masterFloorPlan) {
                error.masterFloorPlan = "Select Master floorplan image";
            }
            if (!values.geogrophicalImage) {
                error.geogrophicalImage = "Select Geographical Image";
            }

            if (!validateNumber(values.bookingAmount)) {
                error.bookingAmount = "Please enter a number";
            }
            if (!validateNumber(values.emi)) {
                error.emi = "Please enter a number";
            }
            if (!validateNumber(values.totalLandArea)) {
                error.totalLandArea = "Please enter a number";
            }

            if (
                values.legalClearance.find((c) => c.name === "reraapproved") &&
                values.legalClearance.find((c) => c.name === "reraapproved")[
                    "value"
                ] &&
                !values.reraId
            ) {
                error.reraId = "required";
            }
            if (
                values.legalClearance.find((c) => c.name === "numberOfOwner") &&
                values.legalClearance.find((c) => c.name === "numberOfOwner")[
                    "value"
                ] &&
                !values.ownerNumber
            ) {
                error.ownerNumber = "required";
            }

            if (values.usp.trim().length > 20) {
                error.usp = "Max 20 characters allowed";
            }
            return error;
        };

        const goToProjectProperty = (id, projectType) => () => {
            history.push(`/edit-project-property/${id}/${projectType}`);
        };

        const removePhoto = (projectId, imageId) => () => {
            cancelTokenRemoveImage.current = axios.CancelToken.source();
            removeProjectPhoto(
                projectId,
                imageId,
                cancelTokenRemoveImage.current,
                setRemoveImageLoading
            ).then((data) => {
                console.log("clicked");
                fetchProject();
            });
        };

        const addPhotos = (project, values) => {
            const formData = new FormData();
            cancelTokenImage.current = axios.CancelToken.source();
            if (typeof values.thumbnailImage !== "string") {
                formData.append("thumbnailImage", values.thumbnailImage);
            }
            if (typeof values.masterFloorPlan !== "string") {
                formData.append("masterFloorPlan", values.masterFloorPlan);
            }
            if (typeof values.geogrophicalImage !== "string") {
                formData.append("geogrophicalImage", values.geogrophicalImage);
            }

            photos.forEach((c) => {
                formData.append("photos", c);
            });

            const arr = Array.from(formData.entries());
            if (arr.length > 0) {
                updateProject(
                    project,
                    formData,
                    cancelTokenImage.current,
                    setUploadPhotosLoading
                )
                    .then((resp) => {
                        setPhotos([]);
                        setAddProjectError(null);
                        fetchProject();
                        setShowSuccess(true);
                    })
                    .catch((error) => {
                        setShowSuccess(false);
                        fetchProject();
                        // setAddProjectError(error);
                    });
            } else {
                fetchProject();
                setShowSuccess(true);
            }
        };

        const onSubmit = (values, { setErrors }) => {
            const data = {
                ...values,
                bookingAmount: Number(values.bookingAmount),
                emi: Number(values.emi),
                totalLandArea: Number(values.totalLandArea),
            };
            if (projectType === "land") {
                const numberOfOwner = values.legalClearance.find(
                    (c) => c.name === "numberOfOwner"
                );
                if (numberOfOwner && numberOfOwner["value"]) {
                    data.legalClearance = values.legalClearance.map((c) => {
                        if (c.name === "numberOfOwner") {
                            c.details = values.ownerNumber;
                        }
                        return c;
                    });
                }
            } else {
                const reraApproved = values.legalClearance.find(
                    (c) => c.name === "reraapproved"
                );
                if (reraApproved && reraApproved["value"]) {
                    data.legalClearance = values.legalClearance.map((c) => {
                        if (c.name === "reraapproved") {
                            c.details = values.reraId;
                        }
                        return c;
                    });
                }
            }

            delete data.thumbnailImage;
            delete data.masterFloorPlan;
            delete data.geogrophicalImage;

            cancelToken.current = axios.CancelToken.source();
            updateProject(
                values.id,
                data,
                cancelToken.current,
                setAddProjectLoading,
                "project"
            )
                .then((resp) => {
                    setAddProjectError(null);
                    addPhotos(resp.id, values);
                })
                .catch((error) => {
                    console.log(error);
                    setAddProjectError(error);
                });
        };

        return (
            <div>
                <AddProjectLoader
                    addProjectLoading={addProjectLoading}
                    addImageLoading={uploadPhotosLoading}
                />
                <Formik
                    initialValues={{
                        ...projectData,
                        builder: projectData.builder.id,
                        virtualTours: projectData.virtualTours
                            ? projectData.virtualTours
                            : [],
                        reraId:
                            projectData.legalClearance.find(
                                (c) => c.name === "reraapproved"
                            ) &&
                            projectData.legalClearance.find(
                                (c) => c.name === "reraapproved"
                            )["details"]
                                ? projectData.legalClearance.find(
                                      (c) => c.name === "reraapproved"
                                  )["details"]
                                : "",
                        ownerNumber:
                            projectData.legalClearance.find(
                                (c) => c.name === "numberOfOwner"
                            ) &&
                            projectData.legalClearance.find(
                                (c) => c.name === "numberOfOwner"
                            )["details"]
                                ? projectData.legalClearance.find(
                                      (c) => c.name === "numberOfOwner"
                                  )["details"]
                                : "",
                        projectType,
                    }}
                    enableReinitialize
                    validate={validate}
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue, errors }) => (
                        <Form>
                            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FSelect
                                        formLabel="Select Status"
                                        label="status"
                                        name="complitionStatus"
                                        options={statusMenuItems.map((c) => ({
                                            value: c.value,
                                            label: c.label,
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FMonthPicker
                                        formLabel={renderLunchingDateLabel(
                                            values.complitionStatus
                                        )}
                                        name="lunchingDate"
                                        value={values.lunchingDate}
                                        onChange={(value) =>
                                            setFieldValue("lunchingDate", value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FTextField
                                        formLabel="Enter Project Title"
                                        label="Project Title"
                                        name="title"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FSelect
                                        formLabel="Enter Builder Name"
                                        label="Builder Name"
                                        name="builder"
                                        options={resources.builders.map(
                                            (c) => ({
                                                value: c.id,
                                                label: c.developerName,
                                            })
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <SearchPlace
                                        type="city"
                                        city={values.city}
                                        onSelect={(c) => {
                                            setFieldValue("city", c);
                                            setFieldValue("location", null);
                                        }}
                                        error={errors.city}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <SearchPlace
                                        type="location"
                                        label="Enter Location Name"
                                        city={values.city}
                                        location={values.location}
                                        onSelect={(c) =>
                                            setFieldValue("location", c)
                                        }
                                        error={errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FTextField
                                        formLabel="Enter Booking Amount"
                                        label="Rs"
                                        name="bookingAmount"
                                    />
                                    {values.bookingAmount && (
                                        <div>
                                            <b>
                                                {renderPrice(
                                                    values.bookingAmount
                                                )}
                                            </b>
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FTextField
                                        formLabel="EMI"
                                        label="Rs"
                                        name="emi"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FTextField
                                        formLabel="Total Land Area"
                                        label="Acres"
                                        name="totalLandArea"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FTextField
                                        formLabel="USP"
                                        label="Enter USP"
                                        name="usp"
                                    />
                                </Grid>
                                {projectType !== "land" && (
                                    <Grid item xs={12}>
                                        <h3>Amenities</h3>
                                        <Grid container>
                                            {resources.amenities.map((c, i) => {
                                                return (
                                                    <Grid item lg={3}>
                                                        <label>
                                                            <Field
                                                                type="checkbox"
                                                                name="amenities"
                                                                value={c.id}
                                                            />
                                                            {c.name}
                                                        </label>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <h3>Legal Clearance</h3>
                                    <Grid container spacing={0}>
                                        <FieldArray name="legalClearance">
                                            {(arrayHelpers) => (
                                                <Grid container>
                                                    {values.legalClearance.map(
                                                        (c, i) => {
                                                            return (
                                                                <Grid
                                                                    item
                                                                    lg={3}
                                                                >
                                                                    {/* <CheckBox
																	key={i}
																	heading="test"
																	name={`legalClearance.${i}.value`}
																	formLabel={
																		c.label
																	}
																/> */}
                                                                    <label>
                                                                        <Field
                                                                            type="checkbox"
                                                                            name={`legalClearance.${i}.value`}
                                                                            // value={c.id}
                                                                        />
                                                                        {
                                                                            c.label
                                                                        }
                                                                    </label>
                                                                </Grid>
                                                            );
                                                        }
                                                    )}
                                                </Grid>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                </Grid>
                                {projectType !== "land" &&
                                    values.legalClearance.find(
                                        (c) => c.name === "reraapproved"
                                    ) &&
                                    values.legalClearance.find(
                                        (c) => c.name === "reraapproved"
                                    )["value"] && (
                                        <Grid item xs={12}>
                                            <FTextField
                                                formLabel="RERA ID"
                                                label="Enter rera ID"
                                                name="reraId"
                                            />
                                        </Grid>
                                    )}

                                {projectType === "land" &&
                                    values.legalClearance.find(
                                        (c) => c.name === "numberOfOwner"
                                    ) &&
                                    values.legalClearance.find(
                                        (c) => c.name === "numberOfOwner"
                                    )["value"] && (
                                        <Grid item xs={12}>
                                            <FTextField
                                                formLabel="Number of owners"
                                                label="Enter Number"
                                                name="ownerNumber"
                                            />
                                        </Grid>
                                    )}
                                <Grid item xs={12}>
                                    <FTextField
                                        formLabel="Description"
                                        label="Enter Description"
                                        name="description"
                                        multiline
                                        rows={10}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <h3>Images</h3>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={3}>
                                            {errors.thumbnailImage && (
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        className={
                                                            gClasses.errorColor
                                                        }
                                                    >
                                                        {errors.thumbnailImage}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <input
                                                type="file"
                                                id="thumbnail-image"
                                                onChange={(e) => {
                                                    const {
                                                        target: { files },
                                                    } = e;
                                                    setFieldValue(
                                                        "thumbnailImage",
                                                        files[0]
                                                    );
                                                }}
                                            />
                                            <label htmlFor="thumbnail-image">
                                                Thumbnail
                                            </label>

                                            {values.thumbnailImage && (
                                                <Box>
                                                    <img
                                                        src={renderImage(
                                                            values.thumbnailImage,
                                                            "/assets/projects"
                                                        )}
                                                        alt="Thumbnail"
                                                        className={
                                                            classes.imageWrapper
                                                        }
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            {errors.masterFloorPlan && (
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        className={
                                                            gClasses.errorColor
                                                        }
                                                    >
                                                        {errors.masterFloorPlan}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <input
                                                type="file"
                                                id="master-floorplan"
                                                onChange={(e) => {
                                                    const {
                                                        target: { files },
                                                    } = e;
                                                    setFieldValue(
                                                        "masterFloorPlan",
                                                        files[0]
                                                    );
                                                }}
                                            />
                                            <label htmlFor="master-floorplan">
                                                Master floor plan
                                            </label>
                                            {values.masterFloorPlan && (
                                                <Box>
                                                    <img
                                                        src={renderImage(
                                                            values.masterFloorPlan,
                                                            "/assets/projects"
                                                        )}
                                                        alt="Thumbnail"
                                                        className={
                                                            classes.imageWrapper
                                                        }
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            {errors.geogrophicalImage && (
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        className={
                                                            gClasses.errorColor
                                                        }
                                                    >
                                                        {
                                                            errors.geogrophicalImage
                                                        }
                                                    </Typography>
                                                </Box>
                                            )}
                                            <input
                                                type="file"
                                                id="geographical-image"
                                                onChange={(e) => {
                                                    const {
                                                        target: { files },
                                                    } = e;
                                                    setFieldValue(
                                                        "geogrophicalImage",
                                                        files[0]
                                                    );
                                                }}
                                            />
                                            <label htmlFor="geographical-image">
                                                Location Image
                                            </label>
                                            {values.geogrophicalImage && (
                                                <Box>
                                                    <img
                                                        src={renderImage(
                                                            values.geogrophicalImage,
                                                            "/assets/projects"
                                                        )}
                                                        alt="Thumbnail"
                                                        className={
                                                            classes.imageWrapper
                                                        }
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <h3>Existing Images</h3>
                                    {/* <pre>
										{JSON.stringify(
											removeImageLoading,
											null,
											2
										)}
									</pre> */}
                                    <Grid container spacing={3}>
                                        {values.photos.map((c) => (
                                            <Grid
                                                item
                                                key={c._id}
                                                xs={6}
                                                md={3}
                                            >
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: 200,
                                                    }}
                                                >
                                                    <img
                                                        src={renderImage(
                                                            c.image,
                                                            "/assets/projects"
                                                        )}
                                                        alt="Thumbnail"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            size="small"
                                                            fullWidth
                                                            onClick={removePhoto(
                                                                values.id,
                                                                c._id
                                                            )}
                                                            endIcon={
                                                                removeImageLoading.id ===
                                                                    c._id &&
                                                                removeImageLoading.loading ? (
                                                                    <CircularProgress
                                                                        size={
                                                                            17
                                                                        }
                                                                        color="inherit"
                                                                    />
                                                                ) : null
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                    {removeImageLoading.id ===
                                                        c._id &&
                                                        removeImageLoading.error && (
                                                            <div>
                                                                <Typography
                                                                    variant="caption"
                                                                    className={
                                                                        gClasses.errorColor
                                                                    }
                                                                >
                                                                    {
                                                                        removeImageLoading.error
                                                                    }
                                                                </Typography>
                                                            </div>
                                                        )}
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <UploadPhoto
                                        photos={photos}
                                        setPhotos={setPhotos}
                                    />
                                </Grid>
                                <FieldArray name="virtualTours">
                                    {(arrayHelpers) => (
                                        <Box width="100%" p="1rem">
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                            >
                                                Add Virtual Tour
                                            </Typography>
                                            <Box mb="1rem">
                                                <TextField
                                                    label="Youtube Link"
                                                    variant="filled"
                                                    value={virtualTour}
                                                    onChange={(e) =>
                                                        setVirtualTour(
                                                            e.target.value
                                                        )
                                                    }
                                                    fullWidth
                                                />
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => {
                                                        if (virtualTour) {
                                                            arrayHelpers.push(
                                                                virtualTour
                                                            );
                                                            setVirtualTour("");
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </Box>
                                            <Grid container spacing={3}>
                                                {values.virtualTours.map(
                                                    (c, i) => {
                                                        return (
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={3}
                                                            >
                                                                <iframe
                                                                    width="100%"
                                                                    height="300"
                                                                    src={`https://www.youtube.com/embed/${getEmbedId(
                                                                        c
                                                                    )}`}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                    title="Embedded youtube"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="contained"
                                                                    color="seconday"
                                                                    size="small"
                                                                    fullWidth
                                                                    onClick={() => {
                                                                        arrayHelpers.remove(
                                                                            i
                                                                        );
                                                                    }}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </Grid>
                                                        );
                                                    }
                                                )}
                                            </Grid>
                                        </Box>
                                    )}
                                </FieldArray>
                                <p className={gClasses.errorColor}>
                                    {addProjectError}
                                </p>
                                {showSuccess && (
                                    <Alert
                                        onClose={() => setShowSuccess(false)}
                                    >
                                        Project Updated Successfully
                                    </Alert>
                                )}
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                fullWidth
                                            >
                                                Update Project
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                fullWidth
                                                onClick={goToProjectProperty(
                                                    values.id,
                                                    values.projectType
                                                )}
                                            >
                                                Update Project Property
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
);

export default EditProjectInfo;
