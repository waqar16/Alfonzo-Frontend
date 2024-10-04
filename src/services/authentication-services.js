import axios from "axios";
import { useNavigate } from "react-router-dom";
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

export const loginUser = async (userData, setLoading) => {
  try {
    setLoading(true); // Start loading
    const response = await axios.post(`${serverUrl}/auth/login/`, userData);
    setLoading(false); // Stop loading
    return { data: response.data, status: response.status }; // Return the successful response
  } catch (error) {
    setLoading(false); // Stop loading in case of error

    if (error.response && error.response.data) {
      try {
        return {
          error: error.response.data.detail[0],
          status: error.response.status,
        };
      } catch (e) {
        return { error: "Failed to parse error response." }; // Fallback message
      }
    }

    // Return general error message if no response is available
    return {
      error: {
        error: error.message,
        status: 500,
      },
    };
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

// export const handleGoogleSuccess = 

export const handleGoogleFailure = (error) => {
  console.error("Google login failure:", error);
  alert("Failed to login with Google.");
};
