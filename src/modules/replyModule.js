import axios from "axios";
import config from "../config/config";

export const postReply = async (
  body,
  anoymous,
  thought_id,
  token,
  callback
) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${config.server.url}/api/reply`,
      data: {
        body,
        anoymous,
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

export const deleteReply = async (thought_id, reply_id, token, callback) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${config.server.url}/api/reply`,
      data: {
        thought_id,
        reply_id,
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
