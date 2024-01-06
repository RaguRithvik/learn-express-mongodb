import { executeAPI } from "./ApiCall";
import { store } from "../Store/Store";
import { setApiTrigger, setUser } from "../Store/Feature/CommonSlice";
import { showToast } from "../Component/Toastify";
export const loginAuth = async (endpoint, values, setLoading, navigation) => {
  setLoading(true);
  executeAPI(endpoint, "POST", values, null)
    .then((response) => {
      if (response !== undefined) {
        localStorage.setItem("token", response?.accessToken);
        store.dispatch(setUser({ userinfo: response?.userinfo }));
        navigation("/home");
      }
    })
    .catch((error) => {
    })
    .finally(() => {
      setLoading(false);
    });
};
export const getallDatas = async (endpoint, setData, setLoading) => {
  executeAPI(endpoint, "GET", null, null)
    .then((response) => {
      if (response !== undefined) {
        setData(response?.records)
      }
    })
    .catch((error) => {
    })
    .finally(() => {
      setLoading(false);
    });
};
export const createModal = async (endpoint, values, setLoading, setOpen) => {
  setLoading(true);
  executeAPI(endpoint, "POST", values, null)
    .then((response) => {
      if (response !== undefined) {
        showToast("success", "Data added successfull");
        store.dispatch(setApiTrigger(Date.now()));
        setOpen(false)
      }
    })
    .catch((error) => {
    })
    .finally(() => {
      setLoading(false);
    });
};
export const updateModal = async (endpoint, values, setLoading, setOpen) => {
  setLoading(true);
  executeAPI(endpoint, "PUT", values, null)
    .then((response) => {
      if (response !== undefined) {
        showToast("success", "Data added successfull");
        store.dispatch(setApiTrigger(Date.now()));
        setOpen(false)
      }
    })
    .catch((error) => {
    })
    .finally(() => {
      setLoading(false);
    });
};
export const deletelData = async (endpoint, id, setLoading, setOpen) => {
  setLoading(true);
  executeAPI(endpoint, "DELETE", { id }, null)
    .then((response) => {
      if (response !== undefined) {
        setOpen(false);
        showToast("success", response?.message ?? "Data deleted successfully");
        store.dispatch(setApiTrigger(Date.now()));
      }
    })
    .catch((error) => {
    })
    .finally(() => {
      setLoading(false);
    });
};