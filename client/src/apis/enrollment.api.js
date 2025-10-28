import axios from "axios";


export const get_enrollments = async (page = 1, limit = 2) => {
  try {
    console.log("s1");
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/enrollments?page=${page}&limit=${limit}`,
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

export const get_enrollment = async (id) => {
  try {
    console.log("s1");
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/enrollments/${id}`,
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

export const create_enrollment = async (enrollment) => {
  try {
    console.log("s1");
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/enrollments`,
      { ...enrollment },
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

export const update_enrollment = async (id, enrollment) => {
  try {
    console.log("s1");
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_URI}/enrollments/${id}`,
      { ...enrollment },
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

export const delete_enrollment = async (id) => {
  try {
    console.log("s1");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URI}/enrollments/${id}`,
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