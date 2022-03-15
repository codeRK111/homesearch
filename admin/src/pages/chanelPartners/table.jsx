import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import StatusSwitch from "./statusSwitch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { parseDate } from "../../utils/render.utils";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function CpTable({ data }) {
    const classes = useStyles();
    const history = useHistory();

    const onEdit = (id) => () => {
        history.push(`/chanel-partners/update/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b>ID</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Name</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Email</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Phone Number</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Created At</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Updated At</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Status</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Update</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                HSI-{row.chanelNumber}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.number}</TableCell>
                            <TableCell align="center">
                                {parseDate(row.createdAt)}
                            </TableCell>
                            <TableCell align="center">
                                {parseDate(row.updatedAt)}
                            </TableCell>
                            <TableCell align="center">
                                <StatusSwitch chanelPartner={row} />
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    size="small"
                                    onClick={onEdit(row.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
