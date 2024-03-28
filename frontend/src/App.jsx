import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Report from './Pages/Report'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import Home from './Pages/Home'


function App() {

  return (
    
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    </>
    
  )
}

export default App
