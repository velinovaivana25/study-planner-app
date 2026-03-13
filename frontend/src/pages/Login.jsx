
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

const handleLogin = async(e)=>{

e.preventDefault()

try{

const res = await api.post("/auth/login",{email,password})

localStorage.setItem("token",res.data.token)

navigate("/dashboard")

}catch(err){

alert("Login failed")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form
onSubmit={handleLogin}
className="bg-white p-8 rounded-xl shadow-lg w-96"
>

<h2 className="text-2xl font-bold mb-6 text-center">
Login
</h2>

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
Login
</button>

<p className="text-center mt-4 text-sm">
Don't have an account?{" "}
<Link to="/register" className="text-blue-500">
Register
</Link>
</p>

</form>

</div>

)

}

export default Login

