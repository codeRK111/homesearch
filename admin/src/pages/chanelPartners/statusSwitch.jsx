import { CircularProgress, Switch, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { updateCPDetails } from "../../utils/asyncCP";

const StatusSwitch = ({ chanelPartner }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (chanelPartner.status === "active") {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [chanelPartner]);

    const handleChange = async (event) => {
        try {
            const switchStatus = event.target.checked;
            const cpStatus = switchStatus ? "active" : "inactive";
            setError(null);
            setLoading(true);
            await updateCPDetails(chanelPartner.id, { status: cpStatus });
            setLoading(false);
            setStatus(switchStatus);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return loading ? (
        <CircularProgress size={15} color="inherit" />
    ) : error ? (
        <Typography variant="caption" color="inherit">
            {error}
        </Typography>
    ) : (
        <Switch
            checked={status}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
        />
    );
};

export default StatusSwitch;
