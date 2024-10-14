import axios from "axios";
import { getAuthHeaders } from "./header";
import { config } from "../config/config";
export const fetchNotifications = async (url, setLoading) => {
  try {
    const response = await axios.get(
      url
        ? url
        : `${config.SERVER_URL}/api/notifications/
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

export const updateNotificationStatus = async (id) => {
  try {
    const response = await axios.patch(
      `${config.SERVER_URL}/api/notifications/${id}/mark-read/
      `,
      {},
      getAuthHeaders()
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    return error.response
      ? { error: error.response.data.error, status: error.response.status }
      : error.message;
  }
};
