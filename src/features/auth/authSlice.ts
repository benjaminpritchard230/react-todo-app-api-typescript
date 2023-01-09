import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "" },
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token;
    },
    clearCredentials: (state) => {
      state.token = "";
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = () => state.auth.user;
