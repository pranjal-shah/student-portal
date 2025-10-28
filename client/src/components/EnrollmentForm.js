import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  create_enrollment,
  get_enrollment,
  update_enrollment,
} from "../apis/enrollment.api";

const EnrollmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState({
    studentId: "",
    courseId: "",
    enrollmentDate: "",
  });

  // Fetch enrollment data if editing
  useEffect(() => {
    if (id) {
      const fetchEnrollment = async () => {
        try {
          const response = await get_enrollment(id);
          setEnrollment({
            studentId: response.enrollment.studentId,
            courseId: response.enrollment.courseId,
            enrollmentDate: response.enrollment.enrollmentDate,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchEnrollment();
    }
  }, [id]);

  const handleChange = (e) => {
    setEnrollment({ ...enrollment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await update_enrollment(id, enrollment);
      } else {
        await create_enrollment(enrollment);
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
          <h4 className="mb-0">
            {id ? "Update Enrollment" : "Create Enrollment"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Student Id</label>
                <input
                  type="text"
                  name="studentId"
                  value={enrollment.studentId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Student Id"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Course Id</label>
                <input
                  type="text"
                  name="courseId"
                  value={enrollment.courseId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Course Id"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Enrollment Date</label>
                <input
                  type="date"
                  name="enrollmentDate"
                  value={enrollment.enrollmentDate?.split("T")[0] || ""}
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

export default EnrollmentForm;
