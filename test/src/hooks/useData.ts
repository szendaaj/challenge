import axios from "axios";
import { useCallback } from "react";

export const useData = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const getData = useCallback(async () => {
    return axios
      .get(`${apiUrl}/data`, {
        responseType: "json",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiUrl]);

  return {
    getData,
  };
};
