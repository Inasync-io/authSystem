import axios from "axios";

const localURL = "http://localhost:5000"

export const APICall = axios.create({
    baseURL: localURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",  // Default Content-Type
    },
});