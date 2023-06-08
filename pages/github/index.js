import React, { useEffect, useState } from "react";
import axios from "axios";
import Tab1Details from "../../components/Github/Tab1Details";
import Tab2Details from "../../components/Github/Tab2Details";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
// import { axiosAssetDashApi } from "../../api";

const GitHub = () => {
  const router = useRouter();
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);
  const [selectedRepoDetails, setSelectedRepoDetails] = useState(null);
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
        const response = await axios.delete(
          "http://localhost:1337/api/github/token",
          {
            data: { access_token: accessToken },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the token
            },
          }
        );
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
      const response = await axios.get(
        "http://localhost:1337/api/github/token",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the token
          },
        }
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
      // const response = await fetch("http://localhost:1337/api/github/token", {
      //   method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   headers: {
      //     // "Content-Type": "application/json",
      //     // "Content-Type": "application/x-www-form-urlencoded",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify({ code }),
      // });
      const response = await axios.post(
        "http://localhost:1337/api/github/token",
        {
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the token
          },
        }
      );
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

        // console.log(response.data, "Github User Details");

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

    if (accessToken) {
      fetchUserDetails();
      fetchRepoDetails();
    }
  }, [accessToken]);

  const fetchRepoCommitDetails = async (name, projectName) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${name}/${projectName}/commits`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data, "Github Repo Details");
      setSelectedRepoDetails(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  console.log(repoDetails, "repo details");
  console.log(accessToken, "user access token details");

  return (
    <div className="main-content mx-auto space-y-4">
      <h1 className="text-4xl text-center">GitHub Authentication</h1>
      <div className="bg-green-100 shadow-lg w-max rounded-lg overflow-hidden p-4">
        <div>
          <button
            onClick={handleGithubRedirection}
            className="px-4 py-2 bg-green-300 rounded-xl"
          >
            {buttonText}
          </button>
        </div>
      </div>
      {repoDetails && (
        <div className="bg-green-100 shadow-lg rounded-lg overflow-hidden p-4 space-y-4">
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
      {/* <div className="grid grid-cols-2 mt-8">
        <div className="space-y-4">
          <div>
            <p className="text-2xl">List of all repositories</p>
          </div>
          <div className="space-y-1">
            {repoDetails &&
              repoDetails.map((repoDetail, index) => {
                return (
                  <div
                    className="flex"
                    key={index}
                    onClick={() => {
                      console.log(repoDetail, "selected");
                      fetchRepoCommitDetails(user.login, repoDetail.name);
                    }}
                  >
                    <div>{repoDetail.name}</div>
                    <div>{repoDetail.id}</div>
                  </div>
                );
              })}
          </div>
        </div>
        {selectedRepoDetails && (
          <div>
            <p>Total Number of commits: {selectedRepoDetails.length}</p>
            <div>
              <p className="mb-4">Commit Details:</p>
              <div className="space-y-2">
                {selectedRepoDetails?.slice(0, 5).map((item) => {
                  return (
                    <div>
                      <p>{item.sha}</p>
                      <a
                        href={item.html_url}
                        target="_blank"
                        className="underline"
                      >
                        {item.commit.message}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default GitHub;
