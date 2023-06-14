import { axiosAssetDashApi } from "./index";

export const fetchGithubAuthToken = async () => {
  return await axiosAssetDashApi.get("/api/github/token");
};

export const postGithubAuthToken = async (payload) => {
  return await axiosAssetDashApi.post("/api/github/token", payload);
};

export const deleteGithubAuthToken = async (payload) => {
  return await axiosAssetDashApi.delete("/api/github/token", {
    data: payload,
  });
};
