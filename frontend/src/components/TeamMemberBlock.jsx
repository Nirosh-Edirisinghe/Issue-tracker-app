import React from 'react'

const TeamMemberBlock = ({ users }) => {
  return (
    <>
      <div className="md:hidden space-y-4 max-h-180 overflow-y-auto">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg p-4 shadow-lg bg-white space-y-3"
          >
            {/* User Information */}
            <div className="flex items-center gap-3">
              <img src={user.image} className="w-10 h-10 rounded-full" alt=""/>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.position}</p>
              </div>
            </div>
            <hr className='text-gray-200' />

            {/* Issue Counts */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-6">

              {/* Open */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Open
                </span>
                <span className="font-medium">{user.issues.open}</span>
              </div>

              {/* In Progress */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  In Progress
                </span>
                <span className="font-medium">{user.issues.inprogress}</span>
              </div>

              {/* Resolved */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  Resolved
                </span>
                <span className="font-medium">{user.issues.resolved}</span>
              </div>

              {/* Closed */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Closed
                </span>
                <span className="font-medium">{user.issues.closed}</span>
              </div>
              
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default TeamMemberBlock
