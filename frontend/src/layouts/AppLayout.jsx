import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Slidebar from '../components/Slidebar';
import { Menu } from "lucide-react";
import { assets } from '../assets/assets';

const AppLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* Sidebar */}
      <Slidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top bar for mobile screen */}
        <div className="lg:hidden flex justify-between bg-white pr-4 py-1 shadow">
          {/* <h1 className="font-semibold text-slate-800">
            Issue Flow
          </h1> */}
          <img
            src={assets.logo1}
            alt="Logo"
            className="h-12 object-contain"
          />
          <button onClick={() => setSidebarOpen(true)} className="text-slate-700">
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>



    </div>
  )
}

export default AppLayout
