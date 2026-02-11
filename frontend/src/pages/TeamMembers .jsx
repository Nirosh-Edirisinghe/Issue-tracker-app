import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import TeamMemberBlock from "../components/TeamMemberBlock";

const TeamMembers = () => {
  const { backendUrl } = useContext(AppContext)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/user/team-members");
        setUsers(Array.isArray(data) ? data : []); 
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-1 py-6 sm:p-6 min-h-screen">

      <h2 className="text-3xl text-slate-700 font-bold mb-6">Team Members</h2>

      <div className=" bg-white rounded-lg shadow-sm mt-4">
        <div className='flex justify-start mb-2 p-4'>
          <p className="text-gray-600 text-md font-md">Monitor team performance and task progress</p>
        </div>

        <div className="hidden md:block bg-white rounded-lg shadow-sm">
          <div className="max-h-150 overflow-y-auto custom-scroll">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                <tr>
                  <th className="text-left px-5 py-3">User</th>
                  <th className="text-left px-5 py-3">Position</th>

                  <th className="text-center px-5 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                      Open
                    </div>
                  </th>

                  <th className="text-center px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      In Progress
                    </div>
                  </th>

                  <th className="text-center px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-green-600"></span>
                      Resolved
                    </div>
                  </th>

                  <th className="text-center px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-red-600"></span>
                      Closed
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="text-center hover:bg-gray-50">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={user.image} className="w-8 h-8 rounded-full" alt="" />
                        <span className="text-gray-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="pl-1 py-3 text-gray-700 whitespace-nowrap">{user.position}</td>
                    <td className="px-5 py-3 text-gray-700 whitespace-nowrap">{user.issues.open}</td>
                    <td className="px-5 py-3 text-gray-700 whitespace-nowrap">{user.issues.inprogress}</td>
                    <td className="px-5 py-3 text-gray-700 whitespace-nowrap">{user.issues.resolved}</td>
                    <td className="px-5 py-3 text-gray-700 whitespace-nowrap">{user.issues.closed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* team member block in mobile view */}
        <TeamMemberBlock users={users} />

      </div>

    </div>
  );
};

export default TeamMembers;
