import { apiUrl, asyncError } from "./render.utils";

import axios from "axios";

export const getAdmins = (data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .post(apiUrl(`/admin`, "v2"), data, {
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
export const updateAdmin = (id, data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .patch(apiUrl(`/admin/${id}`, "v2"), data, {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.admin);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};
