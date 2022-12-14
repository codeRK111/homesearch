import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function LeadsStatusFilter({
  status,
  setStatus,
  attended,
  setAttended,
}) {
  const handleChange = (event) => {
    const value = event.target.checked ? "active" : "inactive";
    setStatus(value);
  };

  const handleChangeAttended = (event) => {
    setAttended(!event.target.checked);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Inactive</Grid>
            <Grid item>
              <AntSwitch
                checked={status === "active"}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>Active</Grid>
          </Grid>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Attended Leads</Grid>
            <Grid item>
              <AntSwitch checked={!attended} onChange={handleChangeAttended} />
            </Grid>
            <Grid item>New Leads</Grid>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
