
import { Moon, Sun, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Navbar(){

const navigate = useNavigate()

const [dark,setDark] = useState(false)
const [showProfile,setShowProfile] = useState(false)
const [email,setEmail] = useState("")

useEffect(()=>{

const savedTheme = localStorage.getItem("theme")

if(savedTheme === "dark"){
document.documentElement.classList.add("dark")
setDark(true)
}

},[])

useEffect(()=>{

const fetchUser = async()=>{

try{

const res = await api.get("/auth/me")

setEmail(res.data.email)

}catch(err){
console.log(err)
}

}

fetchUser()

},[])

const toggleDark = () => {

document.documentElement.classList.toggle("dark")

const isDark = document.documentElement.classList.contains("dark")

localStorage.setItem("theme", isDark ? "dark" : "light")

setDark(isDark)

}

const logout = () => {

localStorage.removeItem("token")
navigate("/")

}

return(

<nav className="relative bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center">

<h1 className="text-xl font-bold text-blue-600 dark:text-white">
Study Planner
</h1>

<div className="flex items-center gap-4">

{/* PROFILE ICON */}

<div
onClick={()=>setShowProfile(!showProfile)}
className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer"
>
<User size={18}/>
</div>

{/* PROFILE DROPDOWN */}

{showProfile && (

<div className="absolute right-20 top-16 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-56">

<p className="text-sm text-gray-500 dark:text-gray-300">
Logged in as:
</p>

<p className="font-semibold break-words">
{email}
</p>

</div>

)}

{/* LOGOUT */}

<button
onClick={logout}
className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>
<LogOut size={16}/>
Logout
</button>

{/* DARK MODE */}

<button
onClick={toggleDark}
className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
>
{dark ? <Sun size={18}/> : <Moon size={18}/>}
</button>

</div>

</nav>

)

}

export default Navbar

