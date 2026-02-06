import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
