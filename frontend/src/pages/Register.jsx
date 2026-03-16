import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")         // Name input
  const [email, setEmail] = useState("")       // Email input
  const [password, setPassword] = useState("") // Password input

  const handleRegister = async (e) => {
    e.preventDefault() 

    try {
      await api.post("/auth/register", { name, email, password })

      alert("User created")

      navigate("/")

    } catch (err) {
      alert("Register failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/*  Registration Form  */}
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        {/* Form title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* Name input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

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
          Register
        </button>
      </form>
    </div>
  )
}

export default Register