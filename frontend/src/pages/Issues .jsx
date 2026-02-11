import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import formatDate from '../Utils/formatDate'
import { FiChevronDown, FiSearch } from "react-icons/fi";
import IssuesBlock from '../components/IssuesBlock';
import { useNavigate } from "react-router-dom";
import { statusStyles } from '../Utils/Themes';
import AddIssue from '../components/AddIssue';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Issues = () => {

  const { issues, loading } = useContext(AppContext);

  const [priority, setPriority] = useState("All");
  const [search, setSearch] = useState("");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [openAddIssue, setOpenAddIssue] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  const priorityOptions = [
    { value: "All", label: "All Issues" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  // filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchPriority =
      priority === "All" || issue.priority === priority;

    const matchSearch =
      issue.title.toLowerCase().includes(search.toLowerCase());

    return matchPriority && matchSearch;
  });

  // handle drop down close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setPriorityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className="px-1 py-6 sm:p-6 min-h-screen">
        {/* Header section */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <h1 className="text-2xl text-slate-900 font-bold mb-6">Issues</h1>

          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search issue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* issues list */}
        <div className=" bg-white rounded-lg shadow-sm mt-4">

          <div className='flex justify-between p-5'>

            {/* Filter by priority */}
            <div ref={dropdownRef} className="relative w-30 sm:w-44">
              <button
                onClick={() => setPriorityOpen(!priorityOpen)}
                className="w-full flex items-center justify-between gap-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md px-3 py-2 text-sm font-medium"
              >
                <span>
                  {priorityOptions.find(p => p.value === priority)?.label}
                </span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown section */}
              {priorityOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-blue-200 rounded-md shadow-md">
                  {priorityOptions.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setPriority(item.value);
                        setPriorityOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50  ${priority === item.value ? "bg-blue-50 text-blue-600 font-semibold" : ""}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setOpenAddIssue(true)} className=' px-3 py-2 text-sm bg-primary text-white font-semibold rounded-md'>+ Add Issues</button>
          </div>

          {/* issue list in desktop view */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm">
            <div className="max-h-105 overflow-y-auto">
              <table className="min-w-full text-sm">
                {/* Sticky Header */}
                <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                  <tr>
                    <th className="text-left px-5 py-3">Issue</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-left px-5 py-3">Priority</th>
                    <th className="text-left px-5 py-3">Created At</th>
                    <th className="text-left px-5 py-3">From</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} className=" hover:bg-gray-50"
                      onClick={() => navigate(`/issue/${issue.id}`)}
                    >
                      <td className="px-5 py-4 font-medium text-gray-700 whitespace-nowrap">
                        {issue.title}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${statusStyles[issue.status]}`}
                        >
                          {issue.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 border border-gray-570 rounded-full text-xs font-semibold  text-gray-700 capitalize">
                          {issue.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                        {formatDate(issue.createdAt)}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={issue.userData.image || assets.profile} alt="user" className="w-8 h-8 rounded-full" />
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
          </div>

          {/* issue list in mobile view */}
          <div className="block md:hidden max-h-130 overflow-y-auto space-y-4 px-4 pb-4">
            {filteredIssues.map((issue) => (
              <IssuesBlock
                key={issue.id}
                issue={issue}
                statusStyles={statusStyles}
                formatDate={formatDate} />
            ))}
          </div>

        </div>


      </div>

      {/* add issue from */}
      {openAddIssue && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <AddIssue onClose={() => setOpenAddIssue(false)} />
        </div>
      )}
    </>
  )
}

export default Issues 
