import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_course } from "../apis/course.api";
import { useNavigate } from "react-router-dom";

const Course = ({ page, limit, data }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await delete_course(id);
      const updatedCourses = courses.filter((course) => course.id !== id);
      dispatch({ type: "course/setCourses", payload: updatedCourses });
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
            <th scope="col">Course NAME</th>
            <th scope="col">Instructor</th>
            <th scope="col">Credits</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((course, index) => (
              <tr key={course.id}>
                <th scope="row">{(page - 1) * limit + index + 1}</th>
                <td>{course.courseName}</td>
                <td>{course.instructor}</td>
                <td>{course.credits}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => navigate(`/courses/edit/${course.id}`)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No Courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
