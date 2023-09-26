import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://archive.archi-tech.site/api",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export default apiClient;