import axios from "axios";
import { getAuthHeaders, getmultipartAuthHeaders } from "./header";
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

export const fetchUserDocuments = async (setLoading) => {
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

export const fetchLawyerRelatedDocuments = async (setLoading) => {
  try {
    const response = await axios.get(
      `${config.SERVER_URL}/api/documents-for-lawyer`,
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
export const uploadDocument = async (file, setLoading) => {
  try {
    const formData = new FormData();

    // Append the file to the form data with the key 'file'
    formData.append("file", file);

    const response = await axios.post(
      `${config.SERVER_URL}/api/upload-pdf/
        `,
      formData,
      getmultipartAuthHeaders()
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
export const updateDocumentStatusLawyer = async (data, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.patch(
      `${config.SERVER_URL}/api//user-documents/${data.id}/update-verification/
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

export const updateDocument = async (data, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.patch(
      `${config.SERVER_URL}/api/documents/${data.id}/
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
