import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  create_course,
  get_course,
  update_course,
} from "../apis/course.api";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    courseName: "",
    instructor: "",
    credits: "",
  });

  // Fetch course data if editing
  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await get_course(id);
          setCourse({
            courseName: response.course.courseName,
            instructor: response.course.instructor,
            credits: response.course.credits,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchCourse();
    }
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await update_course(id, course);
      } else {
        await create_course(course);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{id ? "Update Course" : "Create Course"}</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={course.courseName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter course name"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Instructor</label>
                <input
                  type="text"
                  name="instructor"
                  value={course.instructor}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter instructor name"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Credits</label>
                <input
                  type="number"
                  name="credits"
                  value={course.credits}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                {id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
