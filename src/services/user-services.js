import axios from "axios";
import { getAuthHeaders } from "./header";
import { config } from "../config/config";

export const fetchUserBasicDetails = async (setLoading) => {
  try {
    const response = await axios.get(
      `${config.SERVER_URL}/auth/user/me/`,
      // `${config.SERVER_URL}/api/user-profile`,

      getAuthHeaders()
    );
    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? { error: error.response.data, status: error.response.status }
      : error.message;
  }
};
export const changePassword = async (userData, setLoading) => {
  try {
    const response = await axios.post(
      `${config.SERVER_URL}/auth/reset-password/
    `,
      userData,
      getAuthHeaders()
    );

    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? { error: error.response.data.error, status: error.response.status }
      : error.message;
  }
};
export const changeUsername = async (userData, setLoading) => {
  try {
    const response = await axios.post(
      `${config.SERVER_URL}/auth/change-username/
    `,
      userData,
      getAuthHeaders()
    );

    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? { error: error.response.data.error, status: error.response.status }
      : error.message;
  }
};

export const updateMfa = async (mfa, setLoading) => {
  try {
    const response = await axios.post(
      `${config.SERVER_URL}/auth/mfa-settings/
    `,
      mfa,
      getAuthHeaders()
    );

    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? { error: error.response.data.error, status: error.response.status }
      : error.message;
  }
};

export const fetchAllUsers = async (setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${config.SERVER_URL}/api/users
    `,
      // mfa,
      getAuthHeaders()
    );

    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? { error: error.response.data.error, status: error.response.status }
      : error.message;
  }
};
