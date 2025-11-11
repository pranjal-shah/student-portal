import React, { useState } from "react";

const Aside = ({selected, setSelected}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <aside className="sidebar">
      <span className="sidebar-header">Student Portal</span>
      <nav className="sidebar-nav">
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"><i class="fa-solid fa-bars"></i></span>
        </div>
        <ul className={`menu-list ${isOpen ? "open" : ""}`}>
          <li>
            <button
              className={`btn w-100 text-start ${
                selected === "students" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setSelected("students")}
            >
              Students
            </button>
          </li>
          <li>
            <button
              className={`btn w-100 text-start ${
                selected === "courses" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setSelected("courses")}
            >
              Courses
            </button>
          </li>
          <li>
            <button
              className={`btn w-100 text-start ${
                selected === "enrollments"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setSelected("enrollments")}
            >
              Enrollments
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;

// import React from "react";
// import { Link } from "react-router-dom";

// const Aside = () => {

//   return (
//     <>
//       <aside className="sidebar">
//         <span className="fs-4">Student Portal</span>
//         <nav className="sidebar-nav">
//           <ul>
//             <li>
//               <Link to={"/"} className="active">Students</Link>
//             </li>
//             <li>
//               <Link to={"/Courses"}>Courses</Link>
//             </li>
//             <li>
//               <Link to={"/Enrollments"}>Enrollments</Link>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Aside;
