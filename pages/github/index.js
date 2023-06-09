import React, { useEffect, useState } from "react";
import axios from "axios";
import Tab1Details from "../../components/Github/Tab1Details";
import Tab2Details from "../../components/Github/Tab2Details";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { axiosAssetDashApi } from "../../api";
// import { axiosAssetDashApi } from "../../api";

const GitHub = () => {
  const router = useRouter();
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);
  const tabs = ["Tab1", "Tab2"];
  const [selectedTab, setSelectedTab] = useState("Tab1");
  const [buttonText, setButtonText] = useState("Connect your repository");

  const handleGithubRedirection = async () => {
    if (buttonText === "Connect your repository") {
      // Replace these values with your GitHub application's client ID and redirect URI
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = "http://localhost:3000/github"; // Replace with your actual redirect URI

      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    } else {
      // delete the connection from the db and fetch token again;
      try {
        const token = localStorage.getItem("token");
        const response = await axiosAssetDashApi.delete("/api/github/token", {
          data: { access_token: accessToken },
        });
        if (response.status === 200) {
          setButtonText("Connect your repository");
          toast.success(response.data);
          setRepoDetails(null);
          await fetchToken();
        }
        console.log(response, "delete response");
      } catch (error) {
        console.log(error, "err delete");
        // toast.error(error?.response?.data?.err_msg);
      }
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (code) {
      handleCallback();
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) setCode(code);
    }
  }, [code]);

  const fetchToken = async () => {
    try {
      const response = await axiosAssetDashApi.get(
        "http://localhost:1337/api/github/token"
      );

      console.log(response, "resp xx");

      if (response.status === 200 && response.data) {
        setAccessToken(response.data.access_token);
      } else {
        setAccessToken(null);
      }
    } catch (error) {
      console.log(error, "err xxx");
    }
  };

  useEffect(() => {
    if (accessToken) {
      setButtonText("Disconnect your repository");
    } else {
      setButtonText("Connect your repository");
    }
  }, [accessToken]);

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    try {
      const response = await axiosAssetDashApi.post("/api/github/token", {
        code,
      });
      const accessToken = response.data.access_token;
      console.log(response.data, "resp xxx");
      setAccessToken(accessToken);
      router.push("/github");

      // Do something with the access token, such as storing it in state or local storage
      console.log("Access Token:", accessToken);
    } catch (error) {
      console.log("Error obtaining access token:", error);
      localStorage.removeItem("access_token");
      toast.error(error?.response?.data?.err_msg);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response.data, "Github User Details");

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(response.data, "Github Repo Details");
        setRepoDetails(response.data);
      } catch (err) {
        console.log(err, "err");
      }
    };

    const fetchGithubInstallationId = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/rahulmanas/installation",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/vnd.github+json",
            },
          }
        );

        console.log(response, "fetchGithubInstallationId");
      } catch (error) {
        console.log(error, "err");
      }
    };

    if (accessToken) {
      fetchUserDetails();
      fetchRepoDetails();

      fetchGithubInstallationId();
    }
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      fetchAllCollaborators();
    }
  }, [user]);

  const fetchAllCollaborators = async () => {
    try {
      console.log("here coll");
      const response = await axios.get(
        `https://api.github.com/projects/${user.id}/collaborators`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      console.log(response, "fetchAllCollaborators");
    } catch (error) {
      console.log(error, "collaborator error");
    }
  };

  console.log(repoDetails, "repo details");
  console.log(user, "user details");

  return (
    <div className="main-content mx-auto space-y-4">
      <h1 className="text-4xl text-center text-black">GitHub Authentication</h1>
      <div className="bg-white shadow-lg w-max rounded-lg overflow-hidden p-4">
        <div>
          <button
            onClick={handleGithubRedirection}
            className="px-4 py-2 bg-price-green rounded-xl"
          >
            {buttonText}
          </button>
        </div>
      </div>
      {repoDetails && (
        <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden p-4 space-y-4">
          <div className="flex bg-gray-200 w-max rounded-xl">
            {tabs.map((tab) => {
              return (
                <div
                  key={tab}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedTab === tab ? "bg-blue-200 rounded-xl" : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </div>
              );
            })}
          </div>
          <div>
            {selectedTab === "Tab1" && repoDetails && (
              <Tab1Details repoDetails={repoDetails} />
            )}
            {selectedTab === "Tab2" && repoDetails && (
              <Tab2Details
                repoDetails={repoDetails}
                user={user}
                accessToken={accessToken}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHub;
