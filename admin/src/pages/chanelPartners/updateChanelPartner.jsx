import {
    Box,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import UpdateForm from "./updateForm";
import { getCPDetails } from "../../utils/asyncCP";
import { useHistory } from "react-router-dom";

const UpdateChanelPartnerPage = ({
    match: {
        params: { id, action = "add" },
    },
}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cp, setCP] = useState(null);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    setError(null);
                    setLoading(true);
                    const resp = await getCPDetails(id);
                    setCP(resp);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setError(error.message);
                }
            })();
        }
    }, [id]);
    return (
        <Box p="1rem">
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={7}>
                    <IconButton onClick={() => history.goBack()}>
                        <ArrowBackIosIcon />
                        <Typography>Go Back</Typography>
                    </IconButton>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h6" align="center" gutterBottom>
                        {action === "add"
                            ? "Add Chanel Partner"
                            : " Update Chanel Partner Details"}
                    </Typography>
                    {error && (
                        <Typography
                            variant="caption"
                            color="error"
                            align="center"
                        >
                            Update Chanel Partner Details
                        </Typography>
                    )}
                </Grid>
                {loading ? (
                    <Grid item xs={12} md={7}>
                        <Box display={"flex"} justifyContent={"center"}>
                            <CircularProgress size={30} />
                        </Box>
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
            {!loading && <UpdateForm user={cp} action={action} />}
        </Box>
    );
};

export default UpdateChanelPartnerPage;
