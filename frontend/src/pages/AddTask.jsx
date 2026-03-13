
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import Navbar from "../components/Navbar"

function AddTask(){

const navigate = useNavigate()

const [title,setTitle] = useState("")
const [subject,setSubject] = useState("")
const [dueDate,setDueDate] = useState("")
const [priority,setPriority] = useState("Medium")
const [subjects,setSubjects] = useState([])
const [loading,setLoading] = useState(false)

useEffect(()=>{
fetchSubjects()
},[])

const fetchSubjects = async ()=>{

try{

const res = await api.get("/subjects")
setSubjects(res.data)

}catch(err){

console.error(err)
alert("Error loading subjects")

}

}

const createTask = async (e)=>{

e.preventDefault()

if(!title || !subject){
alert("Please fill required fields")
return
}

try{

setLoading(true)

await api.post("/tasks",{
title,
subject,
dueDate,
priority
})

navigate("/dashboard")

}catch(err){

console.error(err)
alert("Error creating task")

}

setLoading(false)

}

return(

<div className="min-h-screen bg-gray-100">

<Navbar/>

<div className="flex justify-center items-center mt-12">

<form
onSubmit={createTask}
className="bg-white shadow-lg rounded-xl p-8 w-96"
>

<h2 className="text-2xl font-bold mb-6 text-center">
Add Study Task
</h2>

<input
type="text"
placeholder="Task title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border w-full p-2 rounded mb-4"
/>

<select
value={subject}
onChange={(e)=>setSubject(e.target.value)}
className="border w-full p-2 rounded mb-4"
>

<option value="">Select subject</option>

{subjects.map(s=>(
<option key={s._id} value={s._id}>
{s.name}
</option>
))}

</select>

<input
type="date"
value={dueDate}
onChange={(e)=>setDueDate(e.target.value)}
className="border w-full p-2 rounded mb-4"
/>

<select
value={priority}
onChange={(e)=>setPriority(e.target.value)}
className="border w-full p-2 rounded mb-6"
>

<option value="Low">Low Priority</option>
<option value="Medium">Medium Priority</option>
<option value="High">High Priority</option>

</select>

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

)

}

export default AddTask

