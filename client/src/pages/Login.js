import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../apis/auth.api";
import "../auth.css";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.pathname.startsWith("/login")) {
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
    let email, password;
    email = password = null;
    data.errors.map((err) => {
      return err.path === "email" ? (email = err.msg) : (password = err.msg);
    });

    setError({
      isError: true,
      email: email || "",
      password: password || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(inputValue);
      console.log(data);
      const { success } = data;
      if (success) {
        dispatch({ type: "user/setUser", payload: data.user });
        navigate("/");
      } else {
        handleError(data);
      }
    } catch (error) {
      console.log(error);
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
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
        <button type="submit">Submit</button>
        <span>
          Create New account? <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
