import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  create_student,
  get_student,
  update_student,
} from "../apis/student.api";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
  });

  // Fetch student data if editing
  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await get_student(id);
          setStudent({
            firstName: response.student.firstName,
            lastName: response.student.lastName,
            dateOfBirth: response.student.dateOfBirth,
            address: response.student.address,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await update_student(id, student);
      } else {
        await create_student(student);
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
          <h4 className="mb-0">{id ? "Update Student" : "Create Student"}</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={student.firstName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={student.lastName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={student.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter address"
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

export default StudentForm;
