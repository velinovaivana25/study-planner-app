import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 
import Navbar from "../components/Navbar";

function AddTask() {
  const navigate = useNavigate();

  // Local state за form fields
  const [title, setTitle] = useState(""); // Името на задачата
  const [subject, setSubject] = useState(""); // Избран предмет (subject._id)
  const [dueDate, setDueDate] = useState(""); // Краен рок
  const [priority, setPriority] = useState("Medium"); // Default priority
  const [subjects, setSubjects] = useState([]); // Листа на предмети од backend
  const [loading, setLoading] = useState(false); // Loading state за копчето

  // При load на компонентата, fetch на subjects
  useEffect(() => {
    fetchSubjects();
  }, []);

  // GET /subjects од backend
  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data); 
    } catch (err) {
      console.error(err);
      alert("Error loading subjects");
    }
  };

  // Submit функција за креирање на task
  const createTask = async (e) => {
    e.preventDefault(); 

    if (!title || !subject) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true); 

      await api.post("/tasks", {
        title,
        subject,
        dueDate,
        priority,
      });

      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
      alert("Error creating task"); 
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar со темна/светла тема и logout */}
      <Navbar />

      {/* Centered form */}
      <div className="flex justify-center items-center mt-12">
        <form
          onSubmit={createTask}
          className="bg-white shadow-lg rounded-xl p-8 w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add Study Task
          </h2>

          {/* Task title */}
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          />

          {/* Subject select */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Due date */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          />

          {/* Priority select */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border w-full p-2 rounded mb-6"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading} 
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;

