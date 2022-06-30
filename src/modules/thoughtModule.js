import axios from "axios";
import config from "../config/config";

export const postThought = async (body, anoymous, token, callback) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${config.server.url}/api/thought`,
      data: {
        body,
        anoymous,
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

export const getAllThoughts = async (offset, limit, token, callback) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${config.server.url}/api/thought/all`,
      params: {
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

export const deleteThought = async (thought_id, token, callback) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${config.server.url}/api/thought`,
      data: {
        thought_id,
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
