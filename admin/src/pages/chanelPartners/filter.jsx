import { Button, Grid, TextField } from "@material-ui/core";

import React from "react";

const FilterCP = ({
    name,
    email,
    number,
    setName,
    setEmail,
    setNumber,
    onReset,
}) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
                <TextField
                    fullWidth
                    value={name}
                    label="Search by name"
                    onChange={(e) => setName(e.target.value)}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    fullWidth
                    value={email}
                    label="Search by email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    fullWidth
                    value={number}
                    label="Search by number"
                    onChange={(e) => setNumber(e.target.value)}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button variant="contained" onClick={onReset}>
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterCP;
