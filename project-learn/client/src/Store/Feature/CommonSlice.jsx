// Feature/CommonSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  apiTrigger: null,
  session: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    setApiTrigger: (state, { payload }) => {
      state.apiTrigger = payload;
    },
    setSession: (state, { payload }) => {
      state.session = payload;
    },
  },
});

export default commonSlice.reducer;
export const { setUser, setApiTrigger, setSession } = commonSlice.actions;
