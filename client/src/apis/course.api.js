import axios from "axios";


export const get_courses = async (page = 1, limit = 2) => {
  try {
    console.log("s1");
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/courses?page=${page}&limit=${limit}`,
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

export const get_course = async (id) => {
  try {
    console.log("s1");
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/courses/${id}`,
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

export const create_course = async (course) => {
  try {
    console.log("s1");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/courses`,
      { ...course },
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

export const update_course = async (id, course) => {
  try {
    console.log("s1");
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_URI}/courses/${id}`,
      { ...course },
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

export const delete_course = async (id) => {
  try {
    console.log("s1");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URI}/courses/${id}`,
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