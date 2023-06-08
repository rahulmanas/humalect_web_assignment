import React from "react";

export default function Tab1Details({ repoDetails }) {
  // A bar chart that compares the contributors count for each repository.
  // - A table containing the data of all the repositories in the account
  return (
    <div>
      <div>
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
