import { useState } from "react";
import api from "../services/api"; 

// AddTaskModal – modal component for creating a new task
function AddTaskModal({ close, subjects, refresh }) {
  // Local state for form fields
  const [title, setTitle] = useState(""); // Task title
  const [subject, setSubject] = useState(""); // Selected subject ID
  const [dueDate, setDueDate] = useState(""); // Due date
  const [priority, setPriority] = useState("Medium"); // Priority: Low, Medium, High
  const [loading, setLoading] = useState(false); // Loading state to disable button while creating

  // Function to create a new task
  const createTask = async () => {
    if (!title || !subject) {
      alert("Please fill all required fields");
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

      refresh();

      close();
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }

    setLoading(false); 
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Add Study Task
        </h2>

        {/* Task title input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
        />

        {/* Subject select dropdown */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Due date input */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border w-full p-2 rounded mb-3 dark:bg-gray-800 dark:text-white"
        />

        {/* Priority select */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border w-full p-2 rounded mb-4 dark:bg-gray-800 dark:text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Buttons: Cancel and Create */}
        <div className="flex justify-end gap-2">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={createTask}
            disabled={loading} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;

