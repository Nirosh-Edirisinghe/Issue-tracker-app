import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { FiArrowUp, FiArrowDown, FiMinus } from "react-icons/fi";

const IssuesBlock = ({ issue, statusStyles, formatDate }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-lg p-4 shadow-lg bg-white"
        onClick={() => navigate(`/issue/${issue.id}`)}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-700">
            {issue.title}
          </h3>

          <span
            className={`px-2 py-1 rounded-xl text-xs font-semibold ${statusStyles[issue.status]}`}
          >
            {issue.status.replace("_", " ")}
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-500 mt-2">
            Created: {formatDate(issue.createdAt)}
          </p>
        </div>


        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <img
              src={issue.userData.image || assets.profile_placeholder}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700 text-sm">
              {issue.userData.name}
            </span>
          </div>

          {/* Priority badge */}
          <span className="px-3 py-0.5 border border-gray-500 rounded-full text-xs font-semibold text-gray-700 capitalize">
            {issue.priority}
          </span>
        </div>

      </div>
    </>
  )
}

export default IssuesBlock
