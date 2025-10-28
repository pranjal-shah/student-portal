import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_student } from "../apis/student.api";
import { useNavigate } from "react-router-dom";

const Student = ({ page, limit, data, onSortToggle }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const result = await delete_student(id);
      if (result && result.error) {
        console.log(result.message);
        return;
      }
      const updatedStudents = students.filter((student) => student.id !== id);
      dispatch({ type: "student/setStudents", payload: updatedStudents });
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
            <th scope="col" className="sortable-header" onClick={onSortToggle}>
              FIRST NAME <i class="fa-solid fa-sort"></i>
            </th>
            <th scope="col">LAST NAME</th>
            <th scope="col">DOB</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">OPARATIONS</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{(page - 1) * limit + index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dateOfBirth.split("T")[0]}</td>
                <td>{student.address}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => navigate(`/students/edit/${student.id}`)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
