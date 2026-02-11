import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AppLayout from './layouts/AppLayout';
import Issues from './pages/Issues ';
import GetIssue from './pages/GetIssue ';
import Profile from './pages/Profile';
import TeamMembers from './pages/TeamMembers ';

function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issue/:id" element={<GetIssue />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/members" element={<TeamMembers/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
