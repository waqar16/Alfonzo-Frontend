import axios from "axios";
import { getAuthHeaders } from "./header";
import { config } from "../config/config";

export const createNewTemplate = async (templateData, setLoading) => {
  try {
    const response = await axios.post(
      `${config.SERVER_URL}/api/templates/`,
      templateData
      //   getAuthHeaders()
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

export const fetchTemplates = async ( setLoading) => {
  try {
    const response = await axios.get(
      `${config.SERVER_URL}/api/templates/`,
      //   getAuthHeaders()
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
