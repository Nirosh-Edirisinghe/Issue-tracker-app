import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Slidebar from '../components/Slidebar';
import { Menu } from "lucide-react";

const AppLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="lg:hidden flex items-center gap-3 bg-white px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-700">
            <Menu size={24} />
          </button>
          <h1 className="font-semibold text-slate-800">
            Issue Flow
          </h1>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AppLayout
