import React from 'react'
import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ message, onConfirm, onCancel, type = "info" }) => {

  // Model styles based on usage(status update/delete)
  const typeStyles = {
    delete: {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      iconBg: "bg-red-100",
      confirmBtn: "bg-red-500 hover:bg-red-600 text-white",
      title: "Are you sure?",
    },
    update: {
      icon: <AlertTriangle className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      confirmBtn: "bg-primary hover:bg-blue-700 text-white",
      title: "Confirm Update?",
    },
  };
  const styles = typeStyles[type];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay for background */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onCancel}
        />

        {/*conformation popup*/}
        <div className="relative bg-white w-85 rounded-xl shadow-xl p-6 z-50 mx-2">

          <div className="flex justify-center mb-3">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.iconBg}`}>
              {styles.icon}
            </div>
          </div>

          <h2 className="text-center text-lg font-semibold text-gray-800">
            Are you sure?
          </h2>

          <p className="text-center text-sm text-gray-600 mt-2">
            {message}
          </p>

          <div className="mt-6 flex justify-between gap-3">
            <button onClick={onCancel}
              className="w-full py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button onClick={onConfirm}
              className={`w-full py-2 rounded-lg ${styles.confirmBtn} transition`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal
