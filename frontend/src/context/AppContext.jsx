import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem("Utoken"))
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = (token) => {
    localStorage.setItem("Utoken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("Utoken");
    setToken(null);
  };

  // fetch issues
  const fetchAllIssues = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/issue/get-issues",
        { headers: { Authorization: `Bearer ${token}`, }, }
      );

      if (data.success) {
        setIssues(data.issues);
      }

    } catch (error) {
      console.log(error.mesesage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIssues();
  }, [token]);

  const value = {
    token, setToken, login, logout, backendUrl, issues,loading,fetchAllIssues,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider