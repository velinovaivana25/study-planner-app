import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 
import Navbar from "../components/Navbar";

function AddSubject() {
  // Local state
  const [name, setName] = useState(""); // Името на новиот предмет
  const [loading, setLoading] = useState(false); // За да се покаже Loading state

  const navigate = useNavigate(); // React Router hook за навигација

  // Функција за submit на формата
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!name) {
      alert("Enter subject name"); 
      return;
    }

    try {
      setLoading(true); 

      await api.post("/subjects", { name });

      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
      alert("Error creating subject"); 
    }

    setLoading(false); 
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Centered form */}
      <div className="flex justify-center items-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add Subject
          </h2>

          {/* Input for subject name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)} 
            placeholder="Subject name"
            className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full p-2 rounded mb-4"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading} 
            className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600"
          >
            {loading ? "Adding..." : "Add Subject"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubject;

