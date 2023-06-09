import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGithub } from "../../hooks/useGithub";
import { ShimmerPostDetails } from "react-shimmer-effects-18";

export default function Tab2Details() {
  const [selectedOption, setSelectedOption] = useState("");
  const {
    repoDetails,
    githubUser,
    // accessToken,
    selectedRepoDetails,
    setSelectedRepoDetails,
    fetchRepoCommitDetails,
    isTabLoading,
  } = useGithub();

  useEffect(() => {
    if (!repoDetails) setSelectedRepoDetails(null);
  }, [repoDetails]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      const resp = repoDetails.filter((item) => item.name === selectedOption);
      fetchRepoCommitDetails(githubUser.login, resp[0]?.name);
    }
  }, [selectedOption]);

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="dropdown" className="mr-2 font-bold">
            Select the repository:
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="">-- Select --</option>
            {repoDetails?.map((repoDetail) => {
              return (
                <option key={repoDetail.id} value={repoDetail.name}>
                  {repoDetail.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          {!isTabLoading ? (
            <div className="space-y-4">
              {selectedRepoDetails?.length && (
                <p className="font-bold">
                  Total Number of commits: {selectedRepoDetails?.length}
                </p>
              )}
              <div>
                {selectedRepoDetails?.length && (
                  <p className="mb-4 font-bold text-xl">Commit Details:</p>
                )}
                <ul className="space-y-4 list-disc pl-4">
                  {selectedRepoDetails?.slice(0, 5).map((item) => {
                    return (
                      <li key={item.sha}>
                        <p>{item.sha}</p>
                        <a
                          href={item.html_url}
                          target="_blank"
                          className="underline lineClamp-1"
                        >
                          {item.commit.message}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            isTabLoading && (
              <div>
                <ShimmerPostDetails card cta variant="EDITOR" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
