import React from "react";
import { logout } from "../apis/auth.api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const Logout = async () => {
    try {
      await logout();
      dispatch({ type: "user/setLogout" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav class="navbar navbar-light bg-light justify-content-between px-3">
        <p class="navbar-brand">Welcome, {user.name}</p>
        <form class="form-inline">
          <button className="btn btn-outline-secondary" onClick={Logout}>
            LOGOUT
          </button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
