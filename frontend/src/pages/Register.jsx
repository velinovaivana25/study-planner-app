
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleRegister = async(e)=>{

e.preventDefault()

try{

await api.post("/auth/register",{name,email,password})

alert("User created")

navigate("/")

}catch(err){

alert("Register failed")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form
onSubmit={handleRegister}
className="bg-white p-8 rounded-xl shadow-lg w-96"
>

<h2 className="text-2xl font-bold mb-6 text-center">
Register
</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
className="border w-full p-2 rounded mb-4"
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
className="border w-full p-2 rounded mb-4"
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
className="border w-full p-2 rounded mb-6"
/>

<button
className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
>
Register
</button>

</form>

</div>

)

}

export default Register

