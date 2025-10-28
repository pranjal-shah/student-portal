import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      console.log("Courses fetched:", action.payload);
      state.courses = action.payload;
    },
  },
});

export const {
  setCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
