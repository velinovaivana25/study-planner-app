import { Moon, Sun, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 

function Navbar() {
  const navigate = useNavigate();

  // Local state
  const [dark, setDark] = useState(false); // Tracks dark mode
  const [showProfile, setShowProfile] = useState(false); // Toggles profile dropdown
  const [email, setEmail] = useState(""); // User email from backend

  // On mount: check saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark"); 
      setDark(true);
    }
  }, []);

  // On mount: fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me"); 
        setEmail(res.data.email);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // Toggle dark mode
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light"); 
    setDark(isDark);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <nav className="relative bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center">
      {/* Brand / Logo */}
      <h1 className="text-xl font-bold text-blue-600 dark:text-white">
        Study Planner
      </h1>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {/* PROFILE ICON */}
        <div
          onClick={() => setShowProfile(!showProfile)} 
          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer"
        >
          <User size={18} />
        </div>

        {/* PROFILE DROPDOWN */}
        {showProfile && (
          <div className="absolute right-20 top-16 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-56">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Logged in as:
            </p>
            <p className="font-semibold break-words">{email}</p>
          </div>
        )}

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          <LogOut size={16} />
          Logout
        </button>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
