import axios from "axios";
import config from "../config/config";

export const getUserInfo = async (username, token, callback) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${config.server.url}/api/user`,
      params: {
        username,
      },
      headers: { Authorization: `Bearer ${token}` },
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

export const getUserThoughts = async (
  username,
  offset,
  limit,
  token,
  callback
) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${config.server.url}/api/user/thoughts`,
      params: {
        username,
        offset,
        limit,
      },
      headers: { Authorization: `Bearer ${token}` },
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
