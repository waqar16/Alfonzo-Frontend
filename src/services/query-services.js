import axios from "axios";
import { getAuthHeaders } from "./header";
import { config } from "../config/config";
export const addQuery = async (data, setLoading) => {
  try {
    const response = await axios.post(
      `${config.SERVER_URL}/api/queries/send/
      `,
      data,
      getAuthHeaders()
    );

    setLoading(false);

    return { data: response.data, status: response.status };
  } catch (error) {
    setLoading(false);

    return error.response
      ? {
          error:
            error.response.data.error ||
            error.response.data.user ||
            error.response.data.query ||
            "unspecified error",
          status: error.response.status,
        }
      : error.message;
  }
};

export const fetchUserQueries = async (setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${config.SERVER_URL}/api/queries/send
        `,
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
