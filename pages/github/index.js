import React, { useEffect, useMemo, useState } from "react";
import Tab1Details from "../../components/Github/Tab1Details";
import Tab2Details from "../../components/Github/Tab2Details";
import { useRouter } from "next/router";
import { useGithub } from "../../hooks/useGithub";
import withAuth from "../../HOC/withAuth";
import { NextSeo } from "next-seo";
import { useAuth } from "../../hooks/useAuth";
// import { axiosAssetDashApi } from "../../api";

const GitHub = () => {
  const router = useRouter();
  const {
    fetchToken,
    tokenExistsData,
    // accessToken,
    githubUser,
    submitCode,
    fetchGithubUserDetails,
    fetchRepoDetails,
    repoDetails,
    // fetchGithubInstallationId,
    deleteGithubToken,
    buttonText,
    setButtonText,
  } = useGithub();
  const { fetchUserDetails, user } = useAuth();
  const tabs = ["Tab1", "Tab2"];
  const [selectedTab, setSelectedTab] = useState("Tab1");

  const handleGithubRedirection = async () => {
    if (buttonText === "Connect your repository") {
      // Replace these values with your GitHub application's client ID and redirect URI
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = "http://localhost:3000/github"; // Replace with your actual redirect URI

      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    } else {
      await deleteGithubToken(user?.id);
    }
  };

  console.log(user, "user deta");

  useEffect(() => {
    fetchToken();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (tokenExistsData) {
      fetchGithubUserDetails();
      fetchRepoDetails();
    }
  }, [tokenExistsData]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      handleSubmitCode(code);
    }
  }, [router.asPath]);

  const handleSubmitCode = async (code) => {
    await submitCode(code);

    await fetchToken();
  };

  console.log(tokenExistsData, "to xx");

  useEffect(() => {
    if (githubUser) {
      setButtonText("Disconnect your repository");
    } else {
      setButtonText("Connect your repository");
    }
  }, [githubUser]);

  return (
    <div className="main-content mx-auto space-y-4">
      <NextSeo
        title={`Humalect - Github Page`}
        noindex={true}
        nofollow={true}
      />
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
            {selectedTab === "Tab1" && <Tab1Details />}
            {selectedTab === "Tab2" && repoDetails && <Tab2Details />}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(GitHub);
