import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("user fetched:", action.payload);
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
