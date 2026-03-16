import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import Navbar from "../components/Navbar"
import AddTaskModal from "../components/AddTaskModal"
import { Trash2, CheckCircle, Plus, Pencil } from "lucide-react"

function Dashboard() {

  const navigate = useNavigate()

  
  const [tasks, setTasks] = useState([])                  // All tasks
  const [subjects, setSubjects] = useState([])            // All subjects
  const [selectedSubject, setSelectedSubject] = useState(null) // Filtered subject
  const [showModal, setShowModal] = useState(false)       // Add Task modal toggle
  const [loading, setLoading] = useState(true)            // Loading indicator

  //  Fetch data on mount 
  useEffect(() => {
    loadData()
  }, [])

  //  Load tasks and subjects 
  const loadData = async () => {
    try {
      const tasksRes = await api.get("/tasks")
      const subjectsRes = await api.get("/subjects")

      setTasks(tasksRes.data)
      setSubjects(subjectsRes.data)

    } catch (err) {
      console.error(err)
      alert("Error loading data")
    }

    setLoading(false)
  }

  //  Delete a task 
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this task?")
    if (!confirmDelete) return

    try {
      await api.delete("/tasks/" + id)
      setTasks(tasks.filter(t => t._id !== id)) 
    } catch (err) {
      alert("Delete failed")
    }
  }

  //  Toggle task completion 
  const toggleTask = async (id) => {
    try {
      await api.put("/tasks/" + id) 
      setTasks(tasks.map(task =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ))
    } catch (err) {
      alert("Update failed")
    }
  }

  //  Delete a subject 
  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm("Delete this subject?")
    if (!confirmDelete) return

    try {
      await api.delete("/subjects/" + id)
      setSubjects(subjects.filter(s => s._id !== id))
    } catch (err) {
      alert("Delete failed")
    }
  }

  //  Edit a subject 
  const editSubject = async (subject) => {
    const newName = prompt("Edit subject name:", subject.name)
    if (!newName) return

    try {
      const res = await api.put("/subjects/" + subject._id, { name: newName })
      setSubjects(subjects.map(s => s._id === subject._id ? res.data : s))
    } catch (err) {
      alert("Update failed")
    }
  }

  //  Filter tasks by selected subject 
  const filteredTasks = selectedSubject
    ? tasks.filter(t => t.subject?._id === selectedSubject)
    : tasks

  //  Calculate progress 
  const completed = tasks.filter(t => t.completed).length
  const progress = tasks.length ? (completed / tasks.length) * 100 : 0

  //  Show loading state 
  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">


      <Navbar />

      <div className="flex">

     
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">Subjects</h2>

          {/* All Tasks button */}
          <div
            onClick={() => setSelectedSubject(null)}
            className={`p-2 rounded cursor-pointer mb-2 ${
              !selectedSubject ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All Tasks
          </div>

          {/* List of subjects */}
          {subjects.map(subject => (
            <div
              key={subject._id}
              className="flex justify-between items-center p-2 rounded mb-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {/* Click to filter tasks by this subject */}
              <span
                onClick={() => setSelectedSubject(subject._id)}
                className="cursor-pointer flex-1"
              >
                {subject.name}
              </span>

              {/* Edit and delete buttons */}
              <div className="flex gap-2">
                <button onClick={() => editSubject(subject)}>
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteSubject(subject._id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

        </div>

        <div className="flex-1 p-8">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Study Dashboard</h1>

            {/* Add Subject / Add Task buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/add-subject")}
                className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Add Subject
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <Plus size={18} />
                Add Task
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
            <h2 className="font-semibold mb-2">Study Progress</h2>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: progress + "%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              {completed} of {tasks.length} tasks completed
            </p>
          </div>

          {/* Tasks grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Subject: {task.subject?.name || "None"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Due: {task.dueDate?.substring(0, 10)}
                </p>
                <p className="text-sm mt-1">
                  Priority:
                  <span
                    className={`ml-2 font-semibold ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>
                <p className="mt-2">
                  Status:
                  <span
                    className={`ml-2 font-semibold ${
                      task.completed ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </p>

                {/* Task actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => toggleTask(task._id)}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    <CheckCircle size={16} />
                    Done
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  Add Task Modal  */}
      {showModal && (
        <AddTaskModal
          close={() => setShowModal(false)}
          subjects={subjects}
          refresh={loadData}
        />
      )}

    </div>
  )
}

export default Dashboard