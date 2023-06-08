// import { AxiosRequestConfig } from 'axios';

export const getBearerToken = () => {
  if (typeof localStorage === "undefined") {
    return "Bearer";
  }
  const token = localStorage.getItem("token");
  // console.log(token, " my token here");

  return token ? `Bearer ${token}` : "Bearer";
};

export const setBearerToken = async (config) => {
  const token = getBearerToken();
  // if token exists add it to api requests
  config.headers.Authorization = token;
  // config.headers.common["Authorization"] = token;
  return config;
};

export const handleConfigError = (error) => {
  return Promise.reject(error);
};
