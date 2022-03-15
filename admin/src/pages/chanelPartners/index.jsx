import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    NativeSelect,
    Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

import CpTable from "./table";
import FilterCP from "./filter";
import Pagination from "@material-ui/lab/Pagination";
import { getAllCps } from "../../utils/asyncCP";
import { useHistory } from "react-router-dom";

const ChanelPartnersPage = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [data, setData] = useState({
        chanelPartners: [],
        totalDocs: 0,
    });

    const handleChange = (event, value) => {
        setPage(value);
    };

    const onReset = () => {
        setName("");
        setEmail("");
        setNumber("");
    };

    useEffect(() => {
        setPage(1);
    }, [name, email, number, limit]);

    const fetchCPs = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const filter = {
                name,
                email,
                number,
            };
            const resp = await getAllCps(page, limit, filter);
            setLoading(false);
            setData(resp);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }, [page, limit, name, email, number]);

    useEffect(() => {
        fetchCPs();
    }, [fetchCPs]);

    const filterProps = {
        name,
        email,
        number,
        setName,
        setEmail,
        setNumber,
        onReset,
    };
    return (
        <Box p="1rem">
            <Typography variant="h6" gutterBottom>
                Chanel Partners
            </Typography>
            <Box>
                <FilterCP {...filterProps} />
            </Box>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            {loading ? (
                <Box mt="1rem" display="flex" justifyContent={"center"}>
                    <CircularProgress size={30} />
                </Box>
            ) : (
                <Box mt="1rem">
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography>
                            <b>{data.totalDocs}</b> results found
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => history.push("/chanel-partners/add")}
                        >
                            Create CP
                        </Button>
                    </Box>
                    <CpTable data={data.chanelPartners} />
                    <Box
                        mt="1rem"
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection="column"
                    >
                        <FormControl style={{ width: 150 }}>
                            <InputLabel htmlFor="age-native-helper">
                                Results per page
                            </InputLabel>
                            <NativeSelect
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                            >
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={50}>Fifty</option>
                                <option value={100}>Hundred</option>
                            </NativeSelect>
                        </FormControl>
                        <Box mt="1rem">
                            <Pagination
                                count={Math.ceil(data.totalDocs / limit)}
                                variant="outlined"
                                shape="rounded"
                                page={page}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChanelPartnersPage;
