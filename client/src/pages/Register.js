import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../apis/auth.api";
import "../auth.css";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
    role: "User",
  });
  const [error, setError] = useState({
    isError: false,
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (location.pathname.startsWith("/register")) {
      document.body.className = "auth-body";
    } else {
      document.body.className = "home-body";
    }
  }, [location]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (data) => {
    let email, password, name;
    email = password = name = null;
    data.errors.map((err) => {
      return err.path === "email"
        ? (email = err.msg)
        : err.path === "password"
        ? (password = err.msg)
        : (name = err.msg);
    });
    setError({
      isError: true,
      email: email || "",
      password: password || "",
      name: name || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(inputValue);
      const { success } = data;
      if (success) {
        dispatch({ type: "user/setUser", payload: data.user });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setInputValue({
          ...inputValue,
          email: "",
          password: "",
          username: "",
        });
      } else {
        handleError(data);
      }
    } catch (error) {
      console.log(error);
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        username: "",
      });
    }
  };

  return (
    <div className="form_container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={inputValue.email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
          {error.isError ? (
            <h6 style={{ color: "red" }}>{error.email}</h6>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
          {error.isError ? (
            <h6 style={{ color: "red" }}>{error.name}</h6>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={inputValue.password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
          {error.isError ? (
            <h6 style={{ color: "red" }}>{error.password}</h6>
          ) : null}
        </div>
        <div>
          <label htmlFor="dropDown">Choose role: </label>
          <select name="role" value={inputValue.role} onChange={handleOnChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
