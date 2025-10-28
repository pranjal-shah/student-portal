import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentForm from "./components/StudentForm";
import CourseForm from "./components/CourseForm";
import EnrollmentForm from "./components/EnrollmentForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Courses/create" element={<CourseForm />} />
        <Route path="/Courses/edit/:id" element={<CourseForm />} />

        <Route path="/Enrollments/create" element={<EnrollmentForm />} />
        <Route path="/Enrollments/edit/:id" element={<EnrollmentForm />} />

        <Route path="/students/create" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
