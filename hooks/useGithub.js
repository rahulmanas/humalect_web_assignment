import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  deleteGithubAuthToken,
  getGithubAuthToken,
  getGithubUserDetails,
  postGithubAuthToken,
} from "../api/github";
import { toast } from "react-hot-toast";
import { handleConfigError } from "../utils/api";
import axios from "axios";
import { axiosAssetDashApi } from "../api";

export const GithubContext = createContext({});

export function useGithub() {
  return useContext(GithubContext);
}

export const GithubProvider = ({ children }) => {
  const router = useRouter();
  // const [accessToken, setAccessToken] = useState(null);
  const [tokenExistsData, setTokenExistsData] = useState(null);
  const [githubUser, setGithubUser] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);
  const [selectedRepoDetails, setSelectedRepoDetails] = useState(null);
  const [buttonText, setButtonText] = useState("Connect your repository");
  const [isTabLoading, setIsTabLoading] = useState(false);

  const fetchToken = async () => {
    try {
      const response = await getGithubAuthToken();

      if (response.status === 200 && response.data) {
        setTokenExistsData(response.data);
      } else {
        setTokenExistsData(null);
      }
    } catch (error) {
      handleConfigError(error);
    }
  };

  const submitCode = async (code) => {
    try {
      const payload = {
        code: code,
      };
      const response = await postGithubAuthToken(payload);
      // const accessToken = response.data.access_token;
      // setAccessToken(accessToken);
      router.push("/github");
    } catch (error) {
      toast.error(error?.response?.data?.err_msg);
    }
  };

  const deleteGithubToken = async (id) => {
    try {
      let payload = { user_id: id }; //todo
      const response = await deleteGithubAuthToken(payload);
      if (response.status === 200) {
        setButtonText("Connect your repository");
        toast.success(response.data);
        setRepoDetails(null);
        await fetchToken();
      }
      console.log(response, "delete response");
    } catch (error) {
      console.log(error, "err delete");
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchGithubUserDetails = async () => {
    try {
      const response = await getGithubUserDetails();

      console.log(response.data, "Github User Details");

      setGithubUser(response.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const fetchRepoDetails = async () => {
    try {
      const response = await axiosAssetDashApi.get("/api/github/repos");
      // console.log(response.data, "Github Repo Details");
      setRepoDetails(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  // const fetchGithubInstallationId = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.github.com/users/rahulmanas/installation",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           Accept: "application/vnd.github+json",
  //         },
  //       }
  //     );

  //     console.log(response, "fetchGithubInstallationId");
  //   } catch (error) {
  //     console.log(error, "err");
  //   }
  // };

  const fetchRepoCommitDetails = async (name, projectName) => {
    try {
      setIsTabLoading(true);
      const response = await axiosAssetDashApi.post(
        `/api/github/repos/commits`,
        {
          name,
          projectName,
        }
      );
      setSelectedRepoDetails(response.data);
      setIsTabLoading(false);
    } catch (err) {
      console.log(err, "err");
      setIsTabLoading(false);
    }
  };

  const fetchContributorData = async (contributors_url) => {
    try {
      const resp = await axiosAssetDashApi.post(
        "/api/github/contributor-data",
        {
          url: contributors_url,
        }
      );
      if (resp.status === 200) return { data: resp.data, error: false };
      else return { error: true };
    } catch (error) {
      return { data: error, error: true };
    }
  };

  return (
    <GithubContext.Provider
      value={{
        fetchToken,
        // accessToken,
        // setAccessToken,
        tokenExistsData,
        submitCode,
        githubUser,
        repoDetails,
        fetchGithubUserDetails,
        fetchRepoDetails,
        // fetchGithubInstallationId,
        selectedRepoDetails,
        setSelectedRepoDetails,
        fetchRepoCommitDetails,
        buttonText,
        setButtonText,
        deleteGithubToken,
        fetchContributorData,
        isTabLoading,
        setIsTabLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
