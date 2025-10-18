import axios from "axios";

export const register = async (inputValue) => {
  try {
    console.log("1");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    console.log(data);
    console.log("2");

    return data;
  } catch (error) {
    console.log("3");

    return error.response.data;
  }
};

export const login = async (inputValue) => {
  try {
    console.log("l1");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/auth/login`,
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    console.log(data);
    console.log("l2");

    return data;
  } catch (error) {
    console.log("l3");

    return error.response.data;
  }
};
