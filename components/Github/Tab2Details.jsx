import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tab2Details({ repoDetails, user, accessToken }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedRepoDetails, setSelectedRepoDetails] = useState(null);
  console.log(accessToken, "access tok");

  useEffect(() => {
    if (!repoDetails) setSelectedRepoDetails(null);
  }, [repoDetails]);

  const handleOptionChange = (event, repoDetail) => {
    setSelectedOption(event.target.value);
    // debugger;
    // repoDetail && fetchRepoCommitDetails(user.login, repoDetail?.name);
  };

  useEffect(() => {
    if (selectedOption) {
      const resp = repoDetails.filter((item) => item.name === selectedOption);
      fetchRepoCommitDetails(user.login, resp[0]?.name);
    }
  }, [selectedOption]);

  const fetchRepoCommitDetails = async (name, projectName) => {
    try {
      //   debugger;
      const response = await axios.get(
        `https://api.github.com/repos/${name}/${projectName}/commits`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedRepoDetails(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  console.log(selectedRepoDetails, "repo deta");

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
              return <option value={repoDetail.name}>{repoDetail.name}</option>;
            })}
          </select>
        </div>
        <div>
          {selectedRepoDetails && (
            <div className="space-y-4">
              <p className="font-bold">
                Total Number of commits: {selectedRepoDetails.length}
              </p>
              <div>
                <p className="mb-4 font-bold text-xl">Commit Details:</p>
                <ul className="space-y-4 list-disc pl-4">
                  {selectedRepoDetails?.slice(0, 5).map((item) => {
                    return (
                      <li>
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
          )}
        </div>
      </div>
    </div>
  );
}
