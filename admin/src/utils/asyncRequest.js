import { apiUrl, asyncError } from "./render.utils";

import axios from "axios";
import queryString from "query-string";

export const getJoinRequests = (data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    const stringified = queryString.stringify(data);
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .get(apiUrl(`/join/admin?${stringified}`, "v2"), {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};

export const updateJoinRequest = (id, data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .patch(apiUrl(`/join/admin/${id}`, "v2"), data, {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.request);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};
