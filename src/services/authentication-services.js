import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "./header";
const serverUrl = `${process.env.REACT_APP_SERVER_URL}`;

export const registerUser = async (userData, setLoading) => {
  try {
    const response = await axios.post(`${serverUrl}/auth/signup/`, userData);
    setLoading(false);
    return { data: response.data, status: response.status }; // Return the successful response
  } catch (error) {
    setLoading(false);

    return error.response
      ? {
          error: error.response.data,
          status: error.response.status,
        }
      : {
          error: error.message,
          status: 500,
        };
  }
};
export const resendVerificationLink = async (userData, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${serverUrl}/auth/resend-activation-email/`,
      userData
    );
    setLoading(false);

    return { data: response.data, status: response.status }; // Return the successful response
  } catch (error) {
    setLoading(false);

    if (error?.response?.data) {
      return {
        error: error?.response?.data.detail,
        status: error.response.status,
      };
    } else {
      return { error: "Unexpected error occured", status: 500 };
    }
  }
};

export const loginUser = async (userData, setLoading) => {
  try {
    setLoading(true); // Start loading
    const response = await axios.post(`${serverUrl}/auth/login/`, userData);
    setLoading(false); // Stop loading
    return { data: response.data, status: response.status }; // Return the successful response
  } catch (error) {
    setLoading(false); // Stop loading in case of error

    if (error?.response?.data) {
      return {
        error: error?.response?.data.detail,
        status: error.response.status,
      };
    } else {
      return { error: "Unexpected error occured", status: 500 };
    }
  }
};
export const verifyMfa = async (userData) => {
  try {
    const response = await axios.post(
      `${serverUrl}/auth/verify-mfa/
`,
      userData
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return error.response
      ? {
          error: error.response.data,
          status: error.response.status,
        }
      : {
          error: error.message,
          status: 500,
        };
  }
};
export const updateMfa = async (data) => {
  try {
    const response = await axios.post(
      `${serverUrl}/auth/mfa-settings/

`,
      { mfa_method: data.mfaMethod, phone: data?.phone },
      getAuthHeaders()
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return error.response
      ? {
          error: error.response.data,
          status: error.response.status,
        }
      : {
          error: error.message,
          status: 500,
        };
  }
};

export const authGuard = async (setLoading) => {
  try {
    const response = await axios.get(
      `${serverUrl}/auth/auth-guard/

`,
      getAuthHeaders()
    );
    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? {
          error: error.response.data,
          status: error.response.status,
        }
      : {
          error: error.message,
          status: 500,
        };
  }
};

