import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export default apiClient;