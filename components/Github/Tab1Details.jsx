import React, { useEffect, useState } from "react";

import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Tab1Details({ repoDetails, accessToken }) {
  // A bar chart that compares the contributors count for each repository.
  // - A table containing the data of all the repositories in the account
  const [collaboratorData, setCollaboratorData] = useState([]);

  useEffect(() => {
    const fetchContributorsData = () => {
      if (repoDetails && repoDetails.length > 0) {
        repoDetails.map(async (item) => {
          try {
            const { contributors_url } = item;

            const resp = await axios.get(contributors_url, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github+json",
              },
            });
            if (resp) {
              // debugger;
              // if (!collaboratorData) setCollaboratorData(resp.data || 0);
              // else
              setCollaboratorData((prevState) => [
                ...prevState,
                { count: resp.data.length || 0, labels: item.id },
              ]);
              // }
            }
          } catch (error) {
            console.log(error, "err");
          }
        });
      }
    };

    if (repoDetails) {
      fetchContributorsData();
    }
  }, [repoDetails]);

  console.log("====================================");
  console.log(collaboratorData, "collaborators");
  console.log("====================================");

  const [chartData, setChartData] = useState(null);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  useEffect(() => {
    if (collaboratorData) {
      const data = {
        labels: collaboratorData?.map((item) => item?.labels),
        datasets: [
          {
            label: "Contributor Count",
            data: collaboratorData?.map((item) => item?.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [collaboratorData]);

  console.log(chartData, "chart data");

  return (
    <div>
      <div className="space-y-8">
        <div>
          <p>Contributors Chart</p>

          <div>
            {chartData && (
              <Bar data={chartData} options={{ responsive: true }} />
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl ">Repository Details</p>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border border-solid border-slate-400 px-4 py-2">
                  #
                </th>
                <th className="border border-solid border-slate-400 px-4 py-2">
                  Name
                </th>
                <th className="border border-solid border-slate-400 px-4 py-2">
                  Visibility
                </th>
                <th className="border border-solid border-slate-400 px-4 py-2">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {repoDetails?.map((item) => (
                <tr key={item.id}>
                  <td className="border border-solid border-slate-400 px-4 py-2">
                    <a
                      href={item.html_url}
                      target="_blank"
                      className="underline"
                    >
                      {item.id}
                    </a>
                  </td>
                  <td className="border border-solid border-slate-400 px-4 py-2">
                    <div className="flex space-x-2">
                      <img
                        src={item.owner.avatar_url}
                        alt={item.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <p>{item.full_name}</p>
                    </div>
                  </td>
                  <td className="border border-solid border-slate-400 px-4 py-2 capitalize">
                    {item.visibility}
                  </td>
                  <td className="border border-solid border-slate-400 px-4 py-2">
                    {item.updated_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
