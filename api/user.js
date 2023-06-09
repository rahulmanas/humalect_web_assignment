import { axiosAssetDashApi } from "./index";

export const postAuthSignup = async (formValues) => {
  return await axiosAssetDashApi.post("/signup", formValues);
};

export const postLoginUser = async ({ email, password }) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);

  // console.log("useAuth", { walletData });

  let loginURL = "/login";

  return await axiosAssetDashApi.post(
    loginURL,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};
