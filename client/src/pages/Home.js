import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      console.log(Cookies.get("token"));
      if (!Cookies.get("token")) {
        return navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5555/api/v1",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (Cookies.remove("token"), navigate("/login"));
    };
    verifyCookie();
  }, [navigate]);

  const Logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
