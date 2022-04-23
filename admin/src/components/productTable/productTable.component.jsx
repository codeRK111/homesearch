import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchProperties } from "../../redux/property/property.actions";
import {
    selectLoading,
    selectProperties,
} from "../../redux/property/property.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import RoleRender from "../roleRender/roleRender.component";
import CustomSelect from "./select.component";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    flexWrapper: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconButton: {
        cursor: "pointer",
    },
    tableWrapper: {
        // overflowX: 'scroll',
    },
    colorRed: {
        color: "red",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

function Orders({
    fetchProperties,
    currentUser,
    loading,
    match: {
        params: { status },
    },
    allProperties = [],
}) {
    console.log(allProperties);
    const [page, setPage] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const hnadleProperties = (status, data = null) => {
        if (status === "success") {
            setCount(data);
        }
    };
    React.useEffect(() => {
        fetchProperties(hnadleProperties, {
            status,
            for: "rent",
            page: page + 1,
            limit: rowsPerPage,
        });
    }, [fetchProperties, status, page, rowsPerPage]);

    const classes = useStyles();

    const UpdateStatusHeadingNode = RoleRender(
        <TableCell style={{ color: "#ffffff" }}>Update Status</TableCell>,
        [
            {
                type: "propertyActions",
                value: "status",
            },
        ]
    );
    const ActionHeadingNode = RoleRender(
        <TableCell align="right" style={{ color: "#ffffff" }}>
            Action
        </TableCell>,
        [
            {
                type: "propertyActions",
                value: "update",
            },
        ]
    );
    const dataNode = (c) => {
        const Node = RoleRender(
            <TableCell>
                <CustomSelect
                    value={c.status}
                    propertyId={c.id}
                    items={[
                        {
                            label: "active",
                            value: "active",
                        },
                        {
                            label: "expired",
                            value: "expired",
                        },
                        {
                            label: "underScreening",
                            value: "underScreening",
                        },
                    ]}
                />
            </TableCell>,
            [
                {
                    type: "propertyActions",
                    value: "status",
                },
            ]
        );

        return <Node />;
    };
    const actionDataNode = (c) => {
        const Node = RoleRender(
            <TableCell align="right">
                <Link to={`/properties/editProperties/${c.id}`}>Edit</Link>
            </TableCell>,
            [
                {
                    type: "propertyActions",
                    value: "update",
                },
            ]
        );

        return <Node />;
    };

    return (
        <React.Fragment>
            <Backdrop
                className={classes.backdrop}
                open={loading}
                // onClick={handleClose}
            >
                loading...
            </Backdrop>

            <div className={classes.tableWrapper}>
                {/* <p className={classes.colorRed}>{error}</p> */}
                <Box mb="1rem">
                    <TablePagination
                        component="div"
                        count={count}
                        page={page}
                        rowsPerPageOptions={[2, 5, 10, 20, 40, 50]}
                        labelRowsPerPage={"Properties per page"}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
                <Box mb="0.5rem">
                    {count ? <b>{count} results found</b> : ""}
                </Box>
                <Table size="medium">
                    <TableHead>
                        <TableRow
                            style={{
                                backgroundColor: "#34495e",
                            }}
                        >
                            <TableCell style={{ color: "#ffffff" }}>
                                SL no
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                ID
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                Title
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                For
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                Type
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                City
                            </TableCell>

                            <TableCell style={{ color: "#ffffff" }}>
                                Location
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                Current Status
                            </TableCell>

                            <TableCell style={{ color: "#ffffff" }}>
                                User
                            </TableCell>
                            <TableCell style={{ color: "#ffffff" }}>
                                Posted on
                            </TableCell>
                            <UpdateStatusHeadingNode />
                            <ActionHeadingNode />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProperties.map((c, i) => (
                            <TableRow key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{c.propertyNumber}</TableCell>
                                <TableCell>{c.title}</TableCell>
                                <TableCell>{c.for}</TableCell>
                                <TableCell>{c.type}</TableCell>
                                <TableCell>{c.city.name}</TableCell>

                                <TableCell>{c.location.name}</TableCell>
                                <TableCell>{c.status}</TableCell>
                                <TableCell>{c.userId.name}</TableCell>
                                <TableCell>
                                    <span>
                                        {moment(c.createdAt).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </span>
                                </TableCell>
                                {dataNode(c)}
                                {actionDataNode(c)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    {/* See more orders */}
                </Link>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    allProperties: selectProperties,
    loading: selectLoading,
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    fetchProperties: (callback, param) =>
        dispatch(fetchProperties({ callback, param })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
