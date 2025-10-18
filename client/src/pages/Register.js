import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../apis/auth.api";

const Register = () => {
  const navigate = useNavigate();
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
      err.path === "email"
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

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(inputValue);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
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
      <ToastContainer />
    </div>
  );
};

export default Register;
