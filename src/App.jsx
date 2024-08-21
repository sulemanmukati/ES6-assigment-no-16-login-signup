import Dashboard from "./Screens/Dashboard"
import Login from "./Screens/Login"
import Signup from "./Screens/Signup"
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </>
  )
}
export default App
