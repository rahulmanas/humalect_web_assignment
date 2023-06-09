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

  const publicPaths = ["/login", "/signup"];

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
    const pathName = router.pathname;
    console.log(pathName, "pathname zxxxx");
    const resp = publicPaths.findIndex((path) => path === pathName);
    if (
      resp === -1 &&
      !(
        localStorage.getItem("token") &&
        localStorage.getItem("token") !== undefined
      )
    ) {
      router.push("/login");
    }
    // else if (resp > -1 && !isLoggedIn) {
    //   router.push("/github"); //any authenticated route
    // }
  }, [router.pathname]);

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
          console.log(err, "err login");
          errorReturn = {
            status: "error",
            message: "Something went wrong",
          };
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
            localStorage.setItem("token", res.data.token);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
