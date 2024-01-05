import { executeAPI } from "./ApiCall";
import { store } from "../Store/Store";
import { setUser } from "../Store/Feature/CommonSlice";
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
      // formik?.setFieldError("password", error?.message ?? "Error");
    })
    .finally(() => {
      setLoading(false);
    });
};