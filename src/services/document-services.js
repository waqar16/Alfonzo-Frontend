import axios from "axios";
import { getAuthHeaders } from "./header";
import { config } from "../config/config";
export const createDocument = async (data, setLoading) => {
  try {
    const response = await axios.post(
      `${config.SERVER_URL}/api/documents/
      `,
      data,
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

export const fetchUserDocuments = async ( setLoading) => {
  try {
    const response = await axios.get(
      `${config.SERVER_URL}/api/documents
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
