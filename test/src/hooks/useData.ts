import axios from "axios";
import { useCallback } from "react";

export const useData = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const getData = useCallback(async () => {
    return axios.get(`${apiUrl}/data`, {
      responseType: "json",
    });
  }, [apiUrl]);

  const uploadData = useCallback(
    (file: File) => {
      if (!file) return Promise.reject("No file selected");

      const formData = new FormData();
      formData.append("file", file, file.name);

      return axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    [apiUrl]
  );

  return {
    getData,
    uploadData,
  };
};
