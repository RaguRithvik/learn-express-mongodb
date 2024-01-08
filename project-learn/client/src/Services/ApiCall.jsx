import axios from "axios";
import { showToast } from "../Component/Toastify";
import { store } from "../Store/Store";
import { setSession } from "../Store/Feature/CommonSlice";
export const getToken = () => {
    return localStorage.getItem("token");
};
export const executeAPI = async (endpoint, method, data = null, params = null) => {
    try {
        const token = getToken();
        const config = {
            method: method,
            url: `http://localhost:5000/api${endpoint}`,
            headers: {
                Accept: "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            data: data,
            params: params,
        };
        const response = await axios(config);
        return response.data;
    }
    catch (error) {
        if (error?.response && error?.response?.status === 401) { 
            store.dispatch(setSession(true));
        }
        else {
            showToast("error", error?.response?.data?.message ?? "An error occurred.")
        }

        throw Error(error?.response?.data?.message ?? "An error occurred.");
    }
}