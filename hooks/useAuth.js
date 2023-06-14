import toast from "react-hot-toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postAuthSignup, postLoginUser } from "../api/user";
import Cookies from "js-cookie";
import { axiosAssetDashApi } from "../api";

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") && Cookies.get("token") !== undefined) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [router.pathname]);

  const fetchUserDetails = async () => {
    try {
      const resp = await axiosAssetDashApi.get("/api/users");

      if (resp.status === 200) setUser(resp.data);
    } catch (error) {
      console.log(error, "Err");
    }
  };
  const login = async (email, password) => {
    if (!isLoading) {
      setIsLoading(true);
      let errorReturn;
      return postLoginUser({ email, password })
        .then(async (res) => {
          if (res.status === 200 && res.data.token) {
            Cookies.set("token", res.data.token);
            // localStorage.setItem("user", JSON.stringify(res.data.user));
            setIsLoggedIn(true);
            errorReturn = { status: "ok", message: "success", data: res.data };
            setUser(res.data.user);
            setIsLoading(false);
            router.push("/github");
            return errorReturn;
          } else {
            setIsLoading(false);
            throw new Error("Non 200 response");
          }
        })
        .catch((err) => {
          console.log(err, "err login");
          errorReturn = {
            status: "error",
            message: "Please check your email/password",
          };
          toast.error("Please check your email/password");
          setIsLoading(false);
          return errorReturn;
        });
    }
  };

  const signup = async (email, password, password_confirm, organization) => {
    if (!isLoading) {
      setIsLoading(true);
      return postAuthSignup({
        email,
        password,
        password_confirm,
        organization,
      })
        .then(async (res) => {
          if (res.status === 200 && res.data.token) {
            Cookies.set("token", res.data.token);
            setIsLoggedIn(true);
            setIsLoading(false);
            router.push("/github");
            return { status: "ok", message: "success", data: res.data };
          } else {
            throw new Error("Non 200 response");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, "err signup");
          return {
            status: "error",
            message: "Something went wrong",
          };
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        login,
        signup,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
