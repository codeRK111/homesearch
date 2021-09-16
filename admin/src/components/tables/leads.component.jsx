import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import { DOMAIN_NAME } from "../../utils/staticData";
import OpinionStatusSwitch from "../switches/opinionStatus";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import TrimText from "../trimText";
import LeadStatusSwitch from "../switches/leadStatusSwitch";

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date) => {
    const m = moment(date);
    return m.format("Do MMM YYYY hh:mm:ss");
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

function LeadsTable({ loading, leads, selectedLeads, manageSelectedLeads }) {
    const classes = useStyles();

    // State

    const [data, setData] = useState([]);

    const renderIcon = (status) => {
        return status ? <CheckIcon /> : <CancelIcon />;
    };

    const handleChangeCheckbox = (event) => {
        manageSelectedLeads(event.target.value);
    };

    // Effects
    useEffect(() => {
        setData(leads);
    }, [leads]);

    const Loader = (
        <StyledTableRow>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((c) => (
                <StyledTableCell key={c}>
                    <CircularProgress size={15} color="inherit" />
                </StyledTableCell>
            ))}
        </StyledTableRow>
    );

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SL Num.</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Phone Number</StyledTableCell>
                            <StyledTableCell>Message</StyledTableCell>
                            <StyledTableCell>Assigned</StyledTableCell>
                            <StyledTableCell>Client Support</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Posted On</StyledTableCell>
                            <StyledTableCell>Select</StyledTableCell>

                            {/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading
                            ? Loader
                            : data.map((row, i) => (
                                  <StyledTableRow key={row.id}>
                                      <StyledTableCell>{i + 1}</StyledTableCell>

                                      <StyledTableCell>
                                          {row.name ? row.name : "-"}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          {row.email ? row.email : "-"}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          {row.number}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          {row.message ? (
                                              <TrimText
                                                  text={row.message}
                                                  num={50}
                                              />
                                          ) : (
                                              "-"
                                          )}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          {renderIcon(row.attended)}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          {row.clientSupport
                                              ? row.clientSupport.name
                                              : "-"}
                                      </StyledTableCell>

                                      <StyledTableCell>
                                          <LeadStatusSwitch
                                              id={row.id}
                                              leadStatus={row.status}
                                          />
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          {parseDate(row.createdAt)}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                          <Checkbox
                                              value={row.id}
                                              onChange={handleChangeCheckbox}
                                              color="primary"
                                              checked={selectedLeads.includes(
                                                  row.id
                                              )}
                                          />
                                      </StyledTableCell>
                                  </StyledTableRow>
                              ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LeadsTable;
