import axios from "axios";
import { handleConfigError, setBearerToken } from "../utils/api.js";

export const axiosAssetDashApi = axios.create({
  baseURL: "http://localhost:1337",
});
axiosAssetDashApi.interceptors.request.use(setBearerToken, handleConfigError);
