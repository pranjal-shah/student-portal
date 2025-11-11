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
      className="table-responsive my-4 mx-auto"
      style={{ width: "96%", maxHeight: "350px", overflowY: "auto" }}
      // style={{ maxHeight: "350px", overflowY: "auto" }}
    >
      <table className="table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th className="sortable-header" onClick={onSortToggle}>
              FIRST NAME <i class="fa-solid fa-sort"></i>
            </th>
            <th>LAST NAME</th>
            <th>DOB</th>
            <th>ADDRESS</th>
            <th>OPARATIONS</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((student, index) => (
              <tr key={student.id}>
                <th>{(page - 1) * limit + index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dateOfBirth.split("T")[0]}</td>
                <td>{student.address}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1 op_btn"
                    onClick={() => navigate(`/students/edit/${student.id}`)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger op_btn"
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

      {/* <table className="table">
        <thead>
          <tr className="d-flex">
            <th className="col-2" scope="col">Sr No</th>
            <th className="col-2 sortable-header" scope="col" onClick={onSortToggle}>
              FIRST NAME <i class="fa-solid fa-sort"></i>
            </th>
            <th className="col-2" scope="col">LAST NAME</th>
            <th className="col-2" scope="col">DOB</th>
            <th className="col-2" scope="col">ADDRESS</th>
            <th className="col-2" scope="col">OPARATIONS</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((student, index) => (
              <tr key={student.id} className="d-flex">
                <th scope="row" className="col-2">{(page - 1) * limit + index + 1}</th>
                <td className="col-2">{student.firstName}</td>
                <td className="col-2">{student.lastName}</td>
                <td className="col-2">{student.dateOfBirth.split("T")[0]}</td>
                <td className="col-2">{student.address}</td>
                <td className="col-2">
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
      </table> */}
    </div>
  );
};

export default Student;
