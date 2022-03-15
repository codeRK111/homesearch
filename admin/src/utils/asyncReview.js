import { apiUrl, asyncError } from "./render.utils";

import axios from "axios";
import queryString from "query-string";

export const getReviews = (data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    const stringified = queryString.stringify(data);
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .get(apiUrl(`/review/admin?${stringified}`, "v2"), {
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
export const updateReview = (id, data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .patch(apiUrl(`/review/admin/${id}`, "v2"), data, {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.review);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};
