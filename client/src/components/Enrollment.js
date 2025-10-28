import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_enrollment } from "../apis/enrollment.api";
import { useNavigate } from "react-router-dom";

const Enrollment = ({ page, limit }) => {
  const dispatch = useDispatch();
  const enrollments = useSelector((state) => state.enrollment.enrollments);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await delete_enrollment(id);
      const updatedEnrollments = enrollments.filter(
        (enrollment) => enrollment.id !== id
      );
      dispatch({
        type: "enrollment/setEnrollments",
        payload: updatedEnrollments,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="table-responsive my-4"
      style={{ maxHeight: "350px", overflowY: "auto" }}
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Student</th>
            <th scope="col">Course</th>
            <th scope="col">Enrollment Date</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {enrollments && enrollments.length > 0 ? (
            enrollments.map((enrollment, index) => (
              <tr key={enrollment.id}>
                <th scope="row">{(page - 1) * limit + index + 1}</th>
                <td>{enrollment.Student.firstName}</td>
                <td>{enrollment.Course.courseName}</td>
                <td>{enrollment.enrollmentDate.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() =>
                      navigate(`/enrollments/edit/${enrollment.id}`)
                    }
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(enrollment.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No enrollments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollment;
