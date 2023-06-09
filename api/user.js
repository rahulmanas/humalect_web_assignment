// import { axiosAssetDashApi } from "./index.js";
import axios from "axios";

export const postAuthSignup = async (formValues) => {
  return await axios.post("http://localhost:1337/signup", formValues);
};

export const postLoginUser = async ({ email, password }) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);

  // console.log("useAuth", { walletData });

  let loginURL = "http://localhost:1337/login";

  return await axios.post(
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

export const postLogout = async () => {
  const token = localStorage.getItem("token");
  return await axios.post("web/auth/logout", { token });
};
