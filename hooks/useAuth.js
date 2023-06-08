import toast from "react-hot-toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postAuthSignup, postLoginUser } from "../api/user";

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    if (!isLoading) {
      setIsLoading(true);
      let errorReturn;
      return postLoginUser({ email, password })
        .then(async (res) => {
          if (res.status === 200 && res.data.token) {
            localStorage.setItem("token", res.data.token);
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
          errorReturn = {
            status: "error",
            message: "Email or password is invalid",
          };
          toast.error(err?.response?.data?.detail);
          setIsLoading(false);
          return errorReturn;
        });
    }
  };

  const signup = async (email, password) => {
    if (!isLoading) {
      setIsLoading(true);
      return postAuthSignup({
        email,
        password,
      })
        .then(async (res) => {
          if (res.status === 200 && res.data.access_token) {
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsLoggedIn(true);
            setIsLoading(false);
            return { status: "ok", message: "success", data: res.data };
          } else {
            throw new Error("Non 200 response");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          return {
            status: "error",
            message: err.response.data.detail || "Email or password is invalid",
          };
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        setIsLoading,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
