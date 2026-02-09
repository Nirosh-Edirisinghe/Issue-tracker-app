import React from 'react'
import { Check } from "lucide-react";

const SuccessModal  = ({ message, onClose }) => {

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Success popup */}
      <div className="relative bg-white w-72 rounded-xl shadow-lg p-6 text-center z-50 mx-2">
        
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-green-600 font-semibold text-lg mb-1">Successful</h2>
        <p className="text-gray-600 text-sm mb-5">{message}</p>

        <button onClick={onClose}
          className="w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
        >
          OK
        </button>
      </div>
    </div>
    </>
  )
}

export default SuccessModal 
