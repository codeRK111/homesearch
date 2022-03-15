import { apiUrl } from "./render.utils";
import axios from "axios";
import queryString from "query-string";

// import queryString from 'query-string';

export const getAllCps = async (page = 1, limit = 10, filter = {}) => {
    try {
        const token = localStorage.getItem("JWT");
        const resp = await axios.get(
            apiUrl(
                `/chanel-partner?page=${page}&limit=${limit}&${queryString.stringify(
                    filter
                )}`,
                "v2"
            ),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return resp.data.data;
    } catch (error) {
        let message = "Something went wrong";
        if (error.response) {
            message = error.response.data.message;
        }
        throw new Error(message);
    }
};
export const createCP = async (data) => {
    try {
        const token = localStorage.getItem("JWT");
        const resp = await axios.post(apiUrl(`/chanel-partner`, "v2"), data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return resp.data.data.cp;
    } catch (error) {
        let message = "Something went wrong";
        if (error.response) {
            message = error.response.data.message;
        }
        throw new Error(message);
    }
};

export const updateCPDetails = async (id, data) => {
    try {
        const token = localStorage.getItem("JWT");
        const resp = await axios.patch(
            apiUrl(`/chanel-partner/${id}`, "v2"),
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return resp.data.data;
    } catch (error) {
        let message = "Something went wrong";
        if (error.response) {
            message = error.response.data.message;
        }
        throw new Error(message);
    }
};

export const getCPDetails = async (id) => {
    try {
        const token = localStorage.getItem("JWT");
        const resp = await axios.get(apiUrl(`/chanel-partner/${id}`, "v2"), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return resp.data.data;
    } catch (error) {
        let message = "Something went wrong";
        if (error.response) {
            message = error.response.data.message;
        }
        throw new Error(message);
    }
};
