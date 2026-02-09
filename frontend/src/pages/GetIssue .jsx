import { useLocation, useParams, useNavigate } from "react-router-dom";
import formatDate from "../Utils/formatDate";
import { assets } from "../assets/assets";
import { priorityStyles, statusStyles } from "../Utils/Themes";
import { FiArrowLeft } from "react-icons/fi";

const GetIssue = () => {
  const { state } = useLocation(); // contains issue
  const { id } = useParams();
  const navigate = useNavigate();


  // If user opens page directly, handle missing state
  const issue = state?.issue;

  if (!issue) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Issue not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="px-1 py-6 sm:p-6 min-h-screen">

        {/* Header */}
        <div className='flex items-center justify-start gap-6'>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 p-3 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <h1 className="text-2xl text-slate-800 font-bold mb-6">View Issue</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-4">

          {/* Issue Details Box */}
          <div className="bg-white rounded-lg shadow-sm p-6 w-full sm:w-3/4">

            {/* Title and Status */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-700">
                {issue.title}
              </h1>
              <span className={`px-5 py-1 rounded-md text-xs font-semibold ${statusStyles[issue.status]}`}
              >
                {issue.status.replace("_", " ")}
              </span>
            </div>

            {/* Divider */}
            <hr className="my-4 text-gray-200" />

            {/* Description */}
            <div>
              <h2 className="font-semibold text-gray-700 mb-1">
                Description
              </h2>
              <p className="text-slate-600 text-sm">
                {issue.description || "No description provided"}
              </p>
            </div>

            {/* User details */}
            <div className="flex items-center justify-between mt-6">

              <div className="flex items-center gap-3">
                <img
                  src={assets.profile}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {issue.userData.name}
                </span>
              </div>

              <span className="text-sm text-slate-500">
                {formatDate(issue.createdAt)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full sm:w-1/4 flex flex-col gap-3">
            <button className="px-4 py-2 bg-primary text-white rounded-md">
              Edit Issue
            </button>
            <button className="px-4 py-2 bg-primary/70 text-white rounded-md">
              Delete Issue
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default GetIssue;
