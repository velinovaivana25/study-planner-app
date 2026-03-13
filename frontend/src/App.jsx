
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AddSubject from "./pages/AddSubject"
import AddTask from "./pages/AddTask"

function ProtectedRoute({ children }) {

const token = localStorage.getItem("token")

if (!token) {
return <Navigate to="/" />
}

return children

}

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>} />
<Route path="/register" element={<Register/>} />

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/add-subject"
element={
<ProtectedRoute>
<AddSubject/>
</ProtectedRoute>
}
/>

<Route
path="/add-task"
element={
<ProtectedRoute>
<AddTask/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App

