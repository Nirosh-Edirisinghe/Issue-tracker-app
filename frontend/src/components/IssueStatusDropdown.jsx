import React, { useContext } from 'react'
import { useState, useRef, useEffect } from "react";
import { statusOptions, statusStyles } from '../Utils/Themes';
import { ChevronDown } from "lucide-react";
import SuccessModal from './SuccessModal ';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const sensitiveStatuses = ["Resolved", "Closed"];

const IssueStatusDropdown = ({ initialStatus, issueId }) => {

  const { backendUrl , token, fetchAllIssues} = useContext(AppContext)

  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const dropdownRef = useRef();

  // Close dropdown 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusUpdate = async (newStatus) => {
    if (sensitiveStatuses.includes(newStatus)) {
      setNextStatus(newStatus);
      setShowConfirm(true); // show confirmation modal
      return;
    }

    // Normal update
    await updateStatus(newStatus);
  };

  const updateStatus = async (newStatus) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/issue/update-status/${issueId}`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` }, });

      if (data.success) {
        setStatus(newStatus);
        setStatusOpen(false);
        setShowSuccess(true);
        fetchAllIssues();
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };


  return (
    <>
      <div ref={dropdownRef} className="relative w-32">
        {/* button section */}
        <button
          onClick={() => setStatusOpen(!statusOpen)}
          className={`w-full flex items-center justify-between gap-2 px-3 py-1 rounded-md text-sm font-medium ${statusStyles[status]}`}
        >
          {status.replace("_", " ")}
          <ChevronDown size={18} className={`transition-transform ${statusOpen ? "rotate-180" : ""} ${statusStyles[status].split(" ").find(cls => cls.startsWith("text-"))}`}
          />
        </button>

        {/* drop down section */}
        {statusOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-blue-200 rounded-md shadow-md">
            {statusOptions.map((item) => (
              <button
                key={item.value}
                onClick={() => handleStatusUpdate(item.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${status === item.value ? "hover:bg-blue-50 font-semibold" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <ConfirmationModal
          message={`you want to change status to "${nextStatus}"`}
          onConfirm={async () => {
            setShowConfirm(false);
            await updateStatus(nextStatus);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          message="Status updated successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  )
}

export default IssueStatusDropdown
