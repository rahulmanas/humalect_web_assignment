import React, { useEffect, useState } from "react";
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
import { useGithub } from "../../hooks/useGithub";
import Link from "next/link";
import { ShimmerTable, ShimmerThumbnail } from "react-shimmer-effects-18";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Tab1Details() {
  const [collaboratorData, setCollaboratorData] = useState([]);
  const { repoDetails, fetchContributorData } = useGithub();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchContributorsData = () => {
      if (repoDetails && repoDetails.length > 0) {
        repoDetails.map(async (item) => {
          const { contributors_url } = item;

          const resp = await fetchContributorData(contributors_url);

          if (!resp.error) {
            setCollaboratorData((prevState) => [
              ...prevState,
              { count: resp.data.length || 0, labels: item.id },
            ]);
          }
        });
      }
    };

    if (repoDetails) {
      fetchContributorsData();
    }
    return () => {
      setChartData(null);
      setCollaboratorData([]);
    };
  }, [repoDetails]);

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

  console.log(repoDetails, "rep de");

  return (
    <div>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-xl">Contributors Chart</p>

          {chartData ? (
            <div>
              {chartData && (
                <Bar data={chartData} options={{ responsive: true }} />
              )}
            </div>
          ) : (
            <ShimmerThumbnail height={250} rounded />
          )}
        </div>
        <div className="space-y-4 overflow-scroll">
          <p className="text-xl">Repository Details</p>
          {repoDetails ? (
            <div>
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
                        <Link href={item.html_url} target="_blank">
                          {item.id}
                        </Link>
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
          ) : (
            <ShimmerTable row={5} col={5} />
          )}
        </div>
      </div>
    </div>
  );
}
