import React from 'react'
import {AlertCircle, Loader, CheckCircle, XCircle,} from "lucide-react";
import { issues } from '../assets/assets';

const Dashboard = () => {

  const openCount = issues.filter(issue => issue.status === "OPEN").length;
  const inProgressCount = issues.filter(issue => issue.status === "IN_PROGRESS").length;
  const resolvedCount = issues.filter(issue => issue.status === "RESOLVED").length;
  const closedCount = issues.filter(issue => issue.status === "CLOSED").length;

  return (
    <>
      <div className="p-6">
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

      </div>
    </>
  )
}

export default Dashboard
