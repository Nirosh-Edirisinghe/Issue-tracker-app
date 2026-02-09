import React from 'react'
import { AlertCircle, Loader, CheckCircle, XCircle, } from "lucide-react";
import { assets } from '../assets/assets';
import formatDate from '../Utils/formatDate';
import IssuesBlock from '../components/IssuesBlock';
import { useMemo } from "react";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { statusStyles } from '../Utils/Themes';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const { issues, loading } = useContext(AppContext);
  const navigate = useNavigate()
  // if (loading) return <p>Loading...</p>;

  const openCount = issues.filter(issue => issue.status === "Open").length;
  const inProgressCount = issues.filter(issue => issue.status === "Inprogress").length;
  const resolvedCount = issues.filter(issue => issue.status === "Resolved").length;
  const closedCount = issues.filter(issue => issue.status === "Closed").length;

  // filter lates issues
  const latestIssues = useMemo(() => {
    return [...issues]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [issues]);

  return (
    <>
      <div className="px-1 py-6 sm:p-6 min-h-screen">
        {/* Title */}
        <div>
          <h1 className="text-2xl text-slate-900 font-bold mb-6">Dashboard</h1>
        </div>

        {/* Stats Boxes */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">

          {/* Open Issues */}
          <div className="bg-white rounded-lg py-5 px-8 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Issues</p>
              <p className="text-3xl font-bold text-gray-800">{openCount}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>

          {/* In Progress Issues */}
          <div className="bg-white rounded-lg py-5 px-8 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-3xl font-bold text-gray-800">{inProgressCount}</p>
            </div>
            <Loader className="w-8 h-8 text-yellow-500 animate-spin" />
          </div>

          {/* Resolved Issues */}
          <div className="bg-white rounded-lg py-5 px-8 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-3xl font-bold text-gray-800">{resolvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Closed Issues */}
          <div className="bg-white rounded-lg py-5 px-8 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Closed</p>
              <p className="text-3xl font-bold text-gray-800">{closedCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>

        </div>

        {/* Latest Issues Section */}
        <div className=" bg-white rounded-lg shadow-sm mt-10">
          <div className="p-5 ">
            <h2 className="text-lg font-semibold text-gray-800">
              Latest Issues
            </h2>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="text-left px-5 py-3">Issue</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Created At</th>
                  <th className="text-left px-5 py-3">From</th>
                </tr>
              </thead>

              <tbody>
                {latestIssues.map((issue) => (
                  <tr key={issue.id} className=" hover:bg-gray-50"
                    onClick={() => navigate(`/issue/${issue.id}`)}
                  >
                    <td className="px-5 py-4 font-medium text-gray-700 whitespace-nowrap">
                      {issue.title}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${statusStyles[issue.status]}`}
                      >
                        {issue.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      {formatDate(issue.createdAt)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={assets.profile} alt="user" className="w-8 h-8 rounded-full" />
                        <span className="text-gray-700">
                          {issue.userData.name}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Issues block in mobile view */}
          <div className="block md:hidden space-y-4 px-4 pb-4">
            {latestIssues.map((issue) => (
              <IssuesBlock
                key={issue.id}
                issue={issue}
                statusStyles={statusStyles}
                formatDate={formatDate} />
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
