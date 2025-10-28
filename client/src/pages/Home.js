import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../home.css";
import { get_students } from "../apis/student.api";
import Student from "../components/Student";
import { get_courses } from "../apis/course.api";
import Course from "../components/Course";
import { get_enrollments } from "../apis/enrollment.api";
import Enrollment from "../components/Enrollment";
import { useDispatch, useSelector } from "react-redux";
import Aside from "../components/Aside";

const Home = () => {
  const [selectedSection, setSelectedSection] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const courses = useSelector((state) => state.course.courses);
  // const enrollments = useSelector((state) => state.enrollment.enrollments);
  const [currentSort, setCurrentSort] = useState(false);

  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 2,
  });

  const students_data = async (page, limit = 3, sort = false) => {
    try {
      const response = await get_students(page, limit, sort);
      setCurrentSort(sort);
      if (!response.success) {
        navigate("/login");
        return;
      }
      setPagination(response.pagination);
      dispatch({ type: "student/setStudents", payload: response.student });
    } catch (error) {
      console.log(error);
    }
  };

  const courses_data = async (page) => {
    try {
      const response = await get_courses(page);
      if (!response.success) {
        navigate("/login");
        return;
      }
      setPagination(response.pagination);
      dispatch({ type: "course/setCourses", payload: response.course });
    } catch (error) {
      console.log(error);
    }
  };
  const enrollments_data = async (page) => {
    try {
      const response = await get_enrollments(page);
      if (!response.success) {
        navigate("/login");
        return;
      }
      setPagination(response.pagination);
      dispatch({
        type: "enrollment/setEnrollments",
        payload: response.enrollment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedSection === "students") students_data(1);
    if (selectedSection === "courses") courses_data(1);
    if (selectedSection === "enrollments") enrollments_data(1);
  }, [selectedSection]);

  const handlePageChange = (page) => {
    if (selectedSection === "students") students_data(page);
    if (selectedSection === "courses") courses_data(page);
    if (selectedSection === "enrollments") enrollments_data(page);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/auth")) {
      document.body.className = "auth-body";
    } else {
      document.body.className = "home-body";
    }
  }, [location]);

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-layout">
      <Aside selected={selectedSection} setSelected={setSelectedSection} />

      <div className="main-area">
        <header className="topbar">
          <Navbar />
        </header>

        <main className="content">
          <div className="content-header">
            {selectedSection !== "enrollments" ? (
              <div className="search-bar">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Search ${selectedSection}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (selectedSection === "students")
                  navigate(`/students/create`);
                if (selectedSection === "courses") navigate(`/courses/create`);
                if (selectedSection === "enrollments")
                  navigate(`/enrollments/create`);
              }}
            >
              Add new {selectedSection.slice(0, -1)}
            </button>
          </div>

          <div className="content-body">
            {selectedSection === "students" && (
              <Student
                page={pagination.currentPage}
                limit={pagination.limit}
                data={filteredStudents}
                onSortToggle={() => {
                  students_data(
                    pagination.currentPage,
                    pagination.limit,
                    !currentSort
                  );
                }}
              />
            )}
            {selectedSection === "courses" && (
              <Course
                page={pagination.currentPage}
                limit={pagination.limit}
                data={filteredCourses}
              />
            )}
            {selectedSection === "enrollments" && (
              <Enrollment
                page={pagination.currentPage}
                limit={pagination.limit}
              />
            )}
          </div>

          <div className="content-footer">
            {/* pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      pagination.currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <h2 className="fs-6 text-secondary">
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {pagination.totalItems < pagination.currentPage * pagination.limit
                ? pagination.totalItems
                : pagination.currentPage * pagination.limit}{" "}
              of {pagination.totalItems} rows
            </h2>
          </div>
        </main>

        <footer className="footer">
          <div>© {new Date().getFullYear()} Student Management Portal</div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
