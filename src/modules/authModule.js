import axios from "axios";
import config from "../config/config";

export const login = async (usernameOrEmail, password, callback) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${config.server.url}/api/auth/login`,
      data: {
        usernameOrEmail,
        password,
      },
    });
    if (response.status === 200) {
      callback(null, response.data);
    }
  } catch (error) {
    if (
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 401 ||
      error.response.status === 500
    ) {
      if (error.response.data) {
        callback(error.response.data, null);
      }
    }
  }
};

export const register = async (username, email, password, callback) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${config.server.url}/api/auth/register`,
      data: {
        username,
        email,
        password,
      },
    });
    if (response.status === 200) {
      callback(null, response.data);
    }
  } catch (error) {
    if (
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 401 ||
      error.response.status === 409 ||
      error.response.status === 500
    ) {
      if (error.response.data) {
        callback(error.response.data, null);
      }
    }
  }
};
