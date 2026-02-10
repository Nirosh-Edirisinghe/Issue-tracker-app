import { useParams, useNavigate } from "react-router-dom";
import formatDate from "../Utils/formatDate";
import { assets } from "../assets/assets";
import { priorityStyles, statusStyles } from "../Utils/Themes";
import { FiArrowLeft } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import UpdateIssue from "../components/UpdateIssue";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import IssueStatusDropdown from "../components/IssueStatusDropdown";
import WarningModal from "../components/WarningModal";
import ConfirmationModal from "../components/ConfirmationModal";

const GetIssue = () => {
  const { backendUrl, token, fetchAllIssues } = useContext(AppContext)
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [openUpdateIssue, setOpenUpdateIssue] = useState(false)
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);


  // fetch isseu issue by id
  const fetchIssue = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/issue/get-issues/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIssue(data.issue);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDeleteIssue = async () => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/issue/delete-issue/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowConfirmDelete(false);

      if (data.success) {
        fetchAllIssues()
        navigate(-1);
      } else {
        setWarningMessage(data.message);
        setShowWarning(true);
      }
    } catch (error) {
      setShowConfirmDelete(false);
      console.error(error);
      if (error.response?.status === 403) {
        setWarningMessage("You are not allowed to delete this issue");
        setShowWarning(true);
      } else {
        toast.error("Delete failed");
      }
    }
  };


  useEffect(() => {
    fetchIssue();
  }, [id, token, fetchAllIssues]);

  if (loading) {
    return <div className="p-6">Loading issue...</div>;
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
              {/* <span className={`px-5 py-1 rounded-md text-xs font-semibold ${statusStyles[issue.status]}`}
              >
                {issue.status.replace("_", " ")}
              </span> */}
              <IssueStatusDropdown initialStatus={issue.status} issueId={issue.id} />
            </div>

            {/* Divider */}
            <hr className="my-4 text-gray-200" />

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-700 mb-1">
                  Description
                </h2>
                <span className="px-4 py-1 border border-gray-500 rounded-full text-xs font-semibold text-gray-700 capitalize">
                  {issue.priority}
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {issue.description || "No description provided"}
              </p>
            </div>

            {/* User details */}
            <div className="flex items-center justify-between mt-6">

              <div className="flex items-center gap-3">
                <img
                  src={issue.userData.image || assets.profile}
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
            <button
              onClick={() => setOpenUpdateIssue(true)}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Edit Issue
            </button>
            <button onClick={() => setShowConfirmDelete(true)} className="px-4 py-2 bg-primary/70 text-white rounded-md">
              Delete Issue
            </button>
          </div>

          {/*Update Issue Modal */}
          {openUpdateIssue && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <UpdateIssue
                issue={issue}
                onClose={() => setOpenUpdateIssue(false)}
                refreshIssue={fetchIssue}
              />
            </div>
          )}

          {showWarning && (
            <WarningModal
              message={warningMessage}
              onClose={() => setShowWarning(false)}
            />
          )}

          {showConfirmDelete && (
            <ConfirmationModal
              type="delete"
              message="This action will permanently delete the issue. Do you want to continue?"
              onConfirm={handleDeleteIssue}
              onCancel={() => setShowConfirmDelete(false)}
            />
          )}
        </div>

      </div>
    </>
  );
};

export default GetIssue;
