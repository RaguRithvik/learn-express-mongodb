import { toast } from "react-toastify";

export async function showToast(type, msg) {
    toast(msg, {
        type: type || "default",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}