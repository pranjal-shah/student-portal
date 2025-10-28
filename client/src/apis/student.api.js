import axios from "axios";

export const get_students = async (page = 1, limit = 2, sort) => {
  try {
    console.log("s1", sort);
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/students?page=${page}&limit=${limit}&sort=${sort}`,
      { withCredentials: true }
    );
    console.log(data);
    console.log("s2");

    return data;
  } catch (error) {
    console.log("s3");

    return error.response.data;
  }
};

export const get_student = async (id) => {
  try {
    console.log("s1");
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/students/${id}`,
      { withCredentials: true }
    );
    console.log(data);
    console.log("s2");

    return data;
  } catch (error) {
    console.log("s3");

    return error.response.data;
  }
};

export const create_student = async (student) => {
  try {
    console.log("s1");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/students`,
      { ...student },
      { withCredentials: true }
    );
    console.log(data);
    console.log("s2");

    return data;
  } catch (error) {
    console.log("s3");

    return error.response.data;
  }
};

export const update_student = async (id, student) => {
  try {
    console.log("s1");
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_URI}/students/${id}`,
      { ...student },
      { withCredentials: true }
    );
    console.log(data);
    console.log("s2");

    return data;
  } catch (error) {
    console.log("s3");

    return error.response.data;
  }
};

export const delete_student = async (id) => {
  try {
    console.log("s1");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URI}/students/${id}`,
      { withCredentials: true }
    );
    console.log(data);
    console.log("s2");

    return data;
  } catch (error) {
    console.log("s3", error.response.data);

    return error.response.data;
  }
};