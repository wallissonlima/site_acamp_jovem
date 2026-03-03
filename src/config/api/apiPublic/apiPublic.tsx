import axios from "axios";

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEAPI_URL,
});