import { Box, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { capitalizeFirstLetter, hsiID } from "../../utils/render.utils";
import AddUserDialog from "../addUserDialog";
import StatusSwitch from "./statusSwitch";

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date) => {
    const m = moment(date);
    return m.format("Do MMM YYYY");
};
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function UserTable({ loading, users, fetchUsers }) {
    const classes = useStyles();
    const history = useHistory();
    const [userForUpdate, setUserForUpdate] = useState(null);
    const [open, setOpen] = useState(false);

    const redirectTo = (path) => () => {
        history.push(path);
    };

    const onUpdateClick = (info) => () => {
        setUserForUpdate(info);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetState = () => {
        setUserForUpdate(null);
    };

    return (
        <Box>
            <AddUserDialog
                open={open}
                handleClose={handleClose}
                initialValues={userForUpdate}
                fetchUsers={fetchUsers}
                type="update"
                resetState={resetState}
            />
            {loading ? (
                <Skeleton variant="rect" width={"100%"} height={"30vh"} />
            ) : (
                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        aria-label="customized table"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>SL Num.</StyledTableCell>
                                <StyledTableCell>Admin ID</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Number</StyledTableCell>
                                <StyledTableCell>Role</StyledTableCell>
                                <StyledTableCell>Lead Target</StyledTableCell>
                                <StyledTableCell>Deal Target</StyledTableCell>
                                <StyledTableCell>Created</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Update</StyledTableCell>
                                {/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.map((row, i) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>{i + 1}</StyledTableCell>

                                    <StyledTableCell>
                                        {hsiID(row.docNumber)
                                            ? hsiID(row.docNumber)
                                            : "-"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.username}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.email}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.number}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {capitalizeFirstLetter(row.type)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.leadTarget}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.dealTarget}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {parseDate(row.createdAt)}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <StatusSwitch
                                            id={row.id}
                                            adminStatus={row.status}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            size="small"
                                            onClick={redirectTo(
                                                `/admins/editAdmin/${row.id}`
                                            )}
                                        >
                                            <EditIcon
                                                style={{
                                                    fontSize: "1.2rem",
                                                }}
                                            />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default UserTable;
