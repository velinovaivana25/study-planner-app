import axios from "axios"

//  Create an axios instance 
const api = axios.create({
baseURL: "https://study-planner-app-1-12bu.onrender.com/api",
  timeout: 10000,
})

// This runs before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})


// This runs after each response or error
api.interceptors.response.use(
  (res) => res, 
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/"
    }

    return Promise.reject(err)
  }
)

export default api