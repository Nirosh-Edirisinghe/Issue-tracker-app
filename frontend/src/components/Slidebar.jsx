import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, AlertCircle, X,Users  } from "lucide-react";
import { LogOut } from "lucide-react";
import ConfirmationModal from './ConfirmationModal';
import { AppContext } from '../context/AppContext';
import SidebarUserMenu from './SidebarUserMenu ';


const Slidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const { logout } = useContext(AppContext)

  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
     ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`;

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true });
  };


  return (
    <>
      {/* Overlay in mobile view */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
      >
        {/* Header section */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <span className="text-xl font-bold">Issue Flow</span>

          {/* sidebar close Icon in mobile view */}
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* sidebar link */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/issues"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <AlertCircle size={18} />
            Issues
          </NavLink>

          <NavLink
            to="/members"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={18} />
            Team Members
          </NavLink>
        </nav>

        <SidebarUserMenu onClose={() => setSidebarOpen(false)}/>


      </aside>

    </>
  )
}

export default Slidebar
