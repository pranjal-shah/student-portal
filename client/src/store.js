import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/student/studentSlice.js";
import courseReducer from "./features/course/courseSlice.js";
import enrollmentReducer from "./features/enrollment/enrollmentSlice.js";
import userReducer from "./features/user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigStudent = {
  key: "students",
  storage,
};
const persistConfigCourse = {
  key: "courses",
  storage,
};
const persistConfigEnrollment = {
  key: "enrollments",
  storage,
};
const persistConfigUser = {
  key: "user",
  storage,
};

const studentPersistedReducer = persistReducer(
  persistConfigStudent,
  studentReducer
);
const coursePersistedReducer = persistReducer(
  persistConfigCourse,
  courseReducer
);
const enrollmentPersistedReducer = persistReducer(
  persistConfigEnrollment,
  enrollmentReducer
);
const userPersistedReducer = persistReducer(persistConfigUser, userReducer);

const store = configureStore({
  reducer: {
    student: studentPersistedReducer,
    course: coursePersistedReducer,
    enrollment: enrollmentPersistedReducer,
    user: userPersistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
