import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {

  const { token, setToken, backendUrl, login } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('signup')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    // Email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    // password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    // name validation
    if (state === "signup" && name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    return true;
  };


  // handle User register and login
  const onsubmitHandle = async (event) => {
    event.preventDefault()
    if (!validateForm()) return;
    
    try {
      if (state === 'signup') {
        console.log(state);

        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, password, email })

        if (data.success) {
          login(data.token)
          toast.success("Register successful");
          navigate('/')
        } else {
          toast.error(data.message)
        }

      } else {
        console.log(state);

        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

        if (data.success) {
          login(data.token)
          toast.success("Login successful");
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <>
      <div className="min-h-screen bg-slate-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden my-6">

          <div className="flex flex-col justify-between bg-linear-to-br from-slate-50 to-slate-100 p-8">

            {/* Logo */}
            <div className="flex items-center justify-center">
              <img
                src={assets.logo1}
                alt="logo"
                className="w-64 h-18 object-contain"
              />
            </div>

            {/* Illustration + Text */}
            <div className="flex flex-col items-center text-center">
              <img
                src={assets.loginImg}
                alt="login"
                className="max-w-xs mb-4"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-700">
                Manage Issues Smarter
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                Track, assign, and resolve service issues faster with a simple and
                powerful dashboard.
              </p>
            </div>
          </div>

          {/* register & login form */}
          <form onSubmit={onsubmitHandle} className="p-10 flex flex-col justify-center" >

            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              {state === "signup" ? "Create Account" : "Login"}
            </h2>

            {state === "signup" && (
              <div className="mb-4">
                <label className="text-sm text-slate-700">Full Name</label>
                <input className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-slate-800 outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm text-slate-700">Email</label>
              <input className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-slate-800 outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-slate-700">Password</label>
              <div className="relative">
                <input
                  className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1 pr-10 focus:ring-1 focus:ring-slate-800 outline-none"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-darkblue hover:bg-slate-700 text-white py-2 rounded-md transition"
            >
              {state === "signup" ? "Register" : "Login"}
            </button>

            <p className="text-sm text-center mt-4 text-slate-700">
              {state === "signup" ? (
                <>
                  Already have an account?{" "}
                  <span className="text-primary cursor-pointer"
                    onClick={() => setState("login")}
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Create an new account?{" "}
                  <span className="text-primary cursor-pointer"
                    onClick={() => setState("signup")}
                  >
                    click here
                  </span>
                </>
              )}
            </p>
          </form>
        </div>

      </div>

    </>
  )
}

export default Login
