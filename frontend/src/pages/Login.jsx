import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"

function Login() {

  const navigate = useNavigate()

  
  const [email, setEmail] = useState("")       // Email input
  const [password, setPassword] = useState("") // Password input

  //  Handle login form submission 
  const handleLogin = async (e) => {
    e.preventDefault() 

    try {
      const res = await api.post("/auth/login", { email, password })

      localStorage.setItem("token", res.data.token)

      navigate("/dashboard")

    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/*  Login Form  */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        {/* Form title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded mb-6"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {/* Link to register page */}
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