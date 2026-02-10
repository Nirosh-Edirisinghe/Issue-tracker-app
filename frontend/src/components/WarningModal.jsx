import React from 'react'
import { AlertTriangle } from "lucide-react";

const WarningModal = ({ message, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay fro popup modal bg */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Modal */}
        <div className="relative bg-white w-72 rounded-xl shadow-lg p-6 text-center z-50 mx-2">

          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle
                className="w-7 h-7 text-yellow-600"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <h2 className="text-yellow-600 font-semibold text-lg mb-1">Warning</h2>

          <p className="text-gray-600 text-sm mb-5">{message}</p>

          <button onClick={onClose}
            className="w-full py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    </>
  )
}

export default WarningModal
