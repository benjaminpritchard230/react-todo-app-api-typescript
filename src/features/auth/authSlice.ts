import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "" },
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = () => state.auth.user;
