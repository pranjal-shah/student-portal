import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      console.log("Enrollments fetched:", action.payload);
      state.enrollments = action.payload;
    },
  },
});

export const {
  setEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
