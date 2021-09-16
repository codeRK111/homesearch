import { apiUrl, asyncError } from "./render.utils";
import axios from "axios";
const token = localStorage.getItem("JWT");

export const addLead = (data, cancelToken, setLoading) => {
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .post(apiUrl(`/lead`, "v2"), data, {
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

export const getAllLeads = (data, cancelToken, setLoading) => {
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .post(apiUrl(`/lead/get-all`, "v2"), data, {
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

export const updateLead = (id, data, cancelToken, setLoading) => {
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .patch(apiUrl(`/lead/${id}`, "v2"), data, {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.lead);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};

export const assignClientSupport = (
    leads,
    clientSupport,
    cancelToken,
    setLoading
) => {
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .post(
                apiUrl(`/lead/assign-support`, "v2"),
                { leads, clientSupport },
                {
                    cancelToken: cancelToken.token,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data["lead"]);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};
