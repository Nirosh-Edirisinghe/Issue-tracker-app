import { useContext, useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const priorities = ["Low", "Medium", "High"];
const status = ["Open", "Inprogress", "Resolved", "Closed"];

const UpdateIssue = ({ issue, onClose, refreshIssue}) => {
  const { token, backendUrl, fetchAllIssues } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    status: "Open",
    priority: "Medium",
    description: "",
  });

  // Pre-fill form with isseu data
  useEffect(() => {
    if (issue) {
      setFormData({
        title: issue.title || "",
        status: issue.status || "Open",
        priority: issue.priority || "Medium",
        description: issue.description || "",
      });
    }
  }, [issue]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // handle Issue Update
  const updateIsuue = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/issue/update-isseu/${issue.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Issue updated successfully!");
        refreshIssue();
        fetchAllIssues();
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!issue) return null;

  return (
    <div className="p-6 w-full max-w-lg mx-4 bg-white rounded-lg shadow">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Update Issue</h2>
        <button onClick={onClose}>
          <X size={20} className="stroke-gray-800" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={updateIsuue} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1 text-gray-800">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/60 rounded-md px-3 py-2 text-slate-600"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1 text-gray-800">Status</label>
          <Listbox
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/60 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600">
                  <span className="capitalize">{formData.status}</span>
                  <ChevronDown
                    size={18}
                    className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Listbox.Button>

                <Listbox.Options className="absolute mt-1 w-full border border-gray-300 bg-white shadow-md rounded-md z-10 overflow-hidden">
                  {status.map((status) => (
                    <Listbox.Option
                      key={status}
                      value={status}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1 capitalize border-b border-gray-100 ${active ? "bg-blue-200 text-gray-600" : "text-gray-700"
                        }`
                      }
                    >
                      {status}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        {/* Priority */}
        <div>
          <label className="block font-medium mb-1 text-gray-800">Priority</label>
          <Listbox
            value={formData.priority}
            onChange={(value) => setFormData({ ...formData, priority: value })}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/60 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600">
                  <span className="capitalize">{formData.priority}</span>
                  <ChevronDown
                    size={18}
                    className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Listbox.Button>

                <Listbox.Options className="absolute mt-1 w-full border border-gray-300 bg-white shadow-md rounded-md z-10 overflow-hidden">
                  {priorities.map((priority) => (
                    <Listbox.Option
                      key={priority}
                      value={priority}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1 capitalize border-b border-gray-100 ${active ? "bg-blue-200 text-gray-600" : "text-gray-700"
                        }`
                      }
                    >
                      {priority}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-gray-800">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/60 rounded-md px-3 py-2 text-slate-600"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md cursor-pointer">
          Update Issue
        </button>
      </form>

    </div>
  );
};

export default UpdateIssue;
