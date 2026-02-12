import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const SidebarUserMenu = ({onClose}) => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const confirmRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // handle pupu close
  useEffect(() => {
  const handleClickOutside = (event) => {
    // Close Profile Menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }

    // Close Confirmation Popup
    if (confirmRef.current && !confirmRef.current.contains(event.target)) {
      setShowConfirm(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className="px-4 pb-6 mt-auto relative">

      {/* User Info */}
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3 rounded-lg cursor-pointer transition"
      >
        <div className="flex items-center gap-3">
          <img
            src={user?.image || assets.profile_placeholder}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.phone}</p>
          </div>
        </div>

        <User size={18} className="text-slate-300" />
      </div>

      {/* Popup Menu */}
      <div ref={menuRef}
        className={`
          absolute bottom-26 right-2 w-60 bg-slate-800 rounded-xl shadow-xl
          transform transition-all duration-300
          ${showMenu
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"}
        `}
      >
        <div className="px-4 py-3 font-semibold">PROFILE</div>
        <hr className="text-slate-400" />

        <NavLink
          to="/profile"
          onClick={() => {
            setShowMenu(false);
            if (onClose) onClose();
          }}
          className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:bg-slate-700 text-sm"
        >
          <User size={16} />
          My Profile
        </NavLink>

        <button
          onClick={() => {
            setShowMenu(false);
            setShowConfirm(true);
          }}
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-700 text-sm text-red-400"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Confirmation */}
      <div ref={confirmRef}
        className={`flex flex-col items-center absolute bottom-26 right-2 w-60 bg-gray-400 text-black p-4 rounded-xl shadow-xl
          transform transition-all duration-300
          ${showConfirm
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"}
        `}
      >
        <h2 className="font-semibold text-gray-900">Are you sure ?</h2>
        <p className="text-sm mb-4">you want to logout</p>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setShowConfirm(false)}
            className="px-3 py-1 text-sm bg-gray-200 rounded-md cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
};

export default SidebarUserMenu;
