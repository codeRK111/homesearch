import React, { useCallback, useEffect, useRef, useState } from "react";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { leadStyle } from "./leads.style";
import ErrorCard from "../../components/errorCard";
import TablePagination from "../builders/pagination.component";
import axios from "axios";
import { assignClientSupport, getAllLeads } from "../../utils/asyncLead";
import { withAsync } from "../../hoc/withAsync";
import LeadsTable from "../../components/tables/leads.component";
import LeadsStatusFilter from "./statusFilter";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import useGlobalStyles from "../../common.style";
import { useHistory } from "react-router-dom";
import { getAdmins } from "../../utils/asyncAdmin";

const LeadsPage = ({ loading, setLoading, error, setError }) => {
    const history = useHistory();
    // Style
    const style = leadStyle();
    const globalStyle = useGlobalStyles();

    // Async Token
    const cancelToken = useRef(null);
    const cancelTokenFetchAdmin = useRef(null);
    const cancelTokenAssignSupport = useRef(null);

    // State
    const [page, setPage] = useState(1);
    const [staffLoading, setStaffLoading] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const [status, setStatus] = useState("active");
    const [attended, setAttended] = useState(false);
    const [limit, setLimit] = useState(10);
    const [staff, setStaff] = useState("");
    const [assignError, setAssignError] = useState("");
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [data, setData] = useState({
        totalDocs: 0,
        leads: [],
    });
    const [staffs, setStaffs] = useState([]);

    // Callback
    const handlePage = (_, pageNumber) => {
        setPage(pageNumber);
    };

    const onAssign = async () => {
        if (!staff) return;
        try {
            cancelTokenAssignSupport.current = axios.CancelToken.source();
            await assignClientSupport(
                selectedLeads,
                staff,
                cancelTokenAssignSupport.current,
                setAssignLoading
            );
            setSelectedLeads([]);
            setAssignError(null);
            setStaff("");
            fetchLeads();
        } catch (e) {
            setAssignError(e);
        }
    };

    const redirectToAddLead = () => {
        history.push("/add-leads");
    };

    const manageSelectedLeads = (lead) => {
        if (selectedLeads.includes(lead)) {
            setSelectedLeads((prevState) =>
                prevState.filter((c) => c !== lead)
            );
        } else {
            setSelectedLeads((prevState) => [...prevState, lead]);
        }
    };

    // Fetch leads
    const fetchLeads = useCallback(async () => {
        try {
            cancelToken.current = axios.CancelToken.source();
            const filter = {
                page,
                limit,
                status,
                attended,
            };
            const resp = await getAllLeads(
                filter,
                cancelToken.current,
                setLoading
            );
            setData(resp);
            setError(null);
        } catch (error) {
            setError(error);
            setData({
                totalDocs: 0,
                leads: [],
            });
        }
    }, [page, attended, limit, status, setError, setLoading]);

    const fetchStaffs = useCallback(() => {
        cancelTokenFetchAdmin.current = axios.CancelToken.source();
        const filterData = {
            page: 1,
            limit: 100,
            status: "active",
            type: ["clientSupport"],
        };

        getAdmins(filterData, cancelTokenFetchAdmin.current, setStaffLoading)
            .then((resp) => {
                setStaffs(resp.admins);
                setError(null);
            })
            .catch((error) => {
                setStaffs([]);
                setError(error);
            });
    }, [setError]);

    // Effects

    /* Reset page after filter change */
    useEffect(() => {
        setPage(1);
    }, [limit, status, attended]);

    /* Fetch Leads requests */
    useEffect(() => {
        fetchLeads();

        // Cancel request on unmount
        return () => {
            if (cancelToken.current) {
                cancelToken.current.cancel();
            }
        };
    }, [fetchLeads]);

    /* Fetch Staffs */
    useEffect(() => {
        fetchStaffs();

        // Cancel request on unmount
        return () => {
            if (cancelTokenFetchAdmin.current) {
                cancelTokenFetchAdmin.current.cancel();
            }
        };
    }, [fetchStaffs]);

    useEffect(() => {
        // Cancel request on unmount
        return () => {
            if (cancelTokenAssignSupport.current) {
                cancelTokenAssignSupport.current.cancel();
            }
        };
    }, []);

    const buttonProps = {};
    if (assignLoading) {
        buttonProps.endIcon = <CircularProgress size={20} color={"inherit"} />;
    }
    return (
        <div className={style.wrapper}>
            <div className={globalStyle.justifyBetween}>
                <h1>Leads</h1>
                <Button onClick={redirectToAddLead}>Add Leads</Button>
            </div>
            {error && <ErrorCard error={error} />}
            <p>
                <b>{data.totalDocs}</b> leads found
            </p>
            <Box mb={"1rem"}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <LeadsStatusFilter
                            status={status}
                            setStatus={setStatus}
                            attended={attended}
                            setAttended={setAttended}
                        />
                    </Grid>
                    {selectedLeads.length > 0 && (
                        <Grid item xs={12} md={4}>
                            {assignError && (
                                <p style={{ color: "red" }}>{assignError}</p>
                            )}
                            <Box display={"flex"}>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="demo-simple-select-filled-label">
                                        Client Support
                                    </InputLabel>
                                    <Select
                                        value={staff}
                                        onChange={(e) =>
                                            setStaff(e.target.value)
                                        }
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        IconComponent={
                                            staffLoading
                                                ? HourglassEmptyIcon
                                                : ArrowDropDownIcon
                                        }
                                    >
                                        {staffs.map((c) => (
                                            <MenuItem key={c.id} value={c.id}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant={"contained"}
                                    onClick={onAssign}
                                    {...buttonProps}
                                >
                                    Assign
                                </Button>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <LeadsTable
                loading={loading}
                leads={data.leads}
                selectedLeads={selectedLeads}
                manageSelectedLeads={manageSelectedLeads}
            />

            <TablePagination
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={handlePage}
                totalDocs={data.totalDocs}
            />
        </div>
    );
};

export default withAsync(LeadsPage);
