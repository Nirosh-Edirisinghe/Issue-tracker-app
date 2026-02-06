import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoute from '../auth/ProtectedRoute';
import Dashboard from '../pages/Dashboard';

function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
