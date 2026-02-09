import { useContext, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";


const priorities = ["Low", "Medium", "High"];
const status = ["Open", "Inprogress"]

const AddIssue = ({ onClose }) => {

  const { token, backendUrl } = useContext(AppContext)
  const [formData, setFormData] = useState({
    title: "",
    status: "Open",
    priority: "Medium",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const { data } = await axios.post(backendUrl + '/api/issue/create', 
        {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status : formData.status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      if (data.success) {
        console.log("add success");
        toast.success(data.message);
        setFormData({
          title: "",
          status: "Open",
          priority: "Medium",
          description: "",
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  return (

    <div className="p-6 w-full max-w-lg mx-4 bg-white rounded-lg shadow">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Add New Issue</h2>
        <button onClick={onClose}>
          <X size={20} className="stroke-gray-800" />
        </button>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4">

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

        {/* status */}
        <div>
          <label className="block font-medium mb-1 text-gray-800">Status</label>
          <Listbox
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
          >
            {({ open }) => (
              <div className="relative">

                {/* Button */}
                <Listbox.Button className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/60 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600">
                  <span className="capitalize">{formData.status}</span>
                  <ChevronDown
                    size={18}
                    className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Listbox.Button>

                {/* Options */}
                <Listbox.Options className="absolute mt-1 w-full border border-gray-300 bg-white shadow-md rounded-md z-10 overflow-hidden">
                  {status.map((status) => (
                    <Listbox.Option
                      key={status}
                      value={status}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1 capitalize border-b border-gray-100 ${active
                          ? "bg-blue-200 text-gray-600"
                          : "text-gray-700"}`
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
            onChange={(value) =>
              setFormData({ ...formData, priority: value })
            }
          >
            {({ open }) => (
              <div className="relative">
                {/* Button */}
                <Listbox.Button className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/60 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600"
                >
                  <span className="capitalize">{formData.priority}</span>
                  <ChevronDown
                    size={18}
                    className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Listbox.Button>

                {/* Options */}
                <Listbox.Options className="absolute mt-1 w-full border border-gray-300 bg-white shadow-md rounded-md z-10  overflow-hidden"
                >
                  {priorities.map((priority) => (
                    <Listbox.Option
                      key={priority}
                      value={priority}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1 capitalize border-b border-gray-100 ${active
                          ? "bg-blue-200 text-gray-600" : "text-gray-700"}`
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
          Create Issue
        </button>
      </form>

    </div>
  );
};

export default AddIssue;
