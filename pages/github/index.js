import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Tab1Details from "../../components/Github/Tab1Details";
import Tab2Details from "../../components/Github/Tab2Details";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { axiosAssetDashApi } from "../../api";
import { handleConfigError } from "../../utils/api";
import { useGithub } from "../../hooks/useGithub";
import withAuth from "../../HOC/withAuth";
// import { axiosAssetDashApi } from "../../api";

const GitHub = () => {
  const router = useRouter();
  const {
    fetchToken,
    accessToken,
    submitCode,
    fetchUserDetails,
    fetchRepoDetails,
    repoDetails,
    fetchGithubInstallationId,
    deleteGithubToken,
    buttonText,
    setButtonText,
  } = useGithub();
  const tabs = ["Tab1", "Tab2"];
  const [selectedTab, setSelectedTab] = useState("Tab1");

  const handleGithubRedirection = async () => {
    if (buttonText === "Connect your repository") {
      // Replace these values with your GitHub application's client ID and redirect URI
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = "http://localhost:3000/github"; // Replace with your actual redirect URI

      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    } else {
      await deleteGithubToken();
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) submitCode(code);
  }, [router.asPath]);

  useEffect(() => {
    if (accessToken) {
      setButtonText("Disconnect your repository");
    } else {
      setButtonText("Connect your repository");
    }
  }, [accessToken]);

  useMemo(() => {
    if (accessToken) {
      fetchUserDetails();
      fetchRepoDetails();

      fetchGithubInstallationId();
    }
  }, [accessToken]);

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
      {accessToken && (
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
            {selectedTab === "Tab1" && <Tab1Details />}
            {selectedTab === "Tab2" && repoDetails && <Tab2Details />}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(GitHub);
