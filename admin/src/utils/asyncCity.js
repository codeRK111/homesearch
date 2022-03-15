import { apiUrl, asyncError } from "./render.utils";

import axios from "axios";

export const addCity = (data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    const formData = new FormData();
    if (data.image) {
        formData.append("image", data.image);
    }
    if (data.name) {
        formData.append("name", data.name);
    }
    if (data.state) {
        formData.append("state", data.state);
    }

    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .post(apiUrl(`/city`, "v2"), formData, {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.city);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};
export const updateCity = (id, data, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    const formData = new FormData();
    if (data.image) {
        formData.append("image", data.image);
    }
    if (data.name) {
        formData.append("name", data.name);
    }
    if (data.state) {
        formData.append("state", data.state);
    }
    if (data.status) {
        formData.append("status", data.status);
    }
    if (data.top !== undefined && data.top !== null) {
        formData.append("top", data.top);
    }

    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .patch(apiUrl(`/city/${id}`, "v2"), formData, {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.city);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};

export const getAllStates = (cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .get(apiUrl(`/city/states`, "v2"), {
                cancelToken: cancelToken.token,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setLoading(false);
                return resolve(resp.data.data.states);
            })
            .catch((error) => {
                setLoading(false);
                return reject(asyncError(error));
            });
    });
};
export const getAllCities = (filter, cancelToken, setLoading) => {
    const token = localStorage.getItem("JWT");
    return new Promise((resolve, reject) => {
        setLoading(true);
        axios
            .post(apiUrl(`/city/all-cities`, "v2"), filter, {
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
